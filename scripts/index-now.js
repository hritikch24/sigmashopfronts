#!/usr/bin/env node
/**
 * Submits all site URLs to IndexNow (Bing, ChatGPT, Yandex, Naver).
 * Run after deploy: node scripts/index-now.js
 */

const KEY = 'a1b2c3d4e5f6a7b8';
const HOST = 'www.sigmashopfronts.com';

const urls = [
  '/',
  '/about',
  '/contact',
  '/gallery',
  '/faq',
  '/services',
  '/areas',
  '/blog',
  '/cost-guide',
  '/why-choose-us',
  '/services/aluminium-shopfronts',
  '/services/roller-shutters',
  '/services/security-doors',
  '/services/automatic-doors',
  '/services/bi-fold-doors',
  '/services/fire-doors',
  '/services/shopfront-repairs',
  '/services/emergency-callout',
  '/areas/london',
  '/areas/birmingham',
  '/areas/manchester',
  '/areas/leeds',
  '/areas/liverpool',
  '/areas/bristol',
  '/areas/sheffield',
  '/areas/glasgow',
  '/areas/cardiff',
  '/areas/newcastle',
  '/areas/nottingham',
  '/areas/leicester',
  '/areas/edinburgh',
  '/areas/southampton',
  '/areas/brighton',
  '/areas/coventry',
  '/blog/how-to-maintain-commercial-roller-shutters',
  '/blog/aluminium-shopfront-planning-permission-uk',
  '/blog/fd30-vs-fd60-fire-door-commercial-premises',
  '/blog/what-is-lps-1175-security-rating',
  '/blog/emergency-shopfront-boarding-what-to-do',
  '/blog/shopfront-installation-cost-uk-2025',
  '/blog/best-shopfront-company-uk-how-to-choose',
];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls.map((path) => `https://${HOST}${path}`),
};

async function submit(endpoint) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log(`${endpoint} → ${res.status}`);
  } catch (err) {
    console.error(`${endpoint} → FAILED: ${err.message}`);
  }
}

(async () => {
  console.log(`Submitting ${payload.urlList.length} URLs to IndexNow...`);
  await Promise.all([
    submit('https://api.indexnow.org/indexnow'),
    submit('https://www.bing.com/indexnow'),
    submit('https://yandex.com/indexnow'),
  ]);
  console.log('Done.');
})();
