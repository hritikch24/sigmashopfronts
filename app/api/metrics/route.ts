import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token === adminKey) return true;
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') === adminKey) return true;

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

      prisma.$queryRawUnsafe<{ session_id: string; phone: string; page: string; device: string; browser: string; ip: string; country: string; created_at: string }[]>(
        `SELECT session_id, phone, page, COALESCE(device,'') as device, COALESCE(browser,'') as browser, COALESCE(ip,'') as ip, COALESCE(country,'') as country, "createdAt" as created_at FROM call_clicks WHERE "createdAt" >= $1 ORDER BY "createdAt" DESC LIMIT 50`,
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
        daily: serialize(dailyCallClicks as Record<string, unknown>[]),
        recent: recentCallClicks,
      },
    });
  } catch (err) {
    console.error('[metrics] Error fetching metrics:', err);
    return NextResponse.json({ error: 'Failed to fetch metrics.' }, { status: 500 });
  }
}
