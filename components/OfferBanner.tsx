'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OfferBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gold text-navy relative z-[40] mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 py-2 text-sm">
        <span className="font-bold hidden sm:inline">Summer 2026 Offer:</span>
        <span className="font-medium">
          <span className="font-bold sm:hidden">Summer Offer: </span>
          Free Site Survey + <strong>10% Off</strong> Your First Installation
        </span>
        <Link
          href="/contact"
          className="bg-navy text-gold font-bold text-xs px-3 py-1 rounded-full hover:bg-navy-light transition-colors whitespace-nowrap"
        >
          Claim Now
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-navy/60 hover:text-navy transition-colors"
          aria-label="Dismiss offer banner"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );
}
