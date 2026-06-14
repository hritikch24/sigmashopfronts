import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sigma Shop Fronts — a West Midlands-based shopfront specialist with a passion for quality craftsmanship, reliability, and competitive pricing. Companies House registered (No. 16794487).',
  alternates: {
    canonical: '/about',
  },
};

const pillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Quality',
    description:
      'Every installation uses premium-grade aluminium profiles, toughened safety glass, and industry-approved hardware. We never cut corners because your business deserves the best.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Reliability',
    description:
      'We arrive on time, work to agreed schedules, and keep you informed at every stage. From initial survey through to sign-off, you can count on us to deliver as promised.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Value',
    description:
      'Competitive, transparent pricing with no hidden costs. Our detailed quotes itemise every element so you know exactly what you are paying for before any work begins.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Safety',
    description:
      'All our installations comply with current UK building regulations and fire-safety standards. Our team holds relevant trade qualifications, and all work is fully insured.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sigmashopfronts.com' }, { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.sigmashopfronts.com/about' }] }) }} />
      <SchemaMarkup type="LocalBusiness" />

      {/* Hero / Intro */}
      <section className="bg-gradient-dark section-padding">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
          <h1 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            About <span className="text-gradient-gold">Sigma Shop Fronts</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-300 leading-relaxed">
            A West Midlands–based specialist in the design, fabrication, and installation of commercial
            shopfronts — trusted by businesses across the United Kingdom.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-grey-600 leading-relaxed">
                <p>
                  Sigma Shop Fronts was established in the West Midlands by a team of experienced shopfront
                  engineers who recognised that many businesses were struggling to find a contractor who could
                  deliver consistent quality, honest pricing, and dependable aftercare all under one roof. We
                  set out to change that.
                </p>
                <p>
                  From our roots in the heart of England, we have grown steadily into a nationally recognised
                  brand — completing installations for independent retailers, restaurant chains, office
                  developments, supermarkets, and leisure venues across England, Wales, and Scotland. Our
                  growth has been driven not by aggressive marketing, but by the recommendations of satisfied
                  clients who trust us to look after their premises.
                </p>
                <p>
                  We are registered at Companies House under company number{' '}
                  <strong className="text-navy">16794487</strong>, and we operate with full public liability
                  and employers&apos; liability insurance. Transparency and accountability sit at the core of
                  how we do business, and we are proud to be a legitimate, regulated UK company.
                </p>
                <p>
                  Today, Sigma Shop Fronts offers a complete turnkey service: from initial site survey and
                  bespoke design through to professional fabrication, installation, and long-term maintenance.
                  Whether you need a single replacement shopfront panel or a multi-unit rollout across a retail
                  estate, we have the skills and capacity to deliver on time and within budget.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="/assets/sigma-front-wide.jpeg"
                alt="Sigma Shop Fronts — wide aluminium shopfront installation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">What We Do</h2>
          <p className="text-grey-600 max-w-3xl leading-relaxed mb-8">
            We specialise in every aspect of commercial entrance solutions — from full shopfront replacement to
            bespoke security systems and automated access. Our in-house team handles the complete project
            lifecycle, which means tighter quality control, clearer communication, and accountability from
            start to finish.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Aluminium Shopfront Design & Fabrication',
              'Roller Shutter Installation & Repair',
              'Security Door Systems',
              'Automatic Sliding & Swing Doors',
              'Bi-Fold Door Systems',
              'Fire-Rated Door Solutions',
              'Toughened & Laminated Glass',
              'Emergency Callout & Boarding',
              'Planned Maintenance Contracts',
            ].map((service) => (
              <div key={service} className="flex items-start gap-3 p-4 card-surface rounded-lg">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2 2 4-4" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-grey-700 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Values */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">Our Team &amp; Values</h2>
          <div className="space-y-4 text-grey-600 leading-relaxed max-w-3xl mb-12">
            <p>
              Our installation crews are time-served tradesmen with decades of combined experience in the
              shopfitting and glazing industries. Every member of the team has undergone the relevant health
              and safety training, holds valid CSCS cards where applicable, and is supported by a proactive
              management team based here in the West Midlands.
            </p>
            <p>
              We believe that a business&apos;s shopfront is its first impression — the face it presents to the
              world every single day. That belief drives our obsessive attention to detail: precise
              measurements, clean aluminium finishes, perfectly aligned glass units, and hardware that operates
              smoothly for years to come.
            </p>
            <p>
              Beyond technical skill, we place enormous value on communication. We keep clients updated
              throughout the project, flag any issues immediately, and will never present a surprise invoice at
              the end. If something unforeseen arises on site, we discuss it with you and agree the best way
              forward before proceeding.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card-surface rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy text-gold mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-navy mb-2">{pillar.title}</h3>
                <p className="text-grey-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Trust Us */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">
            Why Businesses Choose Sigma Shop Fronts
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-grey-600 leading-relaxed">
            <div className="space-y-4">
              <p>
                In a market crowded with contractors who over-promise and under-deliver, Sigma Shop Fronts has
                built a reputation for doing exactly what we say we will do. Our repeat client rate is high
                because businesses that work with us once quickly learn that we are the kind of contractor
                worth keeping on their approved supplier list.
              </p>
              <p>
                We carry public liability insurance and operate to industry standards, meaning you are fully
                protected from the moment we step on site. Our written quotations are valid for 30 days and
                break down every cost in plain English — no jargon, no ambiguity.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our pricing is competitive because we control the entire supply chain: we source materials
                directly from approved UK and European manufacturers, fabricate in our own workshop, and employ
                our own installation teams rather than relying on subcontractors. That means we can offer
                better quality at a lower cost than many of our competitors.
              </p>
              <p>
                Finally, we stand behind our work. All installations come with a written warranty, and our
                aftercare team is available to handle any post-completion queries swiftly and without fuss. We
                are not here to take your money and disappear — we are here to build a long-term relationship
                with your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-grey-300 mb-8 max-w-xl mx-auto">
            Get in touch today for a free, no-obligation site survey and quotation. Our team is ready to help
            you find the right shopfront solution for your business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Get a Free Quote
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
