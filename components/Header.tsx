'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const services = [
  { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  { label: 'Roller Shutters', href: '/services/roller-shutters' },
  { label: 'Security Doors', href: '/services/security-doors' },
  { label: 'Automatic Doors', href: '/services/automatic-doors' },
  { label: 'Bi-Fold Doors', href: '/services/bi-fold-doors' },
  { label: 'Fire Doors', href: '/services/fire-doors' },
  { label: 'Shop Front Repairs', href: '/services/shopfront-repairs' },
  { label: 'Emergency Callout', href: '/services/emergency-callout' },
  { label: 'Shutter Repair', href: '/services/shutter-repair' },
  { label: 'Glass Replacement', href: '/services/glass-replacement' },
];

const areas = [
  { label: 'London', href: '/areas/london' },
  { label: 'Birmingham', href: '/areas/birmingham' },
  { label: 'Manchester', href: '/areas/manchester' },
  { label: 'Leeds', href: '/areas/leeds' },
  { label: 'Liverpool', href: '/areas/liverpool' },
  { label: 'View All Areas', href: '/areas' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Cost Guide', href: '/cost-guide' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (areasRef.current && !areasRef.current.contains(e.target as Node)) {
        setAreasOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-navy'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex-shrink-0 group">
              <span className="font-heading font-bold text-lg lg:text-xl tracking-wide text-gold group-hover:text-gold-light transition-colors">
                SIGMA SHOP FRONTS
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-white hover:text-gold transition-colors rounded"
              >
                Home
              </Link>

              <div className="relative" ref={servicesRef}>
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-gold transition-colors rounded"
                  onClick={() => { setServicesOpen(!servicesOpen); setAreasOpen(false); }}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-grey-100 py-1 z-50">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm text-charcoal hover:bg-grey-50 hover:text-navy font-medium transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={areasRef}>
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-gold transition-colors rounded"
                  onClick={() => { setAreasOpen(!areasOpen); setServicesOpen(false); }}
                  aria-expanded={areasOpen}
                  aria-haspopup="true"
                >
                  Areas
                  <ChevronDown className={`transition-transform duration-200 ${areasOpen ? 'rotate-180' : ''}`} />
                </button>
                {areasOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-grey-100 py-1 z-50">
                    {areas.map((a) => (
                      <Link
                        key={a.href}
                        href={a.href}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                          a.label === 'View All Areas'
                            ? 'text-gold border-t border-grey-100 mt-1 pt-3 hover:text-gold-light'
                            : 'text-charcoal hover:bg-grey-50 hover:text-navy'
                        }`}
                        onClick={() => setAreasOpen(false)}
                      >
                        {a.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white hover:text-gold transition-colors rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:07414779594"
                className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors text-sm font-medium"
              >
                <PhoneIcon />
                07414 779594
              </a>
              <Link
                href="/contact"
                className="bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                Get Free Quote
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-white hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy flex flex-col pt-16 overflow-y-auto lg:hidden">
          <nav className="flex flex-col p-6 gap-1" aria-label="Mobile navigation">
            <Link
              href="/"
              className="py-3 px-2 text-lg font-semibold text-white border-b border-navy-light hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-lg font-semibold text-white border-b border-navy-light hover:text-gold transition-colors"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronDown className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 py-2 flex flex-col gap-1">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="py-2 px-2 text-base text-grey-300 hover:text-gold transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-lg font-semibold text-white border-b border-navy-light hover:text-gold transition-colors"
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                aria-expanded={mobileAreasOpen}
              >
                Areas
                <ChevronDown className={`transition-transform duration-200 ${mobileAreasOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileAreasOpen && (
                <div className="pl-4 py-2 flex flex-col gap-1">
                  {areas.map((a) => (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="py-2 px-2 text-base text-grey-300 hover:text-gold transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-lg font-semibold text-white border-b border-navy-light hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:07414779594"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-gold text-gold rounded-lg text-base font-semibold hover:bg-gold hover:text-navy transition-colors"
              >
                <PhoneIcon />
                07414 779594
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center py-3 px-4 bg-gold text-navy rounded-lg text-base font-semibold hover:bg-gold-light transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
