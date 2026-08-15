import { NextResponse } from 'next/server';
import { services } from '@/data/services';
import { cities } from '@/data/cities';

const INDEXNOW_KEY = '7ce4a41892d54f238305d3a7ae5af32c';
const SITE_URL = 'https://www.sigmashopfronts.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const urls: string[] = [
    SITE_URL,
    `${SITE_URL}/services`,
    `${SITE_URL}/areas`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/cost-guide`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/gallery`,
    `${SITE_URL}/reviews`,
  ];

  for (const service of services) {
    urls.push(`${SITE_URL}/services/${service.slug}`);
  }

  for (const city of cities) {
    urls.push(`${SITE_URL}/areas/${city.slug}`);
  }

  for (const service of services) {
    for (const city of cities) {
      urls.push(`${SITE_URL}/services/${service.slug}/${city.slug}`);
    }
  }

  const batchSize = 10000;
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  const results = [];
  for (const batch of batches) {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.sigmashopfronts.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });
    results.push({ status: res.status, count: batch.length });
  }

  return NextResponse.json({
    submitted: urls.length,
    batches: results,
  });
}
