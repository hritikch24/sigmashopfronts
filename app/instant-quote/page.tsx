import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import InstantQuoteForm from '@/components/InstantQuoteForm';

const siteUrl = 'https://www.sigmashopfronts.com';

export const metadata: Metadata = {
  // The root layout appends " | Sigma Shop Fronts" via its title template.
  title: 'Instant Shopfront & Shutter Price Estimate',
  description:
    'Get an indicative price for shopfronts, roller shutters, security doors and more in under a minute. Guide prices based on typical UK job costs — free site survey and written quote follow.',
  alternates: { canonical: `${siteUrl}/instant-quote` },
  openGraph: {
    title: 'Instant Price Estimate | Sigma Shop Fronts',
    description:
      'Answer a few questions and see an indicative price straight away. No obligation, free site survey included.',
    url: `${siteUrl}/instant-quote`,
    type: 'website',
  },
};

export default function InstantQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Instant Estimate', item: `${siteUrl}/instant-quote` },
            ],
          }),
        }}
      />

      <section className="relative bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Instant Estimate' }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-4 max-w-3xl">
            Get an instant price estimate
          </h1>
          <p className="text-grey-300 text-lg mt-3 max-w-2xl">
            Answer a few quick questions and we will show you an indicative figure straight away —
            no waiting, no obligation. It is a guide price, not a formal quote, and it deliberately
            sits at the lower end of our range so you have a realistic starting point.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <InstantQuoteForm />
            </div>

            <aside className="space-y-6">
              <div className="card-surface p-6">
                <h2 className="text-lg font-heading font-bold mb-3">How accurate is it?</h2>
                <p className="text-grey-500 text-sm mb-3">
                  The estimate is calculated from the same figures published in our{' '}
                  <Link href="/cost-guide" className="text-gold hover:underline">cost guide</Link>,
                  adjusted for your location, quantity and site conditions.
                </p>
                <p className="text-grey-500 text-sm">
                  It cannot account for what we can only see on site — the state of the existing
                  opening, structural work, lintel condition, or unusual dimensions. That is why the
                  final written quote may come back <strong>higher or lower</strong>.
                </p>
              </div>

              <div className="card-surface p-6">
                <h2 className="text-lg font-heading font-bold mb-3">What happens next</h2>
                <ol className="space-y-3">
                  {[
                    'You see your figure immediately and we email you a copy.',
                    'We call you within one working day to talk it through.',
                    'We arrange a free site survey at a time that suits you.',
                    'You receive a fixed written quotation with no hidden costs.',
                  ].map((step, i) => (
                    <li key={step} className="flex gap-3 text-grey-500 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-navy font-bold text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card-surface p-6">
                <h2 className="text-lg font-heading font-bold mb-2">Prefer to talk?</h2>
                <p className="text-grey-500 text-sm mb-4">
                  Call us and we will give you a ballpark over the phone.
                </p>
                <a href="tel:07414779594" className="btn-gold w-full text-center">
                  Call 07414 779594
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
