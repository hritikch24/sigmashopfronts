#!/usr/bin/env node
/**
 * Sanity checks on the BUILT site (.next/server/app). Run after `next build`.
 *
 *   node --import ./tests/ts-paths.mjs tests/sanity.test.mjs
 *
 * Each check exists because the failure it catches has happened on this site
 * or one of the sites it used to share code with.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { SITE_URL } from '@/lib/site';
import { PUBLIC_PATHS } from '@/app/sitemap';
import { classify, LEGACY_CITIES, LEGACY_SERVICES, LEGACY_BLOG, MOVED } from '@/lib/legacy-urls';

const ROOT = process.cwd();
const APP = join(ROOT, '.next', 'server', 'app');
const problems = [];
const bad = (m) => problems.push(m);

function walk(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

if (!existsSync(APP)) {
  console.error('No build at .next/server/app — run next build first.');
  process.exit(1);
}

/* ── load built public pages ────────────────────────────────────────── */
const pages = new Map();
for (const f of walk(APP)) {
  if (!f.endsWith('.html')) continue;
  const rel = relative(APP, f).replace(/\.html$/, '');
  if (/^(_not-found|_global-error|404|500|admin|metrics)/.test(rel)) continue;
  pages.set(rel === 'index' ? '/' : `/${rel}`, readFileSync(f, 'utf8'));
}

/* 1. every sitemap path is a built page, and no legacy pattern is in it */
for (const p of PUBLIC_PATHS) {
  if (!pages.has(p)) bad(`sitemap path not built: ${p}`);
  if (/^\/(services|areas|blog|towns)\b/.test(p)) bad(`legacy pattern in sitemap: ${p}`);
}
for (const p of pages.keys()) if (!PUBLIC_PATHS.includes(p)) bad(`built page missing from sitemap list: ${p}`);

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

const titles = new Map();
const descriptions = new Map();
const KNOWN_ROUTES = new Set([...pages.keys(), '/llms.txt', '/robots.txt', '/sitemap.xml', '/manifest.webmanifest']);

