import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cities } from '@/data/cities';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import ContactForm from '@/components/ContactForm';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const allServices = [
  { name: 'Aluminium Shopfronts', slug: 'aluminium-shopfronts', image: 'aluminium-shopfront-1.jpeg' },
  { name: 'Roller Shutters', slug: 'roller-shutters', image: 'roller-shutter-1.jpeg' },
  { name: 'Security Doors', slug: 'security-doors', image: 'security door.jpeg' },
  { name: 'Automatic Doors', slug: 'automatic-doors', image: 'automatic-door-sigma.jpeg' },
  { name: 'Bi-Fold Doors', slug: 'bi-fold-doors', image: 'bi-fold door.jpeg' },
  { name: 'Fire Doors', slug: 'fire-doors', image: 'fire-door.jpeg' },
  { name: 'Shopfront Repairs', slug: 'shopfront-repairs', image: 'shopfront-3.jpeg' },
  { name: 'Emergency Callout', slug: 'emergency-callout', image: 'sigma-front-variant.jpeg' },
  { name: 'Shutter Repair', slug: 'shutter-repair', image: 'roller-shutter-1.jpeg' },
  { name: 'Glass Replacement', slug: 'glass-replacement', image: 'aluminium-shopfront-1.jpeg' },
];

const cityGeo: Record<string, { addressLocality: string; addressRegion: string; postalCode: string; latitude: number; longitude: number }> = {
  london:      { addressLocality: 'London',              addressRegion: 'Greater London',      postalCode: 'EC1A',  latitude: 51.5074,  longitude: -0.1278 },
  birmingham:  { addressLocality: 'Birmingham',          addressRegion: 'West Midlands',       postalCode: 'B1',    latitude: 52.4862,  longitude: -1.8904 },
  manchester:  { addressLocality: 'Manchester',          addressRegion: 'Greater Manchester',   postalCode: 'M1',    latitude: 53.4808,  longitude: -2.2426 },
  leeds:       { addressLocality: 'Leeds',               addressRegion: 'West Yorkshire',      postalCode: 'LS1',   latitude: 53.8008,  longitude: -1.5491 },
  liverpool:   { addressLocality: 'Liverpool',           addressRegion: 'Merseyside',          postalCode: 'L1',    latitude: 53.4084,  longitude: -2.9916 },
  bristol:     { addressLocality: 'Bristol',             addressRegion: 'Bristol',              postalCode: 'BS1',   latitude: 51.4545,  longitude: -2.5879 },
  sheffield:   { addressLocality: 'Sheffield',           addressRegion: 'South Yorkshire',     postalCode: 'S1',    latitude: 53.3811,  longitude: -1.4701 },
  glasgow:     { addressLocality: 'Glasgow',             addressRegion: 'Scotland',            postalCode: 'G1',    latitude: 55.8642,  longitude: -4.2518 },
  cardiff:     { addressLocality: 'Cardiff',             addressRegion: 'Wales',               postalCode: 'CF10',  latitude: 51.4816,  longitude: -3.1791 },
  newcastle:   { addressLocality: 'Newcastle upon Tyne', addressRegion: 'Tyne and Wear',      postalCode: 'NE1',   latitude: 54.9783,  longitude: -1.6178 },
  nottingham:  { addressLocality: 'Nottingham',          addressRegion: 'Nottinghamshire',     postalCode: 'NG1',   latitude: 52.9548,  longitude: -1.1581 },
  leicester:   { addressLocality: 'Leicester',           addressRegion: 'Leicestershire',      postalCode: 'LE1',   latitude: 52.6369,  longitude: -1.1398 },
  edinburgh:   { addressLocality: 'Edinburgh',           addressRegion: 'Scotland',            postalCode: 'EH1',   latitude: 55.9533,  longitude: -3.1883 },
  southampton: { addressLocality: 'Southampton',         addressRegion: 'Hampshire',           postalCode: 'SO14',  latitude: 50.9097,  longitude: -1.4044 },
  brighton:    { addressLocality: 'Brighton',            addressRegion: 'East Sussex',         postalCode: 'BN1',   latitude: 50.8225,  longitude: -0.1372 },
  coventry:    { addressLocality: 'Coventry',            addressRegion: 'West Midlands',       postalCode: 'CV1',   latitude: 52.4068,  longitude: -1.5197 },
  reading:     { addressLocality: 'Reading',             addressRegion: 'Berkshire',           postalCode: 'RG1',   latitude: 51.4543,  longitude: -0.9781 },
  wolverhampton: { addressLocality: 'Wolverhampton',     addressRegion: 'West Midlands',       postalCode: 'WV1',   latitude: 52.5870,  longitude: -2.1288 },
  derby:       { addressLocality: 'Derby',               addressRegion: 'Derbyshire',          postalCode: 'DE1',   latitude: 52.9225,  longitude: -1.4746 },
  northampton: { addressLocality: 'Northampton',         addressRegion: 'Northamptonshire',    postalCode: 'NN1',   latitude: 52.2405,  longitude: -0.9027 },
  luton:       { addressLocality: 'Luton',               addressRegion: 'Bedfordshire',        postalCode: 'LU1',   latitude: 51.8787,  longitude: -0.4200 },
  swindon:     { addressLocality: 'Swindon',             addressRegion: 'Wiltshire',           postalCode: 'SN1',   latitude: 51.5558,  longitude: -1.7797 },
  'stoke-on-trent': { addressLocality: 'Stoke-on-Trent', addressRegion: 'Staffordshire',      postalCode: 'ST1',   latitude: 53.0027,  longitude: -2.1794 },
  plymouth:    { addressLocality: 'Plymouth',            addressRegion: 'Devon',               postalCode: 'PL1',   latitude: 50.3755,  longitude: -4.1427 },
  oxford:        { addressLocality: 'Oxford',             addressRegion: 'Oxfordshire',         postalCode: 'OX1',   latitude: 51.7520,  longitude: -1.2577 },
  cambridge:     { addressLocality: 'Cambridge',          addressRegion: 'Cambridgeshire',      postalCode: 'CB1',   latitude: 52.2053,  longitude: 0.1218 },
  york:          { addressLocality: 'York',               addressRegion: 'North Yorkshire',     postalCode: 'YO1',   latitude: 53.9591,  longitude: -1.0815 },
  bath:          { addressLocality: 'Bath',               addressRegion: 'Somerset',            postalCode: 'BA1',   latitude: 51.3811,  longitude: -2.3590 },
  aberdeen:      { addressLocality: 'Aberdeen',           addressRegion: 'Scotland',            postalCode: 'AB10',  latitude: 57.1497,  longitude: -2.0943 },
  belfast:       { addressLocality: 'Belfast',            addressRegion: 'Northern Ireland',    postalCode: 'BT1',   latitude: 54.5973,  longitude: -5.9301 },
  'milton-keynes': { addressLocality: 'Milton Keynes',    addressRegion: 'Buckinghamshire',     postalCode: 'MK9',   latitude: 52.0406,  longitude: -0.7594 },
  middlesbrough: { addressLocality: 'Middlesbrough',      addressRegion: 'North Yorkshire',     postalCode: 'TS1',   latitude: 54.5742,  longitude: -1.2350 },
  bournemouth:   { addressLocality: 'Bournemouth',        addressRegion: 'Dorset',              postalCode: 'BH1',   latitude: 50.7192,  longitude: -1.8808 },
  portsmouth:    { addressLocality: 'Portsmouth',         addressRegion: 'Hampshire',           postalCode: 'PO1',   latitude: 50.8198,  longitude: -1.0880 },
  norwich:       { addressLocality: 'Norwich',            addressRegion: 'Norfolk',             postalCode: 'NR1',   latitude: 52.6309,  longitude: 1.2974 },
  exeter:        { addressLocality: 'Exeter',             addressRegion: 'Devon',               postalCode: 'EX1',   latitude: 50.7184,  longitude: -3.5339 },
  chester:       { addressLocality: 'Chester',            addressRegion: 'Cheshire',            postalCode: 'CH1',   latitude: 53.1930,  longitude: -2.8931 },
  gloucester:    { addressLocality: 'Gloucester',         addressRegion: 'Gloucestershire',     postalCode: 'GL1',   latitude: 51.8642,  longitude: -2.2382 },
  peterborough:  { addressLocality: 'Peterborough',       addressRegion: 'Cambridgeshire',      postalCode: 'PE1',   latitude: 52.5695,  longitude: -0.2405 },
};

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};

  const siteUrl = 'https://www.sigmashopfronts.com';
  const geo = cityGeo[citySlug] || { addressLocality: city.name, addressRegion: '', postalCode: '', latitude: 51.5074, longitude: -0.1278 };

  // Only core cities should be indexed — extra cities are noindex
  const coreCities = ['london','birmingham','leeds','liverpool','glasgow','cardiff','newcastle','edinburgh','bradford','stoke-on-trent','swansea','york','oxford','cambridge','middlesbrough','plymouth','coventry','nottingham','manchester','sheffield','bristol','leicester'];
  const isCore = coreCities.includes(citySlug);

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    ...(!isCore && { robots: { index: false, follow: true } }),
    alternates: { canonical: `${siteUrl}/areas/${citySlug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${siteUrl}/areas/${citySlug}`,
      type: 'website',
      images: [{ url: '/assets/sigma-hero-1.jpeg', width: 1200, height: 630 }],
    },
    other: {
      'geo.region': 'GB',
      'geo.placename': `${city.name}, United Kingdom`,
      'geo.position': `${geo.latitude};${geo.longitude}`,
      'ICBM': `${geo.latitude}, ${geo.longitude}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const siteUrl = 'https://www.sigmashopfronts.com';

  const geo = cityGeo[citySlug] || { addressLocality: city.name, addressRegion: city.region, postalCode: '', latitude: 51.5074, longitude: -0.1278 };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/areas/${citySlug}/#localbusiness`,
    name: 'Sigma Shop Fronts',
    description: `Professional shopfront installation, roller shutters, and security doors in ${city.name}`,
    url: `${siteUrl}/areas/${citySlug}`,
    telephone: '+447414779594',
    email: 'sales@sigmashopfronts.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: geo.addressLocality,
      addressRegion: geo.addressRegion,
      postalCode: geo.postalCode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-16:00'],
    priceRange: '££',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Shopfront Services in ${city.name}`,
      itemListElement: allServices.map(s => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: `${siteUrl}/services/${s.slug}`,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Areas',
        item: `${siteUrl}/areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `${siteUrl}/areas/${citySlug}`,
      },
    ],
  };

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={localBusinessSchema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative min-h-[45vh] flex items-end bg-navy">
        <Image
          src="/assets/sigma-front-wide.jpeg"
          alt={`Shopfront installation in ${city.name} by Sigma Shop Fronts`}
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Areas', href: '/areas' },
                { label: city.name },
              ]}
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-4">
              Shopfront Installation in {city.name}
            </h1>
            <p className="text-grey-300 text-lg mt-3 max-w-2xl">
              Professional shopfronts, roller shutters, and security doors across {city.name} and {city.region}.
            </p>
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
                {city.description.split('\n\n').map((paragraph, i) => {
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

              <div className="mt-8 p-6 bg-grey-50 rounded-xl">
                <h3 className="font-heading font-bold text-navy text-lg mb-3">
                  Areas We Cover in {city.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {city.areas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 bg-white rounded-full text-sm text-charcoal border border-grey-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                {city.postcodeAreas.length > 0 && (
                  <p className="text-grey-500 text-sm mt-3">
                    Postcode areas: {city.postcodeAreas.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card-surface p-6 bg-navy text-white">
                  <h3 className="font-heading font-bold text-gold text-lg mb-2">
                    {city.name} Enquiry
                  </h3>
                  <p className="text-grey-300 text-sm mb-4">
                    Get a free site survey in {city.name} — usually within 48 hours.
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

                <div className="card-surface p-6">
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">
                    Why Sigma in {city.name}?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Local teams with national backing',
                      'Free no-obligation site surveys',
                      'Fast lead times on all projects',
                      'Companies House registered',
                      '24/7 emergency callout available',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-charcoal">
                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
            Our {city.name} Services
          </h2>
          <p className="text-grey-600 text-center max-w-2xl mx-auto mb-10">
            We provide the full range of commercial shopfront and security solutions across {city.name} and the surrounding {city.region} area.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group card-surface overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={`/assets/${service.image}`}
                    alt={`${service.name} in ${city.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-navy text-sm group-hover:text-gold transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-gold text-xs font-medium mt-1 inline-flex items-center gap-1">
                    Learn more
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {city.testimonials.length > 0 && (
        <section className="section-padding">
          <div className="container-max max-w-3xl">
            <h2 className="text-3xl font-heading font-bold text-navy text-center mb-8">
              What Our {city.name} Clients Say
            </h2>
            <TestimonialCarousel testimonials={city.testimonials} />
          </div>
        </section>
      )}

      {city.faqs.length > 0 && (
        <section className="section-padding bg-grey-50">
          <div className="container-max max-w-3xl">
            <FAQSection
              faqs={city.faqs}
              title={`Shopfront Installation in ${city.name} — FAQ`}
            />
          </div>
        </section>
      )}

      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Get Your Free Quote in {city.name}
              </h2>
              <p className="text-grey-300 text-lg mb-6">
                Whether you need a new shopfront, roller shutters, or emergency repairs in {city.name},
                our team is ready to help. Fill in the form and we will arrange a free site survey.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  `Serving all ${city.name} postcodes`,
                  'Free site survey within 48 hours',
                  'Competitive written quotations',
                  '24/7 emergency callout available',
                ].map((item) => (
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
            <ContactForm defaultCity={city.name} />
          </div>
        </div>
      </section>
    </>
  );
}
