'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ── Types ────────────────────────────────────────────────────────────── */

interface Recommendation {
  primary: string;
  secondary: string;
  reason: string;
  priceRange: string;
  cta: string;
}

/* ── Quiz data ────────────────────────────────────────────────────────── */

const steps = [
  {
    title: 'What type of business do you have?',
    key: 'businessType' as const,
    options: [
      { id: 'retail', label: 'Retail Shop', icon: '🏪' },
      { id: 'restaurant', label: 'Restaurant / Cafe', icon: '🍽' },
      { id: 'office', label: 'Office / Clinic', icon: '🏢' },
      { id: 'warehouse', label: 'Warehouse / Industrial', icon: '🏭' },
      { id: 'other', label: 'Other Commercial', icon: '🏗' },
    ],
  },
  {
    title: 'What do you need most right now?',
    key: 'primaryNeed' as const,
    options: [
      { id: 'new', label: 'New Shopfront Installation', icon: '✨' },
      { id: 'replace', label: 'Replace Existing Shopfront', icon: '🔄' },
      { id: 'security', label: 'Security Upgrade', icon: '🔒' },
      { id: 'repair', label: 'Repair / Maintenance', icon: '🔧' },
      { id: 'emergency', label: 'Emergency (break-in / damage)', icon: '🚨' },
    ],
  },
  {
    title: 'What matters most to you?',
    key: 'priority' as const,
    options: [
      { id: 'security', label: 'Maximum Security', icon: '🛡' },
      { id: 'aesthetics', label: 'Modern Look / Curb Appeal', icon: '🎨' },
      { id: 'efficiency', label: 'Energy Efficiency', icon: '⚡' },
      { id: 'budget', label: 'Best Value for Money', icon: '💷' },
      { id: 'speed', label: 'Fastest Installation', icon: '⏱' },
    ],
  },
  {
    title: 'What is your approximate budget?',
    key: 'budget' as const,
    options: [
      { id: 'under2k', label: 'Under £2,000', icon: '£' },
      { id: '2k-5k', label: '£2,000 – £5,000', icon: '££' },
      { id: '5k-10k', label: '£5,000 – £10,000', icon: '£££' },
      { id: '10k-plus', label: '£10,000+', icon: '££££' },
      { id: 'flexible', label: 'Not sure / Flexible', icon: '🤔' },
    ],
  },
];

/* ── Service page links ───────────────────────────────────────────────── */

const serviceLinks: Record<string, string> = {
  'Aluminium Shopfronts': '/services/aluminium-shopfronts',
  'Roller Shutters': '/services/roller-shutters',
  'Security Doors': '/services/security-doors',
  'Automatic Doors': '/services/automatic-doors',
  'Bi-Fold Doors': '/services/bi-fold-doors',
  'Fire Doors': '/services/fire-doors',
  'Shopfront Repairs': '/services/shopfront-repairs',
  'Emergency Callout': '/services/emergency-callout',
  'Shutter Repair': '/services/shutter-repair',
  'Glass Replacement': '/services/glass-replacement',
};

function getServiceLink(name: string): string {
  const match = Object.entries(serviceLinks).find(
    ([key]) => name.toLowerCase().includes(key.toLowerCase())
  );
  return match ? match[1] : '/services';
}

/* ── Static fallback ──────────────────────────────────────────────────── */

function getStaticRecommendation(answers: Record<string, string>): Recommendation {
  const { primaryNeed, priority } = answers;

  if (primaryNeed === 'emergency') {
    return {
      primary: 'Emergency Callout',
      secondary: 'Shopfront Repairs',
      reason: 'For urgent situations, our 24/7 emergency team can be on site within the hour to secure your premises, with full repairs following.',
      priceRange: '£300 – £2,000',
      cta: 'Call 07414 779594 now for immediate response.',
    };
  }
  if (primaryNeed === 'repair') {
    return {
      primary: 'Shopfront Repairs',
      secondary: 'Glass Replacement',
      reason: 'Our same-day repair service covers glass, frames, shutters, and mechanisms. We carry common parts and can usually fix issues in a single visit.',
      priceRange: '£150 – £2,000',
      cta: 'Call 07414 779594 to arrange a same-day repair.',
    };
  }
  if (priority === 'security') {
    return {
      primary: 'Security Doors',
      secondary: 'Roller Shutters',
      reason: 'LPS 1175 rated steel doors paired with electric roller shutters provide maximum protection and help keep insurance premiums low.',
      priceRange: '£3,000 – £8,000',
      cta: 'Call 07414 779594 for a free security assessment.',
    };
  }
  if (priority === 'aesthetics') {
    return {
      primary: 'Aluminium Shopfronts',
      secondary: 'Bi-Fold Doors',
      reason: 'Thermally broken aluminium with floor-to-ceiling glazing creates a striking modern frontage that draws foot traffic. Any RAL colour available.',
      priceRange: '£2,800 – £7,000',
      cta: 'Call 07414 779594 for a free design consultation.',
    };
  }
  if (priority === 'budget') {
    return {
      primary: 'Aluminium Shopfronts',
      secondary: 'Roller Shutters',
      reason: 'A standard aluminium shopfront with manual roller shutter offers excellent value — professional appearance with solid security.',
      priceRange: '£2,800 – £5,000',
      cta: 'Call 07414 779594 — we will find a solution within your budget.',
    };
  }
  return {
    primary: 'Aluminium Shopfronts',
    secondary: 'Security Doors',
    reason: 'A professionally installed aluminium shopfront provides the best balance of appearance, security, and durability for commercial premises.',
    priceRange: '£2,800 – £6,500',
    cta: 'Call 07414 779594 for a free site survey and exact quote.',
  };
}

