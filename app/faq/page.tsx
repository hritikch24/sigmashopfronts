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
  {
    question: 'Sigma is a relatively new company — how can I trust the quality of your work?',
    answer:
      'While Sigma Shopfronts and Shutter Limited was incorporated recently, our installation teams collectively bring over 10 years of hands-on experience in the commercial shopfront and security industry. Our fitters, estimators, and project managers have worked on hundreds of projects across the UK before joining Sigma — from high-street retail chains to independent businesses. We are Companies House registered (No. 16794487), fully insured, and every installation is backed by our workmanship guarantee. We are happy to provide references and examples of completed work on request.',
  },
  {
    question: 'How much does a roller shutter cost in the UK?',
    answer:
      'A manual roller shutter for a standard single-bay shopfront typically costs between £800 and £1,500 installed. Electric roller shutters range from £1,200 to £2,500 depending on the opening width and motor specification. Fire-rated shutters start from around £2,000 and LPS 1175 security-rated shutters from £2,500 to £5,000. We provide a fixed written quote after a free site survey so you know exactly what to budget.',
  },
  {
    question: 'What is the best shopfront material — aluminium, timber, or UPVC?',
    answer:
      'For commercial premises, aluminium is the industry standard and the material we recommend. It offers the best combination of strength, durability, weather resistance, and design flexibility. Unlike timber, aluminium does not rot, warp, or require regular repainting. Unlike UPVC, aluminium supports slimline sightlines and large glass areas without structural compromise. A well-installed aluminium shopfront typically lasts 25 to 30 years with minimal maintenance. We use thermally broken aluminium profiles that comply with Building Regulations Part L for energy performance.',
  },
  {
    question: 'Do you install shopfronts in London?',
    answer:
      'Yes. We cover all 32 London boroughs and the City of London. We have extensive experience working in conservation areas including Shoreditch, Islington, and Camden, and we manage planning applications, out-of-hours installation, and the logistical challenges of central London sites including crane permits, footway licences, and congestion zone coordination. Our London projects range from single independent retailers to multi-unit commercial developments.',
  },
  {
    question: 'How do I find the best shopfront company near me?',
    answer:
      'Look for a company that is Companies House registered, carries public liability insurance, provides written quotations with clear terms, and can show examples of completed work. Ask whether their installers hold CSCS cards and whether they provide written warranties. Be cautious of companies that quote without visiting the site, demand large deposits, or cannot provide insurance certificates. Sigma Shop Fronts ticks all of these boxes — we are happy to share references, insurance documents, and photos of completed projects before you commit.',
  },
  {
    question: 'What is the difference between a shopfront and a curtain wall?',
    answer:
      'A shopfront is a ground-floor entrance and display system fitted within a structural opening, typically consisting of aluminium frames, glazed panels, and one or more entrance doors. A curtain wall is a non-structural external cladding system that spans multiple storeys and is hung from the building structure rather than sitting within a masonry opening. For most retail, hospitality, and commercial premises at ground level, a shopfront system is the appropriate specification. We specialise in shopfront systems but can advise on when a curtain wall approach may be more suitable.',
  },
  {
    question: 'Can you install a shopfront for a restaurant or cafe?',
    answer:
      'Absolutely. Restaurants and cafes are one of our most common client types. We install aluminium shopfronts with bi-fold door sections that open the entire frontage in summer, automatic sliding doors for busy entrances, and thermally efficient glazed systems that keep heating costs down in winter. We also handle the specific requirements of food premises including ventilation provisions, grease-trap access panels, and extraction system integration where the shopfront design needs to accommodate ducting.',
  },
  {
    question: 'What happens if my shopfront is damaged in a break-in?',
    answer:
      'Call our 24/7 emergency line on 07414 779594 immediately. We will dispatch an engineer to board up and secure the premises, typically within two to four hours. We photograph all damage before beginning temporary works, providing insurance-ready documentation. Once the premises is secure, we assess the permanent repair or replacement required and provide a quotation. Most commercial property insurance policies cover emergency boarding and permanent repair costs. We work directly with loss adjusters to facilitate claims.',
  },
  {
    question: 'Do you offer shopfront maintenance contracts?',
    answer:
      'Yes. We offer annual and bi-annual maintenance contracts covering shopfronts, roller shutters, automatic doors, and fire doors. A typical maintenance visit includes inspection of all frames, seals, and hardware; lubrication of moving parts; safety testing of automatic doors to BS EN 16005; and a written report. Regular maintenance extends the life of your installation, maintains insurance compliance, and catches small problems before they become expensive repairs.',
  },
  {
    question: 'How long does it take from enquiry to completed installation?',
    answer:
      'For a standard shopfront replacement, the typical timeline is: survey within one week of enquiry, quotation within 48 hours of survey, fabrication two to three weeks from confirmed order, and installation one to two days. The total from first contact to completion is usually four to six weeks. Projects requiring planning permission, structural work, or bespoke specifications may take longer, and we provide a detailed programme at the quotation stage.',
  },
  {
    question: 'Can you match my existing shopfront colour or profile?',
    answer:
      'In most cases, yes. We can powder-coat aluminium to any RAL, NCS, or BS 4800 colour reference. If you have an existing colour that you need to match, we can work from a physical sample or a Pantone reference. For profiles, we work with multiple European fabricators and can usually identify or closely approximate the existing profile system. Where an exact match is not available for an obsolete profile, we will advise on the closest equivalent and show you a sample before proceeding.',
  },
  {
    question: 'Are your shopfronts energy efficient?',
    answer:
      'Yes. All our standard shopfront installations use thermally broken aluminium profiles that comply with Building Regulations Part L (Conservation of Fuel and Power). The polyamide thermal break within the aluminium section prevents heat transfer through the frame, and our double-glazed units typically achieve centre-pane U-values between 1.0 and 1.4 W/m2K. For premises seeking enhanced energy performance, we can specify triple glazing, low-emissivity coatings, and argon-filled cavities.',
  },
  {
    question: 'What is PAS 24 and do I need it for my shopfront?',
    answer:
      'PAS 24:2022 is a British security standard for doors and windows that tests resistance to physical attack. Many landlords, developers, and insurers now require PAS 24 certification for new commercial glazing. If your lease, insurance policy, or building specification requires enhanced security glazing, we can supply and install PAS 24 certified door sets and glazing systems with the appropriate certification documentation.',
  },
  {
    question: 'Do you install shopfronts in Birmingham and the West Midlands?',
    answer:
      'Yes — Birmingham and the West Midlands is our home region. We work across the city from the Jewellery Quarter to Digbeth, Erdington to Solihull. We have particular experience with conservation area shopfronts in the Jewellery Quarter and with managed retail centres including the Bullring. We also cover Coventry, Wolverhampton, Walsall, Dudley, and the wider Black Country.',
  },
  {
    question: 'What is the difference between FD30 and FD60 fire doors?',
    answer:
      'FD30 fire doors provide 30 minutes of fire resistance and are the most common requirement for corridor and compartment doors in commercial buildings. FD60 doors provide 60 minutes and are required for higher-risk locations such as stairway enclosures in taller buildings, plant rooms, and storage areas containing hazardous materials. The correct rating depends on your building\'s fire strategy and risk assessment. We can advise on the appropriate specification for your premises and supply certified door sets from accredited manufacturers.',
  },
  {
    question: 'Can you install automatic doors for wheelchair access?',
    answer:
      'Yes. Automatic doors are one of the most effective ways to comply with the Equality Act 2010, which requires businesses to make reasonable adjustments for disabled customers and staff. We install automatic sliding and swing door systems that meet BS EN 16005 safety requirements and BS 8300 accessibility guidance. Every installation includes a full safety test record and handover documentation. We also offer annual maintenance contracts to ensure ongoing compliance.',
  },
  {
    question: 'Do you work on listed buildings?',
    answer:
      'Yes. We have completed shopfront installations on Grade I and Grade II listed buildings across the UK, including in Edinburgh\'s World Heritage Site, London\'s conservation areas, and Manchester\'s Ancoats conservation area. Listed building consent is required for any works affecting the character of a listed structure, and we manage the consent application process including preparation of heritage impact assessments, liaison with conservation officers, and specification of heritage-appropriate profiles and finishes.',
  },
  {
    question: 'What areas of Manchester do you cover for shopfront installation?',
    answer:
      'We cover the full Greater Manchester area including the city centre (Northern Quarter, Deansgate, Spinningfields), the inner suburbs (Ancoats, Chorlton, Didsbury), and the wider combined authority area (Salford, Trafford, Stockport, Tameside, Rochdale, Bury, Bolton, Wigan, Oldham). We have particular experience with listed buildings in Ancoats and the Northern Quarter, and with managed retail environments including the Trafford Centre.',
  },
  {
    question: 'How do I get a quote for a new shopfront?',
    answer:
      'Contact us by phone on 07414 779594, by email at sales@sigmashopfronts.com, via WhatsApp, or through the contact form on our website. We will arrange a free site survey at a time that suits you. Our surveyor will visit your premises, take precise measurements, discuss your requirements, and assess any structural or planning considerations. You will receive a detailed written quotation — usually within 48 hours of the survey — with no obligation to proceed.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sigmashopfronts.com' }, { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.sigmashopfronts.com/faq' }] }) }} />
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
