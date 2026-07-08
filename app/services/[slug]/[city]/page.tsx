import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { cities } from '@/data/cities';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import ContactForm from '@/components/ContactForm';

interface PageProps {
  params: Promise<{ slug: string; city: string }>;
}

const cityGeo: Record<string, { latitude: number; longitude: number }> = {
  london: { latitude: 51.5074, longitude: -0.1278 },
  birmingham: { latitude: 52.4862, longitude: -1.8904 },
  manchester: { latitude: 53.4808, longitude: -2.2426 },
  leeds: { latitude: 53.8008, longitude: -1.5491 },
  liverpool: { latitude: 53.4084, longitude: -2.9916 },
  bristol: { latitude: 51.4545, longitude: -2.5879 },
  sheffield: { latitude: 53.3811, longitude: -1.4701 },
  glasgow: { latitude: 55.8642, longitude: -4.2518 },
  cardiff: { latitude: 51.4816, longitude: -3.1791 },
  newcastle: { latitude: 54.9783, longitude: -1.6178 },
  nottingham: { latitude: 52.9548, longitude: -1.1581 },
  leicester: { latitude: 52.6369, longitude: -1.1398 },
  edinburgh: { latitude: 55.9533, longitude: -3.1883 },
  southampton: { latitude: 50.9097, longitude: -1.4044 },
  brighton: { latitude: 50.8225, longitude: -0.1372 },
  coventry: { latitude: 52.4068, longitude: -1.5197 },
  reading: { latitude: 51.4543, longitude: -0.9781 },
  wolverhampton: { latitude: 52.5870, longitude: -2.1288 },
  derby: { latitude: 52.9225, longitude: -1.4746 },
  northampton: { latitude: 52.2405, longitude: -0.9027 },
  luton: { latitude: 51.8787, longitude: -0.4200 },
  swindon: { latitude: 51.5558, longitude: -1.7797 },
  'stoke-on-trent': { latitude: 53.0027, longitude: -2.1794 },
  plymouth: { latitude: 50.3755, longitude: -4.1427 },
  bradford: { latitude: 53.7960, longitude: -1.7594 },
  swansea: { latitude: 51.6214, longitude: -3.9436 },
  oxford: { latitude: 51.7520, longitude: -1.2577 },
  cambridge: { latitude: 52.2053, longitude: 0.1218 },
  york: { latitude: 53.9591, longitude: -1.0815 },
  bath: { latitude: 51.3811, longitude: -2.3590 },
  aberdeen: { latitude: 57.1497, longitude: -2.0943 },
  belfast: { latitude: 54.5973, longitude: -5.9301 },
  'milton-keynes': { latitude: 52.0406, longitude: -0.7594 },
  middlesbrough: { latitude: 54.5742, longitude: -1.2350 },
  bournemouth: { latitude: 50.7192, longitude: -1.8808 },
  portsmouth: { latitude: 50.8198, longitude: -1.0880 },
  norwich: { latitude: 52.6309, longitude: 1.2974 },
  exeter: { latitude: 50.7184, longitude: -3.5339 },
  chester: { latitude: 53.1930, longitude: -2.8931 },
  gloucester: { latitude: 51.8642, longitude: -2.2382 },
  peterborough: { latitude: 52.5695, longitude: -0.2405 },
};

