import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { business } from '@/lib/business';

const LINES: Record<string, string> = {
  main: business.phones.main.display,
  second: business.phones.second.display,
  whatsapp: `WhatsApp ${business.phones.second.display}`,
};

/** Records a tap on one of the firm's numbers. No IP address is stored. */
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const phone = LINES[String(b.line)];
    if (!phone || typeof b.sessionId !== 'string') return NextResponse.json({ ok: true });
    await prisma.callClick.create({
      data: {
        phone,
        page: typeof b.page === 'string' ? b.page.slice(0, 500) : '/',
        device: typeof b.device === 'string' ? b.device.slice(0, 50) : null,
        country: req.headers.get('x-vercel-ip-country'),
        sessionId: b.sessionId.slice(0, 100),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[dial]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
