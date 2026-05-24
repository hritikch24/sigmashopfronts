import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

const slug = 'best-shopfront-company-uk-how-to-choose';
const pageTitle = 'How to Choose the Best Shopfront Company in the UK';
const pageDesc = 'A practical checklist for finding a reliable, professional shopfront installation company in the UK. What to look for, red flags to avoid, and questions to ask before signing.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: `https://www.sigmashopfronts.com/blog/${slug}` },
  openGraph: { title: pageTitle, description: pageDesc, url: `https://www.sigmashopfronts.com/blog/${slug}`, type: 'article' },
};

const faqs = [
  {
    question: 'What should I look for in a shopfront installer?',
    answer:
      'Look for Companies House registration, public liability insurance (minimum £1 million), written quotations with clear terms, CSCS-carded installers, examples of completed work, and written warranties. A reputable company will be happy to provide all of these before you commit.',
  },
  {
    question: 'How do I check if a shopfront company is legitimate?',
    answer:
      'Search for the company on the Companies House website (beta.companieshouse.gov.uk). This confirms registration status, incorporation date, registered office, and director details. Ask for copies of their public liability and employers\' liability insurance certificates and check the validity dates. Finally, ask for references from recent clients.',
  },
  {
    question: 'Should I get multiple quotes for a shopfront?',
    answer:
      'Yes — three quotes is a reasonable number. Ensure each quotation covers the same specification so you are comparing like with like. The cheapest quote is not always the best value; consider the quality of materials specified, the warranty offered, the company\'s track record, and whether the price includes removal and disposal of the existing shopfront.',
  },
  {
    question: 'What are the red flags when choosing a shopfront company?',
    answer:
      'Be cautious of companies that: quote without visiting the site; demand a large upfront deposit (10–20% is normal, 50% or more is a red flag); cannot provide insurance certificates; are not registered at Companies House; have no physical address; pressure you into signing immediately; or have no examples of previous work to show.',
  },
];

export default function BestShopfrontCompanyPage() {
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
            url: `https://www.sigmashopfronts.com/blog/${slug}`, datePublished: '2025-04-25', dateModified: '2025-04-25',
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
              { label: 'How to Choose the Best Shopfront Company' },
            ]}
          />

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-6">
            How to Choose the Best Shopfront Company in the UK
          </h1>

          <p className="text-charcoal leading-relaxed mb-6">
            Choosing a shopfront installer is a significant decision. Your shopfront is the face of your business — it is the first thing customers see, and it needs to look right, perform well, and last for years. Unfortunately, the shopfront industry has its share of unreliable operators who overcharge, underdeliver, or disappear after taking a deposit. This guide helps you identify a professional, trustworthy installer and avoid the common pitfalls.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">The Essential Checklist</h2>
          <p className="text-charcoal leading-relaxed mb-4">Before appointing any shopfront company, confirm the following:</p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-3">
            <li><strong>Companies House registration:</strong> Every legitimate UK company is registered at Companies House. Search for the company name at beta.companieshouse.gov.uk and check that the company is active, not dissolved or in liquidation. Note the incorporation date — while newer companies can be excellent, this gives you context.</li>
            <li><strong>Public liability insurance:</strong> A minimum of £1 million cover is standard for shopfront installation work. Ask for a copy of the certificate and check the validity dates. Do the same for employers&apos; liability insurance if they have employees.</li>
            <li><strong>Written quotation:</strong> A professional quotation should itemise materials, labour, removal and disposal of the existing shopfront, and any structural or regulatory costs. It should state the payment terms, the warranty, and an estimated timeline. Verbal quotes are worthless.</li>
            <li><strong>CSCS cards:</strong> The Construction Skills Certification Scheme demonstrates that installers have passed a health and safety assessment. This is increasingly required for commercial sites and is a minimum indicator of professional competence.</li>
            <li><strong>Examples of previous work:</strong> Ask for photographs and, ideally, the addresses of recent installations so you can see the quality for yourself. Better still, ask for client references and actually call them.</li>
            <li><strong>Written warranty:</strong> Any reputable installer will provide a written warranty covering both the materials and the installation workmanship. Be wary of companies that offer only verbal assurances.</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Red Flags to Watch For</h2>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-3">
            <li><strong>Quoting from photographs:</strong> A company that quotes without visiting the site cannot give you an accurate price. They are either planning to add extras later or they do not understand what the job involves.</li>
            <li><strong>Large upfront deposits:</strong> A 10–20% deposit on order confirmation is normal. Anything above 30% before work begins is a risk. Never pay the full amount before installation is complete.</li>
            <li><strong>No physical address:</strong> A company with only a mobile phone number and no registered office address is harder to hold accountable if something goes wrong.</li>
            <li><strong>Pressure tactics:</strong> &ldquo;This price is only valid today&rdquo; or &ldquo;We have a cancellation and can start tomorrow&rdquo; are classic high-pressure sales tactics. A legitimate installer will give you time to consider the quotation.</li>
            <li><strong>No insurance documentation:</strong> If a company cannot or will not provide copies of their insurance certificates, do not proceed.</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Questions to Ask Before Signing</h2>
          <ol className="list-decimal pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li>Are you registered at Companies House? What is your company number?</li>
            <li>Can you provide copies of your public liability and employers&apos; liability insurance?</li>
            <li>Do your installers hold CSCS cards?</li>
            <li>What is your warranty, and is it in writing?</li>
            <li>Will you handle planning permission and building control if required?</li>
            <li>What is included in the price — removal, disposal, making good?</li>
            <li>What are the payment terms and when is the final balance due?</li>
            <li>Can you provide references from recent clients?</li>
          </ol>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">Why Businesses Choose Sigma Shop Fronts</h2>
          <p className="text-charcoal leading-relaxed mb-6">
            At <Link href="/why-choose-us" className="text-gold font-medium hover:underline">Sigma Shop Fronts</Link>, we meet every criterion on this checklist. We are Companies House registered, fully insured, and our installation teams hold CSCS cards. Every project comes with a written workmanship guarantee, and our quotations are detailed, transparent, and valid for 30 days. Our staff collectively bring over 10 years of hands-on experience in the commercial shopfront industry, and we are happy to share references, insurance certificates, and photographs of completed projects before you commit. We provide{' '}
            <Link href="/contact" className="text-gold font-medium hover:underline">free site surveys</Link> with no obligation — call us on 07414 779594 to arrange yours.
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
