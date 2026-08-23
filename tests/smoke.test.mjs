#!/usr/bin/env node
/**
 * Post-deploy smoke test. Hits the LIVE site over HTTPS.
 *
 *   node tests/smoke.test.mjs                    # or: npm run test:smoke
 *   BASE_URL=https://preview.example npm run test:smoke
 *
 * Run this after every deploy. It is deliberately fast (~30s) and checks the
 * things that, when broken, cost real money: pages returning errors, the
 * quote form failing, canonicals pointing at the wrong host, and the sitemap
 * shrinking.
 *
 * Exit code 0 = all good, 1 = something is broken in production.
 */

import { SITE } from './site-config.mjs';

const BASE = (process.env.BASE_URL || SITE.origin).replace(/\/$/, '');
const results = [];
let failed = 0;

function record(name, pass, detail) {
  results.push({ name, pass, detail });
  if (!pass) failed++;
}

async function get(path, opts = {}) {
  const res = await fetch(BASE + path, { redirect: 'follow', ...opts });
  const body = opts.method === 'HEAD' ? '' : await res.text();
  return { status: res.status, body, url: res.url };
}

// ── 1. Core pages return 200 ─────────────────────────────────────────────
const CORE_PAGES = [
  '/', '/services', '/areas', '/about', '/contact', '/gallery',
  '/faq', '/cost-guide', '/reviews', '/blog', '/glossary',
  '/why-choose-us', '/instant-quote', '/terms', '/privacy-policy',
  '/services/roller-shutters',
  '/areas/london',
  '/services/roller-shutters/london',
];

for (const path of CORE_PAGES) {
  try {
    const { status } = await get(path);
    record(`page ${path}`, status === 200, `HTTP ${status}`);
  } catch (e) {
    record(`page ${path}`, false, e.message);
  }
}

// ── 2. Every page self-canonicalises to this host ────────────────────────
for (const path of ['/', '/services/roller-shutters', '/areas/london', '/instant-quote']) {
  try {
    const { body } = await get(path);
    const m = body.match(/<link rel="canonical" href="([^"]+)"/);
    const expected = BASE + (path === '/' ? '' : path);
    record(
      `canonical ${path}`,
      !!m && m[1].replace(/\/$/, '') === expected.replace(/\/$/, ''),
      m ? m[1] : 'no canonical tag'
    );
  } catch (e) {
    record(`canonical ${path}`, false, e.message);
  }
}

// ── 3. No sibling branding rendered anywhere ─────────────────────────────
{
  const others = ['grewal', 'sigmashopfronts', 'urbanshopfronts']
    .filter((o) => !SITE.domain.includes(o) && !SITE.shortName.toLowerCase().includes(o));
  try {
    const { body } = await get('/');
    const leaks = others.filter((o) => body.toLowerCase().includes(o));
    record('no sibling branding on homepage', leaks.length === 0, leaks.join(', ') || 'clean');
  } catch (e) {
    record('no sibling branding on homepage', false, e.message);
  }
}

// ── 4. Title is not doubled ──────────────────────────────────────────────
for (const path of ['/', '/cost-guide', '/glossary', '/terms']) {
  try {
    const { body } = await get(path);
    const m = body.match(/<title>([^<]*)<\/title>/);
    const title = m ? m[1] : '';
    // Count occurrences of the business name in the tab title.
    const needle = SITE.shortName.toLowerCase();
    const count = title.toLowerCase().split(needle).length - 1;
    record(`title ${path}`, count <= 1, count > 1 ? `brand appears ${count}× — "${title}"` : title.slice(0, 70));
  } catch (e) {
    record(`title ${path}`, false, e.message);
  }
}

// ── 5. Sitemap is present and has not collapsed ──────────────────────────
{
  try {
    const { status, body } = await get('/sitemap.xml');
    const count = (body.match(/<loc>/g) || []).length;
    record('sitemap reachable', status === 200, `HTTP ${status}`);
    record('sitemap size', count >= 500, `${count} URLs (expect 500+)`);
    record('sitemap host', !body.includes('grewal') || SITE.key === 'grewal', 'no foreign host');
  } catch (e) {
    record('sitemap', false, e.message);
  }
}

// ── 6. robots.txt points at this site's sitemap ──────────────────────────
{
  try {
    const { status, body } = await get('/robots.txt');
    record('robots.txt', status === 200 && body.includes(SITE.domain), `HTTP ${status}`);
  } catch (e) {
    record('robots.txt', false, e.message);
  }
}

// ── 7. Instant estimate API works end to end ─────────────────────────────
{
  try {
    // Validation path only — deliberately incomplete so no lead is created.
    const res = await fetch(`${BASE}/api/instant-quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'smoke-test' }),
    });
    const data = await res.json();
    record(
      'instant-quote API validates',
      res.status === 400 && data.success === false,
      `HTTP ${res.status} — ${data.error ?? ''}`.slice(0, 80)
    );
  } catch (e) {
    record('instant-quote API validates', false, e.message);
  }
}

// ── 8. Admin surfaces stay locked ────────────────────────────────────────
for (const path of ['/api/metrics?days=7', '/api/admin/documents?type=quote']) {
  try {
    const { status } = await get(path);
    record(`locked ${path.split('?')[0]}`, status === 401, `HTTP ${status} (expect 401)`);
  } catch (e) {
    record(`locked ${path.split('?')[0]}`, false, e.message);
  }
}
{
  try {
    const { status } = await get('/metrics');
    record('locked /metrics', status === 404, `HTTP ${status} (expect 404 without key)`);
  } catch (e) {
    record('locked /metrics', false, e.message);
  }
}

// ── 9. Key conversion paths present on the homepage ──────────────────────
{
  try {
    const { body } = await get('/');
    record('homepage links to /instant-quote', body.includes('href="/instant-quote"'), '');
    record('homepage shows own phone', body.includes(SITE.phoneDisplay) || body.includes(SITE.phoneTel), SITE.phoneDisplay);
  } catch (e) {
    record('homepage conversion paths', false, e.message);
  }
}

// ── Report ────────────────────────────────────────────────────────────────
console.log(`\nSmoke — ${SITE.shortName}  ${BASE}\n`);
for (const r of results) {
  const mark = r.pass ? '✓' : '✗';
  const line = `  ${mark} ${r.name}`;
  if (r.pass) console.log(r.detail ? `${line}  —  ${r.detail}` : line);
  else console.error(`${line}  —  ${r.detail}`);
}
console.log('');
if (failed) {
  console.error(`${failed} of ${results.length} checks FAILED.\n`);
  process.exit(1);
}
console.log(`All ${results.length} checks passed.\n`);
