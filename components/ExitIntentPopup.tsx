'use client';

import { useState, useEffect, useRef } from 'react';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const triggered = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('exit_popup_dismissed')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.current) {
        triggered.current = true;
        setShow(true);
      }
    };

    const timer = setTimeout(() => {
      if (!triggered.current && !sessionStorage.getItem('exit_popup_dismissed')) {
        triggered.current = true;
        setShow(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem('exit_popup_dismissed', '1');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const name = nameRef.current?.value || '';
    const phone = phoneRef.current?.value || '';
    const service = serviceRef.current?.value || '';

    const msg = encodeURIComponent(
      `Hi, I'd like a free site survey.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\n\nFrom the website popup offer.`
    );
    window.open(`https://wa.me/447397066538?text=${msg}`, '_blank');
    setSubmitted(true);
    sessionStorage.setItem('exit_popup_dismissed', '1');
    setSending(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Special offer">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-[slideUp_0.3s_ease-out]">
        <button onClick={dismiss} className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-grey-100 hover:bg-grey-200 text-grey-600 transition-colors" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
        </button>

        <div className="bg-navy px-6 py-5 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            LIMITED OFFER
          </div>
          <h2 className="font-heading text-xl font-bold text-white leading-tight">
            Wait — Get a Free Site Survey<br />
            <span className="text-gold">+ 10% Off Your First Install</span>
          </h2>
          <p className="text-grey-300 text-sm mt-2">
            Book this week and save. No obligation, no pressure.
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 className="font-heading font-bold text-navy text-lg">We&apos;ll Be in Touch!</h3>
              <p className="text-grey-600 text-sm mt-2">Our team will contact you within 2 hours to arrange your free survey.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input ref={nameRef} type="text" placeholder="Your name" required className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" />
              </div>
              <div>
                <input ref={phoneRef} type="tel" placeholder="Phone number" required className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" />
              </div>
              <div>
                <select ref={serviceRef} required className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" defaultValue="">
                  <option value="" disabled>What do you need?</option>
                  <option value="Aluminium Shopfront">Aluminium Shopfront</option>
                  <option value="Roller Shutters">Roller Shutters</option>
                  <option value="Security Doors">Security Doors</option>
                  <option value="Automatic Doors">Automatic Doors</option>
                  <option value="Bi-Fold Doors">Bi-Fold Doors</option>
                  <option value="Fire Doors">Fire Doors</option>
                  <option value="Emergency Repair">Emergency Repair</option>
                  <option value="Other">Other / Not Sure</option>
                </select>
              </div>
              <button type="submit" disabled={sending} className="w-full bg-gold hover:bg-gold-light text-navy font-heading font-bold text-sm py-3 rounded-xl transition-colors disabled:opacity-50">
                {sending ? 'Sending...' : 'Claim My Free Survey & 10% Off'}
              </button>
              <p className="text-grey-400 text-xs text-center">No spam. We&apos;ll only contact you about this quote.</p>
            </form>
          )}
        </div>

        <div className="border-t border-grey-100 px-6 py-3 flex items-center justify-center gap-4 text-xs text-grey-500">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            5.0 Rated
          </span>
          <span>|</span>
          <span>Companies House Registered</span>
          <span>|</span>
          <span>Fully Insured</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
