'use client';

import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  name: string;
  business: string;
  location: string;
  rating: number;
  text: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? '#d4a843' : '#e5e7eb'}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M8 20c0-6.627 5.373-12 12-12"
        stroke="#d4a843"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M5 28c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7S5 31.866 5 28zm16 0c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7-7-3.134-7-7z"
        fill="#d4a843"
        opacity="0.15"
      />
      <text x="3" y="32" fontFamily="serif" fontSize="36" fill="#d4a843" opacity="0.5">&ldquo;</text>
    </svg>
  );
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 250);
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      goTo((active + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active, testimonials.length, goTo]);

  if (!testimonials.length) return null;

  const current = testimonials[active];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div
        className={`transition-opacity duration-250 ${fading ? 'opacity-0' : 'opacity-100'}`}
        role="region"
        aria-label="Customer testimonials"
        aria-live="polite"
      >
        <div className="bg-white rounded-2xl shadow-lg px-8 pt-8 pb-10 relative overflow-hidden">
          <div className="absolute top-6 left-6 opacity-20">
            <QuoteIcon />
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <StarRating rating={current.rating} />

            <blockquote className="text-grey-700 text-base sm:text-lg leading-relaxed max-w-xl italic">
              &ldquo;{current.text}&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-0.5">
              <cite className="not-italic font-heading font-bold text-navy text-sm sm:text-base">
                {current.name}
              </cite>
              <p className="text-grey-500 text-xs sm:text-sm">
                {current.business} &bull; {current.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`transition-all duration-200 rounded-full ${
                i === active
                  ? 'w-6 h-2.5 bg-gold'
                  : 'w-2.5 h-2.5 bg-grey-300 hover:bg-grey-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
