import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';
import BlogPostSchema from '@/components/BlogPostSchema';

export const metadata: Metadata = {
  title: 'FD30 vs FD60 Fire Doors: Which Does Your Business Need?',
  description:
    'Understand the difference between FD30 and FD60 fire doors, UK Building Regulations requirements, and how to choose the correct fire resistance rating for commercial premises.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com/blog/fd30-vs-fd60-fire-door-commercial-premises',
  },
};

const faqs = [
  {
    question: 'What does FD30 mean on a fire door?',
    answer:
      'FD30 indicates that the door assembly has been tested to BS 476-22 or BS EN 1634-1 and achieved at least 30 minutes of fire resistance. This means it can withstand a standard fire exposure for half an hour before the integrity of the door is compromised, giving occupants time to evacuate and limiting fire spread within the building.',
  },
  {
    question: 'When is an FD60 fire door required by law?',
    answer:
      'An FD60 door is typically required where the Building Regulations or a fire risk assessment identifies a need for 60 minutes of compartmentation. Common scenarios include stairway enclosures in buildings over 18 metres in height, boundaries of high-risk areas such as kitchens in commercial premises, corridors serving sleeping accommodation in buildings over three storeys, and storage areas containing hazardous materials.',
  },
  {
    question: 'Can I upgrade an FD30 door to FD60?',
    answer:
      'No. Fire resistance is a property of the complete tested assembly — door leaf, frame, intumescent seals, glazing, and ironmongery. You cannot simply add thicker seals to an FD30 door and reclassify it. If your fire risk assessment requires 60-minute protection, you must install a purpose-manufactured and third-party certified FD60 door set.',
  },
  {
    question: 'How often should fire doors be inspected?',
    answer:
      'The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to maintain fire safety measures in good working order. In practice, fire doors should be visually checked monthly by a competent person and given a detailed inspection at least every six months. Quarterly inspection is recommended in high-traffic environments. Records of all inspections should be kept as part of the fire safety log book.',
  },
];

