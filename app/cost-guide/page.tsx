import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'How Much Does a Shopfront Cost in 2025? UK Price Guide',
  description:
    'Transparent UK shopfront installation prices for 2025. Aluminium shopfronts from £2,000, roller shutters from £800, security doors, automatic doors, bi-fold doors, and fire doors. Free quotes nationwide.',
  alternates: { canonical: 'https://www.sigmashopfronts.com/cost-guide' },
  openGraph: {
    title: 'How Much Does a Shopfront Cost in 2025? UK Price Guide',
    description: 'Detailed UK shopfront cost breakdown — aluminium fronts, roller shutters, security doors, automatic doors, bi-folds, and fire doors. Realistic 2025 prices from Sigma Shop Fronts.',
    url: 'https://www.sigmashopfronts.com/cost-guide',
  },
};

const faqs = [
  { q: 'How much does a new aluminium shopfront cost in the UK?', a: 'A standard single-bay aluminium shopfront in the UK typically costs between £2,000 and £5,000 supply and install. Double-bay units range from £4,000 to £8,000. Prices vary depending on the width, height, glazing specification, thermal break requirements, and powder-coat finish.' },
  { q: 'How much do roller shutters cost to install?', a: 'Manual roller shutters start from around £800 to £1,500, while electric roller shutters typically cost £1,200 to £2,500. Fire-rated shutters range from £2,000 to £4,000, and LPS 1175 security-rated shutters cost between £2,500 and £5,000 installed.' },
  { q: 'Are shopfront prices higher in London?', a: 'Yes. Shopfront installation costs in London are typically 15 to 25 percent higher than the national average due to increased labour rates, congestion charges, parking restrictions, and the cost of out-of-hours working that many central London landlords require.' },
  { q: 'Do I need planning permission for a new shopfront?', a: 'Like-for-like shopfront replacements are often permitted development. However, properties in conservation areas, listed buildings, or any project that significantly changes the external appearance will usually require planning consent. Your local planning authority can confirm.' },
  { q: 'What is included in a shopfront installation quote?', a: 'A reputable quote should include the aluminium framework, glazing, door furniture, all fixings, removal and disposal of the old shopfront, installation labour, and making good. Always check whether VAT, scaffolding, and skip hire are included or listed separately.' },
  { q: 'How long does a shopfront installation take?', a: 'A standard single-bay shopfront replacement is typically completed in one to two days. Larger multi-unit projects or installations requiring structural alterations may take three to five days. We always aim to minimise disruption to your trading hours.' },
  { q: 'What factors affect shopfront installation costs the most?', a: 'The biggest cost drivers are the size of the opening, the glazing specification (single, double, or triple glazed; toughened or laminated), whether a thermal break is required to meet Part L of the Building Regulations, the powder-coat finish, and any structural alterations to the lintel or sill.' },
  { q: 'Do you offer finance or payment plans for shopfronts?', a: 'We can discuss flexible payment terms on larger commercial projects. Typically we require a deposit upon order confirmation with the balance due on completion. For multi-unit projects we can agree staged payments tied to project milestones.' },
];

const schemaData = {
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const blogPosting = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Much Does a Shopfront Cost in 2025? UK Price Guide',
  datePublished: '2025-05-01',
  dateModified: '2025-05-01',
  author: { '@type': 'Organization', name: 'Sigma Shop Fronts', url: 'https://www.sigmashopfronts.com' },
  publisher: { '@type': 'Organization', name: 'Sigma Shop Fronts', url: 'https://www.sigmashopfronts.com' },
  mainEntityOfPage: 'https://www.sigmashopfronts.com/cost-guide',
};

function PriceCard({ title, price, note }: { title: string; price: string; note?: string }) {
  return (
    <div className="card-surface rounded-xl p-5">
      <h3 className="font-heading font-semibold text-navy text-lg">{title}</h3>
      <p className="text-2xl font-bold text-gradient-gold mt-2">{price}</p>
      {note && <p className="text-grey-500 text-sm mt-1">{note}</p>}
    </div>
  );
}

