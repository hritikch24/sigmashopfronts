import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Why Choose Sigma Shop Fronts | Best UK Shopfront Company',
  description:
    'Discover why Sigma Shop Fronts is the best shopfront company in the UK. Companies House registered, 10+ years combined experience, nationwide coverage across 16 cities, and 24/7 emergency response.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com/why-choose-us',
  },
  openGraph: {
    title: 'Why Choose Sigma Shop Fronts | Best UK Shopfront Company',
    description:
      'Companies House registered shopfront installers with 500+ completed projects, 16-city coverage, and a 5.0 customer rating. Free surveys, written guarantees, no middlemen.',
    url: 'https://www.sigmashopfronts.com/why-choose-us',
  },
};

const differentiators = [
  { title: 'Companies House Registered', desc: 'Fully transparent and legitimate — verify us on the public register any time.' },
  { title: '10+ Years Combined Staff Experience', desc: 'Our installers collectively bring over a decade of hands-on trade experience to every project.' },
  { title: 'Nationwide Coverage — 16 UK Cities', desc: 'From London to Edinburgh, we serve businesses across England, Wales, and Scotland.' },
  { title: 'Free Site Surveys — No Obligation', desc: 'We assess your premises in person, provide a detailed quote, and never pressure you to commit.' },
  { title: '24/7 Emergency Response', desc: 'Break-in damage or storm impact — call us any hour and we dispatch a team immediately.' },
  { title: 'Insurance-Compliant Documentation', desc: 'Every job includes full paperwork your insurer requires: certificates, specs, and sign-off sheets.' },
  { title: 'Written Workmanship Guarantee', desc: 'Our guarantees are in writing, not verbal promises. You keep a copy, we honour every word.' },
  { title: 'Direct Manufacturer Relationships', desc: 'We source aluminium, glass, and hardware direct from manufacturers — no middlemen, better prices.' },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '16', label: 'UK Cities Covered' },
  { value: '5.0', label: 'Customer Rating' },
  { value: '24/7', label: 'Emergency Cover' },
];

const comparisons = [
  { sigma: 'Written workmanship guarantees', typical: 'Verbal promises with no paperwork' },
  { sigma: 'Companies House registered', typical: 'Unregistered traders' },
  { sigma: 'CSCS-carded, trained installers', typical: 'Untrained or uncarded labour' },
  { sigma: 'Full insurance documentation provided', typical: 'No certificates or compliance records' },
  { sigma: 'Dedicated project manager on every job', typical: 'No single point of contact' },
  { sigma: 'Post-installation inspection and sign-off', typical: 'Walk away once fitted' },
];

const testimonials = [
  { name: 'James Whitfield', business: 'Whitfield & Sons Butchers', location: 'Leeds', quote: 'Sigma replaced our roller shutter in under a day. Genuinely one of the best trade experiences we have had.' },
  { name: 'Priya Sharma', business: 'Prestige Dental Clinic', location: 'Birmingham', quote: 'Surveyed within 48 hours, competitive quote, installed within the week. Exceptional service.' },
  { name: 'Daniel O\'Brien', business: 'O\'Brien Electronics', location: 'Manchester', quote: 'Called at 2am after a break-in. Team on site within the hour, premises secured, full replacement next morning.' },
  { name: 'Fiona Campbell', business: 'Campbell Opticians', location: 'Edinburgh', quote: 'Listed building constraints made this tricky. Sigma navigated planning approval and delivered beautifully.' },
];

const standards = [
  'BS 6375 — Weather Performance', 'BS EN 12150 — Toughened Safety Glass', 'BS EN 16005 — Automatic Door Safety',
  'BS EN 1634-1 — Fire Resistance', 'PAS 24 — Enhanced Security', 'LPS 1175 — Physical Security',
  'Building Regulations Parts B, L & M', 'Equality Act 2010 — Accessibility Compliance',
];

