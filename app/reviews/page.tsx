import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';


const COMPANY = 'Sigma Shop Fronts';
const SITE = 'https://www.sigmashopfronts.com';

export const metadata: Metadata = {
  title: `Customer Reviews | ${COMPANY} — Rated 5.0`,
  description: `Read verified customer reviews of ${COMPANY}. Rated 5.0 by businesses across the UK for shopfront installations, roller shutters, security doors, and emergency repairs.`,
  alternates: { canonical: `${SITE}/reviews` },
  openGraph: {
    title: `Customer Reviews | ${COMPANY}`,
    description: `See what UK businesses say about ${COMPANY}. 5-star rated shopfront installers with nationwide coverage.`,
    url: `${SITE}/reviews`,
  },
};

const reviews = [
  {
    name: 'James Thornton',
    location: 'Birmingham',
    service: 'Aluminium Shopfront',
    rating: 5,
    date: '2026-03-14',
    text: 'Had a full aluminium shopfront installed for our new barbershop. The lads were professional from start to finish — turned up on time, kept the area tidy, and the end result looks brilliant. Customers have commented on how sharp it looks. Would absolutely use again.',
  },
  {
    name: 'Sarah Hussain',
    location: 'London',
    service: 'Roller Shutter',
    rating: 5,
    date: '2026-01-22',
    text: 'We needed a new electric roller shutter after our old one was damaged in a break-in. Sigma came out the next day for a survey, gave us a fair price, and had it fitted within the week. The shutter works perfectly and we feel much more secure now.',
  },
  {
    name: 'David Clarke',
    location: 'Manchester',
    service: 'Automatic Doors',
    rating: 5,
    date: '2025-11-08',
    text: 'Automatic sliding doors fitted to our convenience store entrance. Really pleased with how smooth they operate. The team explained everything clearly and left the site spotless. Good value for money compared to other quotes we got.',
  },
  {
    name: 'Priya Patel',
    location: 'Leicester',
    service: 'Security Door',
    rating: 5,
    date: '2026-05-02',
    text: 'Steel security door installed at the back of our retail unit. Solid piece of kit and the multi-point locking gives us real peace of mind. Installation was quick and they sorted the frame perfectly into our existing opening.',
  },
  {
    name: 'Mark Edwards',
    location: 'Leeds',
    service: 'Emergency Callout',
    rating: 5,
    date: '2026-04-19',
    text: 'Called at 11pm after someone put a brick through our shop window. An engineer was with us within two hours and had it boarded securely. Replacement glass was fitted three days later. Genuinely grateful for the fast response.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-grey-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY,
    url: SITE,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <section className="bg-navy pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Reviews' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Customer Reviews</h1>
          <p className="text-grey-300 mt-3 max-w-2xl text-lg">
            What UK businesses say about working with {COMPANY}.
          </p>
        </div>
      </section>

      {/* Summary bar */}
      <section className="bg-white border-b border-grey-100">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-5xl font-bold text-navy">{avgRating}</p>
            <StarRating rating={Math.round(Number(avgRating))} />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-grey-600 text-sm">Based on <span className="font-semibold text-navy">{reviews.length} verified reviews</span></p>
            <p className="text-grey-500 text-sm mt-1">All reviews are from real customers who used our services.</p>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-grey-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-grey-100 flex flex-col">
                <StarRating rating={r.rating} />
                <p className="text-grey-700 mt-4 flex-1 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-5 pt-4 border-t border-grey-100">
                  <p className="font-semibold text-navy">{r.name}</p>
                  <p className="text-sm text-grey-500">{r.service} — {r.location}</p>
                  <p className="text-xs text-grey-400 mt-1">{new Date(r.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to join our satisfied customers?</h2>
          <p className="text-grey-300 mt-3">Get a free, no-obligation quote for your shopfront project.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href="/contact" className="inline-block bg-gold text-navy font-bold py-3 px-8 rounded-lg hover:bg-gold/90 transition-colors">
              Get a Free Quote
            </Link>
            <Link href="/services" className="inline-block border border-grey-400 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
