import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SITE_URL } from '@/lib/site';

const COMPANY = 'Sigma Shop Fronts';

/**
 * This page previously displayed five invented customer reviews with made-up
 * names, and its metadata claimed a "Rated 5.0" average from "verified"
 * customers. None of it was real, and publishing a consumer review that is not
 * genuine is an offence under the Digital Markets, Competition and Consumers
 * Act 2024.
 *
 * It now sets out what a buyer can actually verify about this company —
 * registration, insurance, certification, standards — which is more use to a
 * commercial client than a wall of quotes anyway. Real reviews live on the
 * Google Business Profile; link it below once the URL is supplied.
 *
 * Do not add review content here unless a real customer gave it and agreed to
 * it being published, and never add aggregateRating schema without genuine
 * underlying reviews.
 */

export const metadata: Metadata = {
  title: `Checks & Credentials | ${COMPANY}`,
  description:
    'How to verify Sigma Shop Fronts before you commit: company registration, insurance, CSCS-carded installers and the British Standards our work is specified against.',
  alternates: { canonical: `${SITE_URL}/reviews` },
  openGraph: {
    title: `Checks & Credentials | ${COMPANY}`,
    description:
      'Company registration, insurance, certification and the standards we build to — the things worth checking before you appoint a shopfront contractor.',
    url: `${SITE_URL}/reviews`,
  },
};

const checks = [
  {
    title: 'Companies House registration',
    body: `${COMPANY} trades as Sigma Shopfronts and Shutter Limited, company number 16794487. Search it on the Companies House register before you pay a deposit — it costs nothing and tells you who you are actually contracting with.`,
  },
  {
    title: 'Public liability insurance',
    body: 'Ask for the certificate, not a verbal assurance, and check the expiry date and the indemnity limit. Any contractor working on a commercial frontage should carry cover proportionate to the value of the premises and the stock behind it.',
  },
  {
    title: 'CSCS-carded installers',
    body: 'Our installation teams carry CSCS cards. On a managed site or inside a shopping centre you will usually be asked to evidence this before access is granted, so it is worth confirming for any contractor you appoint.',
  },
  {
    title: 'Written quotations',
    body: 'Everything we price is set out in writing against a specification, with the exclusions stated. A number given over the phone with no scope attached is not a quotation and should not be treated as one.',
  },
];

const standards = [
  { code: 'BS EN 12150', what: 'Toughened safety glass' },
  { code: 'BS EN 14449', what: 'Laminated safety glass' },
  { code: 'BS EN 1634-1', what: 'Fire resistance testing for doorsets' },
  { code: 'BS EN 16005', what: 'Power-operated pedestrian doorsets — safety' },
  { code: 'BS 6375', what: 'Weather performance of windows and doors' },
  { code: 'PAS 24', what: 'Enhanced security performance' },
  { code: 'LPS 1175', what: 'Loss Prevention Standard — physical security ratings' },
  { code: 'Approved Document M', what: 'Accessible thresholds, opening forces, manifestation' },
];

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Checks & Credentials', item: `${SITE_URL}/reviews` },
            ],
          }),
        }}
      />

      <section className="section-padding bg-gradient-dark">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Checks & Credentials' }]} />
          <h1 className="font-heading text-white font-bold text-3xl sm:text-4xl lg:text-5xl mt-6 mb-5">
            What to check before you appoint anyone
          </h1>
          <p className="text-charcoal max-w-3xl" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            A shopfront is a five-figure decision on a building you probably lease, fitted by
            people you have not met. Quotes from a page of glowing testimonials are worth very
            little — anyone can write those. Below is what is actually checkable about us, and
            what you should be asking any contractor who quotes for this work.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <h2 className="font-heading text-white font-bold text-2xl sm:text-3xl mb-8">
            Four things worth verifying
          </h2>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {checks.map((c) => (
              <div key={c.title} className="card-surface" style={{ padding: '1.6rem' }}>
                <h3 className="font-heading text-white font-semibold mb-3" style={{ fontSize: '1.1rem' }}>
                  {c.title}
                </h3>
                <p className="text-charcoal" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-space-light">
        <div className="container-max">
          <h2 className="font-heading text-white font-bold text-2xl sm:text-3xl mb-4">
            The standards we specify against
          </h2>
          <p className="text-charcoal mb-8 max-w-3xl" style={{ lineHeight: 1.7 }}>
            These are the references that appear on our drawings and quotations. If a contractor
            cannot tell you which standard a product is tested to, that is worth noticing.
          </p>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {standards.map((s) => (
              <div key={s.code} className="flex gap-4 items-baseline" style={{ padding: '0.85rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <code className="text-cyan font-mono" style={{ fontSize: '0.85rem', flexShrink: 0, minWidth: '9.5rem' }}>{s.code}</code>
                <span className="text-charcoal" style={{ fontSize: '0.95rem' }}>{s.what}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="font-heading text-white font-bold text-2xl sm:text-3xl mb-4">
            Ask us for references
          </h2>
          <p className="text-charcoal max-w-2xl mx-auto mb-8" style={{ lineHeight: 1.7 }}>
            We would rather put you in touch with a client whose frontage you can go and look at
            than publish quotes you have no way of checking. Tell us what you are planning and
            we will point you at comparable work.
          </p>
          <Link href="/contact" className="btn-gold">Request references</Link>
        </div>
      </section>
    </>
  );
}
