import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

const slug = 'shopfront-installation-cost-uk-2026';
const pageTitle = 'Shopfront Installation Costs in the UK (2026): What to Expect';
const pageDesc = 'A detailed breakdown of shopfront installation costs across the UK in 2026, covering aluminium shopfronts, roller shutters, security doors, and what factors affect pricing.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: `https://www.sigmashopfronts.com/blog/${slug}` },
  openGraph: { title: pageTitle, description: pageDesc, url: `https://www.sigmashopfronts.com/blog/${slug}`, type: 'article' },
};

const faqs = [
  {
    question: 'How much does an aluminium shopfront cost in the UK in 2026?',
    answer:
      'A standard single-bay aluminium shopfront typically costs between £2,000 and £5,000 supply and install in 2026. Double-bay units range from £4,000 to £8,000. Prices vary by region, glazing specification, thermal break requirements, and powder-coat finish. London installations are typically 15–25% higher than the national average due to access logistics, parking restrictions, and higher labour costs.',
  },
  {
    question: 'Is it cheaper to repair a shopfront or replace it?',
    answer:
      'For localised damage — a single broken pane, a faulty lock, or a damaged seal — repair is almost always more cost-effective. A single glazing panel replacement typically costs £200–£600. However, if the aluminium frame is corroded, the thermal performance is poor, or the shopfront has multiple issues, a full replacement often offers better long-term value. We assess both options during our free site survey and provide comparative quotations.',
  },
  {
    question: 'Do shopfront costs vary by region in the UK?',
    answer:
      'Yes. London and the south-east are typically 15–25% above the national average due to higher labour costs, parking and access restrictions, and congestion zone charges. Scotland may involve additional costs for building warrant applications. Coastal locations require marine-grade specifications that add 10–15% to material costs. We provide location-specific pricing in every quotation.',
  },
  {
    question: 'What is included in a shopfront installation quote?',
    answer:
      'A comprehensive shopfront quote should include: measured survey, design and specification, aluminium frame supply, glazing supply, all hardware (locks, closers, handles), removal and disposal of the existing shopfront, installation labour, making good to surrounding finishes, and a written warranty. Our quotes itemise every element so you can see exactly what you are paying for.',
  },
];

export default function ShopfrontCostUK2026Page() {
  return (
    <>
      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'BlogPosting', headline: pageTitle, description: pageDesc,
            url: `https://www.sigmashopfronts.com/blog/${slug}`, datePublished: '2026-06-14', dateModified: '2026-06-14',
            author: { '@type': 'Organization', name: 'Sigma Shop Fronts', url: 'https://www.sigmashopfronts.com' },
            publisher: { '@type': 'Organization', name: 'Sigma Shop Fronts', url: 'https://www.sigmashopfronts.com', logo: { '@type': 'ImageObject', url: 'https://www.sigmashopfronts.com/assets/shopfront-2.jpeg' } },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.sigmashopfronts.com/blog/${slug}` },
          }),
        }}
      />

      <article className="section-padding bg-white">
        <div className="container-max max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Shopfront Installation Costs UK 2026' },
            ]}
          />

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-6">
            Shopfront Installation Costs in the UK (2026): What to Expect
          </h1>

          <p className="text-charcoal leading-relaxed mb-6">
            If you are considering a new shopfront for your business premises in 2026, one of the first questions you will ask is: how much does it cost? The answer depends on several factors — the type of system, the size of the opening, the glazing specification, your location, and whether structural work is required. This guide breaks down current UK pricing across the most common shopfront types so you can budget with confidence.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Aluminium Shopfront Costs</h2>
          <p className="text-charcoal leading-relaxed mb-4">Aluminium is the industry standard for commercial shopfronts in the UK. Here are typical 2026 price ranges for supply and installation:</p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>Single-bay shopfront (up to 4m wide):</strong> £2,000–£5,000</li>
            <li><strong>Double-bay shopfront (4–7m wide):</strong> £4,000–£8,000</li>
            <li><strong>Multi-unit parade (per unit):</strong> £3,000–£6,000</li>
            <li><strong>Thermally broken system upgrade:</strong> add 15–25% to standard pricing</li>
          </ul>
          <p className="text-charcoal leading-relaxed mb-6">
            These prices assume a straightforward replacement within an existing structural opening. If a new lintel or structural beam is required, structural engineering and building control costs will add £1,000–£3,000 to the project.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Roller Shutter Costs</h2>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>Manual roller shutter:</strong> £800–£1,500</li>
            <li><strong>Electric roller shutter:</strong> £1,200–£2,500</li>
            <li><strong>Fire-rated shutter (EI 60):</strong> £2,000–£4,000</li>
            <li><strong>LPS 1175 security-rated:</strong> £2,500–£5,000</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Security Door Costs</h2>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>Standard steel security door:</strong> £800–£1,500</li>
            <li><strong>LPS 1175 SR2 rated:</strong> £1,500–£3,000</li>
            <li><strong>LPS 1175 SR3 rated:</strong> £2,500–£5,000</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Automatic Door Costs</h2>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>Sliding bi-parting entrance:</strong> £3,000–£6,000</li>
            <li><strong>Swing operator retrofit:</strong> £1,500–£3,000</li>
            <li><strong>Annual maintenance contract:</strong> £200–£400 per door</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">What Drives the Price Up?</h2>
          <p className="text-charcoal leading-relaxed mb-4">Several factors can push costs above the standard ranges:</p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>Structural alterations:</strong> forming a new or wider opening requires a structural engineer, steelwork, and building control approval</li>
            <li><strong>Planning permission:</strong> conservation areas and listed buildings add design statement costs and longer timelines</li>
            <li><strong>Out-of-hours installation:</strong> night or weekend work in busy city centres adds a labour premium</li>
            <li><strong>Specialist glazing:</strong> solar control, acoustic, laminated security, or PAS 24 rated glass costs more than standard toughened</li>
            <li><strong>London and coastal locations:</strong> access logistics, marine-grade specifications, and higher labour rates</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">How to Get the Best Value</h2>
          <p className="text-charcoal leading-relaxed mb-6">
            The most important step is to get a proper site survey from a reputable installer. Avoid companies that quote from photographs alone — accurate pricing requires physical measurement of the opening, assessment of the structural condition, and understanding of any planning constraints. A good installer will provide a detailed, itemised written quotation that you can compare directly with other quotes. At{' '}
            <Link href="/contact" className="text-gold font-medium hover:underline">Sigma Shop Fronts</Link>, all site surveys are free, and our quotations break down every cost element so you can make an informed decision.
          </p>

          <section className="border-t border-grey-200 pt-10">
            <h2 className="font-heading text-2xl font-semibold text-navy mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-heading text-lg font-medium text-navy mb-2">{faq.question}</h3>
                  <p className="text-charcoal leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
