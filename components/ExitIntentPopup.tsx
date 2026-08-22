'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { useExitIntent, useModalChrome } from '@/lib/exit-intent';

/**
 * Sigma's re-engagement banner is deliberately unlike Grewal's warm,
 * testimonial-led panel. This site's identity is technical — dark ground,
 * cyan and violet accents — and its strongest argument is the certification
 * behind the product, so the panel reads like a spec sheet: what the systems
 * are rated to, then the offer.
 *
 * The trigger logic in lib/exit-intent.ts is shared verbatim with the other
 * sites; only this presentation layer differs.
 */

const SPECS = [
  { code: 'LPS 1175', detail: 'Loss-prevention rated shutters, SR1 to SR3' },
  { code: 'BS EN 16034', detail: 'Certified fire-rated doorsets, FD30 to FD90' },
  { code: 'BS 7036', detail: 'Automatic entrance safety compliance' },
  { code: 'BS EN 12600', detail: 'Toughened safety glazing throughout' },
];

export default function ExitIntentPopup() {
  const { show, dismiss } = useExitIntent();
  const onClose = useCallback(() => dismiss(), [dismiss]);
  useModalChrome(show, onClose);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-banner-title"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c1a] shadow-2xl">
        {/* Instrument-panel hairline across the top */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #00e5ff 35%, #9945ff 65%, transparent)' }}
        />

        <button
          onClick={onClose}
          className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#a8abca] transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-7 pt-8 pb-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00e5ff]">
            Before you go
          </p>
          <h2
            id="exit-banner-title"
            className="font-heading text-[1.4rem] font-bold leading-snug text-[#f0f2f8]"
          >
            Every system we fit is certified — not just fitted.
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#8b8eb0]">
            Plenty of installers will quote you a shutter. Fewer will tell you what it is rated to
            withstand, or hand you the certification when the job is signed off.
          </p>
        </div>

        {/* Spec grid — the technical proof this site trades on */}
        <div className="grid grid-cols-1 gap-px border-y border-white/[0.06] bg-white/[0.06] sm:grid-cols-2">
          {SPECS.map((s) => (
            <div key={s.code} className="bg-[#0c0c1a] px-5 py-3.5">
              <p className="font-mono text-[13px] font-bold tracking-tight text-[#00e5ff]">{s.code}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#8b8eb0]">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="px-7 py-6">
          <p className="mb-4 text-sm leading-relaxed text-[#a8abca]">
            Site survey and written quotation are free, with no obligation. Or see an indicative
            figure for your job in about a minute.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/instant-quote"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f0b429] px-6 py-3.5 font-heading text-sm font-bold text-[#0a0a18] no-underline transition-colors hover:bg-[#ffd060]"
            >
              Get an instant price
            </Link>
            <a
              href="tel:07414779594"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#e0e6f0] px-6 py-3.5 font-heading text-sm font-bold text-[#e0e6f0] no-underline transition-colors hover:bg-[#e0e6f0] hover:text-[#06060e]"
            >
              Call 07414 779594
            </a>
          </div>
          <button
            onClick={onClose}
            className="mt-3 w-full text-center text-xs text-[#6e7191] underline-offset-2 hover:underline"
          >
            No thanks, I&apos;m just browsing
          </button>
        </div>
      </div>
    </div>
  );
}
