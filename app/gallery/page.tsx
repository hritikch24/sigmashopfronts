import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Project Gallery',
  description:
    'Browse Sigma Shop Fronts\' portfolio of completed projects — aluminium shopfronts, roller shutters, security doors, automatic doors, and more across the United Kingdom.',
  alternates: {
    canonical: '/gallery',
  },
};

const images = [
  {
    src: '/assets/sigma-hero-1.jpeg',
    alt: 'Modern aluminium shopfront installation by Sigma Shop Fronts',
  },
  {
    src: '/assets/sigma-front-wide.jpeg',
    alt: 'Wide-span aluminium shopfront with full-height glazing',
  },
  {
    src: '/assets/sigma-mall-front.jpeg',
    alt: 'Retail mall shopfront unit completed by Sigma Shop Fronts',
  },
  {
    src: '/assets/sigma-glass-front.jpeg',
    alt: 'Floor-to-ceiling glass shopfront for commercial retail unit',
  },
  {
    src: '/assets/sigma-roller-front.jpeg',
    alt: 'Integrated roller shutter shopfront installation',
  },
  {
    src: '/assets/sigma-retail-front.jpeg',
    alt: 'Bespoke retail shopfront with powder-coated aluminium frame',
  },
  {
    src: '/assets/sigma-security-door.jpeg',
    alt: 'Heavy-duty security door fitted to commercial premises',
  },
  {
    src: '/assets/sigma-front-variant.jpeg',
    alt: 'Contemporary shopfront variant with slim-line aluminium profile',
  },
  {
    src: '/assets/sigma-modern-front.jpeg',
    alt: 'Modern shopfront design with tinted safety glass panels',
  },
  {
    src: '/assets/aluminium-shopfront-1.jpeg',
    alt: 'Aluminium shopfront installation — full elevation view',
  },
  {
    src: '/assets/roller-shutter-1.jpeg',
    alt: 'Perforated roller shutter installed above shopfront entrance',
  },
  {
    src: '/assets/security-grill-1.jpeg',
    alt: 'Steel security grille protecting retail shopfront overnight',
  },
  {
    src: '/assets/bifolding-door-1.jpeg',
    alt: 'Aluminium bi-fold door system opening to outdoor seating area',
  },
  {
    src: '/assets/automatic-door-1.jpeg',
    alt: 'Automatic sliding door installation at commercial entrance',
  },
  {
    src: '/assets/fire-door.jpeg',
    alt: 'Fire-rated door installation meeting current UK regulations',
  },
  {
    src: '/assets/fire-exit-door-1.jpeg',
    alt: 'Fire exit door with push-bar hardware fitted to rear of premises',
  },
  {
    src: '/assets/shopfront-2.jpeg',
    alt: 'Traditional aluminium shopfront with central entrance door',
  },
  {
    src: '/assets/shopfront-3.jpeg',
    alt: 'Corner shopfront unit with frameless glass panels',
  },
  {
    src: '/assets/shopfront-4.jpeg',
    alt: 'Shopfront installation for independent high-street retailer',
  },
  {
    src: '/assets/shopfront-5.jpeg',
    alt: 'Refurbished shopfront with new aluminium frames and sealed units',
  },
  {
    src: '/assets/shopfront-6.jpeg',
    alt: 'Large-format glazed shopfront for restaurant premises',
  },
  {
    src: '/assets/shopfront-7.jpeg',
    alt: 'Night-time view of illuminated shopfront with polished aluminium',
  },
  {
    src: '/assets/sigma-gallery-1.jpeg',
    alt: 'Portfolio showcase — completed shopfront project by Sigma Shop Fronts',
  },
];

export default function GalleryPage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sigmashopfronts.com' }, { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://www.sigmashopfronts.com/gallery' }] }) }} />

      {/* Hero */}
      <section className="bg-gradient-dark section-padding">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />
          <h1 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Our Recent <span className="text-gradient-gold">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-300 leading-relaxed">
            Every project we complete is a testament to the skill and dedication of our team. Browse
            our portfolio below to see the breadth of work we handle — from single shopfront replacements
            to complex multi-unit installations across the UK.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding pb-0">
        <div className="container-max">
          <p className="text-grey-600 max-w-3xl leading-relaxed">
            Our portfolio spans aluminium shopfronts, roller shutters, security grilles, automatic sliding
            doors, bi-fold systems, fire doors, and bespoke glazing solutions. Whether you are seeking
            inspiration for a new installation or want to see the standard of finish we consistently
            achieve, you will find examples of our craftsmanship below. All projects shown were completed
            by our own in-house installation teams.
          </p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="section-padding">
        <div className="container-max">
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            style={{ columnGap: '1rem' }}
          >
            {images.map((image) => (
              <div
                key={image.src}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-grey-100"
              >
                <div className="relative w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover block"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="px-3 py-2 text-xs text-grey-500 bg-white leading-snug">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Like What You See?
          </h2>
          <p className="text-grey-300 mb-8 max-w-xl mx-auto">
            We would love to add your project to our portfolio. Contact us today for a free, no-obligation
            site survey and a detailed quotation tailored to your premises.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Request a Free Quote
            </Link>
            <Link href="/services" className="btn-outline">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
