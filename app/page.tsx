import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ContactForm from '@/components/ContactForm';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Aluminium Shopfronts & Roller Shutters UK | Sigma Shop Fronts',
  description:
    'UK-wide shopfront specialists. Aluminium shopfronts, roller shutters, security doors, automatic doors & 24/7 emergency callout. Free site surveys. Companies House registered.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com',
  },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const services = [
  {
    title: 'Aluminium Shopfronts',
    description:
      'Sleek, durable aluminium shopfront systems tailored to your brand. Fully thermally broken for energy efficiency with modern or traditional profiles.',
    image: '/assets/aluminium-shopfront-1.jpeg',
    href: '/services/aluminium-shopfronts',
  },
  {
    title: 'Roller Shutters',
    description:
      'Commercial-grade roller shutters in steel, aluminium or perforated mesh. Manually operated or fully automated — built for daily heavy-duty use.',
    image: '/assets/roller-shutter-1.jpeg',
    href: '/services/roller-shutters',
  },
  {
    title: 'Security Doors',
    description:
      'High-security steel and composite doors with multi-point locking, graded to LPS 1175 standards. Ideal for rear access, plant rooms and retail.',
    image: '/assets/sigma-security-door.jpeg',
    href: '/services/security-doors',
  },
  {
    title: 'Automatic Doors',
    description:
      'Sliding, swing and revolving automatic door systems from leading manufacturers. Full installation, commissioning and ongoing maintenance contracts available.',
    image: '/assets/automatic-door-1.jpeg',
    href: '/services/automatic-doors',
  },
  {
    title: 'Bi-Fold Doors',
    description:
      'Space-efficient bi-folding door systems that open your façade fully to the street. Available in aluminium and thermally broken profiles.',
    image: '/assets/bifolding-door-1.jpeg',
    href: '/services/bi-fold-doors',
  },
  {
    title: 'Fire Doors',
    description:
      'FD30 and FD60 certified fire doors for commercial premises. Compliant with UK Building Regulations, fully fitted with intumescent strips and closers.',
    image: '/assets/fire-door.jpeg',
    href: '/services/fire-doors',
  },
  {
    title: 'Shopfront Repairs',
    description:
      'Fast, affordable repairs to broken glass, damaged frames, faulty locks and failed mechanisms. Same-day or next-day response across our coverage areas.',
    image: '/assets/shopfront-3.jpeg',
    href: '/services/shopfront-repairs',
  },
  {
    title: 'Emergency Callout',
    description:
      '24/7 emergency boarding, glazing and shutter repairs. Our rapid-response teams are mobilised across the UK to secure your premises at any hour.',
    image: '/assets/sigma-front-variant.jpeg',
    href: '/services/emergency-callout',
  },
];

const usps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Nationwide Coverage',
    description:
      'Dedicated installation teams operating across England, Scotland and Wales. Wherever you are, we can reach you.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Free Site Surveys',
    description:
      'No-obligation surveys carried out by our experienced estimators. We measure, advise and quote with full transparency.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Competitive Pricing',
    description:
      'Transparent, itemised quotations with no hidden charges. We consistently beat like-for-like quotes from national competitors.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Quality Workmanship',
    description:
      'Every installation is backed by our workmanship guarantee. We take pride in clean, professional finishes that last.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Brief & Survey',
    description:
      'We visit your site, take precise measurements, assess access and discuss your requirements in detail.',
  },
  {
    number: '02',
    title: 'Design & Spec',
    description:
      'Our team produces detailed drawings and a full specification. You approve every element before production begins.',
  },
  {
    number: '03',
    title: 'Fabrication',
    description:
      'All units are precision-fabricated in our UK workshop using quality-assured materials and profiles.',
  },
  {
    number: '04',
    title: 'Installation & Aftercare',
    description:
      'Expert installation by our employed teams — never subcontractors. Full handover, guarantee and aftercare included.',
  },
];

const galleryImages = [
  { src: '/assets/sigma-hero-1.jpeg', alt: 'Modern aluminium shopfront installation' },
  { src: '/assets/sigma-front-wide.jpeg', alt: 'Wide commercial shopfront with full glazing' },
  { src: '/assets/sigma-mall-front.jpeg', alt: 'Retail mall shopfront installation' },
  { src: '/assets/sigma-glass-front.jpeg', alt: 'Glass shopfront with slim aluminium frame' },
  { src: '/assets/shopfront-2.jpeg', alt: 'Frameless glass shopfront project' },
  { src: '/assets/shopfront-4.jpeg', alt: 'High street shopfront renovation' },
  { src: '/assets/shopfront-5.jpeg', alt: 'Contemporary commercial shopfront' },
  { src: '/assets/shopfront-7.jpeg', alt: 'Bespoke aluminium shopfront with signage zone' },
];