/* ── Component ────────────────────────────────────────────────────────── */

export default function AIRecommender() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiPowered, setAiPowered] = useState(false);

  function handleSelect(key: string, value: string) {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      fetchRecommendation(updated);
    }
  }

  async function fetchRecommendation(finalAnswers: Record<string, string>) {
    setLoading(true);
    const fallback = getStaticRecommendation(finalAnswers);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setRecommendation(data.recommendation || fallback);
      setAiPowered(data.source === 'ai');
    } catch {
      /* AI failed — use static recommendation seamlessly */
      setRecommendation(fallback);
      setAiPowered(false);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
    setAiPowered(false);
  }

  return (
    <section className="section-padding bg-white" id="recommender">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            AI-Powered
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
            Find Your Perfect Shopfront Solution
          </h2>
          <p className="text-grey-600 text-sm max-w-lg mx-auto">
            Answer 4 quick questions and our AI will recommend the best products for your business — with estimated costs.
          </p>
        </div>

        <div className="bg-grey-50 rounded-2xl shadow-lg overflow-hidden border border-grey-200">
          {/* Progress bar */}
          <div className="h-1.5 bg-grey-100">
            <div
              className="h-full bg-gold transition-all duration-500 ease-out"
              style={{
                width: recommendation
                  ? '100%'
                  : `${((currentStep + 1) / (steps.length + 1)) * 100}%`,
              }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* ── Loading state ──────────────────────────────────────── */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-grey-200" />
                  <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
                </div>
                <div className="text-center">
                  <p className="font-heading font-bold text-navy text-sm">
                    Analysing your requirements...
                  </p>
                  <p className="text-grey-500 text-xs mt-1">
                    Our AI is finding the best match for your business
                  </p>
                </div>
              </div>
            )}

            {/* ── Quiz steps ────────────────────────────────────────── */}
            {!loading && !recommendation && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-heading font-bold text-navy text-lg">
                    {steps[currentStep].title}
                  </h3>
                  <span className="text-grey-400 text-xs font-medium">
                    {currentStep + 1} / {steps.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(steps[currentStep].key, opt.id)}
                      className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border-2 transition-all text-sm font-medium hover:border-gold hover:bg-gold/5 ${
                        answers[steps[currentStep].key] === opt.id
                          ? 'border-gold bg-gold/5 text-navy'
                          : 'border-grey-200 text-charcoal bg-white'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0" aria-hidden="true">
                        {opt.icon}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mt-5 text-sm text-grey-500 hover:text-gold transition-colors flex items-center gap-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back
                  </button>
                )}
              </div>
            )}

            {/* ── Recommendation result ──────────────────────────────── */}
            {!loading && recommendation && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg">
                    Your Personalised Recommendation
                  </h3>
                </div>

                {/* Primary recommendation */}
                <div className="bg-navy rounded-xl p-5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-grey-400 text-xs uppercase tracking-wider font-semibold">
                      Best Match
                    </span>
                    {aiPowered && (
                      <span className="text-gold text-[10px] font-bold uppercase tracking-wider bg-gold/10 px-2 py-0.5 rounded-full">
                        AI Recommendation
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white mb-1">
                    {recommendation.primary}
                  </h4>
                  <p className="text-grey-300 text-sm mb-3">
                    Also consider: {recommendation.secondary}
                  </p>
                  <p className="text-grey-200 text-sm leading-relaxed mb-3">
                    {recommendation.reason}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <span className="text-grey-400 text-xs">Estimated range</span>
                      <p className="font-heading text-lg font-bold text-gold">
                        {recommendation.priceRange}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 mb-5">
                  <p className="text-charcoal text-sm">{recommendation.cta}</p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={getServiceLink(recommendation.primary)}
                    className="flex-1 bg-gold hover:bg-gold-light text-navy font-heading font-bold text-sm py-3 rounded-xl transition-colors text-center"
                  >
                    View {recommendation.primary}
                  </Link>
                  <a
                    href="tel:07414779594"
                    className="flex-1 bg-navy hover:bg-navy/90 text-white font-heading font-bold text-sm py-3 rounded-xl transition-colors text-center"
                  >
                    Call 07414 779594
                  </a>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={handleReset}
                    className="text-sm text-grey-500 hover:text-gold transition-colors flex items-center gap-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1v4h4M11 11V7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.3 4.5A5 5 0 0 0 2 3l-1 1m10 4l-1 1a5 5 0 0 1-8.3-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Start again
                  </button>
                  <p className="text-grey-400 text-[10px]">
                    *Prices are indicative. Exact quote after free site survey.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
