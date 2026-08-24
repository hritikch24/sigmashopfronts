'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SERVICES, BUDGET_BANDS, formatGBP } from '@/lib/estimator';
import { getSessionId } from '@/lib/session';
import { cities } from '@/data/cities';

interface EstimateResponse {
  low: number;
  high: number;
  serviceName: string;
  variantLabel: string;
  quantity: number;
  factors: string[];
  reference: string | null;
  /** False when the send failed — never promise an email that did not go. */
  emailed: boolean;
}

/**
 * Surfaces and text use theme-native tokens so this renders correctly on both
 * the light and dark builds of the site:
 *   - `card-surface` is white on one theme, translucent dark on the other.
 *   - `text-charcoal` / `text-grey-500` invert with it.
 *   - Inputs are explicitly light (`bg-white`) so they pair with `text-navy`,
 *     which is dark in both themes.
 */
const inputClass =
  'w-full px-4 py-3 rounded-lg border border-grey-200 hover:border-grey-300 text-sm font-body bg-white text-navy placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold transition-colors';
const selectClass = inputClass + ' appearance-none cursor-pointer';
const labelClass = 'block text-sm font-semibold text-charcoal mb-1.5';

/**
 * Result-screen buttons are styled from theme tokens rather than the site's
 * .btn-* classes: `btn-outline-dark` is only defined on one of the two themes,
 * so it silently rendered as unstyled text on the other. `charcoal` inverts
 * with the card, and `navy` is dark on both, so these read correctly either way.
 */
const ctaBase =
  'inline-flex items-center justify-center gap-2 font-heading font-bold text-sm px-6 py-3.5 rounded-lg transition-colors no-underline';
const ctaPrimary = ctaBase + ' bg-gold text-navy hover:bg-gold-light';
// WhatsApp green is kept for recognition, but with dark text: white on #25D366
// measures 1.77:1, which is below any usable threshold.
const ctaWhatsApp = ctaBase + ' bg-[#25D366] text-[#0b1a10] hover:bg-[#1fbe5b]';
const ctaOutline =
  ctaBase + ' border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white';

function PhoneGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function InstantQuoteForm() {
  const [serviceSlug, setServiceSlug] = useState('');
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [citySlug, setCitySlug] = useState('');
  const [difficultAccess, setDifficultAccess] = useState(false);
  const [removalRequired, setRemovalRequired] = useState(false);
  const [outOfHours, setOutOfHours] = useState(false);
  const [budgetBand, setBudgetBand] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<EstimateResponse | null>(null);

  const service = useMemo(
    () => SERVICES.find((s) => s.slug === serviceSlug),
    [serviceSlug]
  );

  function pickService(slug: string) {
    setServiceSlug(slug);
    setVariantId('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!serviceSlug || !variantId) {
      setError('Please choose a service and an option.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/instant-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone,
          citySlug: citySlug || undefined,
          cityName: cities.find((c) => c.slug === citySlug)?.name,
          serviceSlug, variantId, quantity,
          difficultAccess, removalRequired, outOfHours,
          budgetBand: budgetBand || undefined,
          notes,
          sessionId: getSessionId(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please call us instead.');
        return;
      }
      setResult({ ...data.estimate, emailed: Boolean(data.emailed) });
    } catch {
      setError('Could not reach the server. Please call us instead.');
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="card-surface p-6 sm:p-8">
        <p className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-1">
          Your indicative estimate
        </p>
        <p className="text-4xl sm:text-5xl font-heading font-bold mb-3">
          {formatGBP(result.low)} <span className="text-grey-500 font-normal">–</span>{' '}
          {formatGBP(result.high)}
        </p>
        <p className="text-grey-500 text-sm mb-6">
          {result.serviceName} — {result.variantLabel}
          {result.quantity > 1 ? ` × ${result.quantity}` : ''}
          {result.reference ? ` · Ref ${result.reference}` : ''}
        </p>

        {result.factors.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-charcoal mb-2">What we factored in</p>
            <ul className="space-y-1">
              {result.factors.map((f) => (
                <li key={f} className="text-grey-500 text-sm flex gap-2">
                  <span aria-hidden="true">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-lg border border-gold bg-grey-100 px-4 py-3 mb-6">
          <p className="text-charcoal text-sm font-semibold mb-1">
            This is a guide price, not a quote.
          </p>
          <p className="text-grey-600 text-sm">
            It is generated automatically from typical UK job costs and deliberately sits at the
            lower end of our range. Your actual price may be <strong>higher or lower</strong> once
            we have seen the opening, the existing structure, and your exact specification. A free
            site survey and written quotation confirm the real figure — with no obligation.
          </p>
        </div>

        <div className="rounded-lg border border-grey-200 px-4 py-3 mb-6">
          <p className="text-charcoal text-sm font-semibold mb-1">
            {result.emailed
              ? 'We have emailed this to you — check your inbox.'
              : 'Save your reference — we have your details.'}
          </p>
          <p className="text-grey-600 text-sm">
            One of our team will call you <strong>within one working day</strong> to talk it
            through and book your free site survey.
            {result.reference ? (
              <> Your reference is <strong>{result.reference}</strong>.</>
            ) : null}
          </p>
        </div>

        <p className="text-grey-600 text-sm mb-4">
          Do not want to wait? Call or message us now and we will pick it up straight away:
        </p>
        {/* Styled inline rather than with .btn-outline-dark: that class only
            exists on one of the two themes, so it rendered unstyled elsewhere. */}
        <div className="flex flex-wrap gap-3">
          <a href="tel:07414779594" className={ctaPrimary}>
            <PhoneGlyph />
            Call 07414 779594
          </a>
          <a
            href={`https://wa.me/447397066538?text=${encodeURIComponent(
              `Hi, I just got an instant estimate${result.reference ? ` (ref ${result.reference})` : ''} for ${result.serviceName} and would like to discuss it.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaWhatsApp}
          >
            <WhatsAppGlyph />
            WhatsApp Us
          </a>
          <Link href="/contact" className={ctaOutline}>Send more details</Link>
        </div>
      </div>
    );
  }

  // Three visible stages: pick a service, describe the job, tell us where to
  // send it. Showing progress keeps people going once the form grows.
  const step = !serviceSlug ? 1 : !name || !email || !phone ? 2 : 3;

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-2 pb-1">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex-1">
            <div
              className={
                'h-1 rounded-full transition-colors ' +
                (n <= step ? 'bg-gold' : 'bg-grey-200')
              }
            />
          </div>
        ))}
        <span className="text-grey-500 text-xs whitespace-nowrap ml-1">Step {step} of 3</span>
      </div>

      <div>
        <label htmlFor="iq-service" className={labelClass}>
          What do you need? <span className="text-red-500">*</span>
        </label>
        <select
          id="iq-service"
          value={serviceSlug}
          onChange={(e) => pickService(e.target.value)}
          className={selectClass}
          required
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>

      {service && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="iq-variant" className={labelClass}>
              Which option fits best? <span className="text-red-500">*</span>
            </label>
            <select
              id="iq-variant"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Select an option…</option>
              {service.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} — from {formatGBP(v.low)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="iq-qty" className={labelClass}>
              How many {service.unitNoun}s?
            </label>
            <input
              id="iq-qty"
              type="number"
              min={1}
              max={50}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="iq-city" className={labelClass}>Where is the site?</label>
            <select
              id="iq-city"
              value={citySlug}
              onChange={(e) => setCitySlug(e.target.value)}
              className={selectClass}
            >
              <option value="">Select a city…</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {service && (
        <fieldset className="space-y-2">
          <legend className={labelClass}>Anything else that applies?</legend>
          {([
            [difficultAccess, setDifficultAccess, 'Restricted access, upper floor, or scaffolding needed'],
            [removalRequired, setRemovalRequired, 'An existing unit needs removing and disposing of'],
            [outOfHours, setOutOfHours, 'Work must happen outside trading hours'],
          ] as const).map(([checked, setter, text]) => (
            <label key={text} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setter(e.target.checked)}
                className="mt-1 h-4 w-4 accent-gold cursor-pointer"
              />
              <span className="text-grey-600 text-sm">{text}</span>
            </label>
          ))}
        </fieldset>
      )}

      {service && (
        <div>
          <label htmlFor="iq-budget" className={labelClass}>
            Do you have a budget in mind?{' '}
            <span className="text-grey-500 font-normal">(optional)</span>
          </label>
          <select
            id="iq-budget"
            value={budgetBand}
            onChange={(e) => setBudgetBand(e.target.value)}
            className={selectClass}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_BANDS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
          <p className="text-grey-500 text-xs mt-1.5">
            It will not change the estimate — it just helps us suggest the right specification
            when we call.
          </p>
        </div>
      )}

      <div className="border-t border-grey-200 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <p className="text-grey-500 text-sm">
            Where should we send the estimate? We will also text or email you the written quote
            once we have confirmed the details.
          </p>
        </div>
        <div>
          <label htmlFor="iq-name" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input id="iq-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="John Smith" className={inputClass} required />
        </div>
        <div>
          <label htmlFor="iq-email" className={labelClass}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input id="iq-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="john@company.com" className={inputClass} required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="iq-phone" className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input id="iq-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="07700 900000" className={inputClass} required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="iq-notes" className={labelClass}>
            Anything we should know? <span className="text-grey-500 font-normal">(optional)</span>
          </label>
          <textarea id="iq-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Approximate dimensions, current condition, deadline…"
            className={inputClass + ' resize-none'} />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-navy font-heading font-bold py-3.5 px-6 rounded-lg text-base transition-colors"
      >
        {submitting ? 'Working it out…' : 'Show my estimate'}
      </button>

      <p className="text-center text-xs text-grey-500">
        Indicative guide price only — your written quote may be higher or lower. No obligation.
      </p>
    </form>
  );
}
