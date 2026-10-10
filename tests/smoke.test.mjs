#!/usr/bin/env node
/**
 * Live checks against PRODUCTION. Only meaningful once the new domain is live.
 *   node tests/smoke.test.mjs [origin]
 */
const NEW = process.argv[2] ?? 'https://www.sigmashopfrontshutters.co.uk';
const OLD = 'https://www.sigmashopfronts.com';
const fails = [];
const check = async (label, url, expect, opts = {}) => {
  try {
    const r = await fetch(url, { redirect: 'manual', ...opts });
    const ok = typeof expect === 'function' ? await expect(r) : r.status === expect;
    console.log(`${ok ? '✓' : '✗'} ${label} (${r.status}${r.headers.get('location') ? ' → ' + r.headers.get('location') : ''})`);
    if (!ok) fails.push(label);
  } catch (e) {
    console.log(`✗ ${label} (${e.message})`);
    fails.push(label);
  }
};

await check('home is up', `${NEW}/`, 200);
await check('frontage check is up', `${NEW}/frontage-check`, 200);
await check('a council page is up', `${NEW}/planning/birmingham`, 200);
await check('admin is locked', `${NEW}/admin`, 404);
await check('a matrix URL is gone', `${NEW}/services/roller-shutters/leeds`, 410);
await check('old host: matrix URL gone', `${OLD}/services/roller-shutters/leeds`, 410);
await check('old host: about → company', `${OLD}/about`, (r) => r.status === 301 && r.headers.get('location') === `${NEW}/company`);
const BARE = NEW.replace('://www.', '://');
await check('old WordPress page → one 301', `${BARE}/about-us/`, (r) => r.status === 301 && r.headers.get('location') === `${NEW}/company`);
await check('old WordPress door page → its new page', `${BARE}/upvc-door/`, (r) => r.status === 301 && r.headers.get('location') === `${NEW}/shopfronts/upvc-doors`);
await check('trailing slash → one hop', `${NEW}/costs/`, (r) => r.status === 308 && r.headers.get('location') === `${NEW}/costs`);
await check('old host: blog gone', `${OLD}/blog/what-is-lps-1175-security-rating`, 410);
await check('own phone on home page', `${NEW}/`, async (r) => r.status === 200 && (await r.text()).includes('07414 779594'));

if (fails.length) {
  console.error(`\n${fails.length} smoke check(s) failed`);
  process.exit(1);
}
console.log('\nAll smoke checks passed');