export default function CostGuidePage() {
  return (
    <>
      <SchemaMarkup type="FAQPage" data={schemaData} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />

      {/* Hero */}
      <section className="bg-gradient-dark section-padding">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cost Guide' }]} />
          <h1 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            How Much Does a Shopfront Cost in <span className="text-gradient-gold">2025</span>?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-300 leading-relaxed">
            A transparent, no-nonsense guide to UK shopfront installation prices. All figures are realistic 2025 supply-and-install estimates including VAT where applicable.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-max max-w-3xl">
          <p className="text-grey-600 leading-relaxed">
            Whether you are fitting out a new retail unit, upgrading a tired fascia, or improving security after a break-in, the first question is always the same: <strong className="text-navy">how much will it cost?</strong> Below we break down typical UK prices for every type of commercial shopfront product we install, the factors that push costs up or down, and regional variations you should be aware of. Every project is different, so treat these as guide prices — we always provide a detailed written quotation after a free site survey.
          </p>
        </div>
      </section>

      {/* Aluminium Shopfront Costs */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Aluminium Shopfront Costs</h2>
          <p className="text-grey-600 max-w-3xl mb-8">Aluminium remains the industry standard for commercial shopfronts in the UK. All prices below are for supply, fabrication, and professional installation of thermally broken aluminium profiles with toughened safety glass to BS EN 12600.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PriceCard title="Single-Bay Shopfront" price="£2,000 - £5,000" note="Up to approx. 4m wide, standard height" />
            <PriceCard title="Double-Bay Shopfront" price="£4,000 - £8,000" note="Two bays with mullion, wider frontages" />
            <PriceCard title="Multi-Unit / Large Format" price="£8,000 - £20,000+" note="Three or more bays, curtain-walling style" />
          </div>
          <p className="text-grey-500 text-sm mt-4">Key cost factors: opening width and height, glazing spec (toughened, laminated, solar-control), thermal break profile for Part L compliance, RAL powder-coat finish, and transom panel configuration.</p>
        </div>
      </section>

      {/* Roller Shutter Costs */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Roller Shutter Costs</h2>
          <p className="text-grey-600 max-w-3xl mb-8">Roller shutters are the most common security upgrade for UK retail and commercial premises. Prices depend on the opening size, lath material, operation method, and any fire or security certification required.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PriceCard title="Manual Roller Shutter" price="£800 - £1,500" note="Spring-balanced, hand-crank, or push-up" />
            <PriceCard title="Electric Roller Shutter" price="£1,200 - £2,500" note="Tubular motor, key switch or remote" />
            <PriceCard title="Fire-Rated Shutter" price="£2,000 - £4,000" note="Compliant with BS EN 16034, fusible link" />
            <PriceCard title="LPS 1175 Rated Shutter" price="£2,500 - £5,000" note="SR1 to SR3 loss-prevention certified" />
          </div>
        </div>
      </section>

      {/* Security Door Costs */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Security Door Costs</h2>
          <p className="text-grey-600 max-w-3xl mb-8">Certified security doors are essential for high-risk premises. Prices include the door-set, frame, multipoint locking, and installation. LPS 1175 certification is increasingly required by insurers.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PriceCard title="Standard Steel Security Door" price="£800 - £1,500" note="Galvanised steel, multipoint lock" />
            <PriceCard title="LPS 1175 SR2 Door" price="£1,500 - £3,000" note="Tested to resist sustained attack with tools" />
            <PriceCard title="LPS 1175 SR3 Door" price="£2,500 - £5,000" note="Higher-security environments, jewellers, pharmacies" />
          </div>
        </div>
      </section>

      {/* Automatic Door Costs */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Automatic Door Costs</h2>
          <p className="text-grey-600 max-w-3xl mb-8">Automatic doors improve accessibility (Equality Act 2010 / BS 8300) and footfall. Prices below cover supply, installation, and commissioning compliant with BS EN 16005.</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <PriceCard title="Sliding Bi-Parting Automatic" price="£3,000 - £6,000" note="Sensor-activated, full breakout option" />
            <PriceCard title="Swing Operator Retrofit" price="£1,500 - £3,000" note="Low-energy operator added to existing door" />
          </div>
        </div>
      </section>

      {/* Bi-Fold Door Costs */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Bi-Fold Door Costs</h2>
          <p className="text-grey-600 max-w-3xl mb-8">Commercial bi-fold doors create open-plan frontages for restaurants, bars, and retail. Aluminium profiles with thermally broken sections and toughened double-glazed units as standard.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PriceCard title="3-Panel Bi-Fold" price="£3,000 - £5,000" note="Up to approx. 3m opening" />
            <PriceCard title="5-Panel Bi-Fold" price="£5,000 - £8,000" note="Up to approx. 5m opening" />
            <PriceCard title="8-Panel Bi-Fold" price="£8,000 - £14,000" note="Wide-span commercial frontages" />
          </div>
        </div>
      </section>

      {/* Fire Door Costs */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Fire Door Costs</h2>
          <p className="text-grey-600 max-w-3xl mb-8">Fire doors are a Building Regulations Part B requirement in commercial premises. All our fire door-sets are third-party certified and supplied with the correct intumescent strips, cold smoke seals, and CE/UKCA marking.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PriceCard title="FD30 Single Leaf" price="£400 - £800" note="30-minute integrity, most common spec" />
            <PriceCard title="FD60 Single Leaf" price="£600 - £1,200" note="60-minute integrity, higher-risk compartments" />
            <PriceCard title="FD90 Single Leaf" price="£1,000 - £2,000" note="90-minute integrity, specialist applications" />
          </div>
        </div>
      </section>

      {/* What Affects the Final Price */}
      <section className="section-padding bg-grey-50">
        <div className="container-max">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">What Affects the Final Price</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {[
              { t: 'Site Access', d: 'Restricted access, scaffolding, or high-level work adds cost.' },
              { t: 'Structural Work', d: 'New lintels, RSJs, or sill alterations for wider openings.' },
              { t: 'Planning Permission', d: 'Application fees and any required heritage assessments.' },
              { t: 'Conservation Areas', d: 'Bespoke materials or finishes to match local requirements.' },
              { t: 'Out-of-Hours Installation', d: 'Weekend or night work to avoid disrupting trade.' },
              { t: 'Waste Removal', d: 'Disposal of old shopfront, asbestos surveys if pre-1990s.' },
            ].map((item) => (
              <div key={item.t} className="card-surface rounded-xl p-5">
                <h3 className="font-heading font-semibold text-navy">{item.t}</h3>
                <p className="text-grey-500 text-sm mt-1">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Price Variations */}
      <section className="section-padding">
        <div className="container-max max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Regional Price Variations</h2>
          <ul className="space-y-4 text-grey-600">
            <li><strong className="text-navy">London and the South East:</strong> Expect a 15 to 25 percent premium on labour due to higher wages, ULEZ charges, and restricted working hours in many boroughs.</li>
            <li><strong className="text-navy">Scotland:</strong> Building warrant costs and the separate Scottish Building Standards may add to the overall project price compared to England and Wales.</li>
            <li><strong className="text-navy">Coastal Locations:</strong> Marine-grade powder coating or anodised finishes are recommended to resist salt-air corrosion, adding roughly 10 to 15 percent to material costs.</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Get Your Free Quote</h2>
          <p className="text-grey-300 mb-8 max-w-xl mx-auto">
            Every project is unique. Contact us today for a free, no-obligation site survey and a detailed written quotation tailored to your premises.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Get Your Free Quote</Link>
            <a href="tel:+447414779594" className="btn-outline">Call 07414 779594</a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-max max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-navy mb-8">Shopfront Cost FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="card-surface rounded-xl group">
                <summary className="cursor-pointer p-5 font-heading font-semibold text-navy flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-gold text-xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 text-grey-600 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
