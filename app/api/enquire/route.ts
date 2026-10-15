import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEnquiryAcknowledgement, sendEnquiryToOffice } from '@/lib/resend';
import { sendTelegramLeadNotification } from '@/lib/telegram';
import { clientKey, limited } from '@/lib/limit';
import { readLine } from '@/lib/quick-line';
import { DOOR_TYPES, SERVICE_TYPES, TIMINGS, cleanPath, pick } from '@/lib/enquiry-options';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO = 6 * 1024 * 1024;
const MAX_PHOTOS = 3;

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

  // The one-line box sends a single `line`; the details are read out of it.
  const quick = f('quick') === '1';
  const line = f('line', 1500);
  const parsed = quick ? readLine(line) : null;

  const givenName = f('name', 120);
  const name = givenName || 'Not given';
  const phone = parsed ? parsed.phone : f('phone', 40);
  const email = parsed ? parsed.email : f('email', 200);
  const location = (parsed ? parsed.postcode : f('location', 200)) || 'Not given';
  // Fixed choices only: anything else is dropped, never stored.
  const serviceType = pick(SERVICE_TYPES, f('serviceType', 40));
  const doorType = pick(DOOR_TYPES, f('doorType', 40));
  const timing = pick(TIMINGS, f('timing', 40));
  const landingPage = cleanPath(f('landing', 160));
  const service = parsed ? 'One-line message' : f('service', 200) || (serviceType ? SERVICE_TYPES[serviceType] : 'General enquiry');
  const details = [
    serviceType && `Needs: ${SERVICE_TYPES[serviceType]}`,
    doorType && `Door type: ${DOOR_TYPES[doorType]}`,
    timing && `When: ${TIMINGS[timing]}`,
  ].filter(Boolean);
  const message = parsed ? line : [f('message', 4000), details.length ? `\n${details.join('\n')}` : ''].join('').trim();
  const source = f('source', 200) || 'enquire';

  // Only a way to reply is required. Name and town help, but asking for them
  // first loses people.
  if (!phone && !email) return NextResponse.json({ ok: false, error: 'Please add a phone number or an email address so we can reply.' }, { status: 400 });
  if (email && !EMAIL.test(email)) return NextResponse.json({ ok: false, error: 'Please check the email address.' }, { status: 400 });

  const photos: { filename: string; content: Buffer }[] = [];
  const files = form.getAll('photo').filter((v): v is File => typeof v === 'object' && 'arrayBuffer' in v && v.size > 0);
  if (files.length > MAX_PHOTOS) return NextResponse.json({ ok: false, error: `Please send up to ${MAX_PHOTOS} photos.` }, { status: 400 });
  for (const [i, file] of files.entries()) {
    if (file.size > MAX_PHOTO) return NextResponse.json({ ok: false, error: 'A photo is too large — please send each one under 6 MB.' }, { status: 400 });
    if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type)) {
      return NextResponse.json({ ok: false, error: 'Please send photos as JPEG, PNG, WebP or HEIC images.' }, { status: 400 });
    }
    photos.push({ filename: `photo-${i + 1}.${file.type.split('/')[1]}`, content: Buffer.from(await file.arrayBuffer()) });
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
        message:
          [message, photos.length ? `[${photos.length === 1 ? 'photo' : `${photos.length} photos`} attached to the office email]` : '']
            .filter(Boolean)
            .join('\n') || undefined,
        source,
        serviceType,
        landingPage,
        sessionId: f('sessionId', 100) || undefined,
      },
    });
  } catch (err) {
    console.error('[enquire] save failed', err);
    return NextResponse.json({ ok: false, error: 'We could not save your enquiry. Please call or WhatsApp us.' }, { status: 500 });
  }

  const notify = { ...lead, photos };
  await Promise.allSettled([
    sendEnquiryToOffice(notify).catch((e) => console.error('[enquire] office email', e)),
    sendTelegramLeadNotification(lead).catch((e) => console.error('[enquire] telegram', e)),
    email ? sendEnquiryAcknowledgement(email, givenName).catch((e) => console.error('[enquire] ack', e)) : null,
  ]);

  return NextResponse.json({ ok: true });
}
