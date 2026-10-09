import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/** First-party page counts for the owner's dashboard. No IP address is stored. */
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const path = typeof b.path === 'string' ? b.path : '';
    const sessionId = typeof b.sessionId === 'string' ? b.sessionId : '';
    if (!path || !sessionId || path.startsWith('/api/') || path.startsWith('/metrics') || path.startsWith('/admin')) {
      return NextResponse.json({ ok: true });
    }
    const s = (v: unknown, n: number) => (typeof v === 'string' && v ? v.slice(0, n) : null);
    let city = req.headers.get('x-vercel-ip-city');
    try {
      city = city ? decodeURIComponent(city) : null;
    } catch {}
    await prisma.pageView.create({
      data: {
        path: path.slice(0, 500),
        referrer: s(b.referrer, 1000),
        utmSource: s(b.utmSource, 200),
        utmMedium: s(b.utmMedium, 200),
        utmCampaign: s(b.utmCampaign, 200),
        gclid: s(b.gclid, 200),
        device: s(b.device, 50),
        country: req.headers.get('x-vercel-ip-country'),
        city: city ? city.slice(0, 100) : null,
        sessionId: sessionId.slice(0, 100),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[visit]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
