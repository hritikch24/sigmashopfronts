import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shopfront Glossary | Sigma Shop Fronts',
  description:
    'Definitions of common shopfront industry terms including aluminium extrusion, thermal breaks, fire ratings, security standards, and glazing specifications. A reference guide from Sigma Shop Fronts.',
  alternates: {
    canonical: 'https://www.sigmashopfronts.com/glossary',
  },
  openGraph: {
    title: 'Shopfront Glossary | Sigma Shop Fronts',
    description:
      'A comprehensive glossary of shopfront, glazing, and commercial door terminology used across the UK industry.',
    url: 'https://www.sigmashopfronts.com/glossary',
  },
};

interface GlossaryTerm {
  term: string;
  definition: string;
  relatedService?: { label: string; href: string };
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Aluminium Extrusion',
    definition:
      'The manufacturing process by which aluminium alloy is forced through a shaped die to produce profiles with a consistent cross-section. Shopfront frames, mullions, transoms, and door stiles are all made from extruded aluminium sections. The extrusion process allows complex profile shapes — including channels for glazing gaskets, drainage slots, and thermal break cavities — to be produced in long lengths that are then cut and fabricated to the dimensions of each project.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Anodising',
    definition:
      'An electrochemical surface treatment applied to aluminium that creates a hard, corrosion-resistant oxide layer on the surface of the metal. Anodised aluminium has a distinctive metallic finish — typically silver, bronze, or black — that differs in character from powder-coated finishes. Anodising is sometimes specified for shopfronts where a brushed or satin metallic appearance is preferred over the opaque colour of a powder coat.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Bi-Parting Doors',
    definition:
      'A pair of automatic sliding doors that open from the centre, with each leaf sliding in opposite directions. Bi-parting doors are the most common configuration for automatic entrance systems in retail and hospitality premises, providing a wide clear opening for high-footfall environments. The doors are powered by an electric drive unit mounted in a header beam above the opening.',
    relatedService: { label: 'Automatic Doors', href: '/services/automatic-doors' },
  },
  {
    term: 'Building Regulations Part L',
    definition:
      'The section of the Building Regulations for England that deals with the conservation of fuel and power. Part L sets minimum thermal performance standards for new and replacement glazing, doors, and building fabric elements. For shopfronts, this means that replacement aluminium frames and glazed units must achieve specified U-values, which in practice requires the use of thermally broken profiles and double-glazed units as a minimum.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'BS EN 12150',
    definition:
      'The British and European standard for thermally toughened soda lime silicate safety glass. BS EN 12150 specifies the requirements for toughened glass used in shopfronts, doors, and other applications where safety glazing is required. Toughened glass is approximately four to five times stronger than annealed glass of the same thickness and, when broken, fractures into small, roughly cubic fragments rather than dangerous shards.',
  },
  {
    term: 'BS EN 16005',
    definition:
      'The European standard for the safety in use of power-operated pedestrian doorsets. BS EN 16005 specifies the requirements for the design, installation, commissioning, and testing of automatic doors to ensure they operate safely without risk of injury to users. Compliance with this standard is a legal requirement under the Machinery Directive and the Supply of Machinery (Safety) Regulations. All automatic door installations must be commissioned with a documented safety test record.',
    relatedService: { label: 'Automatic Doors', href: '/services/automatic-doors' },
  },
  {
    term: 'CERTIFIRE',
    definition:
      'An independent third-party certification scheme for fire protection products, managed by Warringtonfire. CERTIFIRE certification provides evidence that a fire door, fire shutter, or fire-resistant glazing system has been tested and assessed to the relevant fire performance standards. Specifying CERTIFIRE-certificated products is the most widely accepted method of demonstrating fire door compliance in the UK.',
    relatedService: { label: 'Fire Doors', href: '/services/fire-doors' },
  },
  {
    term: 'Clear Opening Width',
    definition:
      'The unobstructed width of a doorway measured between the face of the open door leaf and the opposite door stop or frame. Clear opening width is a critical dimension for accessibility compliance: Approved Document M of the Building Regulations specifies minimum clear opening widths for different building types, and the Equality Act 2010 requires businesses to ensure that doorways provide adequate access for wheelchair users.',
    relatedService: { label: 'Automatic Doors', href: '/services/automatic-doors' },
  },
  {
    term: 'Cold Smoke Seal',
    definition:
      'A compression seal fitted to the edges of a fire door that prevents the passage of cold smoke (smoke at ambient temperature) through the gaps between the door leaf and the frame. Cold smoke seals are distinct from intumescent seals, which activate only at high temperatures. Many fire door specifications require both cold smoke seals and intumescent strips to provide complete fire and smoke compartmentation.',
    relatedService: { label: 'Fire Doors', href: '/services/fire-doors' },
  },
  {
    term: 'Curtain (Roller Shutter)',
    definition:
      'The main body of a roller shutter, consisting of interlocking laths — typically steel or aluminium — that roll around a barrel at the top of the opening. The curtain is the visible and functional element of the shutter: it provides the security barrier when closed and coils compactly into the headbox or behind a fascia when open. Curtain types include solid steel, perforated steel, polycarbonate-filled, and aluminium lath.',
    relatedService: { label: 'Roller Shutters', href: '/services/roller-shutters' },
  },
  {
    term: 'DDA Compliance',
    definition:
      'A commonly used shorthand (referring to the former Disability Discrimination Act, now superseded by the Equality Act 2010) for the legal requirement that service providers make reasonable adjustments to ensure their premises are accessible to disabled people. In the context of shopfronts, DDA compliance typically involves providing level or ramped access, adequate door widths, automatic door operation, and appropriate contrast markings on glazed surfaces.',
    relatedService: { label: 'Automatic Doors', href: '/services/automatic-doors' },
  },
  {
    term: 'Double-Glazed Unit (DGU)',
    definition:
      'A sealed glazing unit consisting of two panes of glass separated by a spacer bar and hermetically sealed at the edges, with the cavity between the panes typically filled with air or an inert gas such as argon. DGUs provide significantly better thermal insulation than single glazing. In shopfront applications, DGUs are now the standard specification to comply with Building Regulations Part L thermal performance requirements.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Equality Act 2010',
    definition:
      'The primary legislation in England, Wales, and Scotland that protects people from discrimination. Section 20 of the Act requires service providers to make reasonable adjustments where a physical feature of their premises puts a disabled person at a substantial disadvantage. For shopfront and entrance design, this has direct implications for door widths, threshold design, door operation (manual or automatic), and visual contrast on glazed elements.',
    relatedService: { label: 'Automatic Doors', href: '/services/automatic-doors' },
  },
  {
    term: 'FD30 / FD60',
    definition:
      'Fire door ratings indicating the number of minutes of fire resistance a door assembly can provide. FD30 provides 30 minutes and is the most common rating for internal corridor and compartment doors in commercial buildings. FD60 provides 60 minutes and is required for higher-risk locations such as stairway enclosures, plant rooms, and certain storage areas. The rating applies to the complete door assembly — leaf, frame, ironmongery, seals, and glazing (if any) — not just the door leaf alone.',
    relatedService: { label: 'Fire Doors', href: '/services/fire-doors' },
  },
  {
    term: 'Fire Integrity',
    definition:
      'The ability of a fire-separating element (such as a fire door or fire-resistant glazing) to prevent the passage of flames and hot gases from one side to the other for a specified period. Fire integrity is measured in minutes and is distinct from fire insulation, which measures the ability to limit heat transfer through the element. Most commercial fire doors are rated for integrity only (e.g., FD30 integrity), though some higher-specification applications also require insulation performance.',
    relatedService: { label: 'Fire Doors', href: '/services/fire-doors' },
  },
  {
    term: 'Fusible Link',
    definition:
      'A temperature-sensitive mechanical device used in fire shutter and fire curtain systems. The fusible link holds the shutter in the open position under normal conditions; when the ambient temperature reaches a specified threshold (typically 68 to 74 degrees Celsius), the link melts or releases, allowing the shutter to descend by gravity and close the opening. Fusible links are a fail-safe mechanism that operates without requiring electrical power or a fire alarm signal.',
    relatedService: { label: 'Roller Shutters', href: '/services/roller-shutters' },
  },
  {
    term: 'Intumescent Seal',
    definition:
      'A strip of material fitted into a groove in the edge of a fire door leaf or frame that expands (intumesces) when exposed to heat, sealing the gap between the door and the frame and preventing the passage of flames and hot gases. Intumescent seals are a critical component of a fire door assembly and must be fitted in accordance with the door manufacturer\'s tested specification. Incorrect fitting — wrong size, wrong position, or missing sections — can invalidate the fire rating of the entire door.',
    relatedService: { label: 'Fire Doors', href: '/services/fire-doors' },
  },
  {
    term: 'LPS 1175',
    definition:
      'A Loss Prevention Standard published by the Loss Prevention Certification Board (LPCB), part of BRE Global. LPS 1175 rates the physical security of building components — including roller shutters, security doors, and screens — against forced entry using defined tool sets and attack methods. The standard uses a tiered rating system (SR1 to SR8), with higher ratings indicating resistance to more sophisticated attack methods. Many commercial insurers require LPS 1175 SR2 or SR3 rated shutters for high-value retail premises.',
    relatedService: { label: 'Security Doors', href: '/services/security-doors' },
  },
  {
    term: 'Mullion',
    definition:
      'A vertical structural member within a shopfront frame that divides the glazed area into separate panes or bays. Mullions transfer wind loads and the weight of the glazing above to the cill and the structural opening. In shopfront design, the width and profile of mullions is an important aesthetic consideration: slimline mullions maximise the visible glass area and create a more open appearance, while wider mullions provide greater structural capacity for larger or heavier glazing configurations.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'PAS 24',
    definition:
      'PAS 24:2022 is a Publicly Available Specification published by BSI that sets out enhanced security requirements for doors and windows in residential and commercial buildings. PAS 24 tests resistance to physical attack including attempts to force locks, lever frames, and remove glazing beads. Compliance with PAS 24 is increasingly required by landlords, developers, and insurers as evidence of adequate security performance for new door and window installations.',
    relatedService: { label: 'Security Doors', href: '/services/security-doors' },
  },
  {
    term: 'Polyamide Thermal Break',
    definition:
      'An insulating strip of reinforced polyamide (nylon) inserted between the inner and outer sections of an aluminium frame profile to prevent thermal bridging. Without a thermal break, an aluminium shopfront frame conducts heat rapidly between the interior and exterior, leading to poor energy performance and condensation on the inner surfaces. Thermally broken profiles are now the standard specification for shopfronts to comply with Building Regulations Part L.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Powder Coating',
    definition:
      'A dry finishing process in which electrostatically charged pigment powder is sprayed onto an aluminium surface and then cured in an oven at approximately 180 to 200 degrees Celsius. The result is a hard, durable, and uniform colour finish that is more resistant to chipping, scratching, fading, and corrosion than conventional wet paint. Powder coating is the standard finishing method for aluminium shopfront frames and can be applied in any RAL, NCS, or BS 4800 colour.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'RAL Colour',
    definition:
      'A standardised colour matching system maintained by the RAL Institute in Germany, widely used across the European construction and manufacturing industries. RAL colours are identified by a four-digit number (e.g., RAL 7016 Anthracite Grey, RAL 9005 Jet Black). Shopfront frames are typically powder-coated to a specified RAL colour, allowing precise colour matching to branding requirements, planning authority preferences, or existing building elements.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Safety Glass',
    definition:
      'Glass that has been processed to reduce the risk of injury when broken. The two main types of safety glass used in shopfronts are toughened glass (which fractures into small, blunt fragments) and laminated glass (which holds together when broken due to an interlayer of PVB or EVA film). Building Regulations and BS 6206 / BS EN 12600 require safety glass in critical locations including doors, sidelights, and low-level glazing within shopfronts.',
    relatedService: { label: 'Glass Replacement', href: '/services/glass-replacement' },
  },
  {
    term: 'STS 202',
    definition:
      'A security standard published by the Centre for the Protection of National Infrastructure (CPNI) and administered by the Loss Prevention Certification Board. STS 202 covers the forced-entry resistance of fixed and openable screens, counters, and partitions. It is sometimes specified for high-security commercial applications such as bureau de change, post offices, betting shops, and pharmacies where a physical barrier is required between staff and the public.',
    relatedService: { label: 'Security Doors', href: '/services/security-doors' },
  },
  {
    term: 'Thermally Broken Frame',
    definition:
      'An aluminium frame profile that incorporates an insulating barrier (typically a polyamide thermal break) between its inner and outer sections to minimise heat transfer through the frame. Thermally broken frames are essential for compliance with Building Regulations Part L and significantly improve the energy performance of a shopfront installation. They also reduce the risk of condensation forming on the inner face of the frame in cold weather.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Transom',
    definition:
      'A horizontal structural member within a shopfront frame, typically positioned above the door head or at the junction between a display glazing zone and an upper fanlight panel. Like mullions, transoms transfer loads within the frame and divide the glazed area into structurally manageable sections. The transom above a door is often referred to as the door head transom and must be positioned at a height that provides adequate headroom for the door operation and any automatic operator housing.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
  {
    term: 'Toughened Glass',
    definition:
      'Glass that has been heated to approximately 620 degrees Celsius and then rapidly cooled (quenched) to create compressive stresses on the surface and tensile stresses in the core. This process makes the glass approximately four to five times stronger than annealed glass of the same thickness. Toughened glass is classified as a safety glass under BS EN 12150 and is the standard glazing specification for shopfront display panels, sidelights, and doors.',
    relatedService: { label: 'Glass Replacement', href: '/services/glass-replacement' },
  },
  {
    term: 'U-Value',
    definition:
      'A measure of the rate of heat transfer through a building element, expressed in watts per square metre per degree Kelvin (W/m²K). Lower U-values indicate better thermal insulation. For shopfronts, U-values are relevant to both the glazed units (centre-pane U-value) and the frame profiles (frame U-value). Building Regulations Part L sets maximum U-values for replacement windows and doors, which in practice requires thermally broken aluminium frames and double-glazed units as a minimum specification.',
    relatedService: { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  },
];

const letters = [...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))].sort();