for (const [path, html] of pages) {
  /* 2. exactly one canonical, pointing at itself */
  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  const expect = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  if (canon.length !== 1) bad(`${path}: ${canon.length} canonical tags`);
  else if (canon[0] !== expect) bad(`${path}: canonical ${canon[0]} ≠ ${expect}`);

  /* 3. robots meta present and consistent with the indexing switch */
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  if (process.env.SIGMA_INDEXING !== 'on' && !/noindex/.test(robots)) bad(`${path}: indexable while the site is held (robots="${robots}")`);

  /* 4. unique titles and descriptions; brand not doubled */
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  if (!title) bad(`${path}: no <title>`);
  if ((title.match(/Sigma Shopfronts/g) ?? []).length > 1) bad(`${path}: brand doubled in title "${title}"`);
  if (!desc) bad(`${path}: no meta description`);
  // What Google shows before it cuts the snippet off (lib/seo.ts trims to fit).
  const shown = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
  if (shown(title).length > 60) bad(`${path}: title ${shown(title).length} chars (max 60) "${title}"`);
  if (shown(desc).length > 160) bad(`${path}: description ${shown(desc).length} chars (max 160)`);
  if (titles.has(title)) bad(`${path}: duplicate title with ${titles.get(title)}`);
  if (descriptions.has(desc)) bad(`${path}: duplicate description with ${descriptions.get(desc)}`);
  titles.set(title, path);
  descriptions.set(desc, path);

  /* 5. internal links resolve to a built page */
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1].replace(/\/$/, '') || '/';
    if (href.startsWith('/_next') || href.startsWith('/assets/') || href.startsWith('/api/') || /\.(ico|png|jpe?g|mp4|webmanifest)$/.test(href)) continue;
    if (!KNOWN_ROUTES.has(href)) bad(`${path}: dead internal link ${href}`);
  }

  /* 6. nothing fabricated, no upgraded promise */
  const t = text(html);
  const FABRICATION = [
    [/aggregateRating|reviewCount|ratingValue/i, 'rating markup'],
    [/\b\d+\+?\s*years?\s+(of\s+)?(experience|trading|in (the )?(business|trade))/i, 'years of experience'],
    [/\b(established|trading)\s+(in|since)\s+(19|20)\d\d/i, 'founding claim'],
    [/\b(hundreds|thousands|\d{2,})\s+(of\s+)?(happy\s+)?(customers|clients|projects|installations|shopfronts fitted)/i, 'project/customer count'],
    [/\b(5|five)[- ]star\b|★/i, 'star rating'],
    [/\baward[- ]winning\b|\baccredited\b|\bapproved installer\b/i, 'accreditation claim'],
    // Same-day emergency call-outs were confirmed by the owner on 11 Oct 2026; round-the-clock cover was not.
    [/24\/7|24[- ]hours? a day|round[- ]the[- ]clock/i, 'round-the-clock claim'],
    [/\b(attend|arrive|on site|be with you)\s+within\s+(two|2)\s+hours?/i, 'attendance promise (the promise is a reply)'],
    [/\bguarantee(d)?\b/i, 'guarantee'],
  ];
  for (const [re, what] of FABRICATION) if (re.test(t)) bad(`${path}: ${what} — "${t.match(re)[0]}"`);

  /* 6b. plain English where customers read: many speak English as a second language */
  if (/^\/($|shopfronts|repair-radius|costs|enquire|company|questions|jobs)/.test(path)) {
    const main = (html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<\/(p|li|h[1-6]|dd|dt|summary|figcaption|td|th|div|span|strong|a|label|button)>/g, '. ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/g, ' ');
    const HARD = /\b(quotations?|indicative|premises|frontages?|enquiry|enquiries|specification|utilis\w*|commenc\w*|prior to|in order to|duty cycle)\b/i;
    if (HARD.test(main)) bad(`${path}: hard word "${main.match(HARD)[0]}" — use an everyday word (CLAUDE.md, Plain English)`);
    for (const s of main.split(/[.!?:;]+\s/)) {
      const n = s.trim().split(/\s+/).length;
      if (n > 32) bad(`${path}: ${n}-word sentence — split it: "${s.trim().slice(0, 80)}…"`);
    }
  }

  /* 7. JSON-LD parses; no ratings; only our own sameAs */
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let ld;
    try {
      ld = JSON.parse(m[1]);
    } catch {
      bad(`${path}: JSON-LD does not parse`);
      continue;
    }
    const s = JSON.stringify(ld);
    if (/aggregateRating|"review"/i.test(s)) bad(`${path}: rating/review in JSON-LD`);
    for (const u of ld.sameAs ?? []) if (!/^https:\/\/www\.instagram\.com\/sigmashopfrontsuk\/$/.test(u)) bad(`${path}: unexpected sameAs ${u}`);
    if (/#hss-/.test(s)) bad(`${path}: another site’s @id scheme`);
  }

  /* 8. images have alt text */
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]+"/.test(m[0])) bad(`${path}: image without alt — ${m[0].slice(0, 80)}`);
}

/* 9. no shared or retired tracking IDs anywhere in the source */
const SRC = ['app', 'components', 'lib', 'data', 'scripts', 'proxy.ts', 'next.config.ts', 'vercel.json']
  .flatMap((d) => (existsSync(join(ROOT, d)) ? (statSync(join(ROOT, d)).isDirectory() ? walk(join(ROOT, d)) : [join(ROOT, d)]) : []))
  .filter((f) => /\.(tsx?|mjs|js|css|md|txt)$|vercel\.json$/.test(f));
