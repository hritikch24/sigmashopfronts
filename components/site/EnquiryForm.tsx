'use client';

import { useState } from 'react';
import { business } from '@/lib/business';
import { measure } from '@/lib/measure';
import { DOOR_TYPES, SERVICE_TYPES, TIMINGS, offeredServiceTypes, type DoorTypeKey, type ServiceType } from '@/lib/enquiry-options';

/**
 * One enquiry form for the whole site. Only a phone number or an email is
 * required; everything else helps but is optional. Up to three photos; large
 * phone photos are scaled down in the browser before upload so the request
 * stays small.
 */
const MAX_PHOTOS = 3;
async function shrink(file: File): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 900_000) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    return await new Promise((res) => canvas.toBlob((b) => res(b ?? file), 'image/jpeg', 0.82));
  } catch {
    return file;
  }
}

export default function EnquiryForm({
  source,
  service,
  location,
  summary,
  photoPrompt,
  serviceType,
  doorTypes,
  garage = false,
}: {
  source: string;
  service?: string;
  location?: string;
  /** Pre-filled context, e.g. the frontage-check inputs. Sent as part of the message. */
  summary?: string;
  photoPrompt?: string;
  /** Pre-selects "What do you need?". */
  serviceType?: ServiceType;
  /** Shows the door type choice (garage pages only). */
  doorTypes?: DoorTypeKey[];
  /** Offer the garage door choices. Pass `garageLive` from a server page. */
  garage?: boolean;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setError('');
    const fd = new FormData(e.currentTarget);
    const photos = fd.getAll('photo').filter((p): p is File => p instanceof File && p.size > 0);
    if (photos.length > MAX_PHOTOS) {
      setError(`Please choose up to ${MAX_PHOTOS} photos.`);
      setState('error');
      return;
    }
    fd.delete('photo');
    for (const [i, p] of photos.entries()) fd.append('photo', await shrink(p), `photo-${i + 1}.jpg`);
    // The page path only, never the query string: the API stores it to count leads per page.
    fd.set('landing', window.location.pathname);
    if (summary) fd.set('message', [String(fd.get('message') ?? ''), '', '— From the frontage check —', summary].join('\n').trim());
    try {
      fd.set('sessionId', sessionStorage.getItem('sigma.visit') ?? '');
    } catch {}
    try {
      const r = await fetch('/api/enquire', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || 'Something went wrong.');
      // Counts only: the form and the kind of job, never anything the customer typed.
      measure('generate_lead', { form: source, service_type: String(fd.get('serviceType') || 'unspecified') });
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="note" role="status">
        <strong>Thank you — we have it.</strong> A person will reply. If it is urgent, call {business.phones.main.display}.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }} noValidate>
      <input type="hidden" name="source" value={source} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
        <label>
          Leave this empty <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="choices choices--two">
        <div className="field">
          <label htmlFor="enq-name">Your name</label>
          <input id="enq-name" name="name" type="text" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="enq-phone">Phone (or email below — one is enough)</label>
          <input id="enq-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="enq-email">Email</label>
          <input id="enq-email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="enq-location">Town or postcode of the shop</label>
          <input id="enq-location" name="location" type="text" defaultValue={location} />
        </div>
      </div>
      <div className="choices choices--two">
        <div className="field">
          <label htmlFor="enq-type">What do you need? (optional)</label>
          <select id="enq-type" name="serviceType" defaultValue={serviceType ?? ''}>
            <option value="">Choose one</option>
            {offeredServiceTypes(garage || Boolean(serviceType?.startsWith('garage'))).map((k) => (
              <option key={k} value={k}>
                {SERVICE_TYPES[k]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="enq-timing">When do you need it? (optional)</label>
          <select id="enq-timing" name="timing" defaultValue="">
            <option value="">Choose one</option>
            {(Object.keys(TIMINGS) as (keyof typeof TIMINGS)[]).map((k) => (
              <option key={k} value={k}>
                {TIMINGS[k]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {doorTypes && (
        <div className="field">
          <label htmlFor="enq-door">Type of garage door (optional)</label>
          <select id="enq-door" name="doorType" defaultValue="">
            <option value="">Choose one</option>
            {[...doorTypes, 'not-sure' as const].map((k) => (
              <option key={k} value={k}>
                {DOOR_TYPES[k]}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="enq-service">What it is about</label>
        <input id="enq-service" name="service" type="text" defaultValue={service} placeholder="e.g. shutter stuck" />
      </div>
      <div className="field">
        <label htmlFor="enq-message">Anything we should know</label>
        <textarea id="enq-message" name="message" />
      </div>
      <div className="field">
        <label htmlFor="enq-photo">Photos (optional, up to {MAX_PHOTOS})</label>
        <span className="field-hint">{photoPrompt ?? 'A photo of the whole shop front, taken straight on, helps more than a close-up.'}</span>
        <input id="enq-photo" name="photo" type="file" accept="image/*" multiple />
      </div>
      <p className="field-hint">
        We only use these details to reply to you. See our <a href="/privacy">privacy notice</a>.
      </p>
      {state === 'error' && (
        <p className="note note--warn" role="alert">
          {error}
        </p>
      )}
      <div>
        <button type="submit" className="act act--solid" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