export default function WhyChooseUsPage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" />

      {/* Hero */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Why Choose Us' }]} />
          <h1 className="font-heading text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.15, marginTop: '1.5rem' }}>
            Why Businesses Choose <span className="text-gradient-gold">Sigma Shop Fronts</span>
          </h1>
          <p className="text-grey-300" style={{ maxWidth: '42rem', marginTop: '1rem', fontSize: '1.125rem' }}>
            Companies House registered, fully insured, and trusted by commercial property owners across the UK. When your shopfront matters, you need a company that delivers — not one that disappears after the deposit.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding bg-grey-50">
        <div className="container-max" style={{ maxWidth: '48rem' }}>
          <h2 className="font-heading text-navy" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>10+ Years of Trade Experience</h2>
          <p className="text-grey-600" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            Our installation teams collectively bring over a decade of hands-on shopfront experience. From aluminium curtain walling and bi-fold shop doors to roller shutters and fire-rated glazing, we have seen — and solved — it all. Sigma Shop Fronts is registered at Companies House (verifiable on the public register), carries comprehensive public liability insurance, and operates with full CSCS-carded site personnel. We do not subcontract to unknown labour; every installer on your project is part of our vetted, experienced team.
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="font-heading text-navy" style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>What Sets Us Apart</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {differentiators.map((d) => (
              <div key={d.title} className="card-surface" style={{ padding: '1.5rem' }}>
                <h3 className="font-heading text-charcoal" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{d.title}</h3>
                <p className="text-grey-600" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <h2 className="font-heading text-white" style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '2rem' }}>Our Track Record</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <span className="text-gold font-heading" style={{ fontSize: '2.5rem', display: 'block' }}>{s.value}</span>
                <span className="text-grey-300" style={{ fontSize: '0.95rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding bg-grey-50">
        <div className="container-max" style={{ maxWidth: '52rem' }}>
          <h2 className="font-heading text-navy" style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '2rem' }}>How We Compare</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: '0.75rem', overflow: 'hidden' }}>
            <div className="bg-navy" style={{ padding: '0.75rem 1rem' }}><strong className="text-gold">Sigma Shop Fronts</strong></div>
            <div style={{ padding: '0.75rem 1rem', background: '#e5e7eb' }}><strong className="text-charcoal">Typical Shopfront Companies</strong></div>
            {comparisons.map((c, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div style={{ padding: '0.75rem 1rem', background: i % 2 === 0 ? '#f0fdf4' : '#fff', fontSize: '0.95rem' }} className="text-charcoal">&#10003; {c.sigma}</div>
                <div style={{ padding: '0.75rem 1rem', background: i % 2 === 0 ? '#fef2f2' : '#fff', fontSize: '0.95rem' }} className="text-grey-600">&#10007; {c.typical}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="font-heading text-navy" style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '2rem' }}>Trusted by Businesses Across the UK</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t) => (
              <blockquote key={t.name} className="card-surface" style={{ padding: '1.5rem', margin: 0 }}>
                <p className="text-charcoal" style={{ fontSize: '0.95rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1rem' }}>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong className="text-navy" style={{ display: 'block' }}>{t.name}</strong>
                  <span className="text-grey-600" style={{ fontSize: '0.875rem' }}>{t.business}, {t.location}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section-padding bg-grey-50">
        <div className="container-max" style={{ maxWidth: '48rem' }}>
          <h2 className="font-heading text-navy" style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>Accreditations &amp; Compliance</h2>
          <p className="text-grey-600" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Every installation meets or exceeds the following British and European standards:</p>
          <ul style={{ columns: 2, gap: '1.5rem', listStyle: 'none', padding: 0 }}>
            {standards.map((s) => (
              <li key={s} className="text-charcoal" style={{ padding: '0.5rem 0', fontSize: '0.95rem', breakInside: 'avoid' }}>&#10003; {s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark" style={{ textAlign: 'center' }}>
        <div className="container-max" style={{ maxWidth: '36rem' }}>
          <h2 className="font-heading text-white" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Work With the Best?</h2>
          <p className="text-grey-300" style={{ marginBottom: '1.5rem' }}>Get a free, no-obligation site survey and quote. Call us on <a href="tel:07414779594" className="text-gold" style={{ textDecoration: 'underline' }}>07414 779594</a> or request a callback online.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold">Get a Free Quote</Link>
            <Link href="/services" className="btn-outline">View Our Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