function getServiceIntro(serviceSlug: string, serviceName: string, cityName: string, region: string, areas: string[]): string[] {
  const areaList = areas.slice(0, 5).join(', ');
  const remainingCount = areas.length - 5;
  const areaPhrase = remainingCount > 0
    ? `${areaList}, and ${remainingCount} more areas`
    : areaList;

  switch (serviceSlug) {
    case 'aluminium-shopfronts':
      return [
        `${cityName}'s commercial streets demand shopfronts that combine visual appeal with lasting durability. Sigma Shop Fronts designs and installs aluminium shopfront systems across ${cityName} and the wider ${region} area, using thermally broken frames, toughened glazing, and powder-coat finishes engineered to perform for decades in all weather conditions.`,
        `We work with businesses throughout ${cityName} including ${areaPhrase}, delivering everything from single-unit shopfront replacements to multi-panel installations on commercial developments. Our installation teams are CSCS-carded and experienced in the access logistics, noise management, and waste-removal requirements of busy trading streets.`,
        `Whether you are refitting an existing retail unit or specifying frontages for a new development in ${cityName}, Sigma Shop Fronts will work with your design brief, planning constraints, and budget to deliver an aluminium shopfront system that stands the test of time.`,
      ];

    case 'roller-shutters':
      return [
        `Protecting commercial premises in ${cityName} overnight requires robust physical security. Roller shutters are the most widely specified and effective form of shopfront protection, and Sigma Shop Fronts installs systems across ${region} that are built to resist forced entry, vandalism, and the sustained wear of daily use.`,
        `From high-street retail units in ${areaPhrase} to industrial premises across ${cityName}, we supply and fit both manual and electrically operated roller shutters in solid, perforated, and punched-lath configurations. Perforated and punched options let window displays stay visible after hours — keeping your street presence while deterring opportunistic crime.`,
        `Every shutter installation we carry out in ${cityName} includes a commissioning check, operator training for electric systems, and a parts-and-labour warranty. We also provide scheduled maintenance contracts for businesses that need regular inspection and servicing.`,
      ];

    case 'security-doors':
      return [
        `Commercial security in ${cityName} starts at the entrance. Whether you operate a late-night retail unit, a pharmacy, or a warehouse holding high-value stock, a purpose-built security door provides the physical resistance that insurance underwriters and police crime prevention officers expect to see.`,
        `Sigma Shop Fronts installs steel security doors and LPS 1175-rated entrance systems across ${cityName}, covering ${areaPhrase}. Our range includes doors rated from SR1 through to SR4, with full certification documentation for your insurer. For higher-risk premises in ${cityName}, we can combine security doors with access control preparation, CCTV-ready conduit runs, and anti-vandal hardware.`,
        `Every security door installation is surveyed individually — frame dimensions, structural fixing conditions, and fire escape compliance under the Regulatory Reform (Fire Safety) Order are assessed before we specify the door and ironmongery package for your ${cityName} property.`,
      ];

    case 'automatic-doors':
      return [
        `Automatic entrance systems have become standard for retail, hospitality, and public-facing commercial premises in ${cityName}. From sliding doors at supermarket entrances to swing-door operators on restaurant frontages, an automatic door system manages footfall, improves DDA accessibility under the Equality Act 2010, and reduces heat loss through high-traffic openings.`,
        `Sigma Shop Fronts supplies and installs automatic door systems across ${cityName} and the surrounding ${region} area, including ${areaPhrase}. Our range covers sliding, swing, folding, and revolving operators from leading manufacturers, with all installations complying with BS EN 16005 for power-operated pedestrian doorsets.`,
        `For ${cityName} businesses with high visitor numbers or specific accessibility requirements, we configure activation sensors, safety beams, and hold-open times to match your operational needs. Ongoing maintenance contracts keep your automatic doors compliant and reliable year-round.`,
      ];

    case 'bi-fold-doors':
      return [
        `Bi-fold doors have become one of the most popular commercial frontage choices in ${cityName}, especially for cafes, restaurants, and ground-floor retail units that benefit from opening their full frontage to the street. When folded, the panels stack neatly to one side, creating an unobstructed opening that transforms the relationship between your interior and the pavement outside.`,
        `Sigma Shop Fronts installs commercial bi-fold door systems across ${cityName} including ${areaPhrase}. We work with aluminium and steel-framed systems, selecting the right specification based on your structural opening width, wind-load requirements, and thermal performance targets. All systems include toughened safety glazing, multi-point locking, and powder-coat finishes from the full RAL palette.`,
        `Commercial bi-fold doors see far heavier use than residential installations, so we specify commercial-grade tracks, rollers, and hinge hardware rated for tens of thousands of operating cycles. Every installation in ${cityName} includes a full commissioning check and operational handover.`,
      ];

    case 'fire-doors':
      return [
        `Fire doors are a legal requirement in virtually all commercial premises in ${cityName}. Non-compliance carries serious consequences — both in terms of risk to life and enforcement action under the Regulatory Reform (Fire Safety) Order 2005. Whether you need FD30, FD60, or FD120-rated doorsets, correct specification, installation, and maintenance are non-negotiable.`,
        `Sigma Shop Fronts supplies and installs certified fire door systems across ${cityName} including ${areaPhrase}, using timber, steel, and composite doorsets from third-party accredited manufacturers. Every fire door we fit comes with the correct intumescent strips, cold smoke seals, and ironmongery to maintain the certified fire resistance period.`,
        `For ${cityName} landlords managing multi-tenanted buildings, and businesses undergoing fire risk assessment remediation, we provide complete fire door survey, replacement, and certification services. Our records include photographic evidence and gap-check measurements that your fire risk assessor can verify.`,
      ];

    case 'shopfront-repairs':
      return [
        `Not every shopfront problem in ${cityName} needs a full replacement. Damaged frames, failed glazing seals, sticking doors, broken locks, and cosmetic damage can all be repaired cost-effectively when the underlying structure is sound. Sigma Shop Fronts repairs all types of shopfront systems — aluminium, timber, steel, and UPVC — across ${cityName} and the wider ${region} area.`,
        `We attend premises across ${areaPhrase}, handling both planned repairs and responsive call-outs for damage discovered by business owners arriving to open up. Common work includes replacing cracked or shattered toughened glass, re-hanging misaligned entrance doors, replacing failed door closers, and repairing damaged threshold plates.`,
        `If we assess the damage and conclude that repair is not the most cost-effective route, we will tell you upfront and provide a replacement quotation alongside the repair estimate. Our priority is getting your ${cityName} premises secure and presentable as quickly as possible.`,
      ];

    case 'emergency-callout':
      return [
        `When a shopfront is smashed overnight, a security shutter jams half-open, or a break-in leaves your ${cityName} premises exposed, you need a response in hours, not days. Sigma Shop Fronts operates an emergency callout service across ${cityName} and the surrounding ${region} area, aiming to make your property secure the same day you call.`,
        `We cover emergencies across ${areaPhrase}, attending to forced-entry damage, storm damage, vehicle impact, and failed security systems. Our emergency vehicles carry boarding materials, temporary glazing panels, replacement locks, and shutter motor components — resolving the majority of call-outs in a single visit.`,
        `For ${cityName} businesses, an insecure premises is both a crime invitation and a potential insurance compliance issue. We provide a written report of all emergency work carried out for your insurer, and follow up with a permanent repair quotation within 48 hours where further work is needed.`,
      ];

    case 'shutter-repair':
      return [
        `A roller shutter that will not open locks your ${cityName} business out. One that will not close leaves it exposed overnight. Either way, shutter failure is an urgent operational problem. Sigma Shop Fronts provides fast shutter repair across ${cityName}, designed to get your shutters working again with minimal disruption to trading.`,
        `We repair all types of roller shutters across ${areaPhrase} — manual, spring-assisted, and electrically operated systems from all major manufacturers. Common faults we attend to in ${cityName} include motor failures, damaged slats, bent guide rails, broken spring assemblies, faulty limit switches, and remote-control issues.`,
        `Our engineers carry a comprehensive stock of replacement parts, and most ${cityName} shutter repairs are completed in a single visit. Where a component needs ordering, we make the shutter safe and secure in the interim and return to finish the repair as soon as the part arrives.`,
      ];

    case 'glass-replacement':
      return [
        `Broken or damaged glazing on a commercial premises in ${cityName} is a security risk and a poor first impression for customers. Whether a single pane has cracked, a sealed unit has misted between the panes, or an entire shopfront panel has shattered, Sigma Shop Fronts restores your frontage to its original standard.`,
        `We replace glass in all types of shopfront systems across ${cityName}, including ${areaPhrase}. Our work covers toughened safety glass, laminated security glass, double-glazed sealed units, and specialist specifications including solar-control coatings and acoustic interlayers. All replacement glass meets BS EN 12150-1 for toughened products and BS EN 14449 for laminated assemblies.`,
        `For ${cityName} businesses needing glazing replaced after a break-in or accidental damage, we liaise with your insurer and provide glass specification, safety certification, and photographic records to support your claim. Temporary boarding is available if the replacement glass cannot be installed immediately.`,
      ];

    default:
      return [
        `Sigma Shop Fronts provides professional ${serviceName.toLowerCase()} services across ${cityName} and the wider ${region} area. Our experienced teams work with commercial and retail clients in areas including ${areaPhrase}, delivering installations and services that meet current British Standards and Building Regulations.`,
        `Every project in ${cityName} begins with a free site survey, during which we assess the specific requirements of your premises, discuss your priorities, and identify any planning or structural considerations that could affect the work. We then provide a detailed, fixed-price quotation with no hidden costs.`,
        `Whether you are an independent retailer, a landlord managing a commercial portfolio, or a developer fitting out new units in ${cityName}, Sigma Shop Fronts has the experience and technical capability to deliver your ${serviceName.toLowerCase()} project on time and to specification.`,
      ];
  }
}

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ slug: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!service || !city) return {};

  const siteUrl = 'https://www.sigmashopfronts.com';
  const geo = cityGeo[citySlug] || { latitude: 51.5074, longitude: -0.1278 };
  const topAreas = city.areas.slice(0, 3).join(', ');

  // Only core cities should be indexed — extra cities are noindex (PPC only)
  const coreCities = ['london','birmingham','leeds','liverpool','glasgow','cardiff','newcastle','edinburgh','bradford','stoke-on-trent','swansea','york','oxford','cambridge','middlesbrough','plymouth'];
  const isCore = coreCities.includes(citySlug);

  return {
    title: `${service.name} in ${city.name} | Sigma Shop Fronts`,
    description: `Professional ${service.name.toLowerCase()} installation in ${city.name} covering ${topAreas} and surrounding areas. Free site survey and no-obligation quote. Call 07414 779594.`,
    ...(!isCore && { robots: { index: false, follow: true } }),
    alternates: { canonical: `${siteUrl}/services/${slug}/${citySlug}` },
    openGraph: {
      title: `${service.name} in ${city.name} | Sigma Shop Fronts`,
      description: `Professional ${service.name.toLowerCase()} installation in ${city.name} covering ${topAreas} and surrounding areas. Free site survey and no-obligation quote.`,
      url: `${siteUrl}/services/${slug}/${citySlug}`,
      type: 'website',
      images: [{ url: `/assets/${service.heroImage}`, width: 1200, height: 630 }],
    },
    other: {
      'geo.region': 'GB',
      'geo.placename': `${city.name}, United Kingdom`,
      'geo.position': `${geo.latitude};${geo.longitude}`,
      'ICBM': `${geo.latitude}, ${geo.longitude}`,
    },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { slug, city: citySlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!service || !city) notFound();

  const siteUrl = 'https://www.sigmashopfronts.com';
  const geo = cityGeo[citySlug] || { latitude: 51.5074, longitude: -0.1278 };

  const introParagraphs = getServiceIntro(service.slug, service.name, city.name, city.region, city.areas);

  const otherServices = services.filter((s) => s.slug !== slug);
  const otherCities = cities.filter((c) => c.slug !== citySlug).slice(0, 12);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/services/${slug}/${citySlug}/#service`,
    name: `${service.name} in ${city.name}`,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sigma Shop Fronts',
      telephone: '+447414779594',
      email: 'sales@sigmashopfronts.com',
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 Thornwood Close',
        addressLocality: 'Oldbury',
        postalCode: 'B68 9LX',
        addressCountry: 'GB',
        addressRegion: 'West Midlands',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.4621,
        longitude: -2.0174,
      },
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    url: `${siteUrl}/services/${slug}/${citySlug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/services/${slug}/${citySlug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${siteUrl}/services/${slug}` },
      { '@type': 'ListItem', position: 4, name: city.name, item: `${siteUrl}/services/${slug}/${citySlug}` },
    ],
  };

  const faqSchema = service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <SchemaMarkup type="Service" data={serviceSchema} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end bg-navy">
        <Image
          src={`/assets/${service.heroImage}`}
          alt={`${service.name} installation in ${city.name} by Sigma Shop Fronts`}
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
                { label: service.name, href: `/services/${slug}` },
                { label: city.name },
              ]}
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-4">
              {service.name} in {city.name}
            </h1>
            <p className="text-grey-300 text-lg mt-3 max-w-2xl">
              Professional {service.name.toLowerCase()} supply, installation, and maintenance across {city.name} and {city.region}.
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

      {/* Intro section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="prose prose-lg max-w-none text-charcoal leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-6">
              {service.name} Across {city.name}
            </h2>
            {introParagraphs.map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      {service.benefits.length > 0 && (
        <section className="section-padding bg-grey-50">
          <div className="container-max">
            <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
              Why Choose Our {service.name}
            </h2>
            <p className="text-grey-600 text-center max-w-2xl mx-auto mb-10">
              Every {service.name.toLowerCase()} project we deliver in {city.name} is backed by quality materials, experienced installation teams, and reliable aftercare.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="card-surface p-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{benefit.title}</h3>
                  <p className="text-grey-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas We Cover */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
            Areas We Cover in {city.name}
          </h2>
          <p className="text-grey-600 text-center max-w-2xl mx-auto mb-10">
            Our {service.name.toLowerCase()} service is available across {city.name} and all surrounding areas in {city.region}.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {city.areas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 bg-grey-50 rounded-full text-sm text-charcoal border border-grey-200 font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
            {city.postcodeAreas.length > 0 && (
              <p className="text-grey-500 text-sm text-center">
                Postcode areas covered: {city.postcodeAreas.join(', ')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {service.howItWorks && service.howItWorks.length > 0 && (
        <section className="section-padding bg-grey-50">
          <div className="container-max max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
              How It Works
            </h2>
            <p className="text-grey-600 text-center mb-10 max-w-2xl mx-auto">
              From initial enquiry to completed installation in {city.name} — here is what to expect when you choose Sigma Shop Fronts for your {service.name.toLowerCase()} project.
            </p>
            <div className="relative">
              <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gold/20" aria-hidden="true" />
              <div className="space-y-8">
                {service.howItWorks.map((step) => (
                  <div key={step.step} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-navy flex items-center justify-center shadow-md">
                      <span className="text-gold font-heading font-bold text-xl">{step.step}</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="font-heading font-bold text-navy text-lg">{step.title}</h3>
                      <p className="text-grey-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Guide */}
      {service.pricingGuide && (
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
              {service.pricingGuide.heading}
            </h2>
            <p className="text-grey-600 text-center mb-10 max-w-2xl mx-auto">
              {service.pricingGuide.content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.pricingGuide.ranges.map((range, i) => (
                <div key={i} className="card-surface p-5 flex justify-between items-center">
                  <span className="text-charcoal font-medium">{range.item}</span>
                  <span className="text-navy font-heading font-bold whitespace-nowrap ml-4">{range.price}</span>
                </div>
              ))}
            </div>
            <p className="text-grey-500 text-sm text-center mt-6">{service.pricingGuide.note}</p>
            <div className="text-center mt-6">
              <Link href="/contact" className="btn-gold">
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="section-padding bg-grey-50">
          <div className="container-max max-w-3xl">
            <FAQSection
              faqs={service.faqs}
              title={`${service.name} in ${city.name} — Frequently Asked Questions`}
            />
          </div>
        </section>
      )}

      {/* Other Services in This City */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
            Other Services in {city.name}
          </h2>
          <p className="text-grey-600 text-center max-w-2xl mx-auto mb-10">
            We provide the full range of commercial shopfront and security solutions across {city.name}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${citySlug}`}
                className="card-surface p-5 flex items-center gap-3 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4 2l4 4-4 4" stroke="#1a2744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-navy text-sm group-hover:text-gold transition-colors">
                    {s.name}
                  </p>
                  <p className="text-grey-500 text-xs mt-0.5">{s.name} in {city.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* This Service in Other Cities */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
            {service.name} in Other Cities
          </h2>
          <p className="text-grey-600 text-center max-w-2xl mx-auto mb-10">
            We install {service.name.toLowerCase()} across the UK. Find your nearest location below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${slug}/${c.slug}`}
                className="card-surface p-4 text-center hover:shadow-md transition-shadow group"
              >
                <p className="font-heading font-bold text-navy text-sm group-hover:text-gold transition-colors">
                  {c.name}
                </p>
                <p className="text-grey-500 text-xs mt-0.5">{c.region}</p>
              </Link>
            ))}
          </div>
          {cities.filter((c) => c.slug !== citySlug).length > 12 && (
            <div className="text-center mt-6">
              <Link href="/areas" className="text-gold hover:text-gold-dark font-medium text-sm inline-flex items-center gap-1 transition-colors">
                View all locations
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA with Contact Form */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Get Your Free {service.name} Quote in {city.name}
              </h2>
              <p className="text-grey-300 text-lg mb-6">
                Tell us about your {service.name.toLowerCase()} project in {city.name} and we will arrange a free
                site survey at a time that suits you.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Free no-obligation site survey',
                  'Written quotation within 48 hours',
                  `Covering all ${city.name} postcodes`,
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