const RETIRED = ['AW-16801337867', 'AW-18391927258', 'TcCuCK3Jk7IcEIukwMs', '7ce4a41892d54f238305d3a7ae5af32c'];
for (const f of SRC) {
  const s = readFileSync(f, 'utf8');
  for (const id of RETIRED) if (s.includes(id)) bad(`${relative(ROOT, f)}: retired/shared identifier ${id}`);
}

/* 10. logo and icon files byte-identical to the ones on main (pinned in tests/logo-hashes.json) */
const pinned = JSON.parse(readFileSync(join(ROOT, 'tests', 'logo-hashes.json'), 'utf8')).files;
const LOGOS = Object.keys(pinned);
for (const f of LOGOS) {
  const now = existsSync(join(ROOT, f)) ? createHash('sha256').update(readFileSync(join(ROOT, f))).digest('hex') : 'missing';
  if (pinned[f] !== now) bad(`logo changed: ${f}`);
}
if (LOGOS.length < 12) bad(`expected the full logo/icon set, found ${LOGOS.length}`);

/* 11. legacy URLs: every matrix page 410, every kept page a single 301 */
let matrix = 0;
for (const svc of LEGACY_SERVICES) {
  for (const city of LEGACY_CITIES) {
    matrix++;
    if (classify(`/services/${svc}/${city}`).kind !== 'gone') bad(`matrix page not 410: /services/${svc}/${city}`);
  }
}
if (matrix !== 574) bad(`expected 574 matrix URLs, enumerated ${matrix}`);
for (const b of LEGACY_BLOG) if (classify(`/blog/${b}`).kind !== 'gone') bad(`blog post not 410: ${b}`);
for (const [from, to] of MOVED) {
  if (!pages.has(to)) bad(`301 target not built: ${from} → ${to}`);
  if (MOVED.has(to) && MOVED.get(to) !== to) bad(`redirect chain: ${from} → ${to} → ${MOVED.get(to)}`);
}
for (const c of LEGACY_CITIES) {
  const o = classify(`/areas/${c}`);
  if (o.kind !== 'moved' && o.kind !== 'gone') bad(`/areas/${c} neither moved nor gone`);
}
for (const p of ['/about', '/contact', '/cost-guide', '/faq', '/glossary', '/privacy-policy', '/terms']) {
  if (classify(p).kind !== 'moved') bad(`kept page not mapped: ${p}`);
}
// Every page in the old WordPress .co.uk sitemap, as it was published (trailing slash).
const WORDPRESS_PAGES = [
  'about-us', 'contact-us', 'aluminium-shopfronts', 'roller-shutters', 'security-doors', 'automatic-doors', 'bi-fold-doors',
  'fire-doors', 'shopfront-repairs', 'emergency-callout', 'roller-shutter-repair', 'emergency-shutter-repair',
  'shutter-motor-replacement', 'electric-roller-shutters', 'emergency-roller-shutter-repairs-24-7',
  'roller-shutter-installation', 'manual-to-electric-shutter-conversion', 'shutter-servicing-and-maintenance',
  'industrial-shutters', 'security-shutters', 'upvc-door', 'composite-door', 'house-window-installed',
];
for (const w of WORDPRESS_PAGES) {
  const o = classify(`/${w}/`);
  if (o.kind !== 'moved' && o.kind !== 'gone') bad(`WordPress page neither moved nor gone: /${w}/`);
}
for (const p of ['/wp-sitemap.xml', '/elementor-hf/header/', '/author/admin/', '/feed/']) {
  if (classify(p).kind !== 'gone') bad(`WordPress machinery not 410: ${p}`);
}

/* ── report ─────────────────────────────────────────────────────────── */
if (problems.length) {
  console.error(`✗ sanity: ${problems.length} problem(s) across ${pages.size} pages`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ sanity: ${pages.size} pages — canonicals, titles, links, claims, JSON-LD, alt text, logos (${LOGOS.length} files byte-identical), 574 matrix URLs → 410, ${MOVED.size} one-to-one 301s`);
