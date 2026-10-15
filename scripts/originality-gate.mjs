#!/usr/bin/env node
/**
 * Originality gate: 8-gram shingle overlap, per built page.
 *
 *   node scripts/originality-gate.mjs             measure .next output, fail over the limit
 *   node scripts/originality-gate.mjs --snapshot  refresh the sibling fingerprints
 *   node scripts/originality-gate.mjs --json      print the result as JSON (for check-portfolio)
 *
 * For every prerendered page it takes the visible text inside <main>, splits
 * it into overlapping 8-word sequences ("shingles"), and reports what share of
 * them also appear:
 *   (a) in each sibling site's copy, and in all four together;
 *   (b) on any single other page of this site (the worst pair).
 * Anything above LIMIT fails the build. Numbers are rounded UP to one decimal
 * in the report, so a page never looks better than it is.
 *
 * Header and footer sit outside <main> and are identical on every page by
 * design, so they are excluded from (b); they are still compared with the
 * siblings through the whole-page check at the end. Enquiry forms inside
 * <main> are the same interface on every page that carries one, so they are
 * left out of (a) and (b) the same way, and kept in the whole-page check.
 *
 * Sibling copy comes from the sibling repos on this machine when they are
 * present (read-only). On a build server they are not, so the gate falls back
 * to `scripts/sibling-shingles.json`: hashed shingles only, no sibling prose,
 * refreshed with --snapshot whenever a sibling changes.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LIMIT = 20;
const N = 8;
const SNAPSHOT = join(ROOT, 'scripts', 'sibling-shingles.json');
const REPORT = join(ROOT, 'docs', 'relaunch', 'originality-report.md');
const SELF = 'sigma';
const REGISTRY = process.env.PORTFOLIO_REGISTRY ?? join(homedir(), 'Projects', 'seo-plan', 'portfolio-registry.json');
const expand = (p) => (p.startsWith('~/') ? join(homedir(), p.slice(2)) : p);

/**
 * The other sites, read from the portfolio registry rather than named here —
 * this repo must not contain another site's name, even in tooling.
 */
function siblingRepos() {
  if (!existsSync(REGISTRY)) return null;
  const reg = JSON.parse(readFileSync(REGISTRY, 'utf8'));
  return Object.fromEntries(reg.sites.filter((s) => s.key !== SELF && s.repo).map((s) => [s.key, expand(s.repo)]));
}

/* ── text → shingles ─────────────────────────────────────────────────── */

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function shingles(text) {
  const w = norm(text).split(' ').filter(Boolean);
  const out = new Set();
  for (let i = 0; i + N <= w.length; i++) out.add(w.slice(i, i + N).join(' '));
  return out;
}

/** FNV-1a, 32-bit: enough to fingerprint shingles without storing words. */
function fnv(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

const pct = (hit, total) => (total ? (hit / total) * 100 : 0);
const up1 = (x) => (Math.ceil(x * 10) / 10).toFixed(1);

/* ── sibling copy ────────────────────────────────────────────────────── */

const SKIP = new Set(['node_modules', '.next', '.git', '.vercel', 'out', 'coverage', 'tests', 'scripts', 'prisma', 'db', 'docs']);
const CODE = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);
const PROSE = new Set(['.md', '.mdx', '.txt', '.html', '.htm']);