export default function FD30vsFD60Page() {
  return (
    <>
      <BlogPostSchema
        title="FD30 vs FD60 Fire Doors: Which Does Your Business Need?"
        description="A clear comparison of FD30 and FD60 fire resistance ratings, Building Regulations requirements, and how to choose the right door for your premises."
        slug="fd30-vs-fd60-fire-door-commercial-premises"
        datePublished="2025-03-22"
        dateModified="2026-06-14"
      />
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
              { label: 'FD30 vs FD60 Fire Doors' },
            ]}
          />

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-6">
            FD30 vs FD60 Fire Doors: Which Does Your Business Need?
          </h1>

          <p className="text-charcoal leading-relaxed mb-6">
            Fire doors are a critical part of any commercial building&apos;s passive fire protection strategy. They buy time — holding back flames and smoke so that occupants can evacuate safely and fire services can reach the scene before the blaze spreads beyond a single compartment. In the UK, fire doors are classified by the number of minutes they resist a standard fire test: FD30 provides thirty minutes of protection, while FD60 provides sixty. Choosing the wrong rating is not just a safety risk; it is a breach of the Building Regulations that can result in enforcement action and, in the worst case, criminal prosecution.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Understanding Fire Resistance Ratings
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            The FD designation — Fire Door — is followed by a number representing the minimum fire resistance in minutes when tested to BS 476-22 or the European standard BS EN 1634-1. An FD30 door has withstood at least 30 minutes of standardised fire exposure without failure of integrity (passage of flames or hot gases). An FD60 door has achieved at least 60 minutes. Some doors also carry an &quot;S&quot; suffix (for example, FD30S or FD60S), indicating they have additionally been tested for smoke leakage to BS 476-31.1 and include cold-smoke seals alongside the intumescent strips.
          </p>
          <p className="text-charcoal leading-relaxed mb-6">
            It is important to understand that the rating applies to the complete door assembly — leaf, frame, intumescent seals, hinges, closer, lock, and any glazed apertures. Swapping any component for a non-tested alternative can invalidate the rating entirely.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            What the Building Regulations Require
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Approved Document B (Fire Safety) of the Building Regulations for England sets out the minimum periods of fire resistance for different elements of construction, depending on building height, use, and occupancy type. As a general rule:
          </p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li><strong>FD30</strong> is the standard requirement for doors protecting means of escape in most commercial premises up to 18 metres in height. This includes doors to corridors, stairway enclosures, and rooms opening onto escape routes.</li>
            <li><strong>FD60</strong> is required where a higher period of compartmentation is specified — for example, in buildings over 18 metres, in stairway enclosures serving basements, and in locations identified by a fire engineer&apos;s assessment as needing additional protection.</li>
          </ul>
          <p className="text-charcoal leading-relaxed mb-6">
            In Scotland, the requirements are set out in the Building (Scotland) Regulations and the associated Technical Handbooks, which follow similar principles but with some differences in detail. In Northern Ireland, the Building Regulations (Northern Ireland) apply. Always check the requirements specific to your jurisdiction.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            When Your Business Needs FD30
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            FD30 doors are the workhorse of commercial fire protection. If your premises are a standard retail unit, office, or small workshop in a building under 18 metres tall, FD30 doors on escape routes and compartment walls will typically satisfy the Building Regulations. They are lighter, less expensive, and easier to operate than their FD60 equivalents, which makes them practical for high-traffic doorways where ease of use matters.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            When Your Business Needs FD60
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            FD60 doors come into play when the fire risk assessment or Building Regulations demand a higher level of compartmentation. Common commercial scenarios include:
          </p>
          <ul className="list-disc pl-6 text-charcoal leading-relaxed mb-6 space-y-2">
            <li>Stairway enclosures in buildings over 18 metres in height.</li>
            <li>Doors between a commercial kitchen and the rest of the premises.</li>
            <li>Boundaries of high-risk storage areas — for example, rooms storing flammable liquids or large quantities of combustible stock.</li>
            <li>Basement levels, where evacuation times are longer and firefighting access is more difficult.</li>
            <li>Shared walls or floors between different tenancies in a multi-occupied building, where the fire strategy requires 60-minute compartmentation.</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Third-Party Certification
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            A genuine fire door should carry a label or plug from a recognised third-party certification body — typically BWF-CERTIFIRE, BM TRADA Q-Mark, or Warringtonfire. This label confirms that the door has been manufactured under an audited quality management system and that the specific configuration has been tested and approved. Doors without third-party certification may not be accepted by Building Control or your insurer.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Installation and Compliance
          </h2>
          <p className="text-charcoal leading-relaxed mb-6">
            Even a correctly rated fire door is only effective if it is installed properly. Gaps between the leaf and the frame must be within the tolerances specified in the test evidence — typically 3mm to 4mm. Intumescent strips and smoke seals must be fitted in the correct positions. Hinges must be fire-rated (usually CE-marked steel butt hinges, three per leaf), and the closer must generate enough force to fully latch the door from any angle of opening. At Sigma Shop Fronts, our{' '}
            <Link href="/services/fire-doors" className="text-gold font-medium hover:underline">
              fire door installation service
            </Link>{' '}
            covers supply, fitting, and certification so that your premises meet the required standard from day one.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-navy mt-10 mb-4">
            Ongoing Maintenance
          </h2>
          <p className="text-charcoal leading-relaxed mb-10">
            The Regulatory Reform (Fire Safety) Order 2005 places a duty on the &quot;responsible person&quot; — usually the employer or building manager — to maintain fire safety measures in working order. Fire doors should be visually inspected monthly, with a more detailed check at least every six months. Look for damage to the leaf or frame, missing or damaged intumescent strips, gaps that exceed the permitted tolerances, closers that fail to latch the door, and any wedges or hold-open devices that are not connected to the fire alarm system. Keep written records of every inspection.
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
