import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import ContactForm from '@/components/ContactForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const siteUrl = 'https://www.sigmashopfronts.com';

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `${siteUrl}/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteUrl}/services/${slug}`,
      type: 'website',
      images: [{ url: `/assets/${service.heroImage}`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => service.relatedServices.includes(s.slug));
  const siteUrl = 'https://www.sigmashopfronts.com';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/services/${slug}/#service`,
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'Sigma Shop Fronts',
      telephone: '+447414779594',
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 Thornwood Close',
        addressLocality: 'Oldbury',
        addressRegion: 'West Midlands',
        postalCode: 'B68 9LX',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.4912,
        longitude: -2.0150,
      },
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'City', name: 'London' },
      { '@type': 'City', name: 'Birmingham' },
      { '@type': 'City', name: 'Manchester' },
      { '@type': 'City', name: 'Leeds' },
      { '@type': 'City', name: 'Liverpool' },
      { '@type': 'City', name: 'Bristol' },
      { '@type': 'City', name: 'Sheffield' },
      { '@type': 'City', name: 'Glasgow' },
      { '@type': 'City', name: 'Cardiff' },
      { '@type': 'City', name: 'Newcastle upon Tyne' },
      { '@type': 'City', name: 'Nottingham' },
      { '@type': 'City', name: 'Leicester' },
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    url: `${siteUrl}/services/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${siteUrl}/services/${slug}` },
    ],
  };

  return (
    <>
      <SchemaMarkup type="Service" data={serviceSchema} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[50vh] flex items-end bg-navy">
        <Image
          src={`/assets/${service.heroImage}`}
          alt={`${service.name} installation by Sigma Shop Fronts`}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: service.name },
              ]}
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-4">
              {service.name}
            </h1>
            <p className="text-grey-300 text-lg mt-3 max-w-2xl">{service.shortDescription}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/contact" className="btn-gold">
                Get a Free Quote
              </Link>
              <a href="tel:07414779594" className="btn-outline">
                Call 07414 779594
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-charcoal leading-relaxed">
                {service.description.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2 key={i} className="text-2xl font-heading font-bold text-navy mt-8 mb-4">
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('**')) {
                    const parts = paragraph.split('**');
                    return (
                      <div key={i}>
                        <h2 className="text-2xl font-heading font-bold text-navy mt-8 mb-4">
                          {parts[1]}
                        </h2>
                        {parts[2] && <p className="mb-4">{parts[2]}</p>}
                      </div>
                    );
                  }
                  return <p key={i} className="mb-4">{paragraph}</p>;
                })}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card-surface p-6">
                  <h3 className="font-heading font-bold text-navy text-lg mb-4">
                    Key Benefits
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-semibold text-navy text-sm">{benefit.title}</p>
                          <p className="text-grey-600 text-sm mt-0.5">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-surface p-6 bg-navy text-white">
                  <h3 className="font-heading font-bold text-gold text-lg mb-2">
                    Need This Service?
                  </h3>
                  <p className="text-grey-300 text-sm mb-4">
                    Get a free, no-obligation site survey and quote.
                  </p>
                  <Link href="/contact" className="btn-gold w-full text-center block mb-3">
                    Request a Quote
                  </Link>
                  <a
                    href="tel:07414779594"
                    className="block text-center text-gold-light hover:text-gold text-sm font-medium transition-colors"
                  >
                    Or call 07414 779594
                  </a>
                </div>

                {related.length > 0 && (
                  <div className="card-surface p-6">
                    <h3 className="font-heading font-bold text-navy text-lg mb-3">
                      Related Services
                    </h3>
                    <ul className="space-y-2">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/services/${r.slug}`}
                            className="flex items-center gap-2 text-sm text-charcoal hover:text-gold transition-colors py-1"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {r.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="section-padding bg-grey-50">
          <div className="container-max max-w-3xl">
            <FAQSection
              faqs={service.faqs}
              title={`${service.name} — Frequently Asked Questions`}
            />
          </div>
        </section>
      )}

      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-grey-300 text-lg mb-6">
                Tell us about your {service.name.toLowerCase()} project and we will arrange a free
                site survey at a time that suits you.
              </p>
              <ul className="space-y-3 mb-8">
                {['Free no-obligation survey', 'Written quotation within 48 hours', 'Nationwide installation teams'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-grey-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="tel:07414779594" className="btn-gold">
                  Call 07414 779594
                </a>
                <a
                  href="https://wa.me/447397066538"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