export default function GlossaryPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://www.sigmashopfronts.com/glossary#termset',
    name: 'Shopfront Industry Glossary',
    description:
      'Definitions of common shopfront, glazing, and commercial door industry terms used across the UK.',
    url: 'https://www.sigmashopfronts.com/glossary',
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sigmashopfronts.com' },
              { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://www.sigmashopfronts.com/glossary' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-dark section-padding">
        <div className="container-max">
          <Breadcrumbs items={[{ label: 'Glossary' }]} />
          <h1 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Shopfront <span className="text-gradient-gold">Glossary</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-300 leading-relaxed">
            A reference guide to the technical terms, standards, and specifications used across the
            UK shopfront, glazing, and commercial door industry.
          </p>
        </div>
      </section>

      {/* Letter Navigation */}
      <section className="section-padding pb-0">
        <div className="container-max">
          <nav aria-label="Glossary letter navigation" className="flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-grey-100 text-charcoal font-heading font-semibold text-sm hover:bg-gold hover:text-navy transition-colors"
              >
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          {letters.map((letter) => {
            const termsForLetter = glossaryTerms.filter(
              (t) => t.term[0].toUpperCase() === letter
            );
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-8">
                <h2 className="text-3xl font-heading font-bold text-navy border-b-2 border-gold pb-2 mb-6">
                  {letter}
                </h2>
                <dl className="space-y-8">
                  {termsForLetter.map((item) => (
                    <div key={item.term}>
                      <dt className="text-lg font-heading font-semibold text-charcoal">
                        {item.term}
                      </dt>
                      <dd className="mt-2 text-grey-600 leading-relaxed">
                        {item.definition}
                      </dd>
                      {item.relatedService && (
                        <dd className="mt-2">
                          <Link
                            href={item.relatedService.href}
                            className="text-sm text-gold hover:underline font-medium"
                          >
                            Related service: {item.relatedService.label}
                          </Link>
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-max text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Need Expert Advice?
          </h2>
          <p className="text-grey-300 mb-8 max-w-xl mx-auto">
            If you have questions about any of these terms or need help specifying the right
            products for your project, our team is here to help. Contact us for a free,
            no-obligation consultation.
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
