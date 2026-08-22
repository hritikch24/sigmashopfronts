'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SERVICES, formatGBP } from '@/lib/estimator';
import { cities } from '@/data/cities';

interface EstimateResponse {
  low: number;
  high: number;
  serviceName: string;
  variantLabel: string;
  quantity: number;
  factors: string[];
  reference: string | null;
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

export default function InstantQuoteForm() {
  const [serviceSlug, setServiceSlug] = useState('');
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [citySlug, setCitySlug] = useState('');
  const [difficultAccess, setDifficultAccess] = useState(false);
  const [removalRequired, setRemovalRequired] = useState(false);
  const [outOfHours, setOutOfHours] = useState(false);
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
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please call us instead.');
        return;
      }
      setResult(data.estimate);
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

        <p className="text-grey-600 text-sm mb-4">
          We have your details and will be in touch shortly. If you would rather talk it through now:
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="tel:07414779594" className="btn-gold">Call 07414 779594</a>
          <Link href="/contact" className="btn-outline-dark">Send more details</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8 space-y-5">
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
                <option key={v.id} value={v.id}>{v.label}</option>
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
