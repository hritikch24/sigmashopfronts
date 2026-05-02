import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to the most common questions about shopfront installation, costs, materials, planning permission, warranties, and more from Sigma Shop Fronts.',
  alternates: {
    canonical: '/faq',
  },
};

const faqs = [
  {
    question: 'What areas of the UK do you cover?',
    answer:
      'We are based in the West Midlands but operate nationwide across England, Wales, and Scotland. We regularly work in Birmingham, Coventry, Leicester, Nottingham, Manchester, Leeds, London, and many areas in between. If you are unsure whether we cover your location, please get in touch and we will let you know.',
  },
  {
    question: 'How much does a new shopfront cost?',
    answer:
      'The cost of a shopfront depends on several factors including the width and height of the opening, the glazing specification (toughened, laminated, or solar-control glass), the aluminium profile and finish chosen, and whether the installation requires structural alterations. As a very rough guide, a standard single-bay shopfront typically starts from around £2,000–£5,000 supply and install, but larger or more complex projects will be higher. We always provide a detailed written quotation before any work begins so there are no surprises.',
  },
  {
    question: 'How long does a shopfront installation take?',
    answer:
      'A straightforward shopfront replacement is typically completed in one to two days, depending on the size of the opening and the complexity of the glazing. Larger projects or those requiring structural work may take longer. We will give you a realistic programme during the quotation stage and work wherever possible to minimise disruption to your trading hours.',
  },
  {
    question: 'Do you offer free site surveys?',
    answer:
      'Yes — all site surveys are completely free of charge and carry no obligation. One of our experienced surveyors will visit your premises, take precise measurements, assess any structural considerations, and discuss your requirements. You will receive a detailed written quotation, usually within 48 hours of the survey.',
  },
  {
    question: 'What materials do you use?',
    answer:
      'We use high-quality extruded aluminium profiles from approved European manufacturers, typically powder-coated in a range of RAL colours to suit your branding or planning requirements. Glass units are sourced from UK-certified glazing suppliers and comply with BS 6206 and BS EN 12600 safety glazing standards. We can also incorporate stainless steel or timber elements on request.',
  },
  {
    question: 'Are you registered and insured?',
    answer:
      'Yes. Sigma Shopfronts and Shutter Ltd is registered at Companies House under company number 16794487. We carry comprehensive public liability insurance and employers\' liability insurance. Copies of our certificates are available on request. All our installation operatives hold relevant trade cards and have completed appropriate health and safety training.',
  },
  {
    question: 'Do you handle building regulations compliance?',
    answer:
      'Yes. All our installations are designed and carried out to comply with the relevant sections of the Building Regulations for England and Wales, including Part L (Conservation of Fuel and Power), Part M (Access), and Part B (Fire Safety) where applicable. We can liaise with your local authority building control on your behalf if required.',
  },
  {
    question: 'Do I need planning permission for a new shopfront?',
    answer:
      'In many cases, replacing a shopfront on a like-for-like basis is considered permitted development and does not require planning permission. However, if the property is listed, sits within a conservation area, or if you wish to significantly alter the appearance of the frontage, you may need to apply for consent. We can advise you during the survey stage and, if necessary, point you in the right direction for your local planning authority.',
  },
  {
    question: 'Do you offer emergency callout?',
    answer:
      'Yes — we offer a 24/7 emergency callout service for situations such as break-ins, storm damage, or failed shutters that leave your premises unsecured. We aim to have an operative on site within a few hours in most parts of our coverage area. Call us on 07414 779594 at any time and we will do our utmost to assist you as quickly as possible.',
  },
  {
    question: 'What warranty do you provide on your installations?',
    answer:
      'All our shopfront installations come with a written warranty covering both the aluminium fabrication and the installation workmanship. The exact terms depend on the product type, but typically we offer a minimum of 12 months on installation labour and up to 10 years on certain glazing sealed units. Full warranty details are included in your quotation documentation.',
  },
  {
    question: 'Can you repair an existing shopfront rather than replace it?',
    answer:
      'Absolutely. We carry out repairs to aluminium frames, glazing, door mechanisms, locks, closers, and seals. If your existing shopfront is structurally sound but suffering from worn or damaged components, a repair is often far more cost-effective than a full replacement. Send us photos of the damage and we can advise remotely before arranging a visit.',
  },
  {
    question: 'What types of roller shutters do you offer?',
    answer:
      'We install a full range of roller shutters including solid steel (galvanised or powder-coated), perforated steel (for ventilation and partial visibility), polycarbonate (for maximum light transmission), and aluminium lath. Shutters can be operated manually (spring-balanced or hand-crank), electrically (via push-button, key switch, or remote control), or with battery backup systems. We can also retrofit electric operators to existing manual shutters.',
  },
];

const schemaData = {
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <SchemaMarkup type="FAQPage" data={schemaData} />

      {/* Hero */}
      <section className="bg-gradient-dark section-padding">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />
          <h1 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-300 leading-relaxed">
            We have pulled together the questions we hear most often from clients. If you cannot find
            the answer you are looking for, please do not hesitate to get in touch directly — we are
            always happy to help.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding pb-0">
        <div className="container-max">
          <p className="text-grey-600 max-w-3xl leading-relaxed">
            From pricing and planning permission through to materials, warranties, and emergency callout —
            the answers below cover the most common queries we receive from businesses considering a new
            shopfront or shutter installation. These are general guidelines; every project is different,
            and our team will always provide tailored advice during your free site survey.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding">
        <div className="container-max max-w-3xl">
          <FAQSection faqs={faqs} title="Your Questions Answered" />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-grey-300 mb-8 max-w-xl mx-auto">
            Our team is on hand to answer any specific queries about your project. Contact us today for
            expert advice and a free, no-obligation site survey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Contact Us Today
            </Link>
            <a href="tel:+447414779594" className="btn-outline">
              Call 07414 779594
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