const testimonials = [
  {
    name: 'James Whitfield',
    business: 'Whitfield & Sons Butchers',
    location: 'Leeds',
    rating: 5,
    text: 'Sigma replaced our old roller shutter in under a day. The team was professional from first contact to final sign-off. Genuinely one of the best trade experiences we have had as a business.',
  },
  {
    name: 'Priya Sharma',
    business: 'Prestige Dental Clinic',
    location: 'Birmingham',
    rating: 5,
    text: 'We needed a new automatic entrance door for accessibility compliance. Sigma surveyed within 48 hours, provided a competitive quote and had it installed within the week. Exceptional service.',
  },
  {
    name: 'Daniel O\'Brien',
    business: 'O\'Brien Electronics',
    location: 'Manchester',
    rating: 5,
    text: 'Called Sigma at 2am after our shutter was forced open during a break-in. They had a team on site within the hour, secured the premises and followed up with a full replacement the next morning.',
  },
  {
    name: 'Sarah Hennessy',
    business: 'The Brasserie Bar & Kitchen',
    location: 'Bristol',
    rating: 5,
    text: 'Our new bi-fold shopfront has completely transformed the front of the restaurant. Footfall is up and the fit and finish are outstanding. Would highly recommend Sigma to any business owner.',
  },
];

const serviceAreas = [
  { city: 'London', slug: 'london' },
  { city: 'Birmingham', slug: 'birmingham' },
  { city: 'Manchester', slug: 'manchester' },
  { city: 'Leeds', slug: 'leeds' },
  { city: 'Liverpool', slug: 'liverpool' },
  { city: 'Bristol', slug: 'bristol' },
  { city: 'Sheffield', slug: 'sheffield' },
  { city: 'Glasgow', slug: 'glasgow' },
  { city: 'Cardiff', slug: 'cardiff' },
  { city: 'Newcastle', slug: 'newcastle' },
  { city: 'Nottingham', slug: 'nottingham' },
  { city: 'Leicester', slug: 'leicester' },
  { city: 'Edinburgh', slug: 'edinburgh' },
  { city: 'Southampton', slug: 'southampton' },
  { city: 'Brighton', slug: 'brighton' },
  { city: 'Coventry', slug: 'coventry' },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/sigma-hero-1.jpeg"
          alt="Professional shopfront installation by Sigma Shop Fronts"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold-light text-xs sm:text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              Nationwide UK Shopfront Specialists
            </p>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Signature Shopfronts,{' '}
              <span className="text-gradient-gold">Shutters &amp; Doors</span>{' '}
              Across the UK
            </h1>

            <p className="text-grey-200 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 font-light">
              Design, fabrication and installation delivered with rapid nationwide response and 24/7 emergency cover.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link
                href="/contact"
                className="btn-gold text-base sm:text-lg px-8 py-4 shadow-lg shadow-gold/20"
              >
                Book a Free Site Survey
              </Link>
              <a
                href="tel:07414779594"
                className="btn-outline text-base sm:text-lg px-8 py-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call Now: 07414 779594
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              {[
                { icon: '⚡', label: 'Fast Lead Times' },
                { icon: '🌍', label: 'Nationwide Teams' },
                { icon: '🕐', label: '24/7 Callouts' },
                { icon: '✓', label: 'Companies House Registered' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-xs sm:text-sm font-medium"
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────────────────────── */}
      <section className="section-padding bg-grey-50" id="services" aria-labelledby="services-heading">
        <div className="container-max">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">What We Do</p>
            <h2 id="services-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Our Commercial Shopfront &amp; Security Services
            </h2>
            <p className="text-grey-600 text-lg max-w-2xl mx-auto leading-relaxed">
              From bespoke aluminium shopfronts to rapid emergency callouts — we cover the full spectrum of commercial entrance solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.href}
                title={service.title}
                description={service.description}
                image={service.image}
                href={service.href}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-gold inline-flex">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Sigma ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-labelledby="why-heading">
        <div className="container-max">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Why Sigma</p>
            <h2 id="why-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Why Choose Sigma for Aluminium Shopfront Installation
            </h2>
            <p className="text-grey-600 text-lg max-w-xl mx-auto">
              We combine national reach with local accountability — every job, every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp) => (
              <div key={usp.title} className="flex flex-col items-center text-center p-8 card-surface hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-navy/5 flex items-center justify-center mb-5 text-gold">
                  {usp.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-3">{usp.title}</h3>
                <p className="text-grey-600 text-sm leading-relaxed">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process / How We Work ────────────────────────────────────────── */}
      <section className="section-padding bg-navy relative overflow-hidden" aria-labelledby="process-heading">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Our Approach</p>
            <h2 id="process-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              How Our Shopfront Installation Process Works
            </h2>
            <p className="text-grey-400 text-lg max-w-xl mx-auto">
              A streamlined four-step process designed to deliver your project on time, on spec, first time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gold/20" aria-hidden="true" />
                )}
                <div className="relative z-10 mb-5">
                  <span className="font-heading text-5xl font-extrabold text-gradient-gold leading-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-grey-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Projects Gallery ──────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-labelledby="gallery-heading">
        <div className="container-max">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Portfolio</p>
            <h2 id="gallery-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Recent Shopfront &amp; Roller Shutter Projects
            </h2>
            <p className="text-grey-600 text-lg max-w-xl mx-auto">
              A snapshot of our latest commercial shopfront and shutter installations across the UK.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map(({ src, alt }, i) => (
              <Link
                key={src}
                href="/gallery"
                className={`group relative overflow-hidden rounded-xl bg-grey-100 ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 ? 'auto' : '1 / 1' }}
              >
                <div className={i === 0 ? 'aspect-square md:aspect-[4/3] lg:aspect-[4/3]' : 'aspect-square'}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'}
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-semibold bg-navy/80 px-3 py-1.5 rounded-full">
                      View Gallery
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/gallery" className="btn-gold inline-flex">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-grey-50" aria-labelledby="testimonials-heading">
        <div className="container-max">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Client Feedback</p>
            <h2 id="testimonials-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              What Our Clients Say
            </h2>
            <p className="text-grey-600 text-lg max-w-xl mx-auto">
              Trusted by businesses across the UK — from independent retailers to national chains.
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />

          {/* Star summary */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars average">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#d4a843" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-grey-600 text-sm font-medium">5.0 average from verified reviews</span>
          </div>
        </div>
      </section>

      {/* ── Service Areas ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-labelledby="areas-heading">
        <div className="container-max">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Coverage</p>
            <h2 id="areas-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Shopfront Installation Across the Whole UK
            </h2>
            <p className="text-grey-600 text-lg max-w-xl mx-auto">
              Permanent installation teams in major cities with rapid-response nationwide coverage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
            {serviceAreas.map(({ city, slug }) => (
              <Link
                key={slug}
                href={`/areas/${slug}`}
                className="group flex items-center gap-2 p-4 rounded-xl border border-grey-200 hover:border-gold hover:bg-gold/5 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold flex-shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                </svg>
                <span className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors">{city}</span>
              </Link>
            ))}
          </div>

          {/* Nationwide badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-navy text-white px-6 py-3 rounded-full text-sm font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
              </svg>
              Nationwide UK Coverage
            </div>
          </div>
        </div>
      </section>

      {/* ── Companies House Verification ────────────────────────────────── */}
      <section className="section-padding bg-grey-50" aria-labelledby="verification-heading">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Verified Business</p>
              <h2 id="verification-heading" className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
                Companies House Registered
              </h2>
              <p className="text-grey-600 text-lg leading-relaxed mb-8">
                Sigma Shopfronts and Shutter Limited is a fully registered UK limited company. Our registration with Companies House gives you the peace of mind that you are working with a legitimate, accountable business.
              </p>

              <div className="card-surface p-6 rounded-2xl mb-6">
                <dl className="space-y-3">
                  <div className="flex items-start gap-3">
                    <dt className="text-grey-500 text-sm w-36 flex-shrink-0">Company Name</dt>
                    <dd className="text-navy font-semibold text-sm">Sigma Shopfronts and Shutter Limited</dd>
                  </div>
                  <div className="flex items-start gap-3">
                    <dt className="text-grey-500 text-sm w-36 flex-shrink-0">Company Number</dt>
                    <dd className="text-navy font-semibold text-sm font-mono">16794487</dd>
                  </div>
                  <div className="flex items-start gap-3">
                    <dt className="text-grey-500 text-sm w-36 flex-shrink-0">Status</dt>
                    <dd>
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    </dd>
                  </div>
                  <div className="flex items-start gap-3">
                    <dt className="text-grey-500 text-sm w-36 flex-shrink-0">Registered In</dt>
                    <dd className="text-navy font-semibold text-sm">England &amp; Wales</dd>
                  </div>
                </dl>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gold/10 border border-gold/30 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold flex-shrink-0">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor" />
                </svg>
                <p className="text-navy text-sm font-medium">
                  Verifiable at{' '}
                  <a
                    href="https://find-and-update.company-information.service.gov.uk/company/16794487"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline font-semibold"
                  >
                    Companies House
                  </a>
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/sigma-company-proof-desktop.png"
                  alt="Sigma Shopfronts and Shutter Limited — Companies House registration certificate"
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-navy text-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor" />
                </svg>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Verified Company</p>
                  <p className="text-gold-light text-xs">No. 16794487</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Contact Form ───────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden" id="quote" aria-labelledby="cta-heading">
        {/* Decorative radial */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Copy */}
            <div className="lg:pt-4">
              <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">Get Started</p>
              <h2 id="cta-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Get a Free Shopfront Installation Quote
              </h2>
              <p className="text-grey-300 text-lg leading-relaxed mb-8">
                Tell us about your project and we will provide a detailed, transparent quotation — no obligations, no hidden costs.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Free, no-obligation site survey',
                  'Detailed itemised quotation',
                  'Response within 2 business hours',
                  '24/7 emergency callout available',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-grey-300 text-base">
                    <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="#d4a843" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-grey-400 text-xs uppercase tracking-wider mb-2 font-semibold">Prefer to call?</p>
                <a
                  href="tel:07414779594"
                  className="flex items-center gap-2 text-gold text-xl font-bold hover:text-gold-light transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  07414 779594
                </a>
                <p className="text-grey-500 text-xs mt-1">Mon–Fri 8am–6pm &bull; Sat 9am–4pm &bull; Emergency 24/7</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
