import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEnquiryAcknowledgement, sendEnquiryToOffice } from '@/lib/resend';
import { sendTelegramLeadNotification } from '@/lib/telegram';
import { clientKey, limited } from '@/lib/limit';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO = 6 * 1024 * 1024;

/**
 * Enquiries from /enquire and from the offer at the end of the frontage
 * check. The frontage check never calls this before its result is shown.
 */
export async function POST(req: NextRequest) {
  if (limited(`enq:${clientKey(req.headers)}`, 4, 3_600_000)) {
    return NextResponse.json({ ok: false, error: 'Too many enquiries from this connection. Please call us instead.' }, { status: 429 });
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'The form could not be read.' }, { status: 400 });
  }
  const f = (k: string, n = 500) => String(form.get(k) ?? '').trim().slice(0, n);
  if (f('website')) return NextResponse.json({ ok: true }); // honeypot

  const name = f('name', 120);
  const phone = f('phone', 40);
  const email = f('email', 200);
  const location = f('location', 200);
  const service = f('service', 200) || 'General enquiry';
  const message = f('message', 4000);
  const source = f('source', 200) || 'enquire';

  const missing = [!name && 'your name', !phone && !email && 'a phone number or email', !location && 'the town or postcode'].filter(Boolean);
  if (missing.length) return NextResponse.json({ ok: false, error: `Please add ${missing.join(', ')}.` }, { status: 400 });
  if (email && !EMAIL.test(email)) return NextResponse.json({ ok: false, error: 'Please check the email address.' }, { status: 400 });

  let photo: { filename: string; content: Buffer } | null = null;
  const file = form.get('photo');
  if (file && typeof file === 'object' && 'arrayBuffer' in file && file.size > 0) {
    if (file.size > MAX_PHOTO) return NextResponse.json({ ok: false, error: 'The photo is too large — please send one under 6 MB.' }, { status: 400 });
    if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type)) {
      return NextResponse.json({ ok: false, error: 'Please send the photo as a JPEG, PNG, WebP or HEIC image.' }, { status: 400 });
    }
    photo = { filename: `frontage.${file.type.split('/')[1]}`, content: Buffer.from(await file.arrayBuffer()) };
  }

  let lead;
  try {
    lead = await prisma.lead.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        location,
        service,
        message: [message, photo ? '[photo attached to the office email]' : ''].filter(Boolean).join('\n') || undefined,
        source,
        sessionId: f('sessionId', 100) || undefined,
      },
    });
  } catch (err) {
    console.error('[enquire] save failed', err);
    return NextResponse.json({ ok: false, error: 'We could not save your enquiry. Please call or WhatsApp us.' }, { status: 500 });
  }

  const notify = { ...lead, photo };
  await Promise.allSettled([
    sendEnquiryToOffice(notify).catch((e) => console.error('[enquire] office email', e)),
    sendTelegramLeadNotification(lead).catch((e) => console.error('[enquire] telegram', e)),
    email ? sendEnquiryAcknowledgement(email, name).catch((e) => console.error('[enquire] ack', e)) : null,
  ]);

  return NextResponse.json({ ok: true });
}
