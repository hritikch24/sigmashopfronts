'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export default function StickyDesktopCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`hidden md:block fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-navy/95 backdrop-blur-md border-b border-navy-light shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Mark only, not the lockup: this bar is 48px tall and the
                lockup's tagline stops resolving below about 36px. The tiled
                icon rather than the bare mark, because at this size the bare
                mark's dark facade sinks into the navy bar behind it. */}
            <span className="flex items-center gap-2.5">
              <Image
                src="/assets/sigma-icon-64.png"
                alt=""
                width={64}
                height={64}
                sizes="26px"
                className="h-[26px] w-[26px] rounded-[5px]"
              />
              <span className="font-heading font-bold text-gold text-sm tracking-wide">
                SIGMA SHOP FRONTS
              </span>
            </span>
            <span className="text-grey-500 text-xs hidden lg:block">
              Professional Shop Front Specialists
            </span>
          </div>

          {/* Both numbers are labelled. They sat side by side here with
              nothing to tell them apart, so a visitor ready to call had to
              guess which one to use. The footer already distinguishes them. */}
          <div className="flex items-center gap-4">
            <a
              href="tel:07414779594"
              className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors text-sm font-medium"
              tabIndex={visible ? 0 : -1}
            >
              <PhoneIcon />
              07414 779594 <span className="text-grey-500 text-xs">(office)</span>
            </a>
            <a
              href="tel:07397066538"
              className="flex items-center gap-2 text-grey-400 hover:text-gold transition-colors text-sm hidden lg:flex"
              tabIndex={visible ? 0 : -1}
            >
              <PhoneIcon />
              07397 066538 <span className="text-grey-500 text-xs">(mobile)</span>
            </a>
            <Link
              href="/contact"
              className="bg-gold hover:bg-gold-light text-navy font-semibold text-xs px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              tabIndex={visible ? 0 : -1}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
