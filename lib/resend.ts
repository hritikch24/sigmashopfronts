import { Resend } from 'resend';
import { SITE_HOST, SITE_URL } from '@/lib/site';
import { business } from '@/lib/business';

/**
 * Enquiry emails. Every value that came from a visitor is escaped before it is
 * placed in HTML — an enquiry form is not a place to let markup through.
 */

const mailHost = SITE_HOST.replace(/^www\./, '');
const FROM = `${business.name} <${business.emailFrom}>`;

function client(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(key);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export interface EnquiryMail {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message?: string | null;
  source?: string | null;
  createdAt: Date;
  photos?: { filename: string; content: Buffer }[];
  serviceType?: string | null;
  landingPage?: string | null;
}

export async function sendEnquiryToOffice(e: EnquiryMail): Promise<void> {
  const rows: [string, string][] = [
    ['Name', e.name],
    ['Phone', e.phone],
    ['Email', e.email],
    ['Where', e.location],
    ['What', e.service],
    ['Came from', e.source ?? '—'],
    ['Page', e.landingPage ?? '—'],
    ['Received', e.createdAt.toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short' })],
  ];
  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0a1420">
  <h1 style="font-size:18px;border-bottom:2px solid #0049a3;padding-bottom:8px">New enquiry — ${esc(e.service)}</h1>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${rows.map(([k, v]) => `<tr><td style="padding:8px 0;color:#56636f;width:30%;border-bottom:1px solid #d3dae2">${k}</td><td style="padding:8px 0;border-bottom:1px solid #d3dae2">${esc(v)}</td></tr>`).join('')}
  </table>
  ${e.message ? `<p style="white-space:pre-wrap;font-size:14px;margin-top:16px">${esc(e.message)}</p>` : ''}
  ${e.photos?.length ? `<p style="font-size:13px;color:#56636f">${e.photos.length === 1 ? 'Photo' : `${e.photos.length} photos`} attached.</p>` : ''}
  <p style="font-size:12px;color:#56636f">Lead ${esc(e.id)}</p>
</div>`;
  const { error } = await client().emails.send({
    from: FROM,
    to: business.email,
    replyTo: e.email,
    subject: `Enquiry: ${e.service} — ${e.location}`,
    html,
    attachments: e.photos?.length ? e.photos.map((p) => ({ filename: p.filename, content: p.content })) : undefined,
  });
  if (error) throw new Error(`Office notification failed: ${error.message}`);
}

export async function sendEnquiryAcknowledgement(to: string, name: string): Promise<void> {
  const first = esc(name.trim().split(/\s+/)[0] ?? '');
  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0a1420;line-height:1.55">
  <p>Thank you${first ? `, ${first}` : ''}. We have your enquiry and a person will reply — usually by phone or WhatsApp, as you asked.</p>
  <p>If it is an emergency repair within ${business.repairRadiusMiles} road miles of ${business.repairCentre}, call
  <a href="tel:${business.phones.main.tel}">${business.phones.main.display}</a>. ${esc(business.emergencyPromise)}</p>
  <p>${esc(business.legalName)} · Company ${business.companyNumber}<br><a href="${SITE_URL}">${mailHost}</a></p>
</div>`;
  const { error } = await client().emails.send({
    from: FROM,
    to,
    replyTo: business.email,
    subject: `We have your enquiry — ${business.name}`,
    html,
  });
  if (error) throw new Error(`Acknowledgement failed: ${error.message}`);
}
