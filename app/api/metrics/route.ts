import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const fullKey = adminKey + 'nimda';

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token === fullKey) return true;
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') === fullKey) return true;

  return false;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const hoursParam = searchParams.get('hours');
  const daysParam = parseInt(searchParams.get('days') || '30', 10);
  const totalHours = hoursParam
    ? Math.min(Math.max(1, parseInt(hoursParam, 10)), 8760)
    : Math.min(Math.max(1, daysParam), 365) * 24;
  const days = totalHours / 24;

  const since = new Date(Date.now() - totalHours * 60 * 60 * 1000);

  try {
    const [
      totalViews,
      uniqueSessions,
      topPages,
      topReferrers,
      deviceBreakdown,
      browserBreakdown,
      countryBreakdown,
      ipBreakdown,
      utmSources,
      dailyViews,
      totalLeads,
      leadsByStatus,
      leadsByService,
      leadsByLocation,
      leadsBySource,
      recentLeads,
      dailyLeads,
      totalCallClicks,
      callClicksByPage,
      dailyCallClicks,
      recentCallClicks,
      callClicksByAction,
      trafficSources,
      searchLandings,
      sessionFunnel,
      exitPages,
      entryPages,
      viewsHeatmap,
      leadsHeatmap,
      callsHeatmap,
    ] = await Promise.all([
      // Traffic
      prisma.pageView.count({ where: { createdAt: { gte: since } } }),

      prisma.pageView.groupBy({
        by: ['sessionId'],
        where: { createdAt: { gte: since } },
      }).then((r) => r.length),

      prisma.$queryRawUnsafe<{ path: string; views: bigint }[]>(
        `SELECT path, COUNT(*)::bigint as views FROM page_views WHERE "createdAt" >= $1 GROUP BY path ORDER BY views DESC LIMIT 20`,
        since
      ),

      prisma.$queryRawUnsafe<{ referrer: string; views: bigint }[]>(
        `SELECT referrer, COUNT(*)::bigint as views FROM page_views WHERE "createdAt" >= $1 AND referrer IS NOT NULL AND referrer != '' GROUP BY referrer ORDER BY views DESC LIMIT 15`,
        since
      ),

      prisma.$queryRawUnsafe<{ device: string; count: bigint }[]>(
        `SELECT COALESCE(device, 'unknown') as device, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY device ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ browser: string; count: bigint }[]>(
        `SELECT COALESCE(browser, 'unknown') as browser, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY browser ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ country: string; count: bigint }[]>(
        `SELECT COALESCE(country, 'unknown') as country, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY country ORDER BY count DESC LIMIT 15`,
        since
      ),

      prisma.$queryRawUnsafe<{ ip: string; count: bigint }[]>(
        `SELECT COALESCE(ip, 'unknown') as ip, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY ip ORDER BY count DESC LIMIT 20`,
        since
      ),

      prisma.$queryRawUnsafe<{ utm_source: string; count: bigint }[]>(
        `SELECT utm_source, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 AND utm_source IS NOT NULL GROUP BY utm_source ORDER BY count DESC LIMIT 10`,
        since
      ),

      prisma.$queryRawUnsafe<{ date: string; views: bigint }[]>(
        `SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') as date, COUNT(*)::bigint as views FROM page_views WHERE "createdAt" >= $1 GROUP BY date ORDER BY date ASC`,
        since
      ),

      // Leads
      prisma.lead.count({ where: { createdAt: { gte: since } } }),

      prisma.$queryRawUnsafe<{ status: string; count: bigint }[]>(
        `SELECT status, COUNT(*)::bigint as count FROM leads WHERE "createdAt" >= $1 GROUP BY status ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ service: string; count: bigint }[]>(
        `SELECT service, COUNT(*)::bigint as count FROM leads WHERE "createdAt" >= $1 GROUP BY service ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ location: string; count: bigint }[]>(
        `SELECT location, COUNT(*)::bigint as count FROM leads WHERE "createdAt" >= $1 GROUP BY location ORDER BY count DESC LIMIT 15`,
        since
      ),

      prisma.$queryRawUnsafe<{ source: string; count: bigint }[]>(
        `SELECT COALESCE(source, 'Not specified') as source, COUNT(*)::bigint as count FROM leads WHERE "createdAt" >= $1 GROUP BY source ORDER BY count DESC`,
        since
      ),

      prisma.lead.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),

      prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
        `SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') as date, COUNT(*)::bigint as count FROM leads WHERE "createdAt" >= $1 GROUP BY date ORDER BY date ASC`,
        since
      ),

      // Call clicks
      prisma.callClick.count({ where: { createdAt: { gte: since } } }).catch(() => 0),

      prisma.$queryRawUnsafe<{ page: string; count: bigint }[]>(
        `SELECT page, COUNT(*)::bigint as count FROM call_clicks WHERE "createdAt" >= $1 GROUP BY page ORDER BY count DESC LIMIT 15`,
        since
      ).catch(() => []),

      prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
        `SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') as date, COUNT(*)::bigint as count FROM call_clicks WHERE "createdAt" >= $1 GROUP BY date ORDER BY date ASC`,
        since
      ).catch(() => []),

      prisma.$queryRawUnsafe<{ action: string; session_id: string; phone: string; page: string; device: string; browser: string; ip: string; country: string; created_at: string }[]>(
        `SELECT COALESCE(action,'call_click') as action, session_id, phone, page, COALESCE(device,'') as device, COALESCE(browser,'') as browser, COALESCE(ip,'') as ip, COALESCE(country,'') as country, "createdAt" as created_at FROM call_clicks WHERE "createdAt" >= $1 ORDER BY "createdAt" DESC LIMIT 50`,
        since
      ).catch(() => []),

      // Call clicks by action type
      prisma.$queryRawUnsafe<{ action: string; count: bigint }[]>(
        `SELECT COALESCE(action,'call_click') as action, COUNT(*)::bigint as count FROM call_clicks WHERE "createdAt" >= $1 GROUP BY action ORDER BY count DESC`,
        since
      ).catch(() => []),

      // Traffic sources classification
      prisma.$queryRawUnsafe<{ source: string; count: bigint }[]>(
        `SELECT
          CASE
            WHEN gclid IS NOT NULL AND gclid != '' THEN 'Google Ads'
            WHEN utm_medium IN ('cpc','ppc','paid') THEN 'Google Ads'
            WHEN (referrer IS NULL OR referrer = '') AND utm_source IS NULL THEN 'Direct'
            WHEN referrer ILIKE '%google.%' THEN 'Google Organic'
            WHEN referrer ILIKE '%bing.%' OR referrer ILIKE '%msn.%' THEN 'Bing'
            WHEN referrer ILIKE '%yahoo.%' THEN 'Yahoo'
            WHEN referrer ILIKE '%duckduckgo.%' THEN 'DuckDuckGo'
            WHEN referrer ILIKE '%facebook.%' OR referrer ILIKE '%fb.%' THEN 'Facebook'
            WHEN referrer ILIKE '%instagram.%' THEN 'Instagram'
            WHEN referrer ILIKE '%twitter.%' OR referrer ILIKE '%x.com%' THEN 'X / Twitter'
            WHEN referrer ILIKE '%linkedin.%' THEN 'LinkedIn'
            ELSE 'Other'
          END as source,
          COUNT(*)::bigint as count
        FROM page_views WHERE "createdAt" >= $1
        GROUP BY source ORDER BY count DESC`,
        since
      ).catch(() => []),

      // Landing pages by source (first view per session)
      prisma.$queryRawUnsafe<{ path: string; source: string; sessions: bigint }[]>(
        `WITH first_views AS (
          SELECT DISTINCT ON (session_id)
            session_id, path, referrer, utm_source, utm_medium, gclid
          FROM page_views
          WHERE "createdAt" >= $1
          ORDER BY session_id, "createdAt" ASC
        )
        SELECT path,
          CASE
            WHEN gclid IS NOT NULL AND gclid != '' THEN 'Google Ads'
            WHEN utm_medium IN ('cpc','ppc','paid') THEN 'Google Ads'
            WHEN (referrer IS NULL OR referrer = '') AND utm_source IS NULL THEN 'Direct'
            WHEN referrer ILIKE '%google.%' THEN 'Google Organic'
            WHEN referrer ILIKE '%bing.%' OR referrer ILIKE '%msn.%' THEN 'Bing'
            ELSE 'Other Search'
          END as source,
          COUNT(*)::bigint as sessions
        FROM first_views
        GROUP BY path, source
        ORDER BY sessions DESC
        LIMIT 30`,
        since
      ).catch(() => []),

      // ── Drop-off ────────────────────────────────────────────────────────
      // Where visitors stop. Every stage below is counted per session, so the
      // numbers describe people rather than page loads.
      prisma.$queryRawUnsafe<{
        sessions: bigint; engaged: bigint; saw_offer: bigint;
        reached_convert: bigint; acted: bigint;
      }[]>(
        `WITH s AS (
           SELECT session_id,
             COUNT(*) AS views,
             BOOL_OR(path LIKE '/services/%' OR path LIKE '/areas/%') AS saw_offer,
             BOOL_OR(path = '/instant-quote' OR path = '/contact') AS reached_convert
           FROM page_views
           WHERE "createdAt" >= $1
           GROUP BY session_id
         ),
         c AS (
           SELECT DISTINCT session_id FROM call_clicks WHERE "createdAt" >= $1
         )
         SELECT
           COUNT(*)::bigint AS sessions,
           COUNT(*) FILTER (WHERE s.views >= 2)::bigint AS engaged,
           COUNT(*) FILTER (WHERE s.saw_offer)::bigint AS saw_offer,
           COUNT(*) FILTER (WHERE s.reached_convert)::bigint AS reached_convert,
           COUNT(*) FILTER (WHERE c.session_id IS NOT NULL)::bigint AS acted
         FROM s LEFT JOIN c USING (session_id)`,
        since
      ).catch(() => []),

      // Exit pages: how often a page is the last thing a session sees.
      // A high exit rate on a page with real traffic is a leak worth fixing.
      prisma.$queryRawUnsafe<{ path: string; views: bigint; exits: bigint }[]>(
        `WITH ranked AS (
           SELECT path, session_id,
             ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY "createdAt" DESC) AS rn
           FROM page_views
           WHERE "createdAt" >= $1
         )
         SELECT path,
           COUNT(*)::bigint AS views,
           COUNT(*) FILTER (WHERE rn = 1)::bigint AS exits
         FROM ranked
         GROUP BY path
         HAVING COUNT(*) >= 3
         ORDER BY COUNT(*) FILTER (WHERE rn = 1) DESC
         LIMIT 25`,
        since
      ).catch(() => []),

      // Entry pages and how many of those sessions went no further.
      prisma.$queryRawUnsafe<{ path: string; sessions: bigint; bounced: bigint }[]>(
        `WITH sess AS (
           SELECT session_id, COUNT(*) AS views FROM page_views
           WHERE "createdAt" >= $1 GROUP BY session_id
         ),
         entries AS (
           SELECT DISTINCT ON (session_id) session_id, path
           FROM page_views WHERE "createdAt" >= $1
           ORDER BY session_id, "createdAt" ASC
         )
         SELECT e.path,
           COUNT(*)::bigint AS sessions,
           COUNT(*) FILTER (WHERE s.views = 1)::bigint AS bounced
         FROM entries e JOIN sess s USING (session_id)
         GROUP BY e.path
         HAVING COUNT(*) >= 3
         ORDER BY sessions DESC
         LIMIT 25`,
        since
      ).catch(() => []),

      // Weekday x hour grids, in UK local time so the numbers match the phone.
      prisma.$queryRawUnsafe<{ dow: number; hour: number; count: bigint }[]>(
        `SELECT EXTRACT(DOW FROM "createdAt" AT TIME ZONE 'Europe/London')::int AS dow,
                EXTRACT(HOUR FROM "createdAt" AT TIME ZONE 'Europe/London')::int AS hour,
                COUNT(*)::bigint AS count
         FROM page_views WHERE "createdAt" >= $1 GROUP BY dow, hour`,
        since
      ).catch(() => []),

      prisma.$queryRawUnsafe<{ dow: number; hour: number; count: bigint }[]>(
        `SELECT EXTRACT(DOW FROM "createdAt" AT TIME ZONE 'Europe/London')::int AS dow,
                EXTRACT(HOUR FROM "createdAt" AT TIME ZONE 'Europe/London')::int AS hour,
                COUNT(*)::bigint AS count
         FROM leads WHERE "createdAt" >= $1 GROUP BY dow, hour`,
        since
      ).catch(() => []),

      prisma.$queryRawUnsafe<{ dow: number; hour: number; count: bigint }[]>(
        `SELECT EXTRACT(DOW FROM "createdAt" AT TIME ZONE 'Europe/London')::int AS dow,
                EXTRACT(HOUR FROM "createdAt" AT TIME ZONE 'Europe/London')::int AS hour,
                COUNT(*)::bigint AS count
         FROM call_clicks WHERE "createdAt" >= $1 GROUP BY dow, hour`,
        since
      ).catch(() => []),
    ]);

    const serialize = <T extends Record<string, unknown>>(arr: T[]) =>
      arr.map((row) => {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(row)) {
          out[k] = typeof v === 'bigint' ? Number(v) : v;
        }
        return out;
      });

    return NextResponse.json({
      period: { days, since: since.toISOString() },
      traffic: {
        totalViews,
        uniqueSessions,
        topPages: serialize(topPages),
        topReferrers: serialize(topReferrers),
        devices: serialize(deviceBreakdown),
        browsers: serialize(browserBreakdown),
        countries: serialize(countryBreakdown),
        ips: serialize(ipBreakdown),
        utmSources: serialize(utmSources),
        daily: serialize(dailyViews),
      },
      leads: {
        total: totalLeads,
        byStatus: serialize(leadsByStatus),
        byService: serialize(leadsByService),
        byLocation: serialize(leadsByLocation),
        bySource: serialize(leadsBySource),
        daily: serialize(dailyLeads),
        recent: recentLeads,
      },
      callClicks: {
        total: totalCallClicks as number,
        byPage: serialize(callClicksByPage as Record<string, unknown>[]),
        byAction: serialize(callClicksByAction as Record<string, unknown>[]),
        daily: serialize(dailyCallClicks as Record<string, unknown>[]),
        recent: recentCallClicks,
      },
      sources: {
        bySource: serialize(trafficSources as Record<string, unknown>[]),
        landings: serialize(searchLandings as Record<string, unknown>[]),
      },
      dropOff: {
        funnel: serialize(sessionFunnel as Record<string, unknown>[])[0] ?? null,
        exitPages: serialize(exitPages as Record<string, unknown>[]),
        entryPages: serialize(entryPages as Record<string, unknown>[]),
      },
      heatmaps: {
        views: serialize(viewsHeatmap as Record<string, unknown>[]),
        leads: serialize(leadsHeatmap as Record<string, unknown>[]),
        calls: serialize(callsHeatmap as Record<string, unknown>[]),
      },
    });
  } catch (err) {
    console.error('[metrics] Error fetching metrics:', err);
    return NextResponse.json({ error: 'Failed to fetch metrics.' }, { status: 500 });
  }
}
