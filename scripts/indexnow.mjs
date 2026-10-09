#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex and others) about every public page.
 * Run once after launch and after significant content changes:
 *   SIGMA_INDEXNOW_KEY=... node --import ./tests/ts-paths.mjs scripts/indexnow.mjs
 * The same key must be set in Vercel so /indexnow.txt serves it.
 * Google does not use IndexNow; use Search Console for Google.
 */
import { SITE_URL, SITE_HOST } from '@/lib/site';
import { PUBLIC_PATHS } from '@/app/sitemap';

const key = process.env.SIGMA_INDEXNOW_KEY?.trim();
if (!key) {
  console.error('Set SIGMA_INDEXNOW_KEY (the same value as in Vercel).');
  process.exit(1);
}
const live = await fetch(`${SITE_URL}/indexnow.txt`).then((r) => (r.ok ? r.text() : ''), () => '');
if (live.trim() !== key) {
  console.error(`${SITE_URL}/indexnow.txt does not serve this key yet — deploy with SIGMA_INDEXNOW_KEY set first.`);
  process.exit(1);
}
const urlList = PUBLIC_PATHS.map((p) => (p === '/' ? SITE_URL : `${SITE_URL}${p}`));
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: SITE_HOST, key, keyLocation: `${SITE_URL}/indexnow.txt`, urlList }),
});
console.log(`IndexNow: ${r.status} for ${urlList.length} URLs`);
process.exit(r.ok ? 0 : 1);