function walk(dir, acc = []) {
  let names = [];
  try {
    names = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const n of names) {
    if (SKIP.has(n)) continue;
    const p = join(dir, n);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const looksLikeCode = (s) => (s.match(/[{}();=<>]|\$\{|=>/g) ?? []).length > 2;

/** The customer-facing words in a repo: string literals, JSX text, prose files. */
function repoCopy(repo) {
  const parts = [];
  for (const f of walk(repo)) {
    const ext = extname(f).toLowerCase();
    const rel = relative(repo, f);
    if (!rel.includes(sep) && /\.mdx?$/i.test(rel)) continue; // README, CLAUDE.md
    if (!CODE.has(ext) && !PROSE.has(ext)) continue;
    const raw = readFileSync(f, 'utf8');
    if (PROSE.has(ext)) {
      parts.push(raw.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '));
      continue;
    }
    for (const m of raw.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
      const s = m[1] ?? m[2] ?? m[3] ?? '';
      if (s.trim().split(/\s+/).length < 5 || looksLikeCode(s)) continue;
      parts.push(s);
    }
    for (const m of raw.matchAll(/>([^<>{}]*[A-Za-z]{3,}[^<>{}]*)</g)) if (!looksLikeCode(m[1])) parts.push(m[1]);
  }
  return parts.join('\n');
}

function siblingFingerprints() {
  const repos = siblingRepos();
  const live = {};
  let allLive = Boolean(repos) && Object.keys(repos).length > 0;
  for (const [key, repo] of Object.entries(repos ?? {})) {
    if (!existsSync(repo)) {
      allLive = false;
      continue;
    }
    live[key] = new Set([...shingles(repoCopy(repo))].map(fnv));
  }
  if (allLive) return { source: 'sibling repos (live)', sets: live };
  if (existsSync(SNAPSHOT)) {
    const snap = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
    const sets = {};
    for (const [key, list] of Object.entries(snap.sets)) sets[key] = new Set(list);
    return { source: `snapshot of ${snap.taken}`, sets };
  }
  throw new Error('No sibling repos found and no snapshot at scripts/sibling-shingles.json. Run with --snapshot on a machine that has them.');
}

if (process.argv.includes('--snapshot')) {
  const { sets, source } = siblingFingerprints();
  if (!source.startsWith('sibling repos')) throw new Error('Snapshot needs all four sibling repos present.');
  const out = { taken: new Date().toISOString().slice(0, 10), sets: {} };
  for (const [k, s] of Object.entries(sets)) out.sets[k] = [...s].sort((a, b) => a - b);
  writeFileSync(SNAPSHOT, JSON.stringify(out));
  console.log(`Snapshot written: ${Object.entries(out.sets).map(([k, v]) => `${k} ${v.length}`).join(', ')}`);
  process.exit(0);
}

/* ── this site's built pages ─────────────────────────────────────────── */

const APP = join(ROOT, '.next', 'server', 'app');
if (!existsSync(APP)) {
  console.error('No build output at .next/server/app. Run next build first.');
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));

function visibleText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<template[\s\S]*?<\/template>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  );
}

const pages = [];
function statusOf(html) {
  try {
    return JSON.parse(readFileSync(html.replace(/\.html$/, '.meta'), 'utf8')).status ?? 200;
  } catch {
    return 200;
  }
}

for (const f of walk(APP)) {
  if (!f.endsWith('.html')) continue;
  const rel = relative(APP, f).replace(/\\/g, '/').replace(/\.html$/, '');
  if (/^(_not-found|_global-error|404|500)$/.test(rel)) continue;
  // A route held back with notFound() prerenders as a 404, not a page.
  if (statusOf(f) === 404) continue;
  if (/^(admin|metrics|quote|invoice)(\/|$)/.test(rel)) continue;
  const html = readFileSync(f, 'utf8');
  const main = (html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '').replace(/<form[\s\S]*?<\/form>/gi, ' ');
  const path = rel === 'index' ? '/' : `/${rel}`;
  pages.push({ path, main: shingles(visibleText(main)), whole: shingles(visibleText(html)) });
}
pages.sort((a, b) => a.path.localeCompare(b.path));

/* ── measure ─────────────────────────────────────────────────────────── */

const { source, sets } = siblingFingerprints();
const sibKeys = Object.keys(sets);
const rows = [];

for (const p of pages) {
  const hashes = [...p.main].map(fnv);
  const bySib = {};
  let anyHit = 0;
  for (const h of hashes) {
    let hit = false;
    for (const k of sibKeys) {
      if (sets[k]?.has(h)) {
        bySib[k] = (bySib[k] ?? 0) + 1;
        hit = true;
      }
    }
    if (hit) anyHit++;
  }
  let worstInternal = 0;
  let worstWith = '—';
  for (const q of pages) {
    if (q === p || !p.main.size) continue;
    let h = 0;
    for (const s of p.main) if (q.main.has(s)) h++;
    const v = pct(h, p.main.size);
    if (v > worstInternal) {
      worstInternal = v;
      worstWith = q.path;
    }
  }
  const sib = Object.fromEntries(sibKeys.map((k) => [k, pct(bySib[k] ?? 0, p.main.size)]));
  const sibAll = pct(anyHit, p.main.size);
  rows.push({ path: p.path, shingles: p.main.size, sib, sibAll, worstInternal, worstWith });
}

// Whole-page check against siblings, chrome included.
const wholeHits = pages.map((p) => {
  const hashes = [...p.whole].map(fnv);
  let hit = 0;
  for (const h of hashes) if (sibKeys.some((k) => sets[k]?.has(h))) hit++;
  return { path: p.path, v: pct(hit, p.whole.size) };
});

const failures = rows.filter((r) => r.sibAll > LIMIT || r.worstInternal > LIMIT || !r.shingles);
const chromeFail = wholeHits.filter((w) => w.v > LIMIT);

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ limit: LIMIT, source, pages: rows, whole: wholeHits, failures: failures.map((f) => f.path) }));
  process.exit(failures.length || chromeFail.length ? 1 : 0);
}

