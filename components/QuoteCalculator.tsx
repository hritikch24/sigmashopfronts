'use client';

import { useState } from 'react';

const services = [
  { id: 'aluminium-shopfront', name: 'Aluminium Shopfront', baseMin: 3360, baseMax: 7800 },
  { id: 'roller-shutters', name: 'Roller Shutters', baseMin: 1440, baseMax: 4200 },
  { id: 'security-doors', name: 'Security Doors', baseMin: 2160, baseMax: 5400 },
  { id: 'automatic-doors', name: 'Automatic Doors', baseMin: 4200, baseMax: 9600 },
  { id: 'bi-fold-doors', name: 'Bi-Fold Doors', baseMin: 3600, baseMax: 8400 },
  { id: 'fire-doors', name: 'Fire Doors (per door)', baseMin: 540, baseMax: 1440 },
  { id: 'shopfront-repairs', name: 'Shopfront Repairs', baseMin: 360, baseMax: 2400 },
  { id: 'shutter-repair', name: 'Shutter Repair', baseMin: 180, baseMax: 1440 },
  { id: 'glass-replacement', name: 'Glass Replacement', baseMin: 300, baseMax: 3000 },
];

const sizes = [
  { id: 'small', name: 'Small (under 3m)', multiplier: 0.8 },
  { id: 'medium', name: 'Medium (3m–5m)', multiplier: 1.0 },
  { id: 'large', name: 'Large (5m–8m)', multiplier: 1.4 },
  { id: 'xlarge', name: 'Extra Large (8m+)', multiplier: 1.8 },
];

export default function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedSize = sizes.find((s) => s.id === sizeId);

  const estimateMin = selectedService && selectedSize
    ? Math.round(selectedService.baseMin * selectedSize.multiplier)
    : 0;
  const estimateMax = selectedService && selectedSize
    ? Math.round(selectedService.baseMax * selectedSize.multiplier)
    : 0;

  async function handleGetQuote() {
    setSubmitError('');
    setSubmitting(true);

    const estimateLine = `Estimate: £${estimateMin.toLocaleString()} – £${estimateMax.toLocaleString()} (${selectedSize?.name})`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          location,
          service: selectedService?.name || 'Other',
          message: `Submitted via instant quote calculator.\n${estimateLine}`,
          source: 'quote_calculator',
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setSubmitError(d.error || 'Could not save your details — please try WhatsApp instead.');
      }
    } catch {
      setSubmitError('Could not save your details — please try WhatsApp instead.');
    }

    setSubmitting(false);
    setStep(3);

    const msg = encodeURIComponent(
      `Hi, I used the online estimator and I'm interested in getting a quote.\n\nService: ${selectedService?.name}\nSize: ${selectedSize?.name}\nLocation: ${location}\n${estimateLine}\nName: ${name}\nPhone: ${phone}\n\nPlease arrange a free site survey.`
    );
    window.open(`https://wa.me/447397066538?text=${msg}`, '_blank');
  }

  return (
    <section className="section-padding bg-grey-50" id="instant-quote">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
            Instant Quote Estimator
          </h2>
          <p className="text-grey-600 text-sm">
            Get a ballpark figure in 30 seconds — then book a free survey for an exact price.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-1 bg-grey-100">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h3 className="font-heading font-bold text-navy text-lg mb-4">1. What do you need?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setServiceId(s.id); setStep(1); }}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm font-medium ${
                        serviceId === s.id
                          ? 'border-gold bg-gold/5 text-navy'
                          : 'border-grey-200 hover:border-gold/50 text-charcoal'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-heading font-bold text-navy text-lg mb-4">2. Approximate size?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSizeId(s.id); setStep(2); }}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm font-medium ${
                        sizeId === s.id
                          ? 'border-gold bg-gold/5 text-navy'
                          : 'border-grey-200 hover:border-gold/50 text-charcoal'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(0)} className="mt-4 text-sm text-grey-500 hover:text-gold transition-colors">&larr; Back</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-heading font-bold text-navy text-lg mb-4">3. Your Estimate</h3>
                <div className="bg-navy rounded-xl p-6 text-center mb-6">
                  <p className="text-grey-300 text-sm mb-1">{selectedService?.name} — {selectedSize?.name}</p>
                  <p className="font-heading text-3xl font-bold text-gold">
                    £{estimateMin.toLocaleString()} – £{estimateMax.toLocaleString()}
                  </p>
                  <p className="text-grey-400 text-xs mt-2">
                    *Indicative range. Exact price confirmed after free site survey.
                  </p>
                </div>
                <h4 className="font-heading font-bold text-navy text-sm mb-3">Get your exact quote — leave your details:</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <input
                    type="text"
                    placeholder="Location / town"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-grey-50 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  {submitError && <p className="text-red-600 text-xs">{submitError}</p>}
                  <button
                    onClick={() => { if (name && phone && email && location) handleGetQuote(); }}
                    disabled={!name || !phone || !email || !location || submitting}
                    className="w-full bg-gold hover:bg-gold-light text-navy font-heading font-bold text-sm py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Book Free Survey & Get Exact Quote'}
                  </button>
                </div>
                <button onClick={() => setStep(1)} className="mt-4 text-sm text-grey-500 hover:text-gold transition-colors">&larr; Back</button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="font-heading font-bold text-navy text-xl mb-2">Quote Request Sent!</h3>
                <p className="text-grey-600 text-sm mb-1">
                  Estimated range: <strong className="text-navy">£{estimateMin.toLocaleString()} – £{estimateMax.toLocaleString()}</strong>
                </p>
                <p className="text-grey-500 text-sm">
                  Our team will call you within 2 hours to arrange your free site survey.
                </p>
                <button
                  onClick={() => { setStep(0); setServiceId(''); setSizeId(''); setName(''); setPhone(''); setEmail(''); setLocation(''); }}
                  className="mt-6 text-sm text-gold font-medium hover:underline"
                >
                  Get another estimate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
