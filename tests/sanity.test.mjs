#!/usr/bin/env node
/**
 * Pre-deploy sanity checks. Static analysis only — no server, no database.
 *
 *   node tests/sanity.test.mjs        # or: npm run test:sanity
 *
 * Covers the failure modes this project has actually hit:
 *   1. Internal links pointing at routes that do not exist (23 of these were
 *      live on Grewal's header, footer and homepage at one point).
 *   2. Theme-token misuse producing invisible text — `text-charcoal` on a
 *      `bg-white` input rendered near-white on near-white on two of the sites.
 *   3. Utility classes that the site's stylesheet never defines, which render
 *      as unstyled plain text (`btn-outline-dark` did this on two sites).
 *   4. Orphan pages missing from the sitemap.
 *   5. Duplicated brand suffix in page titles.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SITE } from './site-config.mjs';

const ROOT = process.cwd();
const failures = [];
const passes = [];

function ok(msg) { passes.push(msg); }
function fail(check, detail) { failures.push({ check, detail }); }

// ── Helpers ───────────────────────────────────────────────────────────────
const SKIP = new Set(['node_modules', '.next', '.git', '_old_site']);
function walk(dir, ext, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, ext, acc);
    else if (ext.test(name)) acc.push(full);
  }
  return acc;
}
function read(p) { return existsSync(p) ? readFileSync(p, 'utf8') : ''; }
function slugsFrom(file) {
  return [...read(file).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

// ── 1. Internal links resolve to real routes ─────────────────────────────
{
  const services = slugsFrom(join(ROOT, 'data/services.ts'));
  const cities = slugsFrom(join(ROOT, 'data/cities.ts'));
  const blog = existsSync(join(ROOT, 'app/blog'))
    ? readdirSync(join(ROOT, 'app/blog')).filter((d) =>
        existsSync(join(ROOT, 'app/blog', d, 'page.tsx')))
    : [];

  const valid = new Set(['/']);
  // Any top-level app/<seg>/page.tsx is a real route.
  for (const seg of readdirSync(join(ROOT, 'app'))) {
    if (seg.startsWith('[') || seg === 'api') continue;
    if (existsSync(join(ROOT, 'app', seg, 'page.tsx'))) valid.add('/' + seg);
  }
  for (const s of services) {
    valid.add('/services/' + s);
    for (const c of cities) valid.add(`/services/${s}/${c}`);
  }
  for (const c of cities) valid.add('/areas/' + c);
  for (const b of blog) valid.add('/blog/' + b);

  const dynamic = /^\/(api|admin|quote|invoice|metrics)(\/|$)/;
  const bad = new Map();
  for (const f of [...walk(join(ROOT, 'app'), /\.tsx$/), ...walk(join(ROOT, 'components'), /\.tsx$/)]) {
    const src = read(f);
    // Literal hrefs, plus the `href: '/x'` form used inside nav arrays.
    for (const m of src.matchAll(/href[=:]\s*['"](\/[a-z0-9/_-]*)['"]/g)) {
      const u = m[1];
      if (u.includes('[') || dynamic.test(u)) continue;
      if (!valid.has(u)) {
        if (!bad.has(u)) bad.set(u, new Set());
        bad.get(u).add(relative(ROOT, f));
      }
    }
  }
  if (bad.size === 0) ok(`internal links — all resolve (${valid.size} valid routes)`);
  else for (const [u, fs] of bad) fail('internal links', `${u}  ←  ${[...fs].join(', ')}`);
}

// ── 2. No invisible text — computed from this site's own tokens ─────────
{
  // Rather than guess, read the palette out of globals.css and compute real
  // contrast. `charcoal` is dark on one theme and near-white on the others,
  // so the same class pair is correct on one site and invisible on another.
  const css = read(join(ROOT, 'app/globals.css'));
  const tokens = new Map();
  for (const m of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})/g)) {
    tokens.set(m[1], m[2]);
  }

  const srgb = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  function lum(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  }
  function ratio(a, b) {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  }

  // 2.0 catches genuinely invisible text (the real bugs measured 1.10-1.12:1)
  // without flagging deliberate brand pairings like white on gold (2.29:1).
  const MIN = 2.0;
  const hits = [];
  const files = walk(join(ROOT, 'components'), /\.tsx$/).concat(walk(join(ROOT, 'app'), /\.tsx$/));
  for (const f of files) {
    read(f).split('\n').forEach((line, i) => {
      // Only consider bg/text pairs stated together in one class string.
      for (const cls of line.matchAll(/(?:className|Class)\s*=?\s*[{]?[`'"]([^`'"]+)[`'"]/g)) {
        // Split into real class tokens. Anything carrying a variant prefix
        // (hover:, sm:) or an opacity modifier (bg-white/10) describes a
        // different surface than the one the base text sits on.
        const toks = cls[1].split(/\s+/).filter((t) => !t.includes(':') && !t.includes('/') && !t.includes('['));
        const bgTok = toks.find((t) => t.startsWith('bg-'));
        const fgTok = toks.find((t) => t.startsWith('text-'));
        if (!bgTok || !fgTok) continue;
        const bg = [null, bgTok.slice(3)];
        const fg = [null, fgTok.slice(5)];
        const bgHex = tokens.get(bg[1]);
        const fgHex = tokens.get(fg[1]);
        if (!bgHex || !fgHex) continue; // not theme tokens (e.g. Tailwind defaults)
        const r = ratio(bgHex, fgHex);
        if (r < MIN) {
          hits.push(
            `${relative(ROOT, f)}:${i + 1} — text-${fg[1]} (${fgHex}) on bg-${bg[1]} (${bgHex}) = ${r.toFixed(2)}:1`
          );
        }
      }
    });
  }
  if (hits.length === 0) ok(`theme contrast — no token pair below ${MIN}:1`);
  else hits.forEach((h) => fail('theme contrast', h));
}

// ── 3. Every btn-* / card class used is actually defined ─────────────────
{
  const css = read(join(ROOT, 'app/globals.css'));
  const defined = new Set(
    [...css.matchAll(/^\s*\.([a-z][a-z0-9-]*)\s*[,{]/gm)].map((m) => m[1])
  );
  const used = new Set();
  for (const f of walk(join(ROOT, 'components'), /\.tsx$/).concat(walk(join(ROOT, 'app'), /\.tsx$/))) {
    for (const line of read(f).split('\n')) {
      // A class named in a comment is documentation, not usage.
      if (/^\s*(\/\/|\*|\/\*|\{\s*\/\*)/.test(line)) continue;
      for (const m of line.matchAll(/\b(btn-[a-z-]+|card-surface|section-padding|container-max)\b/g)) {
        used.add(m[1]);
      }
    }
  }
  const missing = [...used].filter((c) => !defined.has(c));
  if (missing.length === 0) ok(`utility classes — all ${used.size} defined in globals.css`);
  else missing.forEach((c) => fail('utility classes', `.${c} used but never defined — renders unstyled`));
}

// ── 4. Public pages are in the sitemap ───────────────────────────────────
{
  const sitemap = read(join(ROOT, 'app/sitemap.ts'));
  const shouldBeListed = [];
  for (const seg of readdirSync(join(ROOT, 'app'))) {
    if (seg.startsWith('[') || seg === 'api') continue;
    if (!existsSync(join(ROOT, 'app', seg, 'page.tsx'))) continue;
    if (['admin', 'metrics', 'quote', 'invoice', 'not-found'].includes(seg)) continue;
    shouldBeListed.push(seg);
  }
  const missing = shouldBeListed.filter((s) => !sitemap.includes(`/${s}\``) && !sitemap.includes(`/${s}'`));
  if (missing.length === 0) ok(`sitemap — all ${shouldBeListed.length} public pages listed`);
  else missing.forEach((s) => fail('sitemap', `/${s} has a page but is not in sitemap.ts`));
}

// ── 5. Page titles do not double the brand suffix ────────────────────────
{
  const layout = read(join(ROOT, 'app/layout.tsx'));
  const tpl = layout.match(/template:\s*'([^']+)'/);
  if (tpl) {
    const suffix = tpl[1].replace('%s', '').trim();
    const dupes = [];
    const brand = suffix.replace(/^\|\s*/, '').trim();

    // A nested layout that sets `title` as a plain string rather than as
    // { template, default } replaces the inherited template for its whole
    // subtree, so the root suffix never reaches those pages and they have to
    // carry the brand themselves. app/gallery/layout.tsx does exactly this.
    // Without this the check reports a fault on titles that are already right.
    function templateReaches(pageFile) {
      let dir = join(pageFile, '..');
      const appDir = join(ROOT, 'app');
      while (dir.startsWith(appDir) && dir !== appDir) {
        const lay = join(dir, 'layout.tsx');
        if (existsSync(lay)) {
          const l = read(lay);
          const t = l.match(/^\s*title:\s*(['"`])/m);
          if (t && !/title:\s*\{/.test(l)) return false;
        }
        dir = join(dir, '..');
      }
      return true;
    }

    for (const f of walk(join(ROOT, 'app'), /page\.tsx$/)) {
      // The root segment is exempt: title.template does not apply to it, so
      // app/page.tsx must repeat the brand. Checked separately in 5c.
      if (relative(ROOT, f) === 'app/page.tsx') continue;
      if (!templateReaches(f)) continue;
      const src = read(f);
      if (!brand) continue;

      // Strip comments first, so a comment that quotes the doubled title as an
      // explanation is not itself reported as the fault.
      let code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

      // Then remove openGraph/twitter blocks entirely. Their titles are
      // *required* to end with the brand — that is check 5b — so leaving them
      // in makes this check contradict its sibling. Brace-counted rather than
      // regex-matched, because these blocks nest.
      for (const key of ['openGraph', 'twitter']) {
        let at;
        while ((at = code.indexOf(`${key}:`)) !== -1) {
          const open = code.indexOf('{', at);
          if (open === -1) break;
          let depth = 0, end = open;
          for (let i = open; i < code.length; i++) {
            if (code[i] === '{') depth++;
            else if (code[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
          }
          if (end <= open) break;
          code = code.slice(0, at) + code.slice(end + 1);
        }
      }

      // The title may be a quoted string, a backtick template literal, or a
      // variable assigned earlier — the original check only understood the
      // first, which is how ~615 pages per site kept a doubled brand while
      // this test reported green.
      const seen = new Set();
      for (const m of code.matchAll(/(^|[^\w.])title:\s*(['"`])((?:\\.|(?!\2)[\s\S])*)\2/g)) {
        seen.add(m[3]);
      }
      for (const m of code.matchAll(/(^|[^\w.])title:\s*([A-Za-z_$][\w$]*)\s*[,\n]/g)) {
        const varName = m[2];
        // Only the page title matters here; social titles are checked in 5b and
        // are *required* to carry the brand.
        const assign = code.match(
          new RegExp(`\\b(?:const|let|var)\\s+${varName}\\s*=\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1`)
        );
        if (assign) seen.add(assign[2]);
      }

      for (const raw of seen) {
        // A template literal ends with the brand even with ${...} earlier in it.
        if (raw.trim().endsWith(brand)) {
          dupes.push(`${relative(ROOT, f)} — "${raw.trim().slice(-70)}" already ends with the layout suffix`);
          break;
        }
      }
    }
    if (dupes.length === 0) ok('page titles — no duplicated brand suffix');
    else dupes.forEach((d) => fail('page titles', d));
  }
}

// ── 5b. Social titles DO carry the brand ─────────────────────────────────
{
  // openGraph/twitter titles are shown standalone in shares — the layout
  // template never applies to them, so they must name the business.
  const bare = [];
  for (const f of walk(join(ROOT, 'app'), /page\.tsx$/)) {
    const src = read(f);
    for (const m of src.matchAll(/(openGraph|twitter):\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g)) {
      const t = m[0].match(/title:\s*'([^']+)'/);
      if (t && !t[1].includes(SITE.shortName)) {
        bare.push(`${relative(ROOT, f)} — ${m[1]} title "${t[1]}" does not name the business`);
      }
    }
  }
  if (bare.length === 0) ok('social titles — all name the business');
  else bare.forEach((b) => fail('social titles', b));
}

// ── 5c. The homepage title must name the business ────────────────────────
{
  // Next.js does not apply the root layout's title.template to the root
  // segment, so app/page.tsx must carry the brand itself. Stripping it here
  // silently removes the business name from the most important title on the
  // site — it happened once and shipped.
  const home = read(join(ROOT, 'app/page.tsx'));
  const m = home.match(/export const metadata[\s\S]*?title:\s*['"]([^'"]+)['"]/);
  if (!m) {
    fail('homepage title', 'no metadata title found in app/page.tsx');
  } else if (!m[1].includes(SITE.shortName)) {
    fail('homepage title', `"${m[1]}" does not name the business — the layout template does not apply to the root segment`);
  } else {
    ok('homepage title — names the business');
  }
}

// ── 6. Canonical host matches this site ──────────────────────────────────
{
  const layout = read(join(ROOT, 'app/layout.tsx'));
  const m = layout.match(/const siteUrl = '([^']+)'/);
  if (!m) fail('canonical', 'no siteUrl found in app/layout.tsx');
  else if (!m[1].includes(SITE.domain)) fail('canonical', `siteUrl is ${m[1]}, expected ${SITE.domain}`);
  else ok(`canonical — siteUrl is ${m[1]}`);

  if (/hrefLang/.test(layout)) {
    fail('hreflang', 'hardcoded hrefLang in layout points every page at one URL — remove it');
  } else ok('hreflang — no hardcoded alternate');
}

// ── Report ────────────────────────────────────────────────────────────────
console.log(`\nSanity — ${SITE.shortName} (${SITE.domain})\n`);
for (const p of passes) console.log(`  ✓ ${p}`);
if (failures.length) {
  console.error('');
  for (const f of failures) console.error(`  ✗ [${f.check}] ${f.detail}`);
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}
console.log(`\nAll ${passes.length} checks passed.\n`);
