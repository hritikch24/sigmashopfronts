import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'All Shopfront & Security Services',
  description:
    'Explore our full range of commercial shopfront services: aluminium shopfronts, roller shutters, security doors, automatic doors, bi-fold doors, fire doors, repairs and 24/7 emergency callout.',
  alternates: { canonical: 'https://www.sigmashopfronts.com/services' },
};

const services = [
  { name: 'Aluminium Shopfronts', slug: 'aluminium-shopfronts', image: 'aluminium-shopfront-1.jpeg', desc: 'Bespoke aluminium shopfront systems designed, fabricated, and installed to your specification. Thermally broken profiles for energy efficiency.' },
  { name: 'Roller Shutters', slug: 'roller-shutters', image: 'roller-shutter-1.jpeg', desc: 'Commercial-grade steel and aluminium roller shutters. Manual or electric operation, built for heavy daily use.' },
  { name: 'Security Doors', slug: 'security-doors', image: 'security door.jpeg', desc: 'High-security steel and composite doors with multi-point locking. LPS 1175 rated options available.' },
  { name: 'Automatic Doors', slug: 'automatic-doors', image: 'automatic-door-sigma.jpeg', desc: 'Sliding, swing, and revolving automatic door systems. Full installation, commissioning, and maintenance.' },
  { name: 'Bi-Fold Doors', slug: 'bi-fold-doors', image: 'bi-fold door.jpeg', desc: 'Aluminium bi-folding door systems that fully open your facade to the street. Thermally broken profiles.' },
  { name: 'Fire Doors', slug: 'fire-doors', image: 'fire-door.jpeg', desc: 'FD30 and FD60 certified fire doors for commercial premises. Fully compliant with UK Building Regulations.' },
  { name: 'Shopfront Repairs', slug: 'shopfront-repairs', image: 'shopfront-3.jpeg', desc: 'Fast, affordable repairs to broken glass, damaged frames, faulty locks, and failed mechanisms.' },
  { name: 'Emergency Callout', slug: 'emergency-callout', image: 'sigma-front-variant.jpeg', desc: '24/7 emergency boarding, glazing, and shutter repairs. Rapid-response teams mobilised across the UK.' },
  { name: 'Shutter Repair', slug: 'shutter-repair', image: 'roller-shutter-1.jpeg', desc: 'Fast roller shutter repairs — jammed shutters, broken springs, motor failure, damaged laths, and bent guides. Same-day service available.' },
  { name: 'Glass Replacement', slug: 'glass-replacement', image: 'aluminium-shopfront-1.jpeg', desc: 'Commercial glass replacement — toughened, laminated, DGUs, and security-rated glass. Measured and installed to BS 6262.' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative min-h-[35vh] flex items-end bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-4">
            Our Shopfront &amp; Security Services
          </h1>
          <p className="text-grey-300 text-lg mt-3 max-w-2xl">
            From bespoke aluminium shopfronts to 24/7 emergency callouts, we provide the full range of commercial entrance and security solutions across the UK.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group card-surface overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`/assets/${service.image}`}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-heading font-bold text-navy text-lg group-hover:text-gold transition-colors mb-2">
                    {service.name}
                  </h2>
                  <p className="text-grey-600 text-sm leading-relaxed mb-3">{service.desc}</p>
                  <span className="text-gold text-sm font-semibold inline-flex items-center gap-1">
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Need a Free Quote?
          </h2>
          <p className="text-grey-300 text-lg max-w-xl mx-auto mb-8">
            Tell us about your project and we will provide a detailed, no-obligation quotation.
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
