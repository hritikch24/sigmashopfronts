import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { path, referrer, utmSource, utmMedium, utmCampaign, device, browser, sessionId } = body;

    if (!path || !sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const geo = request.headers.get('x-vercel-ip-country') || null;

    await prisma.pageView.create({
      data: {
        path: String(path).slice(0, 500),
        referrer: referrer ? String(referrer).slice(0, 1000) : null,
        utmSource: utmSource ? String(utmSource).slice(0, 200) : null,
        utmMedium: utmMedium ? String(utmMedium).slice(0, 200) : null,
        utmCampaign: utmCampaign ? String(utmCampaign).slice(0, 200) : null,
        device: device ? String(device).slice(0, 50) : null,
        browser: browser ? String(browser).slice(0, 50) : null,
        country: geo,
        sessionId: String(sessionId).slice(0, 100),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[track] Error recording page view:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
