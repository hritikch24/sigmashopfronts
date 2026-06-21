import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { action, phone, page, referrer, utmSource, utmMedium, utmCampaign, device, browser, sessionId } = body;

    if (!phone || !page || !sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const geo = request.headers.get('x-vercel-ip-country') || null;
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (realIp || null);

    await prisma.callClick.create({
      data: {
        action: action ? String(action).slice(0, 30) : 'call_click',
        phone: String(phone).slice(0, 20),
        page: String(page).slice(0, 500),
        referrer: referrer ? String(referrer).slice(0, 1000) : null,
        utmSource: utmSource ? String(utmSource).slice(0, 200) : null,
        utmMedium: utmMedium ? String(utmMedium).slice(0, 200) : null,
        utmCampaign: utmCampaign ? String(utmCampaign).slice(0, 200) : null,
        device: device ? String(device).slice(0, 50) : null,
        browser: browser ? String(browser).slice(0, 50) : null,
        country: geo,
        ip: ip ? String(ip).slice(0, 45) : null,
        sessionId: String(sessionId).slice(0, 100),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[track-call] Error recording call click:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
