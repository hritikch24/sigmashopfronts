import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { cities } from '@/data/cities';

export const metadata: Metadata = {
  title: 'Shopfront Installation Areas Across the UK',
  description:
    'Sigma Shop Fronts operates across 16 major UK cities. Find your local shopfront installation team in London, Birmingham, Manchester, Leeds, and more.',
  alternates: { canonical: 'https://www.sigmashopfronts.com/areas' },
};

export default function AreasPage() {
  return (
    <>
      <section className="relative min-h-[35vh] flex items-end bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Areas' }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-4">
            Shopfront Installation Across the UK
          </h1>
          <p className="text-grey-300 text-lg mt-3 max-w-2xl">
            We have dedicated installation teams operating in major cities across England, Scotland, and Wales — with rapid-response nationwide coverage for every project.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group flex items-center gap-3 p-5 rounded-xl border border-grey-200 hover:border-gold hover:bg-gold/5 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold flex-shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                </svg>
                <div>
                  <span className="font-heading font-bold text-navy group-hover:text-gold transition-colors">{city.name}</span>
                  <span className="block text-grey-500 text-xs mt-0.5">{city.region}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-3 bg-navy text-white px-6 py-3 rounded-full text-sm font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
              </svg>
              Nationwide UK Coverage — Free Site Surveys
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Get a Free Quote in Your Area
          </h2>
          <p className="text-grey-300 text-lg max-w-xl mx-auto mb-8">
            Wherever you are in the UK, we can arrange a free site survey — usually within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Request a Quote
            </Link>
            <a href="tel:07414779594" className="btn-outline">
              Call 07414 779594
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
