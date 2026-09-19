import { serviceSlugs, citySlugs } from '../sitemap';

const siteUrl = 'https://www.sigmashopfronts.com';

/**
 * A retirement sitemap — temporary, and deliberately not part of sitemap.xml.
 *
 * The 574 service x city pages carry `robots: noindex`, but Google only
 * learns that by fetching each page, and it had not recrawled them since
 * 9 July. Dropping them from the main sitemap in the same change that added
 * the noindex lowered their crawl priority, which delayed the very crawl
 * needed to retire them.
 *
 * So they are listed here instead: enough of a signal to get them recrawled,
 * while sitemap.xml continues to advertise only the 80 pages meant to rank.
 * Google will fetch these, read the noindex and drop them from the index.
 *
 * Delete this route once Search Console's Pages report stops listing them as
 * indexed — keeping a sitemap of retired URLs past that point just invites
 * crawl budget to be spent on pages we no longer want.
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  // The date these pages were actually noindexed, not the build time. It was
  // `new Date()`, so every deploy re-stamped all 574 URLs as "changed just now"
  // and asked Google to recrawl pages we are trying to retire. A retirement
  // sitemap needs a stable, past date or it competes with the live sitemap for
  // crawl budget.
  const lastmod = '2026-09-11T00:00:00.000Z';

  const urls = serviceSlugs
    .flatMap((service) => citySlugs.map((city) => `${siteUrl}/services/${service}/${city}`))
    .map(
      (url) =>
        `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
