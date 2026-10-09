#!/usr/bin/env node
/**
 * Every external URL the built site links to, plus every sameAs profile, must
 * return 200. Network test — run before launch and after content changes.
 *   node --import ./tests/ts-paths.mjs tests/links.test.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { organisation } from '@/lib/seo';

const APP = join(process.cwd(), '.next', 'server', 'app');
const walk = (d, a = []) => (readdirSync(d).forEach((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n), a) : a.push(join(d, n)))), a);

const urls = new Set(organisation().sameAs);
for (const f of walk(APP)) {
  if (!f.endsWith('.html')) continue;
  for (const m of readFileSync(f, 'utf8').matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const u = m[1].replace(/&amp;/g, '&');
    if (/sigmashopfrontshutters\.co\.uk|wa\.me\//.test(u)) continue; // own site; wa.me is an app link
    urls.add(u);
  }
}
// The frontage check's sources render client-side; include every cited document.
const { authorities, grants } = await import('@/data/authorities');
for (const a of authorities) for (const d of a.documents) urls.add(d.url);
for (const g of grants) urls.add(g.url);

// Some council CDNs answer one browser string with a 202 challenge and the other with the file.
const UAS = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36', 'Mozilla/5.0 (Macintosh) link-check'];
const results = await Promise.all(
  [...urls].map(async (u) => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const r = await fetch(u, { redirect: 'follow', headers: { 'user-agent': UAS[attempt] }, signal: AbortSignal.timeout(45_000) });
        r.body?.cancel();
        if (r.status === 200 || attempt === 1) return { u, s: r.status };
      } catch (e) {
        if (attempt === 1) return { u, s: String(e.cause?.code ?? e.name) };
      }
    }
  }),
);
const bad = results.filter((r) => r.s !== 200);
for (const r of results.sort((a, b) => String(a.s).localeCompare(String(b.s)))) console.log(`${r.s === 200 ? '✓' : '✗'} ${r.s}  ${r.u}`);
console.log(`\n${results.length} external URLs, ${bad.length} not returning 200`);
process.exit(bad.length ? 1 : 0);
