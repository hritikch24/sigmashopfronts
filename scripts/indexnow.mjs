#!/usr/bin/env node
/**
 * Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 * Run after a deploy so the crawlers are pointed at the current content:
 *   npm run indexnow
 *
 * The key file must be reachable at https://<host>/<key>.txt — it already is.
 */

const HOST = 'www.sigmashopfronts.com';
const KEY = '7ce4a41892d54f238305d3a7ae5af32c';
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10000; // IndexNow's documented per-request maximum

async function getSitemapUrls() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`Could not fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urlList) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  // 200 = accepted, 202 = accepted but key validation still pending.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow rejected the batch: HTTP ${res.status} ${await res.text()}`);
  }
  return res.status;
}

const urls = await getSitemapUrls();
console.log(`Found ${urls.length} URLs in ${SITEMAP}`);

for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const batch = urls.slice(i, i + BATCH_SIZE);
  const status = await submit(batch);
  console.log(`Submitted ${batch.length} URLs — HTTP ${status}`);
}

console.log('Done.');
