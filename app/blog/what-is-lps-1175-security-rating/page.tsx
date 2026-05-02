import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'What Is the LPS 1175 Security Rating? A Business Owner\'s Guide',
  description:
    'Learn what the LPS 1175 security rating means, how the rating levels work, what insurers require, and how to choose the right security door for your commercial premises.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com/blog/what-is-lps-1175-security-rating',
  },
};

const faqs = [
  {
    question: 'What does LPS 1175 stand for?',
    answer:
      'LPS stands for Loss Prevention Standard. LPS 1175 is a security standard developed and administered by the Loss Prevention Certification Board (LPCB), which is part of BRE (the Building Research Establishment). It tests the physical resistance of building components — doors, shutters, windows, and walls — against forced entry using defined tool sets and attack methods.',
  },
  {
    question: 'What LPS 1175 rating do I need for insurance purposes?',
    answer:
      'Most commercial insurers in the UK require a minimum of Security Rating 2 (SR2) for doors and shutters protecting insured premises. Higher-value or higher-risk premises — such as jewellers, pharmacies, and electronics retailers — may be required to meet SR3 or SR4. Always check your specific policy wording or ask your broker for the exact requirement.',
  },
  {
    question: 'Is LPS 1175 the same as Secured by Design?',
    answer:
      'They are related but not the same. Secured by Design (SBD) is a police-backed initiative that sets security standards for buildings and developments. SBD recognises LPS 1175-certified products as meeting its requirements for commercial premises. In other words, an LPS 1175-rated door will typically satisfy the Secured by Design specification, but SBD also covers broader design considerations such as layout, lighting, and landscaping.',
  },
  {
    question: 'How can I verify that a door is genuinely LPS 1175 certified?',
    answer:
      'Every LPS 1175-certified product carries a unique LPCB certificate number. You can verify this on the LPCB Red Book, which is a freely searchable online database maintained by BRE. The product should also display a physical LPCB approval label. If a supplier cannot provide a certificate number or the product does not appear in the Red Book, treat the claim with caution.',
  },
];

export default function LPS1175Page() {
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

      <article className="section-padding bg-white">
        <div className="container-max max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'LPS 1175 Security Rating' },
            ]}
          />

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-6">
            What Is the LPS 1175 Security Rating? A Business Owner&apos;s Guide
          </h1>

          <p className="text-charcoal leading-relaxed mb-6">
            If you have ever received a letter from your insurer asking for &quot;LPS 1175-rated doors&quot; or seen the term on a security product brochure, you may have wondered what it actually means — and whether it matters. The short answer is that LPS 1175 is one of the most widely recognised physical security standards in the UK, and meeting the right level can be the difference between a valid insurance claim and a rejected one.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            The Standard Explained
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            LPS 1175 is published by the Loss Prevention Certification Board (LPCB), a division of BRE (the Building Research Establishment) based in Watford. It tests the resistance of building components — doors, shutters, windows, walls, and fencing — to forced entry. Unlike many standards that only assess the strength of a lock or a hinge in isolation, LPS 1175 subjects the complete installed assembly to a realistic attack using defined tool categories, carried out by trained operatives within a fixed time window. If the product prevents access for the required duration, it passes.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Understanding the Security Rating Levels
          </h2>
          <p className="text-charcoal leading-relaxed mb-4">
            LPS 1175 Issue 8 (the current version) uses a tiered system of Security Ratings (SR). Each level corresponds to a progressively more capable attacker with better tools and more time:
          </p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-3">
            <li><strong>SR1</strong> — Resists a casual opportunist using bodily force and small hand tools (screwdrivers, pliers). Suitable for low-risk internal doors and storage areas.</li>
            <li><strong>SR2</strong> — Resists a determined opportunist with a wider tool set including larger hand tools (crowbars, bolt croppers). The most commonly specified level for standard commercial premises such as retail shops, offices, and small warehouses.</li>
            <li><strong>SR3</strong> — Resists a more determined attacker with additional tools including battery-powered tools (drills, reciprocating saws). Often required for higher-value retail such as jewellers, pharmacies, and off-licences.</li>
            <li><strong>SR4</strong> — Resists a knowledgeable attacker with mains-powered tools (angle grinders, disc cutters). Specified for high-security applications such as cash centres, data centres, and premises storing controlled substances.</li>
            <li><strong>SR5 and above</strong> — Intended for the highest-risk environments including government, military, and critical national infrastructure.</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Why Insurers Care About LPS 1175
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Insurance underwriters base premiums and policy terms on risk. A shopfront with a tested, certified security door presents a quantifiably lower risk of forced entry than one without. Most UK commercial property policies now include a minimum physical security requirement, and LPS 1175 is the standard they reference most often. The Association of British Insurers (ABI) and the insurance industry&apos;s own risk surveyors routinely recommend LPCB-certified products.
          </p>
          <p className="text-charcoal leading-relaxed mb-6">
            If your policy specifies an LPS 1175 requirement and you fail to meet it, the insurer may reduce or decline a claim following a break-in — even if the door was forced open — on the grounds that you did not maintain the agreed level of security. Checking your policy wording and matching it to the correct Security Rating is therefore not optional; it is a basic commercial precaution.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Choosing the Right Level for Your Business
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            The right Security Rating depends on what you are protecting, where your premises are located, and what your insurer requires. As a starting point:
          </p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li>Standard retail units, takeaways, and offices — SR2 is usually sufficient.</li>
            <li>Jewellers, opticians, pharmacies, and off-licences — SR3 is commonly specified by insurers.</li>
            <li>Cash-handling premises, electronics warehouses, and bonded stores — SR4 or above may be required.</li>
          </ul>
          <p className="text-charcoal leading-relaxed mb-6">
            Your insurer or broker can confirm the exact requirement. If you are in any doubt, specify the higher rating — the cost difference is usually modest compared to the potential consequences of under-specifying.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Verifying Certification
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Any supplier can claim their product is &quot;to LPS 1175 standard,&quot; but genuine certification is verifiable. Every approved product has a unique LPCB certificate number, and you can look it up in the LPCB Red Book — a free online database hosted by BRE at <em>redbooklive.com</em>. The physical product should also display a permanent LPCB approval label. If a supplier cannot provide a certificate number or tells you the product is &quot;equivalent to&quot; LPS 1175 without actually holding the certification, treat the claim sceptically.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Installation Matters
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            An LPS 1175-rated door is only as strong as its installation. The test certificate covers a specific fixing method to a specific substrate (for example, steel or concrete). If the door is installed differently — fixed to a weak timber frame, or with fewer anchors than specified — the rating is effectively void. Professional installation by a team that understands the certification requirements is essential. Our{' '}
            <Link href="/services/security-doors" className="text-gold font-medium hover:underline">
              security door installation service
            </Link>{' '}
            ensures every door is fitted in accordance with the manufacturer&apos;s tested specification, so the rating holds up under scrutiny from Building Control and your insurer alike.
          </p>

          <p className="text-charcoal leading-relaxed mb-10">
            Investing in an LPS 1175-certified door is one of the most practical steps a business owner can take to protect their premises, satisfy their insurer, and reduce the risk of a costly break-in. The key is to match the Security Rating to your specific risk profile and ensure the product is installed exactly as tested.
          </p>

          {/* Visual FAQ section */}
          <section className="border-t border-grey-200 pt-10">
            <h2 className="font-heading text-2xl font-semibold text-navy mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-heading text-lg font-medium text-navy mb-2">
                    {faq.question}
                  </h3>
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