/* ── report ──────────────────────────────────────────────────────────── */

const head = `| Page | 8-grams | ${sibKeys.join(' | ')} | all siblings | worst internal | against |`;
const line = `|---|---:|${sibKeys.map(() => '---:').join('|')}|---:|---:|---|`;
const body = rows
  .map(
    (r) =>
      `| \`${r.path}\` | ${r.shingles} | ${sibKeys.map((k) => up1(r.sib[k])).join(' | ')} | **${up1(r.sibAll)}** | **${up1(r.worstInternal)}** | \`${r.worstWith}\` |`,
  )
  .join('\n');
const maxSib = Math.max(0, ...rows.map((r) => r.sibAll));
const maxInt = Math.max(0, ...rows.map((r) => r.worstInternal));
const maxWhole = Math.max(0, ...wholeHits.map((w) => w.v));

const report = `# Originality report

Generated ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC by \`scripts/originality-gate.mjs\`.

Method: 8-word shingles of the visible text inside \`<main>\` on every prerendered public page.
Sibling copy source: ${source}. Limit: **${LIMIT}%**. Figures are percentages of the page's own
shingles, rounded **up** to one decimal.

- Pages measured: **${rows.length}**
- Worst page against the siblings (all four combined): **${up1(maxSib)}%**
- Worst page against any other page on this site: **${up1(maxInt)}%**
- Worst whole page including header and footer, against the siblings: **${up1(maxWhole)}%**
- Result: **${failures.length || chromeFail.length ? `FAIL (${[...failures.map((f) => f.path), ...chromeFail.map((c) => `${c.path} (whole page)`)].join(', ')})` : 'PASS'}**

${head}
${line}
${body}
`;
mkdirSync(dirname(REPORT), { recursive: true });
writeFileSync(REPORT, report);

console.log(`Originality gate — ${rows.length} pages, limit ${LIMIT}% (siblings: ${source})`);
console.log(`  worst vs siblings: ${up1(maxSib)}%   worst internal: ${up1(maxInt)}%   worst whole page: ${up1(maxWhole)}%`);
for (const f of failures) {
  console.log(`  ✗ ${f.path}: siblings ${up1(f.sibAll)}%, internal ${up1(f.worstInternal)}% (vs ${f.worstWith})${f.shingles ? '' : ' — no <main> text found'}`);
}
for (const c of chromeFail) console.log(`  ✗ ${c.path}: whole page ${up1(c.v)}% against siblings`);
console.log(`  report: ${relative(ROOT, REPORT)}`);
process.exit(failures.length || chromeFail.length ? 1 : 0);
