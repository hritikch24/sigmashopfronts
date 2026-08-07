export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface PricingRange {
  item: string;
  price: string;
}

export interface PricingGuide {
  heading: string;
  content: string;
  ranges: PricingRange[];
  note: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  heroImage: string;
  description: string;
  benefits: ServiceBenefit[];
  faqs: ServiceFaq[];
  relatedServices: string[];
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  howItWorks?: HowItWorksStep[];
  pricingGuide?: PricingGuide;
  peopleAlsoAsk?: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: 'aluminium-shopfronts',
    name: 'Aluminium Shopfronts',
    shortDescription:
      'Bespoke aluminium shopfront systems engineered for durability and kerb appeal. Thermally broken frames, toughened glazing, and powder-coat finishes to your specification.',
    heroImage: 'aluminium-shopfront-1.jpeg',
    primaryKeyword: 'aluminium shopfronts',
    metaTitle: 'Aluminium Shopfronts UK | Supply & Install',
    metaDescription:
      'Toughened glass shopfronts with thermally broken aluminium frames. DDA-compliant entrances, powder-coat finishes, BS EN 12150 safety glazing. Free site survey — call 07414 779594.',
    description: `Aluminium has become the material of choice for commercial shopfront construction across the UK, and for good reason. When specified and installed correctly, an aluminium shopfront system offers an outstanding combination of structural rigidity, weather resistance, design flexibility, and long service life that no other material can match at a comparable price point.

At Sigma Shop Fronts, we design and install aluminium shopfronts to suit everything from a single independent retailer to a multi-unit retail parade or commercial development. Our systems are sourced from leading European fabricators and conform to the relevant British Standards, including BS 6375 for the performance of windows and doors, and BS EN 14351-1, which governs the CE marking requirements for aluminium entrance doors.

**Frame Systems and Thermal Performance**

We work with both standard commercial-grade aluminium profiles and thermally broken systems. For most modern retail units and any installation subject to Building Regulations Part L (Conservation of Fuel and Power), thermally broken frames are required. These incorporate a polyamide thermal break within the aluminium section that dramatically reduces heat loss through the frame, helping occupiers meet energy performance obligations and reduce heating costs.

Centre-pane U-values for our double-glazed units typically fall between 1.0 and 1.4 W/m²K depending on the glass specification chosen, and our complete window and door assemblies are independently tested to demonstrate compliance with the current Building Regulations threshold.

**Glazing Specifications**

All glazing installed within our shopfront systems uses toughened safety glass as a minimum, in line with BS EN 12150-1. Where a unit faces a high-traffic pedestrian zone, or where the glazed area falls within the critical zone defined by BS 8213-4 (below 800 mm from floor level), we specify toughened or laminated glass rated to the appropriate safety category.

For retailers with specific requirements — reduced solar gain, acoustic attenuation, enhanced security — we can specify solar-control glass, acoustic interlayers, or laminated security glass to PAS 24:2022, the standard used to assess enhanced security performance for doors and windows. Many landlords and insurers now require PAS 24 certification for new commercial glazing.

**Entrance Design and DDA Compliance**

The Equality Act 2010 (which replaced the Disability Discrimination Act) requires that commercial premises make reasonable adjustments to avoid putting disabled people at a substantial disadvantage. For shopfronts, this most commonly relates to entrance door widths, threshold heights, and door opening forces.

We design our entrance systems with a minimum 775 mm clear opening width as standard, and can extend this to 900 mm or beyond for full accessibility. Threshold details are coordinated with the structural floor level to eliminate trip hazards, and where lever or D-pull hardware is specified, we select furniture that meets the ergonomic requirements referenced in BS 8300, the standard for the design of an accessible and inclusive built environment.

**Powder Coat Finishes**

All aluminium sections are powder-coated to BS EN 12206-1, which specifies performance requirements for organic coatings on aluminium alloy extrusions. We offer the full RAL palette as standard, and can access BS 4800 and NCS colour references on request. Our standard powder-coat guarantee is 10 years for colour retention and adhesion under normal UK weather exposure conditions.

For listed buildings or conservation areas, we have worked alongside planning consultants to specify sympathetic colour matches and slimline profiles that satisfy planning officer requirements without compromising performance.

**Installation Process**

Every installation begins with a measured survey of the existing opening or structural aperture. We co-ordinate with the structural engineer's lintel design where a new opening is being formed, and we take the relevant Party Wall Act notifications into account for terraced or semi-detached commercial properties. Our installation teams are CSCS-carded and follow a site-specific method statement and risk assessment for every project.`,
    benefits: [
      {
        title: 'Long Service Life with Low Maintenance',
        description:
          'Aluminium does not rust, rot, or warp. A correctly specified and installed aluminium shopfront typically provides 25–30 years of reliable service with nothing more than periodic cleaning and occasional hardware lubrication.',
      },
      {
        title: 'Design Flexibility',
        description:
          'Aluminium extrusions can be fabricated to virtually any dimension. Slim sightlines, large glass areas, curved bays, and bespoke colour finishes are all achievable within a single system, giving architects and retailers precise control over the finished appearance.',
      },
      {
        title: 'Energy Performance Compliance',
        description:
          'Thermally broken aluminium systems meet and exceed the U-value thresholds set out in Building Regulations Part L, reducing heat loss and demonstrating compliance without sacrificing the structural openness that retail tenants require.',
      },
      {
        title: 'Enhanced Security Options',
        description:
          'Aluminium frames can accept multi-point locking hardware, security glazing to PAS 24:2022, and integrated roller shutter pockets, allowing a single coherent shopfront system to provide both daytime retail presence and overnight security without visual compromise.',
      },
    ],
    faqs: [
      {
        question: 'How long does a typical aluminium shopfront installation take?',
        answer:
          'A standard single-unit shopfront replacement — removing the existing frontage and installing a new aluminium system — is usually completed within one to two working days. More complex installations involving structural alterations, large glass panels requiring specialist lifting equipment, or multi-unit facades are typically programmed across three to five days. We provide a detailed programme at the survey stage.',
      },
      {
        question: 'Do I need planning permission for a new shopfront?',
        answer:
          'In most cases, replacing a shopfront in a like-for-like manner is considered permitted development for commercial premises. However, if the property is within a conservation area, is a listed building, or if the new design materially changes the character of the frontage, prior approval or full planning permission may be required. We can advise based on the property address and proposed design, and we have experience preparing design-and-access statements to support planning applications.',
      },
      {
        question: 'What is the difference between a standard and a thermally broken frame?',
        answer:
          'A standard (non-broken) aluminium frame uses a continuous aluminium section from inside to outside. Because aluminium conducts heat very efficiently, this creates a thermal bridge — warmth escapes through the frame and condensation can form on the cold internal face. A thermally broken frame incorporates a polyamide plastic strip within the section that interrupts this path, significantly improving the overall U-value of the assembly and eliminating cold-bridging. For most commercial buildings constructed or refurbished after 2010, thermally broken frames are required under Building Regulations Part L.',
      },
      {
        question: 'Can you match the frame colour to our corporate brand palette?',
        answer:
          'Yes. We powder-coat all aluminium sections in-house or through a BS EN 12206-1 certified finishing partner. The standard range covers the full RAL Classic and RAL Design colour spaces, and we can also match to NCS, BS 4800, or proprietary brand colour references provided as a physical swatch or Pantone reference. Lead time for non-standard colours is typically five to seven working days longer than standard stock colours.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Initial Enquiry',
        description:
          'Get in touch by phone or through our website with details of your project. We will discuss your requirements, timescales, and budget to establish whether our aluminium shopfront systems are the right fit.',
      },
      {
        step: 2,
        title: 'Site Survey & Measurement',
        description:
          'One of our surveyors visits the premises to take precise measurements, assess the structural opening, and note any access or planning constraints that could affect the design.',
      },
      {
        step: 3,
        title: 'Design & Quotation',
        description:
          'We prepare detailed drawings showing the proposed shopfront layout, frame profiles, glazing specification, and powder-coat finish. A fixed-price quotation is provided alongside the drawings for your approval.',
      },
      {
        step: 4,
        title: 'Fabrication & Delivery',
        description:
          'Once the design is signed off, our fabrication partners manufacture the aluminium sections and glazing units to the agreed specification. Typical lead time is three to four weeks.',
      },
      {
        step: 5,
        title: 'Installation & Handover',
        description:
          'Our CSCS-carded installation team removes the existing frontage and installs the new system. On completion, we walk you through the finished shopfront, demonstrate all hardware, and provide your guarantee documentation.',
      },
    ],
    pricingGuide: {
      heading: 'What Does an Aluminium Shopfront Cost?',
      content:
        'The cost of an aluminium shopfront depends on the width and height of the opening, the frame profile chosen, glazing specification, and whether thermally broken sections are required. Below are typical price ranges for common configurations.',
      ranges: [
        { item: 'Single unit shopfront', price: '£2,500 – £5,000' },
        { item: 'Double unit shopfront', price: '£4,500 – £8,500' },
        { item: 'Full parade (3+ units)', price: '£12,000 – £25,000' },
        { item: 'Thermally broken upgrade (add-on)', price: '£800 – £1,500' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'How long do aluminium shopfronts last?',
        answer:
          'A well-specified aluminium shopfront typically lasts 25 to 30 years with minimal maintenance. The powder-coat finish is guaranteed for 10 years against fading and peeling, and the aluminium itself does not rust or rot, making it one of the most durable commercial frontage materials available.',
      },
      {
        question: 'Are aluminium shopfronts energy efficient?',
        answer:
          'Yes, when thermally broken frames are used. Thermally broken aluminium systems incorporate a polyamide insulating strip that prevents heat transfer through the frame. Combined with double-glazed units, these systems achieve U-values between 1.0 and 1.4 W/m²K, comfortably meeting Building Regulations Part L requirements.',
      },
      {
        question: 'Can you install an aluminium shopfront in a conservation area?',
        answer:
          'Yes, but additional planning approval is usually required. We have experience working with planning officers in conservation areas and can specify slimline profiles and heritage colour finishes that satisfy local authority requirements while still providing modern thermal and security performance.',
      },
      {
        question: 'What colours are available for aluminium shopfronts?',
        answer:
          'We offer the full RAL Classic and RAL Design colour ranges as standard, giving you over 2,500 colour options. We can also match to BS 4800, NCS, or bespoke brand colours from a physical swatch or Pantone reference. Non-standard colours typically add five to seven working days to the lead time.',
      },
    ],
    relatedServices: ['automatic-doors', 'security-doors', 'bi-fold-doors', 'shopfront-repairs'],
  },

  {
    slug: 'roller-shutters',
    name: 'Roller Shutters',
    shortDescription:
      'Commercial roller shutters for retail, industrial, and warehouse premises. Manual, electric, and fire-rated options with LPS 1175 security-rated curtains available.',
    heroImage: 'roller-shutter-1.jpeg',
    primaryKeyword: 'roller shutters',
    metaTitle: 'Roller Shutters UK | Commercial Installation',
    metaDescription:
      'Commercial roller shutter installation across the UK. Manual, electric & fire-rated shutters. LPS 1175 security-rated. Free survey. Nationwide coverage.',
    description: `Roller shutters are one of the most practical and cost-effective security solutions available to commercial and industrial property owners. When correctly specified for the application, a roller shutter provides reliable overnight security, weather protection, and where required, fire containment — all within a compact, retractable assembly that does not impede the operation of the premises during trading hours.

Sigma Shop Fronts designs, supplies, and installs roller shutters across a wide range of commercial applications, from small retail units requiring a face-fit manual curtain to large industrial loading bays needing a high-speed, motor-driven door with full automation and safety edge protection.

**Curtain Construction and Security Ratings**

Roller shutter curtains are available in perforated, solid, and vision-strip configurations. Perforated laths allow some visibility and airflow when the shutter is closed and can reduce the visual impact of a shuttered frontage. Solid lath curtains provide maximum weather exclusion and privacy.

For security-critical applications, we specify curtains tested to LPS 1175 (Loss Prevention Standard 1175), the industry benchmark for physical attack resistance. LPS 1175 is graded from A (basic deterrence) through to H (resistance to prolonged attack with specialist tools), and the appropriate grade is selected in consultation with the client's insurer and in accordance with the risk profile of the premises. Many commercial insurers now require a minimum of LPS 1175 SR1 or SR2 for unattended retail premises.

Curtain laths are roll-formed from galvanised mild steel or aluminium alloy. Aluminium is specified where weight, corrosion resistance, or annual maintenance burden is a primary concern; steel is typically preferred where higher security ratings or impact resistance is paramount.

**Operating Systems**

Manual shutters are operated via a spring-balanced mechanism — the spring stores energy as the shutter closes and releases it to assist opening. Manual operation is appropriate for smaller openings up to approximately 3.5 m in width and where operating frequency is modest.

Electric shutters use a tubular or side-mounted motor connected to a gear reducer and drive shaft. They are operated by a key switch, push-button panel, or remote control, and can be integrated with a building management system or external timer for automated opening and closing. All our electric shutter installations include a manual override mechanism to allow operation during a power failure.

Safety edges, photocells, and pressure-sensitive bottom rails are fitted as standard on all motorised installations, in line with the Machinery Directive (now retained in UK law as the Supply of Machinery (Safety) Regulations 2008) and the guidance issued by the Door and Hardware Federation (DHF).

**Fire-Rated Roller Shutters**

Fire-rated roller shutters provide compartmentalisation in commercial and industrial premises, containing the spread of fire between zones in accordance with the passive fire protection strategy for the building. Our fire shutters are designed and tested in accordance with BS EN 1634-1 (fire resistance and smoke control tests for door and shutter assemblies) and carry the appropriate fire performance classification — typically EI 60 or EI 90, denoting integrity and insulation for 60 or 90 minutes respectively.

Fire shutters are controlled by a fusible link or, in more sophisticated installations, by a signal from the building's fire detection and alarm system. Gravity-fail-safe release is standard, ensuring the shutter closes automatically on detection of a fire even if power is lost.

Installation of fire shutters must be completed and certified by a company with appropriate third-party accreditation. Sigma Shop Fronts holds the relevant certification and provides a fire shutter completion certificate that forms part of the building's fire safety record.

**Structural Considerations**

Roller shutters impose both dead loads (the weight of the curtain and housing box) and dynamic loads (wind, impact, and operation forces) on the surrounding structure. Before installation, we assess the condition and load-bearing capacity of the lintel or structural member above the opening. Where the existing structure is inadequate, we work with a structural engineer to design a suitable bearing arrangement.

All shutters are installed with a weather seal along both side guides and at the bottom rail, preventing draught and water ingress when closed. For installations in exposed coastal locations, we specify enhanced corrosion protection, including marine-grade aluminium sections and stainless-steel fixings.`,
    benefits: [
      {
        title: 'Robust Security Deterrence',
        description:
          'A solid steel roller shutter curtain rated to LPS 1175 presents a substantial physical barrier to opportunistic intruders. Combined with multi-point locking bars and hardened steel locks, a well-specified shutter significantly extends the time and effort required to breach the opening, deterring all but the most determined attackers.',
      },
      {
        title: 'Compact, Space-Efficient Operation',
        description:
          'Unlike hinged or folding security options, a roller shutter retracts entirely into its housing box above the opening when open. This preserves the full clear opening width and height for vehicles, shopfitters, or display purposes, and keeps the trading floor completely unobstructed.',
      },
      {
        title: 'Fire Compartmentation',
        description:
          'Fire-rated shutters certified to BS EN 1634-1 provide tested, reliable compartmentalisation that can be written into a fire strategy without relying solely on active suppression. They protect adjacent occupancies, allow safe evacuation, and demonstrate compliance with Approved Document B to the building\'s responsible person.',
      },
      {
        title: 'Automation and Remote Operation',
        description:
          'Electric shutters can be programmed to open and close at set times, linked to alarm systems, or operated remotely via a smartphone app. This removes the daily operational burden on staff and ensures the premises is secured even if a member of staff forgets at closing time.',
      },
    ],
    faqs: [
      {
        question: 'Do roller shutters require Building Regulations approval?',
        answer:
          'Installation of a roller shutter as a replacement for an existing shutter typically falls under permitted development. However, fire-rated shutters installed as part of a passive fire strategy require a Building Regulations application, and a completion certificate issued by a building control body. New openings created in an external wall will also trigger a Building Regulations submission. We manage this process on behalf of clients where required.',
      },
      {
        question: 'How often should a roller shutter be serviced?',
        answer:
          'The DHF (Door and Hardware Federation) recommends that all power-operated doors, including roller shutters, are inspected and serviced at least annually by a competent person. For high-cycle applications — such as a loading bay operating 20 or more cycles per day — we recommend six-monthly servicing. Annual servicing should include inspection and lubrication of all moving parts, testing of safety edges and photocells, and verification that all emergency release mechanisms function correctly.',
      },
      {
        question: 'What happens if the motor fails on an electric shutter?',
        answer:
          'All Sigma Shop Fronts electric shutter installations include a manual override facility — typically a removable hand chain or crank handle — that allows the shutter to be raised or lowered without electrical power. For fire shutters, a gravity-fail-safe mechanism ensures the shutter closes automatically under its own weight in the event of power failure or fire detection signal, regardless of whether the motor is operational.',
      },
      {
        question: 'Can you install a roller shutter within an existing shopfront system?',
        answer:
          'Yes. In many cases a roller shutter can be retrofitted into an existing aluminium or steel shopfront by installing a face-fit box housing above the aperture and side guides within the existing frame reveals. We assess feasibility at the survey stage, taking into account the available headroom, reveal depth, and structural condition of the existing frame. Where a face-fit installation is not practical, a built-in system with concealed housing box can be specified as part of a new shopfront installation.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Requirement Discussion',
        description:
          'Contact us to discuss your security needs, operating frequency, and whether you require manual, electric, or fire-rated shutters. We will advise on the most suitable system for your premises.',
      },
      {
        step: 2,
        title: 'Site Survey',
        description:
          'Our surveyor visits to measure the opening, check headroom and side-fix clearances, assess the structural condition of the lintel, and note any electrical supply requirements for motorised systems.',
      },
      {
        step: 3,
        title: 'Specification & Quote',
        description:
          'We specify the curtain type, lath profile, security rating, and operating mechanism, then provide a fixed-price quotation with full technical details for your review.',
      },
      {
        step: 4,
        title: 'Manufacture & Installation',
        description:
          'The shutter is manufactured to the surveyed dimensions and delivered to site. Installation typically takes one day for a standard single opening, including electrical connection for motorised systems.',
      },
      {
        step: 5,
        title: 'Testing & Commissioning',
        description:
          'We test the shutter through a full cycle, set limit switches, commission safety devices, and demonstrate operation to your staff. All documentation, including warranty and maintenance guidance, is handed over.',
      },
    ],
    pricingGuide: {
      heading: 'What Does a Roller Shutter Cost?',
      content:
        'Roller shutter pricing depends on the opening size, curtain material, security rating, and whether manual or electric operation is specified. Fire-rated and industrial shutters carry a premium due to additional testing and certification requirements.',
      ranges: [
        { item: 'Manual roller shutter (up to 3m)', price: '£800 – £1,500' },
        { item: 'Electric roller shutter (up to 3m)', price: '£1,500 – £3,000' },
        { item: 'Fire-rated roller shutter', price: '£3,000 – £6,000' },
        { item: 'Industrial shutter (5m+)', price: '£4,000 – £8,000' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'How long does it take to install a roller shutter?',
        answer:
          'A standard single-opening roller shutter installation is typically completed within one working day, including fixing the housing box, side guides, curtain, and any electrical wiring. Larger industrial openings or fire-rated shutters may require two days to allow for additional structural work and commissioning.',
      },
      {
        question: 'Are electric roller shutters noisy?',
        answer:
          'Modern tubular motors are significantly quieter than older side-mounted drive systems. A typical electric roller shutter operates at around 55–65 dB, comparable to a normal conversation. If noise is a particular concern, we can specify low-noise motor options designed for residential or noise-sensitive commercial environments.',
      },
      {
        question: 'Can roller shutters be insulated?',
        answer:
          'Yes. Insulated roller shutter laths are available with a foam-filled core that improves thermal performance and reduces noise transmission. These are particularly popular for shop units where the shutter forms part of the building envelope and energy efficiency is a consideration.',
      },
      {
        question: 'Do I need a roller shutter for insurance purposes?',
        answer:
          'Many commercial insurers require physical security measures such as roller shutters for ground-floor retail and warehouse premises. The specific requirement varies by insurer and the value of stock held, but an LPS 1175-rated shutter will satisfy most policy conditions. We recommend checking with your insurer before specifying.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'security-doors', 'fire-doors', 'emergency-callout'],
  },

  {
    slug: 'security-doors',
    name: 'Security Doors',
    shortDescription:
      'Steel and composite security doors for commercial premises, rated to STS 202 and LPS 1175 standards. Single and double leaf configurations with multi-point locking.',
    heroImage: 'security door.jpeg',
    primaryKeyword: 'commercial security doors',
    metaTitle: 'Security Doors UK | Steel & Composite',
    metaDescription:
      'Steel and composite security doors rated to LPS 1175 and STS 202. Multi-point locking, anti-drill cylinders, and panic hardware. UK-wide installation.',
    description: `A commercial security door is one of the most important investments a business can make in protecting its assets, staff, and premises. Unlike a standard commercial entrance door, a properly specified security door is engineered from the ground up to resist physical attack, and its performance is independently verified through structured testing rather than manufacturer claims.

Sigma Shop Fronts supplies and installs commercial security doors across a broad range of applications — back-of-house access points, warehouse and depot entrances, plant rooms, server rooms, cash-handling areas, and anywhere else where the consequence of an unauthorised breach is severe.

**Standards and Security Ratings**

Two principal standards govern the tested performance of commercial security doors in the UK. LPS 1175 (Loss Prevention Standard 1175), published by the LPCB (Loss Prevention Certification Board), tests door sets against attack using progressively more capable tools over defined time periods, producing a rating from SR1 (basic resistance, hand tools only) through to SR8 (resistance to sustained attack with heavy plant). The LPCB maintains a publically searchable Red Book of certified products, allowing insurers and specifiers to verify the rating of any door set they are considering.

STS 202 (Security Tested Standard 202), published by the LPCB's sister organisation, follows a similar attack-testing methodology and is sometimes preferred by specific insurers or procurement frameworks. Many commercial insurers specify a minimum LPS 1175 SR2 or STS 202 BR2 rating for back-of-house entrances in high-value retail or commercial premises.

**Construction: Steel vs Composite**

Steel security door leaves are fabricated from cold-rolled steel sheet, typically 1.5–3 mm in thickness, reinforced with internal steel box sections. The outer face may be smooth, embossed, or finished with a polyester powder coat. Steel doors are exceptionally strong and can be manufactured to accept very high-security locking systems, but they are heavy (a 1.0 × 2.1 m single-leaf door can exceed 80 kg), which imposes demands on the frame and hinges.

Composite security doors use a laminated construction — steel skins bonded to a rigid foam or honeycomb core. This approach provides excellent stiffness-to-weight ratio, improved thermal insulation compared to solid steel, and resistance to the peel and lever attacks that exploit the bond line between face sheet and frame on lower-quality doors. Our composite range includes door sets tested to LPS 1175 SR2 and SR3.

**Door Frames and Installation**

A security door is only as strong as its frame and its fixing into the surrounding structure. We install all security doors with purpose-designed steel sub-frames or knock-box frames that are fixed through to the structural wall using torque-controlled anchor bolts at centres determined by the load calculations for the specified security rating. Where the structural wall is constructed from materials with lower pull-out resistance (dense concrete blocks, for example), we use resin anchors to achieve the required fixing capacity.

Frame depth is matched to the wall thickness, and all perimeter joints are filled with fire-rated intumescent material where the door set forms part of a fire-compartment boundary.

**Locking Systems**

Our standard commercial security doors are supplied with a multi-point locking mechanism engaging the frame at a minimum of five points — top, bottom, and three along the strike side. The lock body is a high-security euro profile cylinder resisting to TS 007 3-star or equivalent, offering anti-drill, anti-pick, and anti-bump protection. Master-keying and key-alike suites are available for multi-door installations.

Where a door is used as a means of escape, we specify panic hardware conforming to BS EN 1125 (panic exit devices) or emergency exit devices conforming to BS EN 179. The distinction is important: BS EN 1125 covers single-action operation regardless of the user's ability or awareness, whereas BS EN 179 permits a lever or knob that requires a specific action. The fire strategy and means of escape design for the building determines which standard applies.

**Access Control Integration**

Security doors can be supplied with integrated access control provisions — electric strikes, magnetic locks, door controllers, and card or PIN reader mounting plates. We work alongside access control specialists and, where required, coordinate the door hardware specification with the access control installer to ensure compatibility between the mechanical and electronic elements of the system.`,
    benefits: [
      {
        title: 'Independent, Verified Security Ratings',
        description:
          'LPS 1175 and STS 202 ratings are awarded only after independent destructive testing. Unlike products that simply claim to be "high security", rated door sets have demonstrated their resistance against specific tools for defined time periods, giving insurers and specifiers a reliable basis for risk assessment.',
      },
      {
        title: 'Multi-Point Locking as Standard',
        description:
          'A single-point deadbolt is the weakest link in any door assembly. Multi-point locking distributes the load across five or more engagement points, making it dramatically harder to force the door by levering at the lock zone. Our installations engage both the head and foot of the door frame, eliminating the flex that single-bolt doors allow.',
      },
      {
        title: 'Suitable for Escape Routes',
        description:
          'Our panic hardware options — certified to BS EN 1125 — allow a security door to function as a fire exit without compromising its security credentials when the building is occupied. The door provides full single-action exit at all times whilst the exterior remains secured against unauthorised entry.',
      },
      {
        title: 'Durability in Demanding Environments',
        description:
          'Commercial back-of-house areas are subject to heavy use, trolley impacts, and exposure to cleaning chemicals. Our steel and composite door leaves are powder-coated to BS EN 13438 for indoor use or BS EN 12206-1 for external faces, and the hardware is specified in grade 316 stainless steel for areas with regular wet cleaning.',
      },
    ],
    faqs: [
      {
        question: 'What security rating does my insurer require?',
        answer:
          'Requirements vary between insurers and policy types. Most commercial property policies for retail premises with significant stock holdings specify a minimum LPS 1175 SR2 or STS 202 BR2 rated door set for back-of-house and service entrances. Some high-value sectors — jewellery, pharmaceuticals, data centres — require SR3 or higher. We recommend contacting your insurer to confirm the requirement before ordering, and we can provide a product data sheet and LPCB certificate for any door set we propose.',
      },
      {
        question: 'Can a security door be used as a fire exit?',
        answer:
          'Yes, provided it is fitted with appropriate escape hardware. A door designated as a fire exit must be fitted with a panic exit device to BS EN 1125 (if used by members of the public who may be unfamiliar with the building) or an emergency exit device to BS EN 179 (for staff-only escape routes). Both hardware types allow single-action exit from the inside, and our installations include the appropriate hardware as part of the door specification. The door leaf and frame can simultaneously achieve the required fire resistance rating where needed.',
      },
      {
        question: 'How is a security door fixed to a masonry wall?',
        answer:
          'The steel sub-frame is fixed through to the masonry or concrete structural opening using M12 or M16 torque-controlled anchor bolts at centres specified in the door manufacturer\'s installation instructions for the rated security performance. In older buildings with questionable masonry quality, we carry out a pull-out test on a sample fixing before proceeding with the full installation. All fixings are concealed behind the frame cover plate once the door leaf is hung, preventing tampering.',
      },
      {
        question: 'What maintenance is required after installation?',
        answer:
          'Security doors require relatively modest maintenance: lubrication of the multi-point locking mechanism and hinge pins with a dry PTFE or light oil product at six-monthly intervals, and an annual function test of the locking system, hinges, and any access control or panic hardware. We offer a maintenance contract that includes an annual inspection and report, which some insurers accept as evidence of ongoing compliance with their security requirements.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Security Assessment',
        description:
          'We discuss your security requirements, insurer stipulations, and the specific threats you need to mitigate. This helps us recommend the appropriate security rating and door construction.',
      },
      {
        step: 2,
        title: 'Site Survey',
        description:
          'Our surveyor measures the opening, assesses the wall construction and load-bearing capacity, and notes any requirements for panic hardware, access control integration, or fire rating.',
      },
      {
        step: 3,
        title: 'Specification & Quotation',
        description:
          'We specify the door leaf construction, security rating, locking system, and any escape or access control hardware. A detailed quotation with product data sheets and certification references is provided.',
      },
      {
        step: 4,
        title: 'Installation',
        description:
          'Our installation team fits the steel sub-frame with torque-controlled anchor bolts, hangs and adjusts the door leaf, and installs all locking and hardware components. Typical installation takes one day.',
      },
      {
        step: 5,
        title: 'Handover & Certification',
        description:
          'We test all locking points, demonstrate operation to your staff, and provide the LPCB certificate, warranty documentation, and maintenance instructions.',
      },
    ],
    pricingGuide: {
      heading: 'What Does a Security Door Cost?',
      content:
        'Security door pricing varies based on the door construction, security rating, locking specification, and whether additional features such as panic hardware or access control are required. Higher LPS 1175 ratings require heavier construction and more rigorous testing, which is reflected in the price.',
      ranges: [
        { item: 'Single leaf steel door', price: '£1,200 – £2,500' },
        { item: 'Double leaf steel door', price: '£2,000 – £4,000' },
        { item: 'LPS 1175 SR2 rated door', price: '£2,500 – £5,000' },
        { item: 'Composite security door', price: '£1,800 – £3,500' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'What is the difference between LPS 1175 SR1 and SR2?',
        answer:
          'SR1 provides basic resistance to attack using bodily force and simple hand tools such as screwdrivers and pliers, typically for three minutes. SR2 resists a more sustained attack using additional tools including crowbars and claw hammers. Most commercial insurers require SR2 as a minimum for retail back-of-house and warehouse entrances.',
      },
      {
        question: 'Can a security door also be a fire door?',
        answer:
          'Yes. Many of our security door sets are dual-rated for both security and fire resistance. A door can achieve LPS 1175 SR2 security certification alongside FD60 fire resistance, making it suitable for openings that sit on both the security boundary and a fire-compartment line.',
      },
      {
        question: 'How heavy is a commercial security door?',
        answer:
          'A single-leaf steel security door typically weighs between 60 and 100 kg depending on the steel thickness and reinforcement. Composite security doors are lighter, usually 40 to 70 kg, while offering comparable security ratings. Heavy-duty hinges rated for the door weight are always specified as part of the installation.',
      },
      {
        question: 'Do security doors come with a warranty?',
        answer:
          'Yes. Our security doors carry a manufacturer warranty of up to 10 years on the door leaf and frame, and typically 5 years on the locking mechanism and hardware. Extended warranty options are available where required by the client or their insurer.',
      },
    ],
    relatedServices: ['roller-shutters', 'fire-doors', 'aluminium-shopfronts', 'emergency-callout'],
  },

  {
    slug: 'automatic-doors',
    name: 'Automatic Doors',
    shortDescription:
      'Sliding and swing automatic door systems for retail and commercial premises. BS EN 16005 compliant, with full sensor packages and service plans available.',
    heroImage: 'automatic-door-sigma.jpeg',
    primaryKeyword: 'automatic doors commercial',
    metaTitle: 'Automatic Doors UK | Commercial Installation',
    metaDescription:
      'Automatic sliding and swing door installation for retail and commercial premises. BS EN 16005 compliant. DDA-friendly entrances. Nationwide UK coverage.',
    description: `Automatic doors are no longer a luxury reserved for supermarkets and airports. For any commercial premises with significant footfall — a busy high-street retail unit, a medical centre, a hotel lobby, or a multi-occupancy office building — automatic door systems offer a compelling combination of accessibility compliance, operational efficiency, and customer experience that increasingly represents the expected standard rather than a premium option.

Sigma Shop Fronts designs, installs, and maintains automatic door systems for commercial clients across the UK. We work with sliding, swing, and folding automatic configurations, using drive units from established European manufacturers who certify their products to the relevant harmonised standards.

**Automatic Sliding Doors**

Sliding automatic door systems are the most common configuration for retail entrances and busy public-facing premises. They operate by translating the door leaf along a track above the aperture, driven by a low-voltage DC or brushless motor controlled by a drive unit that continuously monitors the safety sensor field. A bi-parting arrangement — two leaves meeting in the centre — provides the largest possible clear opening width from a given aperture, making it the preferred solution for wheelchair access and high-volume pedestrian flow.

Our sliding door systems are installed with activation sensors covering the approach zone and safety sensors covering the opening zone in accordance with BS EN 16005:2012, the harmonised European standard for power-operated pedestrian doorsets — safety in use. This standard defines minimum sensor fields, maximum closing forces (no greater than 150 N dynamic and 25 N static), maximum closing speeds (0.5 m/s standard, 0.3 m/s for low-energy applications), and the minimum break-out force for emergency egress. Compliance with BS EN 16005 is required for all power-operated doors in public buildings and is referenced in Approved Document M of the Building Regulations.

**Automatic Swing Doors**

Swing automatic doors are preferred where an existing shopfront frame is retained and a sliding track overhead would be architecturally intrusive, or where the entrance is narrow and a bi-parting sliding arrangement is not feasible. The drive unit is concealed within the door frame or overhead closer case, and the door can be programmed to hold-open, swing-and-return, or operate in push-and-go mode where a gentle push from the user completes the automatic opening sequence.

Low-energy swing door operators — sometimes marketed as "push and go" systems — fall under a specific sub-clause of BS EN 16005 governing low-energy automated doors. They are particularly appropriate for healthcare premises, care homes, and residential buildings where a high-speed automatic entry would be hazardous or inappropriate.

**DDA and Accessibility Compliance**

Automatic doors make a direct contribution to compliance with the Equality Act 2010. The Act's reasonable adjustment duty requires that physical features which disadvantage disabled people are removed or altered. A power-operated entrance door eliminates the physical effort of pulling a heavy door, removes the need to hold a door open for a wheelchair user, and removes the cognitive and physical challenge of managing a door and a wheelchair simultaneously.

BS 8300:2018, the British Standard for the design of an accessible and inclusive built environment, recommends automatic doors at principal entrances to public buildings and specifies minimum clear opening widths of 800 mm for single doors and 1500 mm for bi-parting sliding sets. We design all our installations to exceed these minimum dimensions where the structural opening permits.

**Safety Systems and Certification**

Every Sigma Shop Fronts automatic door installation is completed with a full safety test record documenting sensor fields, closing forces, closing speeds, and emergency egress performance. The completed door is labelled with the installation date, drive unit serial number, and the name of the responsible installer, in accordance with the Automatic Door Suppliers Association (ADSA) Code of Practice.

Following installation, we provide a handover document including the user manual, sensor field diagrams, emergency override procedures, and our recommended maintenance schedule. Annual safety inspection and maintenance by a competent person — as defined in BS EN 16005 — is a requirement for continued compliance, and we offer maintenance agreements structured around this obligation.

**Integration with Access Control and Fire Alarm Systems**

Automatic doors can be integrated with access control readers for out-of-hours security, with intercom systems for controlled access, and with the building's fire alarm panel. On receipt of a fire signal, the door can be configured to either open and hold (to facilitate evacuation) or to close and hold on the latch (where the door forms part of a smoke control lobby). The correct fail-safe position is determined by the fire strategy for the building, and we liaise with the fire engineer or building control body where this is not already specified.`,
    benefits: [
      {
        title: 'Accessibility and Equality Act Compliance',
        description:
          'Automatic doors remove the physical barrier of a heavy entrance door for wheelchair users, people with pushchairs, and anyone with reduced mobility. This directly supports compliance with the Equality Act 2010 reasonable adjustment duty and is recommended by BS 8300 for principal entrances to public-facing premises.',
      },
      {
        title: 'Improved Customer Flow',
        description:
          'A hands-free entrance removes the friction point of managing a door, making entry to your premises easier and more welcoming. For food retail, hospitality, and any business where customers carry items, this is a practical operational benefit as well as an accessibility one.',
      },
      {
        title: 'Energy Efficiency in High-Traffic Environments',
        description:
          'Counter-intuitively, an automatic sliding door can reduce heat loss compared to a manually operated door in a busy entrance. The controlled opening cycle — opening only when a person is approaching and closing promptly after passage — is far shorter than the average manual door cycle in a busy retail environment, reducing warm air loss significantly.',
      },
      {
        title: 'Ongoing Compliance Through Maintenance',
        description:
          'Our annual maintenance agreements include a full BS EN 16005 safety test, sensor calibration, closing force measurement, and a signed test record. This documentation supports the building\'s health and safety compliance record and provides evidence that the door remains within the parameters of the original certification.',
      },
    ],
    faqs: [
      {
        question: 'What is the minimum opening width for an automatic door?',
        answer:
          'BS 8300:2018 specifies a minimum 800 mm clear opening width for a single automatic door serving a principal entrance to a public building, and 1500 mm for a bi-parting sliding set. For busy retail premises, we generally recommend exceeding these minimums — a 900 mm single door or a 1800 mm bi-parting set — to allow comfortable simultaneous two-way pedestrian flow. The achievable clear opening is constrained by the structural opening width, and we assess this at the survey stage.',
      },
      {
        question: 'How does an automatic door behave in a power failure?',
        answer:
          'The default fail-safe position depends on the configuration and the role of the door in the building\'s fire and evacuation strategy. Most retail sliding door systems are configured to fail-open, returning to a parked open position under the energy stored in a capacitor bank, or using a free-wheel release that allows the leaves to be pushed aside manually. Doors forming part of a fire or smoke compartment boundary may be configured to fail-closed. The fail-safe position is agreed with the building\'s responsible person and fire engineer before installation and is documented in the handover pack.',
      },
      {
        question: 'How often does an automatic door need servicing?',
        answer:
          'BS EN 16005 requires that power-operated pedestrian doors are inspected and maintained by a competent person at least annually. For high-cycle installations — entrances processing over 300 door cycles per day — we recommend six-monthly inspection. Each service visit includes a closing force test, sensor field test, speed measurement, and inspection of all structural fixings, drive components, and safety devices. A signed test record is provided after each visit.',
      },
      {
        question: 'Can you retrofit an automatic operator to our existing door frame?',
        answer:
          'In many cases, yes. Swing door operators can often be fitted to an existing commercial door frame and leaf, provided the leaf weight and dimensions are within the operator\'s rated capacity and the frame head is structurally sound. Sliding door retrofit is more complex, as it requires a track overhead, side panels, and typically replacement of the door leaves with matching sliding leaves. We assess retrofit feasibility at the survey stage and provide a like-for-like comparison between retrofit and full replacement.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Consultation',
        description:
          'We discuss your entrance requirements including footfall volume, DDA compliance needs, and whether a sliding, swing, or low-energy system is most appropriate for your premises.',
      },
      {
        step: 2,
        title: 'Site Survey & Assessment',
        description:
          'Our engineer surveys the entrance, checks structural capacity for the operator and track, verifies electrical supply availability, and assesses the approach zones for sensor positioning.',
      },
      {
        step: 3,
        title: 'System Design & Quote',
        description:
          'We specify the operator model, sensor type, safety devices, and door leaf configuration. A detailed quotation including all electrical and building works is provided.',
      },
      {
        step: 4,
        title: 'Installation & Wiring',
        description:
          'Our team installs the track, operator, door leaves, and all safety sensors. Electrical connection and integration with fire alarm or access control systems is completed on the same visit.',
      },
      {
        step: 5,
        title: 'Commissioning & Training',
        description:
          'The door is programmed for opening speed, hold-open time, and safety sensitivity. We train your staff on manual override procedures and provide all compliance documentation.',
      },
    ],
    pricingGuide: {
      heading: 'What Does an Automatic Door Cost?',
      content:
        'Automatic door pricing depends on the operator type, door leaf size and material, sensor specification, and any access control or fire alarm integration. Ongoing maintenance contracts are recommended and can be included in the initial quotation.',
      ranges: [
        { item: 'Automatic sliding (bi-parting)', price: '£3,500 – £7,000' },
        { item: 'Automatic swing operator', price: '£2,000 – £4,000' },
        { item: 'Low-energy swing door', price: '£1,500 – £3,000' },
        { item: 'Annual maintenance contract', price: '£250 – £500' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'Are automatic doors a legal requirement for disabled access?',
        answer:
          'The Equality Act 2010 requires that service providers make reasonable adjustments to avoid putting disabled people at a substantial disadvantage. While automatic doors are not explicitly mandated, they are widely regarded as a reasonable adjustment for high-footfall commercial entrances. Building Regulations Part M also references automatic or powered doors as a means of achieving accessible entrance design.',
      },
      {
        question: 'How often should automatic doors be serviced?',
        answer:
          'The BS 7036 standard recommends that automatic doors are serviced at least every six months by a competent engineer. High-traffic entrances, such as supermarket or hospital doors, may require quarterly servicing. Regular maintenance ensures safety sensors function correctly and extends the life of the operator mechanism.',
      },
      {
        question: 'What happens to automatic doors during a fire alarm?',
        answer:
          'Automatic doors connected to the building fire alarm system are programmed to fail-safe open, swinging or sliding to the fully open position to allow unimpeded evacuation. This behaviour is configured during commissioning and tested as part of the regular fire alarm check routine.',
      },
      {
        question: 'Can automatic doors be locked at night?',
        answer:
          'Yes. Most automatic door systems include an integrated locking mode that can be activated via a key switch, access control panel, or timer. When locked, the doors function as a conventional secured entrance. Some systems offer a one-way mode, allowing exit only while preventing entry outside trading hours.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'bi-fold-doors', 'shopfront-repairs', 'security-doors'],
  },

  {
    slug: 'bi-fold-doors',
    name: 'Bi-Fold Doors',
    shortDescription:
      'Commercial aluminium bi-fold door systems for retail, hospitality, and leisure premises. Open up your frontage completely with thermally broken, weather-rated folding configurations.',
    heroImage: 'bi-fold door.jpeg',
    primaryKeyword: 'commercial bi-fold doors',
    metaTitle: 'Bi-Fold Doors UK | Commercial Aluminium',
    metaDescription:
      'Commercial aluminium bi-fold doors for retail and hospitality. Thermally broken, weather-rated to BS 6375. Open your full frontage. Free UK survey.',
    description: `Commercial bi-fold door systems — sometimes called bifold or folding-sliding doors — are increasingly specified for retail, hospitality, and leisure premises where the ability to open up an entire frontage or elevation creates a fundamentally different trading proposition. A café that can open its complete street-facing wall on a warm day, or a showroom that can create a seamless transition between indoor display and an external forecourt, gains a competitive advantage that a conventional hinged or sliding arrangement simply cannot replicate.

Sigma Shop Fronts designs and installs commercial aluminium bi-fold systems to suit openings from 2 m to over 12 m in width. Our systems are sourced from fabricators whose products are independently tested and certified to the performance standards that commercial applications demand.

**How Commercial Bi-Fold Systems Work**

A bi-fold door system consists of a series of individual door panels — typically between two and eight per run — connected by hinges and suspended from a top-hung track or supported by a bottom-running track. When opening, the panels fold against each other accordion-fashion and stack compactly to one or both sides of the opening, creating the maximum possible clear aperture.

Top-hung systems are preferred for commercial use: because the track carries the panel weight, the floor threshold can be a low-profile weather seal rather than a structural bottom track, minimising the trip hazard and improving DDA compliance. Bottom-running systems are used where the header structure cannot carry the suspended load, but they require a more substantial threshold detail.

The stacking configuration — whether panels fold to the left, to the right, or split to both sides — is determined by the operational requirements and the available stacking space. Traffic-door options (a separate hinged panel within the bi-fold run that operates independently) allow pedestrian access without opening the full system.

**Weather Performance and Testing**

Commercial bi-fold doors are exposed to the full range of UK weather conditions, including driving rain, wind loads, and thermal cycling. The relevant performance standard is BS 6375, which covers air permeability, watertightness, and wind resistance for opening building elements. For commercial premises facing exposed street elevations, we specify systems tested to the mid-range or upper categories of BS 6375 — typically Class 3 or 4 for watertightness and Category B or C for wind resistance — rather than the lower-category systems marketed primarily at the residential sector.

Thermal performance is addressed through thermally broken frame profiles. Unlike most residential bi-fold systems, which use a standard aluminium section, our commercial-grade systems incorporate a continuous polyamide thermal break throughout the frame and sill, delivering a complete door assembly U-value compliant with Building Regulations Part L for non-domestic buildings.

**Structural Requirements**

Opening up a large section of an existing building elevation for a bi-fold installation almost always involves structural work. The removal of masonry or the widening of an existing opening requires a structural engineer's design for the replacement lintel or beam — typically a steel universal beam or a reinforced concrete boot lintel — sized to carry the loads above, including wind uplift and the weight of the new door system.

We coordinate this structural work as part of our project management service, and where Building Regulations approval is required for the structural alteration, we manage the application through an Approved Inspector or local authority building control.

**Glazing and Security**

Bi-fold door panels are typically glazed with double-glazed units incorporating toughened outer and inner panes. For enhanced security, laminated inner panes to BS EN ISO 12543 (laminated glass) can be specified; these resist the smash-and-grab attack that a toughened monolithic pane is vulnerable to after initial fracture.

Locking is provided at multiple points along each panel. The outermost panel — the one that closes against the threshold and jamb when the system is shut — carries the primary locking hardware, typically a multi-point espagnolette or shoot-bolt system engaging the frame at the head, sill, and strike side. The folded stack of inner panels is secured against the outer panel by secondary locks.

For overnight security in high-footfall or high-risk locations, bi-fold systems can be combined with a roller shutter in the same structural opening, with the shutter housing concealed within the header detail above the bi-fold frame.`,
    benefits: [
      {
        title: 'Maximum Aperture Opening',
        description:
          'A bi-fold system opens the full structural width of the elevation. No door swing space is lost, no fixed frame elements obstruct the view, and the stacked panels occupy minimal space. For hospitality, retail, and showroom use, this transforms the relationship between interior and exterior.',
      },
      {
        title: 'Thermally Broken for Commercial Compliance',
        description:
          'Our commercial bi-fold frames use continuous polyamide thermal breaks throughout the profile, achieving assembly U-values that meet Building Regulations Part L for non-domestic buildings. This distinguishes them from domestic-grade products that may not satisfy commercial energy performance obligations.',
      },
      {
        title: 'Low Threshold for Accessibility',
        description:
          'Top-hung bi-fold systems use a low-profile sill seal rather than a raised bottom track, creating a near-level threshold suitable for wheelchair access and buggy movement. This supports compliance with the Equality Act 2010 and the BS 8300 guidance on accessible entrances.',
      },
      {
        title: 'Integrated Traffic Door for Everyday Use',
        description:
          'A traffic door within the bi-fold run allows staff and customers to enter and exit without operating the full panel stack. This is critical for busy retail or hospitality environments where the bi-fold is only fully opened during peak periods or good weather.',
      },
    ],
    faqs: [
      {
        question: 'How many panels can a commercial bi-fold system accommodate?',
        answer:
          'Commercial top-hung bi-fold systems can accommodate anywhere from two to ten or more panels in a single run, depending on the track capacity and the available stacking space. Beyond eight panels in a single stack, it is usually preferable to use a split configuration — panels stacking to both ends — to keep stack depth manageable and reduce the operating force. We design the configuration at the survey stage based on the opening width, operational requirements, and available stacking space.',
      },
      {
        question: 'Is planning permission required to install bi-fold doors?',
        answer:
          'Replacing an existing shopfront with a bi-fold system may be permitted development in many cases, but widening the structural opening or significantly changing the appearance of the building facade requires planning permission, particularly in conservation areas or for listed buildings. Where Building Regulations apply — for a new structural opening or for compliance with Part L energy performance requirements — we manage the relevant submissions on the client\'s behalf.',
      },
      {
        question: 'How secure is a bi-fold door system at night?',
        answer:
          'A correctly specified commercial bi-fold with multi-point locking on the closing panel and secondary locks on the folded stack provides reasonable security against opportunistic attack. For higher-risk locations, we recommend combining the bi-fold with a roller shutter — either face-fit or within a concealed header box — that provides a solid steel barrier for overnight security. This combination is the standard specification for hospitality premises in busy urban centres.',
      },
      {
        question: 'What maintenance does a commercial bi-fold system need?',
        answer:
          'Bi-fold systems require annual maintenance: lubrication of the top track rollers and hinge pivots, adjustment of panel alignment and seal compression, testing of all locking points, and inspection of the glazing seals. In coastal or high-pollution environments, we recommend six-monthly cleaning and inspection of the aluminium sections and hardware to prevent corrosion of exposed steel components within the locking mechanism.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Design Brief',
        description:
          'We discuss how you intend to use the opening — fully open retail frontage, café terrace access, or showroom display — and establish the number of panels, opening direction, and traffic door requirements.',
      },
      {
        step: 2,
        title: 'Site Survey',
        description:
          'Our surveyor measures the structural opening, checks the floor level and threshold detail, and assesses the track fixing points and parking zone where the folded panels will stack.',
      },
      {
        step: 3,
        title: 'Configuration & Quote',
        description:
          'We finalise the panel count, glazing specification, frame colour, and locking arrangement. A full quotation with technical drawings is provided for approval.',
      },
      {
        step: 4,
        title: 'Installation',
        description:
          'The top track, threshold, and panels are installed and aligned. Our team adjusts all rollers, hinges, and seals to ensure smooth operation across the full opening span.',
      },
      {
        step: 5,
        title: 'Demonstration & Sign-Off',
        description:
          'We demonstrate the folding sequence, locking operation, and traffic door function to your team. Warranty documents, care instructions, and guarantee certificates are provided.',
      },
    ],
    pricingGuide: {
      heading: 'What Do Commercial Bi-Fold Doors Cost?',
      content:
        'Bi-fold door pricing is determined by the number of panels, total opening width, glazing specification, and whether a traffic door is included. Thermally broken aluminium frames and enhanced security glazing are standard on all our commercial systems.',
      ranges: [
        { item: '3-panel system (up to 3m)', price: '£3,000 – £5,500' },
        { item: '5-panel system (up to 5m)', price: '£5,500 – £9,000' },
        { item: '7+ panel system (7m+)', price: '£8,000 – £15,000' },
        { item: 'Traffic door add-on', price: '£800 – £1,500' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'Are bi-fold doors secure enough for a commercial shopfront?',
        answer:
          'Yes. Our commercial bi-fold systems feature multi-point locking, toughened or laminated safety glass, and robust aluminium frames that meet PAS 24:2022 enhanced security requirements. When locked, the panels are mechanically held at multiple points along the top track, bottom rail, and between each panel.',
      },
      {
        question: 'Can bi-fold doors be used as a main entrance?',
        answer:
          'Yes, by incorporating a traffic door. A traffic door is a single panel within the bi-fold set that operates independently as a conventional hinged or pivoting entrance door, allowing everyday access without folding back the entire system. This is standard practice for retail and hospitality premises.',
      },
      {
        question: 'How wide can a commercial bi-fold opening be?',
        answer:
          'There is no fixed maximum, as bi-fold systems are modular. We have installed openings exceeding 10 metres using seven or more panels. The practical limit is determined by the structural opening available, the panel parking zone, and the wind loading on the exposed elevation.',
      },
      {
        question: 'Do bi-fold doors meet Building Regulations for thermal performance?',
        answer:
          'Yes. Our thermally broken aluminium bi-fold systems achieve overall U-values that comply with Building Regulations Part L. Combined with double-glazed sealed units, they provide effective thermal insulation while allowing maximum natural light and open-plan flexibility.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'automatic-doors', 'roller-shutters', 'shopfront-repairs'],
  },

  {
    slug: 'fire-doors',
    name: 'Fire Doors',
    shortDescription:
      'Certified fire door supply and installation for commercial premises. FD30, FD60, and FD90 rated assemblies with intumescent seals, tested hardware, and third-party certification.',
    heroImage: 'fire-door.jpeg',
    primaryKeyword: 'commercial fire doors',
    metaTitle: 'Fire Doors UK | FD30 FD60 FD90 Certified',
    metaDescription:
      'Supply and installation of certified commercial fire doors. FD30, FD60, FD90 rated. Intumescent seals, tested hardware, third-party certification. UK-wide.',
    description: `Fire doors are the most safety-critical doors installed in any commercial building, and their correct specification, installation, and ongoing maintenance are non-negotiable legal requirements for any responsible building owner or manager. The consequences of a fire door failing to perform as designed — either because it was incorrectly specified, poorly installed, or not maintained — are severe: lives can be lost, and the building owner or responsible person faces criminal liability under the Regulatory Reform (Fire Safety) Order 2005 and the Fire Safety Act 2021.

Sigma Shop Fronts takes this responsibility seriously. We supply and install fire door assemblies that are third-party certified, install them strictly in accordance with the manufacturer's installation instructions, and document every installation with a completion record that can be presented to the responsible person, the building control body, or a fire inspector.

**Understanding Fire Door Ratings**

Fire doors are classified by the duration for which the closed assembly resists the passage of fire and, where specified, smoke. In the UK, the common designations are:

- **FD30** — provides 30 minutes' integrity (E) protection. The most common classification for corridor and compartment doors in commercial buildings.
- **FD60** — provides 60 minutes' integrity, required for high-risk areas such as plant rooms containing significant fuel load, basement-to-ground-floor stair doors in tall buildings, and certain retail and storage areas.
- **FD90 and FD120** — 90- and 120-minute ratings for specialist applications including protected lobbies in hospitals, high-rise residential conversions, and buildings with complex fire strategies.

The S suffix (e.g. FD30S) denotes that the assembly is also tested to provide smoke control in addition to integrity, using an intumescent seal and cold smoke seal combination.

These ratings are achieved through destructive testing to BS EN 1634-1, which simulates a fully developed fire on one face of the door. Only the complete tested assembly — leaf, frame, hardware, intumescent seals, and glazing (where present) — achieves the rated performance. Substituting any component with an untested alternative invalidates the certification.

**Third-Party Certification**

Sigma Shop Fronts installs fire door assemblies supplied by manufacturers holding third-party certification under the CERTIFIRE or BWF-CERTIFIRE scheme, which covers the door leaf, frame, and hardware as an integrated tested system. We also install door sets certificated under the LPCB (Loss Prevention Certification Board) scheme where this is specified by the client or their fire engineer.

Third-party certification provides the responsible person with independent assurance that the product has been manufactured to a consistent standard and that the certified performance is reproducible — unlike a single test certificate, which demonstrates only that one sample passed at one point in time.

**Installation Requirements**

Fire door installation is not equivalent to general joinery or door hanging. Every dimension matters: the gap between the door leaf and the frame must fall within the tolerances specified in the test evidence, as excessive gaps compromise the integrity of the intumescent seal. Hinge specification (number, dimensions, and position), latch bolt size, and overhead closer specification all form part of the tested assembly and cannot be substituted without invalidating the fire performance.

Our installers are trained to and assessed against the requirements of the BWF-CERTIFIRE Fire Door Installation Scheme (or equivalent), and we retain records of all installation training and certification. Every completed fire door installation receives a physical label on the hinge edge of the door leaf recording the installation date, the installer's name, and the fire rating, in accordance with the guidance issued by the Building Research Establishment (BRE) and FDIS (Fire Door Inspection Scheme).

**Gap Tolerances and Hardware**

The maximum permissible gap between the door leaf and the frame rebate on the hinge side, latch side, and head is 3 mm when measured with the door closed, in accordance with the guidance in BS 8214:2016 (Code of practice for fire door assemblies). At the threshold, the gap must not exceed 8 mm unless a specific threshold seal has been tested as part of the assembly.

Overhead door closers must be assessed and rated to BS EN 1154 (controlled door closing devices) and be of sufficient power to close and latch the door reliably from any position between 0° and 90°. For accessible routes, low-energy closers rated to BS EN 1154 can be combined with power-assisted openers to reduce the force required to open the door, while maintaining automatic closing function.

**Regulatory Context**

The Fire Safety (England) Regulations 2022 — introduced following the Grenfell Tower Inquiry — impose specific obligations on responsible persons in multi-occupied residential buildings with storeys over 11 m, including quarterly self-checks of all flat entrance fire doors and annual checks of all communal fire doors. Whilst these regulations apply specifically to residential buildings, the broader obligations under the Regulatory Reform (Fire Safety) Order 2005 apply to all non-domestic premises, requiring that all fire doors are maintained in an effective condition and that records are kept.`,
    benefits: [
      {
        title: 'Life Safety and Legal Compliance',
        description:
          'A correctly installed and maintained fire door is a primary life-safety element. It provides the time needed for occupants to evacuate safely and for firefighters to operate. Failure to install certified fire doors correctly constitutes a breach of the Regulatory Reform (Fire Safety) Order 2005, which carries unlimited fines and imprisonment for the responsible person.',
      },
      {
        title: 'Third-Party Certified Assemblies',
        description:
          'Every fire door assembly we install is certificated under the BWF-CERTIFIRE or CERTIFIRE scheme, providing the responsible person with documented assurance that the product has been independently tested and regularly audited. This certification is increasingly required by building insurers and local fire and rescue services.',
      },
      {
        title: 'Complete Installation Records',
        description:
          'We provide a completion certificate and installation record for every fire door we install, including the product certification reference, installation date, and installer identification. This documentation supports the building\'s Golden Thread of information and satisfies the record-keeping requirements under the Building Safety Act 2022.',
      },
      {
        title: 'Experienced, Assessed Installers',
        description:
          'Our fire door installers are assessed against a recognised third-party installation standard. This is not a one-off qualification but a regularly audited competence that gives building owners confidence that installation quality is consistent across all their sites.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between FD30 and FD30S?',
        answer:
          'FD30 denotes a fire door that provides 30 minutes of integrity protection — it resists the passage of flames and hot gases for that period when tested to BS EN 1634-1. FD30S additionally provides smoke control: the S suffix indicates the door has been tested to restrict the passage of cold smoke, using a cold smoke seal (usually a brush or compression seal) in addition to the intumescent seal that swells under heat. In most modern commercial buildings, the fire strategy requires FD30S or FD60S doors to corridors forming part of an escape route, as smoke is frequently more dangerous than flame in the early stages of a fire.',
      },
      {
        question: 'Can we fit our own door furniture to a certified fire door?',
        answer:
          'Only hardware that forms part of the tested and certificated assembly can be used without invalidating the fire rating. This includes hinges, latches, locks, closers, and intumescent seals. If specific hardware is required — for example, a particular lever handle design or an access control strike — we check whether it has been assessed for compatibility with the door assembly\'s certification. In many cases, hardware manufacturers hold supplementary test evidence demonstrating compatibility with common fire door assemblies. We advise on this at the specification stage.',
      },
      {
        question: 'How often should fire doors be inspected after installation?',
        answer:
          'The Regulatory Reform (Fire Safety) Order 2005 requires that all fire safety equipment — including fire doors — is maintained in an effective condition. The FDIS (Fire Door Inspection Scheme) and the guidance in BS 8214:2016 recommend a minimum annual inspection of all fire doors by a competent person, with a quarterly visual check by the building\'s responsible person or a nominated deputy. High-traffic fire doors — those in corridors or stairwells used multiple times daily — benefit from six-monthly inspection. We offer a fire door inspection and maintenance service structured around these requirements.',
      },
      {
        question: 'Do fire doors need to be self-closing?',
        answer:
          'Yes. Every fire door must be fitted with a certified overhead closer (rated to BS EN 1154) that closes and latches the door from any open position. A fire door held open by a wedge, hook, or fire extinguisher is an illegal and dangerous arrangement that could result in enforcement action by the fire authority. Where it is operationally desirable to hold a fire door open, we install an electromagnetic hold-open device linked to the building\'s fire detection and alarm system, which releases the door automatically on a fire signal so that it closes under the action of the overhead closer.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Fire Strategy Review',
        description:
          'We review your building\'s fire strategy and identify which openings require fire-rated door sets, the required fire rating (FD30, FD60, or FD90), and whether smoke seals or hold-open devices are needed.',
      },
      {
        step: 2,
        title: 'Site Survey',
        description:
          'Our surveyor measures each opening, checks the wall construction and compartment line, and records the requirements for ironmongery, signage, and any intumescent or smoke seal specifications.',
      },
      {
        step: 3,
        title: 'Specification & Quotation',
        description:
          'We specify the door leaf, frame, ironmongery, and seals as a complete certified door set. A quotation with product data sheets, test evidence, and certification references is provided.',
      },
      {
        step: 4,
        title: 'Installation',
        description:
          'Our accredited installers fit each door set in accordance with the manufacturer\'s installation instructions and the relevant third-party certification scheme. Installation gaps and seal positioning are checked against the test evidence.',
      },
      {
        step: 5,
        title: 'Certification & Handover',
        description:
          'A fire door installation certificate is issued for each door set, forming part of the building\'s fire safety record. We provide maintenance guidance and recommend an inspection schedule.',
      },
    ],
    pricingGuide: {
      heading: 'What Does a Fire Door Cost?',
      content:
        'Fire door pricing depends on the fire resistance period, door leaf construction, and ironmongery specification. Certified fire door sets include the leaf, frame, seals, and all ironmongery tested and certified as a complete assembly.',
      ranges: [
        { item: 'FD30 single leaf', price: '£450 – £900' },
        { item: 'FD60 single leaf', price: '£600 – £1,200' },
        { item: 'FD30S with smoke seal', price: '£550 – £1,000' },
        { item: 'FD90 specialist', price: '£1,000 – £2,000' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'What is the difference between FD30 and FD60 fire doors?',
        answer:
          'FD30 doors provide 30 minutes of fire resistance and FD60 doors provide 60 minutes, as tested to BS 476-22 or BS EN 1634-1. The required rating depends on the building\'s fire strategy and the compartment line the door sits on. Most internal corridors and stairwells in commercial buildings require FD30, while higher-risk boundaries such as plant rooms or storage areas may need FD60.',
      },
      {
        question: 'How often should fire doors be inspected?',
        answer:
          'The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to maintain fire doors in working order. Industry guidance recommends a visual check every six months and a detailed inspection by a competent person at least annually. Checks should cover the door leaf, frame, seals, hinges, closer, and signage.',
      },
      {
        question: 'Can I replace fire door ironmongery myself?',
        answer:
          'No. Fire door ironmongery must be replaced with hardware that has been tested and certified as part of the door set assembly. Fitting non-certified handles, hinges, or closers can invalidate the fire rating of the entire door set. All replacement ironmongery should be installed by a competent person using components listed in the door\'s test evidence.',
      },
      {
        question: 'Do fire doors need intumescent strips and smoke seals?',
        answer:
          'Yes. Intumescent strips are essential as they expand when heated to seal the gap between the door leaf and frame, preventing fire spread. Smoke seals are additionally required where the fire strategy specifies smoke control, denoted by the "S" suffix in ratings such as FD30S. Both must be fitted in accordance with the manufacturer\'s tested configuration.',
      },
    ],
    relatedServices: ['security-doors', 'roller-shutters', 'shopfront-repairs', 'emergency-callout'],
  },

  {
    slug: 'shopfront-repairs',
    name: 'Shopfront Repairs',
    shortDescription:
      'Fast, professional repairs to damaged shopfronts, roller shutters, and entrance doors. Boarding, glazing replacement, frame straightening, and hardware repair across the UK.',
    heroImage: 'shopfront-2.jpeg',
    primaryKeyword: 'shopfront repairs',
    metaTitle: 'Shopfront Repairs UK | Same-Day Service',
    metaDescription:
      'Professional shopfront repair service across the UK. Broken glazing, damaged frames, bent shutters, faulty hardware. Fast response. Insurance work accepted.',
    description: `A damaged shopfront is both a security risk and a commercial liability. Broken glazing exposes the interior of your premises to the elements and to opportunistic theft. A bent shutter that will not close fully negates your overnight security. A failed door closer or broken lock hardware compromises the integrity of your access control. In every case, the damage needs to be addressed quickly, competently, and with materials that match the original installation.

Sigma Shop Fronts operates a dedicated shopfront repair service across the UK, handling everything from a single broken glass panel to extensive impact damage requiring frame replacement and structural repairs. We carry a stock of commonly needed materials — glazing, frame sections, shutter laths, locking hardware — to enable same-day or next-day response to most repair requirements.

**Glazing Replacement**

Broken or damaged glazing is the most common repair requirement we attend to. Whether the cause is vandalism, vehicle impact, a burglary attempt, or accidental damage, the priority is to make the opening secure as quickly as possible and then to reinstate the correct glazing specification.

Our initial attendance includes installation of a temporary security board — a heavy-duty plywood or polycarbonate sheet fixed securely within the existing frame — if the replacement glass cannot be installed immediately. We measure the opening, establish the existing glass specification (thickness, make-up, any safety or security rating), and order the replacement unit from our glazing supply network. In most cases, standard toughened single-pane or sealed double-glazed unit replacements are available within 24–48 hours; bespoke specifications, large panels, or specialist glass types may require three to five working days.

All replacement glazing is installed in accordance with BS 6262 (glazing for buildings), and we document the glass specification on a works completion record for insurance and warranty purposes.

**Frame and Structural Repairs**

Vehicle impacts to shopfronts frequently cause damage beyond the glazing: aluminium frame sections can be bent, sheared, or twisted; fixing cramps can be pulled from the masonry; and the subframe or sill can be displaced. We assess the full extent of damage and determine whether the damaged section can be straightened and reinforced in situ, or whether the affected frame members need to be cut out and replaced.

Where a frame section is replaced, we match the existing profile and powder-coat finish as closely as possible. An exact match is achievable for current-production profile systems; for older or obsolete profiles, we work with profile suppliers to identify the closest available equivalent, and re-powder-coat the replacement section to match the existing colour.

**Roller Shutter Repairs**

Roller shutter damage typically falls into three categories: curtain damage (bent or buckled laths), guide rail damage (bent or displaced side channels), and mechanism failure (broken spring, failed motor, seized drive shaft). We assess which category applies and carry out the appropriate repair.

Curtain repairs on steel shutters involve removal and replacement of the damaged lath section. For aluminium curtains, lath replacement is similarly straightforward. Where lath replacements are not possible due to the shutter design or curtain age, we can supply and install a complete replacement curtain within the existing housing box and guides where these remain undamaged.

Spring failure is a common mechanical issue as shutters age: the coil spring that balances the curtain weight loses tension over years of use and eventually breaks. Spring replacement is a specialist task requiring safe decompression of the spring before removal, and must not be attempted by unqualified personnel. Our engineers carry the most common spring sizes to enable same-day replacement in most cases.

**Door Hardware Repairs**

Door closers, panic hardware, multi-point locking mechanisms, and hinges all have finite service lives, particularly on high-use commercial entrances. We repair and replace faulty hardware using components from established manufacturers — ASSA ABLOY, dormakaba, GEZE, and Dorma — and, for safety-critical components such as panic hardware and fire door closers, we use only tested replacements that comply with the relevant harmonised standard (BS EN 1125, BS EN 1154, etc.).

**Insurance Work**

The majority of shopfront damage we attend is the subject of an insurance claim. We are experienced in providing the documentation that insurers require: a photographic record of the damage taken before any temporary boarding, a detailed repair specification, a quantified estimate of repair costs, and — on completion — an invoice and works completion certificate.

We work directly with insurance loss adjusters and brokers, and our documentation is structured to provide the adjusters with a clear, itemised breakdown that facilitates straightforward claims settlement. Where the damage is such that a complete shopfront replacement is more cost-effective than repair, we make this clear in our assessment and provide comparative quotations for both options.`,
    benefits: [
      {
        title: 'Same-Day Emergency Boarding',
        description:
          'If your glazing is broken or your shutter is jammed open, we can attend on the same day to install temporary boarding and make the premises secure. This prevents further exposure to the elements and to opportunistic theft while the permanent repair is arranged.',
      },
      {
        title: 'Matched Materials and Finishes',
        description:
          'We take care to match replacement frame sections, glazing, and hardware to the existing installation. This is not just an aesthetic concern — mismatched materials can affect the weather performance, security rating, or fire compliance of the repaired assembly.',
      },
      {
        title: 'Experienced Insurance Documentation',
        description:
          'Our repair teams are trained to document damage in the detail that loss adjusters require. We provide photographic evidence, detailed repair specifications, and itemised invoices that are formatted to support straightforward claims settlement and reduce the administrative burden on the policyholder.',
      },
      {
        title: 'Hardware Compliance After Repair',
        description:
          'When we replace safety-critical hardware — panic bars, fire door closers, multi-point locks — we use certified replacements that comply with the relevant BS EN standard. This ensures that after repair, the door assembly remains compliant with its original specification and any regulatory requirements that apply to it.',
      },
    ],
    faqs: [
      {
        question: 'How quickly can you attend for a repair?',
        answer:
          'For emergency glazing and shutter repairs, we aim to attend within four hours of a call during normal working hours, and within two to three hours for a confirmed emergency callout. Out-of-hours emergency attendance is available through our emergency callout service. For non-urgent repairs, we typically schedule attendance within two to three working days.',
      },
      {
        question: 'Can you match the glass specification in my existing shopfront?',
        answer:
          'In most cases, yes. We identify the existing glass specification from the existing unit markings (toughened glass is marked with the BS EN 12150 kite mark and the glass manufacturer\'s identification), the frame dimensions, and — for double-glazed units — the visible spacer bar colour and estimated cavity depth. Where the specification is non-standard (specialist solar control, acoustic, or security glass), we may request the original installation records from the shopfront installer. Lead times for specialist glass specifications are typically three to five working days longer than standard toughened glass.',
      },
      {
        question: 'Do you carry out repairs on shutters that you did not originally install?',
        answer:
          'Yes. We repair roller shutters regardless of who supplied and installed the original unit. Our engineers carry tools, spare parts, and common spring sizes to cover the majority of shutter makes and configurations encountered in the UK market. For less common or older systems, we may need to source specific components, which can add one to two days to the repair timeline.',
      },
      {
        question: `Will my landlord\'s consent be needed for repairs?`,
        answer:
          'For like-for-like repairs — replacing broken glass with the same specification, or repairing a damaged frame section in the same profile and colour — landlord consent is generally not required. If the repair involves a change in the appearance of the shopfront (a different glass type, a changed profile, or a modified colour) then your lease may require you to obtain landlord consent before proceeding. We can advise on the likely classification of any proposed repair and assist you in preparing a landlord consent request if needed.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Report the Problem',
        description:
          'Call us on 07414 779594 or submit a repair request through our website. Describe the damage and, if possible, send photographs so we can prepare before visiting.',
      },
      {
        step: 2,
        title: 'Assessment Visit',
        description:
          'We visit the premises to inspect the damage, identify the cause, and determine whether a repair or replacement is the most cost-effective solution.',
      },
      {
        step: 3,
        title: 'Quotation',
        description:
          'A detailed repair quotation is provided, including materials, labour, and any temporary securing measures already carried out. For insurance claims, we provide the documentation your insurer needs.',
      },
      {
        step: 4,
        title: 'Repair Work',
        description:
          'Our team carries out the repair using matching materials and profiles. For glass replacements, we source toughened or laminated glass to the correct specification and install it to current standards.',
      },
    ],
    pricingGuide: {
      heading: 'What Do Shopfront Repairs Cost?',
      content:
        'Repair costs depend on the type and extent of damage, the materials required, and whether emergency boarding is needed before the permanent repair. We provide transparent pricing with no hidden charges.',
      ranges: [
        { item: 'Emergency boarding (per opening)', price: '£150 – £350' },
        { item: 'Single glass panel replacement', price: '£300 – £800' },
        { item: 'Frame section repair', price: '£400 – £1,200' },
        { item: 'Door hardware replacement', price: '£150 – £500' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'Can you repair a shopfront without replacing the whole system?',
        answer:
          'In most cases, yes. Many shopfront problems can be resolved by repairing or replacing individual components — a single glass panel, a damaged frame section, or worn door hardware — without the need to replace the entire frontage. We always assess the most economical repair option first.',
      },
      {
        question: 'How quickly can you repair a broken shop window?',
        answer:
          'We can usually board up a broken window within a few hours of your call, with the permanent glass replacement completed within two to five working days depending on the glass specification required. Standard toughened glass is typically available within 48 hours.',
      },
      {
        question: 'Will my insurance cover shopfront repairs?',
        answer:
          'Most commercial property insurance policies cover accidental damage and vandalism to shopfronts, subject to your policy excess. We provide detailed repair quotations and photographic evidence in a format that insurers accept, and we are happy to deal directly with your insurer or loss adjuster on your behalf.',
      },
      {
        question: 'Can you match the existing frame colour when repairing a section?',
        answer:
          'Yes. We match the powder-coat colour of the existing frame using RAL, BS 4800, or NCS colour references. Where the original colour reference is unknown, we take a physical sample and arrange a colour match through our finishing partner to ensure the repaired section blends seamlessly.',
      },
    ],
    relatedServices: ['emergency-callout', 'aluminium-shopfronts', 'roller-shutters', 'automatic-doors'],
  },

  {
    slug: 'emergency-callout',
    name: 'Emergency Callout',
    shortDescription:
      '24/7 emergency response for broken shopfronts, failed shutters, and compromised entrances. We secure your premises, day or night, across the UK.',
    heroImage: 'sigma-front-wide.jpeg',
    primaryKeyword: 'emergency shopfront repair',
    metaTitle: 'Emergency Shopfront Callout UK | 24/7',
    metaDescription:
      '24/7 emergency shopfront and shutter repair. Board-up, glazing, shutter and door emergency service. Fast response across the UK. Call now.',
    description: `When a shopfront or security barrier fails outside of normal working hours — whether through vandalism, vehicle impact, attempted break-in, or mechanical failure — the consequences are immediate and serious. An open or unsecured premises is vulnerable to opportunistic theft, weather damage, and liability exposure. Every hour that passes without a secure boundary increases the risk and the potential loss.

Sigma Shop Fronts operates a 24/7 emergency callout service designed to get a qualified engineer to your premises as quickly as possible, make the site secure, and provide a clear assessment of the permanent repair or replacement required. We cover sites across the UK and maintain a network of regional engineers to minimise response times.

**What Constitutes a Shopfront Emergency?**

The most common emergency callout scenarios we attend are:

- **Smashed glazing** — whether from vandalism, attempted burglary, or accidental impact. Broken glass leaves the premises open and creates a significant public liability risk for passers-by.
- **Roller shutter stuck open or failed to close** — a shutter that will not close at the end of trading leaves stock, equipment, and the entire interior of the premises exposed overnight.
- **Vehicle impact damage** — a vehicle collision with a shopfront can displace the entire frame system, shatter multiple glazing panels, and in some cases affect the structural opening above.
- **Burglary damage** — after a forced-entry event, the entry point used by the perpetrators must be secured before the premises can be left unattended.
- **Failed door hardware** — a multi-point lock that jams shut (preventing staff from entering the premises in the morning) or a panic bar that fails to latch (preventing the premises from being secured at closing) both require urgent attendance.
- **Fire damage to a door or shutter** — after a fire, the affected compartment boundary must be reinstated as quickly as possible to restore the building's passive fire protection.

**Our Emergency Response Process**

When you call our emergency line, you will be connected immediately to an operative who will take the details of the incident, confirm the address, and dispatch the nearest available engineer. We will provide an estimated arrival time and keep you informed of the engineer's progress.

On arrival, the engineer's first priority is to make the premises secure. This typically involves boarding up any broken glazing with heavy-duty plywood or polycarbonate sheet, secured with screws into the existing frame or into rawl-plugged fixings in the masonry reveal. For roller shutter failures, we carry a range of common replacement springs, motor components, and manual override tools to address the most frequent causes of shutter failure on site.

Once the premises is secure, the engineer provides a written assessment of the damage and what is required for permanent reinstatement, together with a clear indication of timescale and cost. We take a photographic record of all damage before boarding begins, which forms part of the insurance documentation.

**Out-of-Hours Rates and Insurance**

Emergency callout attendance is priced on a transparent basis: a fixed callout charge covering the first hour of attendance plus travel time within our standard response zones, and an hourly rate thereafter for materials and labour. We provide a call-out attendance report that includes the time of call, time of attendance, work carried out, materials used, and the engineer's assessment of permanent repair requirements. This report is formatted to meet the documentation requirements of most commercial property insurers.

We work directly with loss adjusters and claims handlers for major commercial property insurers, and our emergency documentation is structured to facilitate rapid claims authorisation for emergency board-up and temporary security measures.

**Preventive Measures Following an Emergency**

Following an emergency attendance, we will discuss with you whether any changes to the shopfront specification could reduce the risk of a recurrence. Options commonly considered include:

- Upgrading to laminated or security-rated glazing (PAS 24:2022) to provide greater resistance to smash-and-grab attack
- Installing a roller shutter on a previously unprotected frontage
- Specifying a monitoring-grade security grille in addition to the existing shopfront
- Upgrading the locking hardware to a higher security rating

These upgrades can often be included within the permanent repair scope, and where they improve the security specification of the premises, insurers will sometimes contribute to the cost as part of the repair claim.`,
    benefits: [
      {
        title: '24/7 Coverage, 365 Days a Year',
        description:
          'Our emergency line operates every day of the year, including bank holidays, Christmas, and New Year. A qualified engineer, not an answering service, takes your call and dispatches the appropriate resource to your premises.',
      },
      {
        title: 'Rapid Site Securing',
        description:
          'Our engineers carry boarding materials, common shutter parts, and temporary glazing on their vehicles. In most cases, we can make a damaged frontage secure within minutes of arrival, before the permanent repair assessment begins.',
      },
      {
        title: 'Insurance-Ready Documentation',
        description:
          'We provide a full photographic and written record of the damage and the temporary works carried out, formatted to meet the requirements of commercial property insurers and loss adjusters. This reduces the administrative burden on you at a stressful time and accelerates claims settlement.',
      },
      {
        title: 'Seamless Transition to Permanent Repair',
        description:
          'The engineer who attends the emergency carries out the damage assessment and hands this directly to our repairs scheduling team. There is no repetition of information, no second survey visit in most cases, and the permanent repair is programmed as quickly as materials and structural requirements allow.',
      },
    ],
    faqs: [
      {
        question: 'What is your target response time for emergency callouts?',
        answer:
          'We aim to have an engineer on site within two hours of the initial call for premises within major urban areas, and within three to four hours for rural or remote locations. Response times can vary depending on the volume of concurrent callouts and the engineer\'s location at the time of the call. We provide a confirmed estimated arrival time when we dispatch the engineer and update you if circumstances change.',
      },
      {
        question: 'Do you charge a callout fee on top of the repair costs?',
        answer:
          'Yes. Our emergency service pricing is transparent: there is a fixed callout charge that covers the first hour of attendance and travel within standard response zones. All work carried out beyond the first hour is charged at an hourly labour rate, and materials are charged at cost plus a handling margin. We provide a full breakdown on the attendance report, which forms the basis of any insurance claim for the emergency attendance.',
      },
      {
        question: 'Will my insurance cover the cost of emergency boarding?',
        answer:
          'Most commercial property insurance policies cover the cost of emergency board-up and temporary security measures following an insured event (vandalism, vehicle impact, burglary). The emergency attendance report we provide — including timestamped photographs of the damage and an itemised record of the work carried out — is specifically structured to facilitate insurance claim submission. We recommend notifying your insurer at the same time as you call us, as some policies require prompt notification.',
      },
      {
        question: 'Can you also board up domestic properties or is this a commercial-only service?',
        answer:
          'Our primary focus is commercial premises — retail, hospitality, industrial, and multi-occupancy commercial buildings. We can provide emergency boarding for mixed-use buildings (e.g. a ground-floor retail unit with residential above) and for commercial elements of residential developments. For purely domestic boarding requirements, we recommend contacting a specialist domestic glazier or a general emergency property maintenance service.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Emergency Call',
        description:
          'Call our emergency line on 07414 779594. We are available 24 hours a day, 7 days a week. Let us know the nature of the damage and the property address.',
      },
      {
        step: 2,
        title: 'Rapid Response',
        description:
          'We aim to have an engineer on site within 1 to 2 hours of your call, depending on your location. Our emergency vehicles carry boarding materials, temporary securing equipment, and essential tools.',
      },
      {
        step: 3,
        title: 'Make Safe',
        description:
          'We board up broken glazing, secure damaged doors, or temporarily fix shutters to ensure the premises is safe and weather-tight. Any broken glass is cleared and disposed of safely.',
      },
      {
        step: 4,
        title: 'Permanent Repair Arrangement',
        description:
          'Once the premises is secured, we assess the permanent repair requirements and provide a quotation. For insurance claims, we document the damage with photographs and a written report.',
      },
    ],
    pricingGuide: {
      heading: 'What Does an Emergency Callout Cost?',
      content:
        'Emergency callout pricing includes a fixed attendance fee covering the first hour on site, plus materials used for temporary securing. Out-of-hours callouts between 6pm and 8am, and weekends and bank holidays, incur a surcharge.',
      ranges: [
        { item: 'Emergency callout fee (first hour)', price: '£150 – £250' },
        { item: 'Out-of-hours surcharge', price: '£75 – £150' },
        { item: 'Emergency boarding (per panel)', price: '£150 – £350' },
        { item: 'Temporary shutter securing', price: '£200 – £400' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'How fast can you get to my premises in an emergency?',
        answer:
          'We aim to arrive within 1 to 2 hours of your call for most locations across our service area. Response times may be slightly longer for remote locations or during periods of extreme demand. When you call, we will give you a realistic arrival estimate based on your location and our current availability.',
      },
      {
        question: 'Do you provide emergency callouts on weekends and bank holidays?',
        answer:
          'Yes. Our emergency callout service operates 24 hours a day, 365 days a year, including weekends, bank holidays, and Christmas. An out-of-hours surcharge applies for callouts outside standard working hours, which we will confirm before attending.',
      },
      {
        question: 'Can you help with insurance claims after emergency damage?',
        answer:
          'Yes. We document all emergency work with dated photographs, a written description of the damage, and an itemised invoice that insurers accept. We can also provide a separate quotation for the permanent repair and liaise directly with your insurer or loss adjuster if that would be helpful.',
      },
      {
        question: 'What should I do if my shopfront is smashed overnight?',
        answer:
          'Call us immediately on 07414 779594 and, if there is a security risk, also contact the police. Do not attempt to clear broken glass yourself. We will attend, make the premises safe, board up the opening, and advise on the next steps for permanent repair.',
      },
    ],
    relatedServices: ['shopfront-repairs', 'roller-shutters', 'security-doors', 'aluminium-shopfronts'],
  },

  {
    slug: 'shutter-repair',
    name: 'Shutter Repair',
    shortDescription:
      'Fast, professional roller shutter repairs across the UK. Jammed shutters, broken springs, motor failure, damaged laths, and bent guides diagnosed and fixed — often on the same day.',
    heroImage: 'roller-shutter-evening-1.jpeg',
    primaryKeyword: 'roller shutter repair',
    metaTitle: 'Roller Shutter Repair | Fast UK-Wide Service',
    metaDescription:
      'Expert roller shutter repair service across the UK. Spring replacement, motor repair, curtain damage, jammed mechanisms. Fast response, DHF-compliant work.',
    description: `Roller shutters are built to withstand years of daily use, but like any mechanical assembly they are subject to wear, fatigue, and occasional failure. When a shutter jams, refuses to close, or operates erratically, the security of your premises is immediately compromised — and every hour of delay increases the risk of opportunistic theft, weather damage, or business disruption.

Sigma Shop Fronts provides a dedicated roller shutter repair service covering the full spectrum of mechanical, electrical, and structural faults. Our engineers carry the most commonly needed parts — springs, motor components, replacement laths, guide rail sections, and locking hardware — to enable same-day repair in the majority of cases.

**Common Shutter Failure Types**

Roller shutter faults generally fall into one of five categories, and understanding which type of failure has occurred is the first step towards an efficient repair.

*Spring failure* is the single most common mechanical fault on manually operated and spring-assisted shutters. The torsion spring that counterbalances the weight of the curtain is under constant tension and gradually loses its resilience through thousands of operating cycles. Eventually the spring fractures — usually with an audible snap — leaving the curtain extremely heavy to lift manually and, in some cases, causing it to drop uncontrollably. A broken spring is a safety hazard and must be addressed immediately.

*Motor burnout* affects electrically operated shutters and is typically caused by overloading, repeated stalling against an obstruction, voltage irregularities, or simple age-related insulation breakdown. Symptoms include the motor humming but not turning, intermittent operation, a burning smell from the motor housing, or the thermal overload tripping repeatedly. In some cases the motor can be repaired by replacing the capacitor or brushes; in others, a complete motor replacement is the most cost-effective solution.

*Damaged laths* — the interlocking horizontal slats that form the shutter curtain — are commonly caused by vehicle impact, attempted forced entry, or storm damage. A single bent or buckled lath can prevent the curtain from tracking smoothly in the guides, causing it to jam partway through its travel. If left unrepaired, a damaged lath transfers stress to adjacent laths during operation, accelerating wear across the entire curtain.

*Bent or displaced guide rails* prevent the curtain from running freely between its side channels. Guide rail damage is usually the result of impact — a delivery vehicle reversing into the shutter face, for example — and manifests as the curtain binding, jumping out of the guides, or refusing to close fully on one side.

*Jammed mechanisms* can result from a combination of factors: accumulated dirt and debris in the guides, corrosion of the barrel or end plates, a displaced curtain wrap on the barrel, or a failed limit switch on a motorised shutter that allows the curtain to over-travel and bind against the housing box.

**Diagnostic Process**

When our engineer arrives on site, the first step is a systematic diagnosis. We inspect the curtain for visible damage, check the guide rails for alignment, examine the barrel and spring assembly (where safely accessible), test the motor and control circuit on electric shutters, and operate the shutter through a full cycle to identify the point of failure. This structured approach avoids the common pitfall of treating symptoms rather than root causes — replacing a motor, for example, when the actual problem is a seized barrel bearing that caused the motor to overload and fail.

We provide a clear verbal and written diagnosis before commencing any repair, including an explanation of what has failed, why, and what the repair involves. If the repair cost approaches or exceeds the replacement value of the shutter, we will advise you honestly and provide a comparative quotation.

**Spring Replacement**

Spring replacement is a specialist task that must not be attempted by unqualified personnel. Torsion springs store a significant amount of energy when wound, and an uncontrolled release during removal can cause serious injury. Our engineers use controlled decompression tools and follow the safety procedures recommended by the Door and Hardware Federation (DHF).

We carry the most common spring sizes and configurations on our vehicles, covering the majority of commercial shutter makes encountered in the UK market. Where a non-standard spring is required, we can source and fit it within one to three working days. All replacement springs are rated to match or exceed the original specification, and we re-tension the new spring to the correct number of turns for the curtain weight, ensuring smooth and balanced operation.

**Motor Repair vs Replacement**

When a shutter motor fails, the decision between repair and replacement depends on the nature of the fault, the age of the motor, and the availability of spare parts. Minor electrical faults — a failed start capacitor, worn carbon brushes, or a tripped thermal overload — can often be repaired on site within an hour. Where the motor winding has burned out or the gearbox has failed, replacement is usually more cost-effective and provides the reassurance of a new manufacturer warranty.

We fit replacement motors from established manufacturers including Somfy, Simu, and Came, and match the motor torque rating to the curtain weight and operating cycle requirements. All motor replacements include testing of the safety edge, limit switches, and manual override mechanism in accordance with the DHF Code of Practice for industrial and commercial doors.

**Curtain Lath Replacement**

Individual damaged laths can be removed and replaced without dismantling the entire curtain in most shutter designs. We identify the lath profile, source a matching replacement, and fit it on site. For steel curtains, lath replacement involves disconnecting the damaged section from its neighbours, sliding it out of the guide rails, and fitting the new lath into the same position. Aluminium curtain repairs follow a similar process.

Where multiple laths are damaged or where the curtain profile is obsolete, it may be more practical and cost-effective to replace the entire curtain within the existing housing box and guide rails. We assess this on site and advise accordingly.

**Guide Rail Straightening and Replacement**

Bent guide rails can sometimes be straightened in situ using hydraulic pressing tools, restoring the channel to its correct profile without the need for full replacement. Where the deformation is severe or the guide rail has been pulled away from its fixings, replacement is necessary. We fabricate replacement guide rail sections to match the existing profile and finish, and fix them into the masonry or steelwork reveal using heavy-duty anchors.

**Emergency Shutter Repair**

A shutter stuck in the open position is a security emergency. Sigma Shop Fronts provides emergency shutter repair as part of our 24/7 callout service. Our engineers can attend at any hour to diagnose and, where possible, repair the fault on site. If the repair requires parts that are not immediately available, we will secure the shutter in the closed position using temporary clamps or padlocks and arrange the permanent repair at the earliest opportunity.

**Preventive Maintenance**

The DHF recommends that all power-operated doors, including roller shutters, are inspected and serviced at least annually by a competent person. Regular maintenance extends the service life of every component, reduces the likelihood of unexpected failures, and ensures that safety devices — limit switches, safety edges, photocells, and manual overrides — are functioning correctly.

Our shutter maintenance programme includes lubrication of all moving parts, inspection and tensioning of springs, testing of motor current draw against the manufacturer's specification, verification of safety device function, and a written report recording the condition of each component. This report provides documented evidence that the shutter is being maintained in accordance with the DHF guidelines and the requirements of the Machinery Directive (retained in UK law as the Supply of Machinery (Safety) Regulations 2008).`,
    benefits: [
      {
        title: 'Same-Day Repair in Most Cases',
        description:
          'Our engineers carry common springs, motor components, and replacement laths on their vehicles. The majority of roller shutter faults are diagnosed and repaired during a single visit, minimising downtime and restoring security to your premises the same day.',
      },
      {
        title: 'DHF-Compliant Workmanship',
        description:
          'All repair work is carried out in accordance with the Door and Hardware Federation Code of Practice. Safety edges, limit switches, and manual overrides are tested after every repair, and a written completion record is provided for your maintenance file.',
      },
      {
        title: 'Transparent Diagnosis Before Repair',
        description:
          'We explain what has failed and why before any work begins, and provide a clear cost estimate. If the repair cost approaches the replacement value of the shutter, we advise you honestly and offer a comparative quotation for a new installation.',
      },
      {
        title: 'All Makes and Models Covered',
        description:
          'We repair roller shutters from all manufacturers, not just shutters we originally installed. Our engineers are experienced with the full range of commercial shutter systems encountered in the UK market, including older and discontinued models.',
      },
    ],
    faqs: [
      {
        question: 'How quickly can you attend a shutter repair?',
        answer:
          'For emergency repairs — a shutter stuck open or a spring that has snapped — we aim to attend within two to four hours during normal working hours, and the same evening or early the next morning for out-of-hours calls. Non-urgent repairs are typically scheduled within two to three working days. Contact us on 07414 779594 for immediate assistance.',
      },
      {
        question: 'Can you repair a shutter that was installed by a different company?',
        answer:
          'Yes. We repair roller shutters regardless of who originally supplied and installed them. Our engineers carry parts and tools covering the most common shutter makes and configurations in the UK market. For less common or older systems, we may need to source specific components, which can add one to two working days to the repair timeline.',
      },
      {
        question: 'How do I know whether my shutter needs a spring replacement or a motor repair?',
        answer:
          'If your manually operated shutter has suddenly become very heavy to lift, or if it dropped unexpectedly, the most likely cause is a broken torsion spring. If your electric shutter hums but does not move, operates intermittently, or trips its circuit breaker, the motor or its control circuit is the probable cause. Our engineers carry out a full diagnostic on arrival and will explain the findings before starting any work.',
      },
      {
        question: 'Is it worth repairing an old roller shutter or should I replace it?',
        answer:
          'This depends on the nature and extent of the damage, the age of the shutter, and the availability of replacement parts. As a general rule, if the housing box, barrel, and guide rails are structurally sound, repairing or replacing individual components (springs, motors, curtain laths) is more cost-effective than a full replacement. If the shutter has multiple faults, extensive corrosion, or uses an obsolete profile that cannot be matched, replacement is usually the better investment. We assess each case individually and provide honest advice.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Report the Fault',
        description:
          'Contact us by phone on 07414 779594 or through our website. Describe the symptoms — stuck, noisy, won\'t open, won\'t close — so we can prepare the right parts and tools.',
      },
      {
        step: 2,
        title: 'Diagnostic Visit',
        description:
          'Our engineer visits to diagnose the fault, inspecting the motor, springs, curtain laths, guide rails, and safety devices. We identify the root cause and check for any secondary issues.',
      },
      {
        step: 3,
        title: 'Repair Quotation',
        description:
          'We provide a clear quotation for the repair, detailing the parts required and labour involved. If the shutter is beyond economical repair, we advise on replacement options with comparative costs.',
      },
      {
        step: 4,
        title: 'Repair & Testing',
        description:
          'Once approved, we carry out the repair, replacing worn or damaged components with quality parts. The shutter is tested through multiple full cycles and all safety devices are checked before we leave.',
      },
    ],
    pricingGuide: {
      heading: 'What Does a Shutter Repair Cost?',
      content:
        'Shutter repair costs depend on the type of fault and the parts required. Common repairs include spring replacement, motor replacement, and damaged lath sections. We carry many standard parts on our service vehicles to allow same-day repair where possible.',
      ranges: [
        { item: 'Spring replacement', price: '£180 – £350' },
        { item: 'Motor replacement', price: '£400 – £800' },
        { item: 'Single lath replacement', price: '£80 – £200' },
        { item: 'Guide rail straightening', price: '£200 – £500' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'Why is my roller shutter stuck halfway?',
        answer:
          'A shutter stuck in a partially open position is usually caused by a broken spring, a faulty motor, or a curtain lath that has jumped out of the guide rail. Do not attempt to force the shutter open or closed, as this can cause further damage. Call us and we will diagnose and repair the fault safely.',
      },
      {
        question: 'How long does a shutter repair typically take?',
        answer:
          'Most common repairs, such as spring or motor replacement, are completed within two to four hours on a single visit. If specialist parts need to be ordered, we will make the shutter safe and operational on a temporary basis where possible, then return to fit the replacement parts once they arrive.',
      },
      {
        question: 'Can you repair any brand of roller shutter?',
        answer:
          'Yes. We repair all major brands and types of roller shutter, including steel, aluminium, and fire-rated systems. Our engineers carry a wide range of universal components and have access to manufacturer-specific parts for all common systems installed in the UK.',
      },
      {
        question: 'My shutter motor is making a grinding noise — what does that mean?',
        answer:
          'A grinding noise from the motor usually indicates worn gears, a failing capacitor, or debris in the mechanism. Continuing to operate the shutter can cause further damage to the motor and potentially the curtain. We recommend stopping use and calling us for a diagnostic inspection before the fault escalates.',
      },
    ],
    relatedServices: ['roller-shutters', 'shopfront-repairs', 'emergency-callout', 'security-doors'],
  },

  {
    slug: 'glass-replacement',
    name: 'Glass Replacement',
    shortDescription:
      'Commercial glass replacement for shopfronts and commercial premises. Toughened safety glass, laminated security glass, double-glazed units, and specialist glazing — measured, specified, and installed to BS 6262.',
    heroImage: 'aluminium-shopfront-1.jpeg',
    primaryKeyword: 'commercial glass replacement',
    metaTitle: 'Glass Replacement UK | Shopfront Glazing',
    metaDescription:
      'Commercial glass replacement for shopfronts and premises. Toughened safety glass, laminated, DGUs, PAS 24 security glazing. Fast turnaround. UK-wide service.',
    description: `Glass is the defining element of any commercial shopfront. It provides visibility, natural light, and street presence — but it is also the most vulnerable component of the building envelope. Whether the damage is caused by vandalism, accidental impact, attempted burglary, storm debris, or the gradual failure of a sealed double-glazed unit, the result is the same: a compromised frontage that affects security, weather protection, energy performance, and the professional appearance of your premises.

Sigma Shop Fronts provides a comprehensive commercial glass replacement service covering the full range of glazing types used in modern shopfront, curtain wall, and commercial entrance systems. We measure, specify, source, and install replacement glass to the correct standard — not simply the nearest available alternative — ensuring that the repaired installation performs exactly as the original was designed to.

**Types of Commercial Glass**

Commercial glazing is not a single product — it is a family of glass types, each engineered for a specific performance requirement. Understanding the differences is essential to specifying the correct replacement.

*Toughened safety glass* (also called tempered glass) is the baseline specification for all commercial shopfront glazing. Manufactured by heating float glass to approximately 620°C and then rapidly cooling it, toughening increases the mechanical strength of the glass by a factor of four to five and changes its fracture behaviour: when broken, toughened glass fragments into small, relatively harmless granules rather than large dangerous shards. All toughened glass installed in commercial premises must comply with BS EN 12150-1 and carry the permanent etch mark identifying the manufacturer, standard, and thickness.

*Laminated glass* consists of two or more layers of glass bonded together with a polyvinyl butyral (PVB) or ethylene-vinyl acetate (EVA) interlayer. When broken, the interlayer holds the fragments in place, maintaining a barrier even after fracture. Laminated glass is specified where post-breakage retention is important — anti-bandit glazing, overhead glazing where falling glass would be hazardous, and acoustic attenuation applications. Laminated safety glass is manufactured and tested to BS EN ISO 12543.

*Double-glazed units (DGUs)*, also known as insulated glass units (IGUs), consist of two panes of glass separated by a sealed air or gas-filled cavity. The cavity — typically 12 mm to 20 mm wide and filled with argon or krypton for enhanced thermal performance — dramatically reduces heat transfer through the glazing. DGUs are essential for compliance with Building Regulations Part L (Conservation of Fuel and Power) in any new or replacement commercial glazing installation. Centre-pane U-values for standard argon-filled DGUs typically fall between 1.0 and 1.4 W/m²K depending on the glass specification and coating.

*Security-rated glass* is specified where the glazing must resist physical attack. PAS 24:2022 is the standard most commonly referenced by commercial insurers and specifiers for enhanced security performance of windows and doors. Glazing that forms part of a PAS 24 assembly is typically laminated with a thicker interlayer (0.76 mm or 1.52 mm PVB) and is tested as a complete assembly — glass, frame, and hardware together — rather than as an individual component.

**When Glass Replacement Is Needed**

The most common triggers for commercial glass replacement are:

*Vandalism and criminal damage* — deliberate breakage of shopfront glass remains one of the most frequent causes of emergency glazing work. Toughened glass shatters completely on impact, leaving an open aperture that must be boarded and then re-glazed. Laminated glass, by contrast, cracks but remains largely in the frame, which is one reason insurers increasingly recommend it for high-risk frontages.

*Accidental impact* — delivery vehicles, shopping trolleys, construction debris, and storm-borne objects all cause accidental glass breakage in commercial environments. The extent of damage determines whether a single panel replacement or a more extensive repair is needed.

*Failed seals on double-glazed units* — when the perimeter seal of a DGU fails, moisture-laden air enters the cavity and condenses on the inner glass surfaces. The resulting misting or fogging is irreversible without replacing the entire sealed unit. Failed DGUs also lose their thermal insulation performance, as the inert gas fill escapes and is replaced by air.

*Misting DGUs* — a subset of seal failure, misting units are visually obvious and commercially damaging. A misted shopfront window looks neglected and undermines customer confidence. Replacement of the sealed unit — not just cleaning — is the only effective remedy.

**Measurement and Specification Process**

Correct measurement and specification are critical. Commercial glass panels are not interchangeable — each unit is manufactured to precise dimensions, and the glass type, thickness, make-up, coatings, and spacer bar specification must be correctly identified to produce a replacement that fits the existing frame and meets the required performance standard.

Our process begins with a site visit to measure the glazed opening and identify the existing glass specification. For toughened glass, the BS EN 12150 etch mark on the original pane provides the manufacturer, thickness, and standard. For DGUs, we identify the spacer bar type and width, the glass make-up (e.g. 6 mm toughened outer / 16 mm argon cavity / 6.4 mm laminated inner), and any low-emissivity coatings. Where the original specification cannot be determined from markings — for example, if the glass has shattered completely — we refer to the original shopfront installer's records or specify a replacement based on the frame rebate depth and the applicable standards.

**BS 6262 Compliance**

All glass replacement work carried out by Sigma Shop Fronts complies with BS 6262, the British Standard code of practice for glazing in buildings. BS 6262 covers the selection of glass types appropriate to the location and use, the assessment of human impact risk (critical locations as defined in the standard), wind loading calculations for large panels, and the correct method of glazing into the frame system.

For glazing in critical locations — defined in BS 6262 Part 4 as areas below 800 mm from floor level in doors and below 800 mm from floor level in side panels within 300 mm of a door — safety glass (toughened or laminated) is mandatory. We verify that all replacement glazing in critical locations meets this requirement.

**Safety Glass Regulations**

Two principal standards govern the safety performance of glass used in commercial buildings. BS EN 12150-1 specifies the requirements for thermally toughened soda-lime-silicate safety glass, including the fragmentation pattern test that determines whether the glass breaks safely. BS EN ISO 12543 covers laminated glass and laminated safety glass, specifying the interlayer type, thickness, and the performance requirements for impact resistance and post-breakage behaviour.

The Building Regulations (Approved Document K in England and Wales, Section 4 in Scotland) require that glazing in critical locations — doors, side panels adjacent to doors, and low-level glazing — uses safety glass conforming to BS EN 12600, which classifies glass by its impact resistance performance. We ensure that all replacement glass in these locations is correctly classified and documented.

**Emergency Boarding Before Replacement**

When glass breakage leaves your premises unsecured, immediate boarding is essential. Sigma Shop Fronts provides emergency boarding as part of our 24/7 callout service. Our engineers attend with heavy-duty plywood or polycarbonate boarding material and secure the opening within the existing frame using screws or, where necessary, rawl-plugged fixings into the masonry reveal.

The boarding is designed to be weather-resistant and visually acceptable for the period between the emergency and the permanent glass installation — typically 24 to 72 hours for standard toughened glass, and three to seven working days for DGUs, laminated, or specialist specifications.

We photograph all damage before boarding begins, providing a timestamped record that supports insurance claims and demonstrates the condition of the premises at the time of our attendance.

**Turnaround Times**

Standard toughened glass panels in common thicknesses (6 mm, 8 mm, 10 mm, 12 mm) are typically available within 24 to 48 hours from our glazing supply network. Sealed double-glazed units require manufacturing to the specific dimensions and specification and are usually available within three to five working days. Laminated glass, specialist coated glass, and large-format panels (over 2.5 m in any dimension) may require five to ten working days depending on the specification and the manufacturer's production schedule.

We communicate expected lead times clearly at the point of order and keep you informed of progress. Where a faster turnaround is critical — for example, a ground-floor retail unit with temporary boarding — we can request priority manufacturing from our supply partners, subject to a surcharge.`,
    benefits: [
      {
        title: 'Correct Specification, Not Just the Nearest Fit',
        description:
          'We identify the exact glass type, thickness, make-up, and coatings of the original installation and specify a replacement to match. This ensures the repaired glazing meets the same thermal, safety, security, and acoustic performance as the original — not a lower standard.',
      },
      {
        title: 'BS 6262 Compliant Installation',
        description:
          'All glass replacement work is carried out in accordance with BS 6262, the British Standard for glazing in buildings. We verify safety glass compliance in all critical locations and provide a works completion record documenting the glass specification installed.',
      },
      {
        title: 'Emergency Boarding Within Hours',
        description:
          'If your glass is broken and your premises are exposed, we can attend the same day to install secure temporary boarding. This protects against further damage, theft, and weather ingress while the permanent replacement glass is manufactured and delivered.',
      },
      {
        title: 'Insurance Documentation as Standard',
        description:
          'We provide timestamped photographs of all damage, a detailed specification of the replacement glass, and an itemised invoice formatted to meet the requirements of commercial property insurers and loss adjusters. This reduces your administrative burden and accelerates claims settlement.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to replace a broken shopfront window?',
        answer:
          'For standard toughened glass in common thicknesses, we can typically source and install a replacement within 24 to 48 hours of measurement. Sealed double-glazed units require three to five working days for manufacture. Laminated, security-rated, or large-format glass may take five to ten working days. In all cases, we can install emergency boarding within hours to secure the premises until the permanent glass is ready.',
      },
      {
        question: 'Can you replace just the glass without replacing the entire shopfront frame?',
        answer:
          'In most cases, yes. If the aluminium or steel frame is undamaged and structurally sound, we remove the broken glass, clean the frame rebates, and install the replacement pane with new gaskets and weather seals. This is significantly less expensive and disruptive than a full shopfront replacement. If we find frame damage during the glass removal, we will advise you before proceeding.',
      },
      {
        question: 'My double-glazed unit is misted — can it be repaired without replacement?',
        answer:
          'Unfortunately not. Misting in a double-glazed unit indicates that the perimeter seal has failed, allowing moist air into the cavity. The moisture condenses on the inner glass surfaces and cannot be removed by cleaning. The only effective remedy is to replace the entire sealed unit with a new one manufactured to the correct specification. We measure and order the replacement DGU and install it with minimal disruption.',
      },
      {
        question: 'Do I need safety glass in my shopfront?',
        answer:
          'Yes. Under the Building Regulations (Approved Document K) and BS 6262, all glazing in critical locations — which includes doors, side panels within 300 mm of a door, and any glazing below 800 mm from floor level — must use safety glass conforming to BS EN 12600. For most commercial shopfronts, toughened safety glass to BS EN 12150-1 is the minimum specification. We verify compliance for every panel we replace and can advise on whether an upgrade to laminated or security-rated glass is appropriate for your situation.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Report the Damage',
        description:
          'Contact us with details of the broken or damaged glass. If possible, send photographs showing the affected panel and the surrounding frame so we can prepare an accurate specification.',
      },
      {
        step: 2,
        title: 'Survey & Measurement',
        description:
          'Our surveyor visits to measure the glass aperture, identify the glass type and specification, and assess the condition of the frame and glazing beads. For emergency situations, we board up the opening at the same visit.',
      },
      {
        step: 3,
        title: 'Glass Specification & Quote',
        description:
          'We specify the replacement glass to match or upgrade the original — toughened, laminated, double-glazed, or specialist security glass — and provide a fixed-price quotation.',
      },
      {
        step: 4,
        title: 'Replacement & Fitting',
        description:
          'The replacement glass is manufactured to the surveyed dimensions and installed by our glazing team. We fit new seals and beading where required and ensure the finished installation is watertight and secure.',
      },
    ],
    pricingGuide: {
      heading: 'What Does Glass Replacement Cost?',
      content:
        'Glass replacement pricing depends on the glass type, size, and specification. Toughened safety glass is the standard minimum for commercial premises, with laminated and double-glazed options available for enhanced security and thermal performance.',
      ranges: [
        { item: 'Single toughened pane (up to 2m²)', price: '£200 – £500' },
        { item: 'Double-glazed unit replacement', price: '£350 – £900' },
        { item: 'Laminated security glass', price: '£500 – £1,200' },
        { item: 'Large format panel (3m²+)', price: '£800 – £2,000' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'How long does it take to replace shop window glass?',
        answer:
          'Standard toughened glass can usually be manufactured and installed within two to five working days of the survey. Double-glazed sealed units and specialist glass such as laminated security or acoustic glass typically require five to ten working days. We provide emergency boarding to keep the premises secure in the meantime.',
      },
      {
        question: 'What is the difference between toughened and laminated glass?',
        answer:
          'Toughened glass is heat-treated to be approximately four to five times stronger than standard glass and breaks into small, relatively harmless pieces. Laminated glass consists of two or more layers bonded with a plastic interlayer — when broken, the fragments adhere to the interlayer, maintaining a barrier. Laminated glass is preferred where security or safety retention is critical.',
      },
      {
        question: 'Can you replace just one panel in a double-glazed unit?',
        answer:
          'No. A double-glazed unit is a sealed assembly, so if one pane is broken or the seal has failed, the entire unit must be replaced. We manufacture replacement sealed units to match the original dimensions and specification, ensuring compatibility with your existing frame.',
      },
      {
        question: 'Do I need to upgrade my glass to meet current Building Regulations?',
        answer:
          'If the replacement is like-for-like, Building Regulations do not typically require an upgrade. However, if the work is part of a larger renovation or if the existing glass does not meet current safety standards (BS EN 12150 for toughened glass), it may be advisable or required to upgrade. We will advise on the regulatory position during the survey.',
      },
    ],
    relatedServices: ['shopfront-repairs', 'aluminium-shopfronts', 'emergency-callout', 'automatic-doors'],
  },

  {
    slug: 'aluminium-doors',
    name: 'Aluminium Doors',
    shortDescription:
      'Commercial aluminium entrance doors for retail, office, and industrial premises. Thermally broken profiles, PAS 24 security options, DDA-compliant thresholds, and a full RAL colour range.',
    heroImage: 'aluminium-shopfront-1.jpeg',
    primaryKeyword: 'aluminium doors commercial',
    metaTitle: 'Aluminium Doors UK | Commercial Supply & Install',
    metaDescription:
      'Commercial aluminium door installation across the UK. Thermally broken frames, PAS 24 security, DDA-compliant. Hinged, pivot & double leaf options. Free survey.',
    description: `Aluminium doors are the standard entrance solution for commercial buildings across the UK, from high-street retail units and office reception areas to warehouses, schools, and healthcare facilities. When correctly specified, an aluminium entrance door delivers the combination of structural strength, slim sightlines, weather resistance, and design versatility that commercial environments demand — at a price point that makes economic sense over a 25-year service life.

Sigma Shop Fronts supplies and installs commercial aluminium doors as standalone entrance systems and as integrated elements within larger shopfront, curtain walling, and glazed screen installations. We work with hinged, pivot, and double-leaf configurations, using profile systems from leading European fabricators that are independently tested and CE-marked to BS EN 14351-1.

**Door Configurations**

Single-leaf hinged doors are the most common commercial entrance configuration, suitable for offices, individual retail units, and service entrances. Standard commercial door leaf sizes range from 900 mm to 1200 mm in width, with heights up to 2400 mm. For wider openings or premises with high footfall requiring simultaneous two-way traffic, double-leaf (French door) configurations provide a clear opening of 1600 mm to 2400 mm.

Pivot doors — where the leaf rotates on a top-and-bottom pivot rather than side-hung hinges — are specified for large, heavy door leaves (typically over 100 kg) or for architectural effect. Pivot doors require a floor socket and overhead pivot bearing, and the door leaf must be precisely balanced to ensure smooth, effortless operation.

**Thermal Performance**

For commercial buildings subject to Building Regulations Part L (Conservation of Fuel and Power), thermally broken aluminium door frames are required. Our thermally broken profiles incorporate a continuous polyamide insulating strip within the aluminium section, reducing heat transfer through the frame and eliminating the cold-bridging and internal condensation that non-broken frames produce.

Complete door assembly U-values for our thermally broken systems typically range from 1.2 to 1.8 W/m²K depending on the glazing specification, comfortably meeting the elemental U-value targets set out in Approved Document L2 for non-domestic buildings.

**Security Specification**

Commercial entrance doors are frequently a target for forced entry. We offer door sets tested and certified to PAS 24:2022 (Enhanced Security Performance Requirements for Doorsets and Windows), the standard most commonly referenced by commercial insurers. PAS 24 door sets are tested as a complete assembly — frame, leaf, glazing, and hardware together — against a defined series of manual and mechanical attack tests.

Multi-point locking is standard on our commercial aluminium doors, engaging the frame at a minimum of three points. Anti-drill, anti-pick, and anti-bump euro profile cylinders rated to TS 007 three-star are specified as standard, and we can accommodate master-keying and restricted keyway requirements for multi-tenanted buildings.

**Glazing Options**

Aluminium door leaves can be fully glazed, partially glazed with a solid lower panel, or solid with a vision panel. Glazing is typically toughened safety glass to BS EN 12150-1 as a minimum, with laminated or security-rated glass specified for PAS 24 assemblies. For energy performance, double-glazed units with low-emissivity coatings are standard.

**DDA Compliance**

The Equality Act 2010 requires that commercial premises provide accessible entrances. Our aluminium doors are designed with low thresholds (maximum 15 mm upstand), minimum 775 mm clear opening width as standard (extendable to 900 mm or beyond), and lever handle furniture at accessible heights in accordance with BS 8300. Where automatic operation is required, our doors can be fitted with swing-door operators to provide powered opening — see our automatic doors service for details.

**Powder Coating and Finish**

All aluminium door sections are powder-coated to BS EN 12206-1 in any RAL Classic or RAL Design colour. Our standard guarantee covers colour retention and adhesion for 10 years under normal UK exposure conditions. Dual-colour finishes — a different colour on the internal and external faces — are available for premises where the interior colour scheme differs from the external branding.`,
    benefits: [
      {
        title: 'Slim Sightlines with Maximum Glass Area',
        description:
          'Aluminium door profiles are significantly narrower than timber or PVC-U equivalents, maximising the glazed area and natural light entering the premises while maintaining full structural integrity and weather performance.',
      },
      {
        title: 'PAS 24 Security Certification Available',
        description:
          'Our PAS 24:2022 certified door sets provide independently verified resistance to forced entry, satisfying the security requirements of commercial insurers and giving building owners documented evidence of enhanced protection.',
      },
      {
        title: 'Thermally Broken for Building Regulations Compliance',
        description:
          'Thermally broken aluminium profiles meet the U-value requirements of Building Regulations Part L for non-domestic buildings, ensuring energy compliance without compromising the structural performance or slim aesthetic of the door.',
      },
      {
        title: '25+ Year Service Life',
        description:
          'Aluminium does not rust, rot, or warp. A correctly installed aluminium door requires only periodic cleaning and occasional hardware maintenance to provide decades of reliable daily use in a commercial environment.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between an aluminium door and an aluminium shopfront?',
        answer:
          'An aluminium door is a standalone entrance assembly — leaf, frame, threshold, and hardware — designed to fit within a structural opening. An aluminium shopfront is a complete glazed facade system incorporating fixed glass panels, transoms, mullions, and one or more entrance doors as integrated elements. We supply and install both: standalone aluminium doors for individual entrances, and full shopfront systems where the door is part of a larger glazed frontage.',
      },
      {
        question: 'Can you replace a timber or PVC-U door with an aluminium one?',
        answer:
          'Yes. Aluminium doors can be installed into existing structural openings previously occupied by timber or PVC-U doors. The aluminium frame is fixed directly into the masonry or concrete reveal, and the threshold detail is coordinated with the existing floor level. In most cases, the swap can be completed within one working day.',
      },
      {
        question: 'Do aluminium doors need regular maintenance?',
        answer:
          'Aluminium doors require minimal maintenance compared to timber. We recommend cleaning the frame and leaf with a mild detergent solution every three months to remove dirt and pollutants, lubricating the hinges and locking mechanism with a dry PTFE spray every six months, and carrying out an annual function check of the closer, seals, and weather stripping. This routine will keep the door operating smoothly for its full service life.',
      },
      {
        question: 'How much does a commercial aluminium door cost?',
        answer:
          'A standard single-leaf commercial aluminium door, fully glazed with toughened glass and multi-point locking, typically costs between £1,200 and £2,800 installed, depending on the frame profile, thermal break specification, and hardware. Double-leaf and PAS 24 certified configurations are priced higher. We provide fixed-price quotations after a site survey.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Enquiry & Consultation',
        description:
          'Contact us with your requirements — single or double leaf, security rating, thermal specification, and colour preference. We advise on the most suitable configuration for your premises.',
      },
      {
        step: 2,
        title: 'Site Survey',
        description:
          'Our surveyor measures the structural opening, checks floor levels and threshold details, and notes any DDA or fire compliance requirements that affect the door specification.',
      },
      {
        step: 3,
        title: 'Specification & Quote',
        description:
          'We specify the frame profile, glazing, hardware, and finish, then provide a fixed-price quotation with technical drawings for your approval.',
      },
      {
        step: 4,
        title: 'Fabrication & Installation',
        description:
          'The door is fabricated to the surveyed dimensions and installed by our team, typically within one working day. All hardware is adjusted and demonstrated on completion.',
      },
    ],
    pricingGuide: {
      heading: 'What Does an Aluminium Door Cost?',
      content:
        'Aluminium door pricing depends on the leaf configuration, thermal break specification, glazing type, and security rating. Below are typical installed prices for common configurations.',
      ranges: [
        { item: 'Single leaf hinged door', price: '£1,200 – £2,800' },
        { item: 'Double leaf entrance', price: '£2,500 – £5,000' },
        { item: 'PAS 24 certified door set', price: '£2,800 – £5,500' },
        { item: 'Pivot door (architectural)', price: '£3,000 – £6,000' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'Are aluminium doors better than PVC-U for commercial use?',
        answer:
          'Yes, for most commercial applications. Aluminium offers significantly greater structural strength, allowing larger door sizes and slimmer frame profiles. It accepts high-security multi-point locking hardware, achieves higher security ratings (PAS 24), and has a longer service life. PVC-U is typically more appropriate for domestic and light commercial use.',
      },
      {
        question: 'Can aluminium doors be made to match existing shopfront colours?',
        answer:
          'Yes. We powder-coat all aluminium doors to any RAL Classic or RAL Design colour, and can match to NCS, BS 4800, or bespoke brand colour references. This ensures a seamless visual match with existing shopfront systems, signage, and branding.',
      },
      {
        question: 'How long does it take to install an aluminium door?',
        answer:
          'A standard single-leaf aluminium door installation is typically completed within one working day, including frame fixing, door hanging, hardware installation, and adjustment. Double-leaf and more complex installations may require a second day.',
      },
      {
        question: 'Do aluminium doors comply with fire regulations?',
        answer:
          'Standard aluminium doors are not fire-rated. Where a fire-rated entrance is required, we specify purpose-designed fire door assemblies tested to BS EN 1634-1. See our fire doors service page for details on FD30, FD60, and FD90 rated options.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'automatic-doors', 'security-doors', 'glass-replacement'],
  },

  {
    slug: 'aluminium-windows',
    name: 'Aluminium Windows',
    shortDescription:
      'Commercial aluminium window systems for retail, office, and industrial premises. Fixed, top-hung, and side-hung configurations with thermally broken frames and toughened safety glazing.',
    heroImage: 'aluminium-shopfront-1.jpeg',
    primaryKeyword: 'aluminium windows commercial',
    metaTitle: 'Aluminium Windows UK | Commercial Installation',
    metaDescription:
      'Commercial aluminium window installation across the UK. Thermally broken frames, toughened glazing, BS 6375 weather rated. Fixed, casement & tilt-and-turn options.',
    description: `Commercial aluminium windows are a core element of modern retail, office, and industrial building envelopes. Whether installed as part of a shopfront system, within a curtain wall assembly, or as standalone window units in a commercial facade, aluminium windows deliver the combination of structural rigidity, slim profiles, large glazed areas, and long-term durability that commercial specifications demand.

Sigma Shop Fronts designs and installs commercial aluminium window systems across the UK, working with fixed-light, top-hung (awning), side-hung (casement), and tilt-and-turn configurations from leading profile fabricators. All our window systems are CE-marked to BS EN 14351-1 and independently tested for air permeability, watertightness, and wind resistance to BS 6375.

**Window Types for Commercial Applications**

*Fixed-light windows* are the most common configuration in shopfront and curtain wall installations. The glass is permanently fixed within the aluminium frame with no opening mechanism, maximising the glazed area and providing the best thermal and acoustic performance. Fixed lights are used for display windows, high-level glazing, and any location where ventilation is provided by other means.

*Top-hung (awning) windows* open outward from the bottom, hinged at the top. This configuration is popular for commercial buildings because it allows ventilation while providing some rain protection when partially open. Top-hung windows are frequently specified above shopfront transoms to provide natural ventilation to the trading floor.

*Side-hung (casement) windows* open outward on side hinges. They provide the maximum opening area for ventilation and are commonly used in office buildings, schools, and healthcare facilities where building regulations require a minimum opening area for purge ventilation.

*Tilt-and-turn windows* offer dual-mode operation: tilting inward from the top for secure ventilation, or swinging inward on side hinges for full opening. This configuration is particularly suitable for upper-floor commercial premises where outward-opening windows present a risk or are restricted by planning conditions.

**Thermal Performance**

All our commercial aluminium windows use thermally broken profiles as standard. The polyamide thermal break within the aluminium section reduces the frame U-value to between 1.5 and 2.5 W/m²K depending on the profile depth. Combined with double-glazed units featuring low-emissivity coatings and argon gas fill, our complete window assemblies achieve overall U-values of 1.2 to 1.6 W/m²K, meeting the requirements of Building Regulations Part L for replacement and new-build commercial glazing.

For projects with demanding energy performance targets — BREEAM-rated buildings, Passivhaus-influenced specifications, or buildings subject to enhanced planning conditions — we can specify triple-glazed units and enhanced thermal break profiles to achieve overall U-values below 1.0 W/m²K.

**Weather Performance**

Commercial windows face the full range of UK weather conditions, including driving rain, sustained wind loads, and rapid temperature changes. Our window systems are tested to BS 6375 for air permeability (Class 4 as standard), watertightness (typically Class 7A or 9A depending on exposure), and wind resistance (Class C5 for most commercial applications).

For buildings in exposed coastal or elevated locations, we specify enhanced weather seals and drainage provisions to ensure the window assembly performs reliably under the higher wind-driven rain loads encountered in these environments.

**Glazing Specification**

All glazing installed in our commercial aluminium windows uses toughened safety glass to BS EN 12150-1 as a minimum. For windows in critical locations — below 800 mm from floor level, as defined in BS 6262 — the glass must meet the impact classification requirements of BS EN 12600.

Double-glazed sealed units are standard for commercial installations, providing thermal insulation, acoustic attenuation, and condensation resistance. We specify low-emissivity coated glass as standard and can accommodate solar-control, acoustic, and privacy glass options to meet specific project requirements.

**Security**

Opening windows in commercial premises are potential entry points for intruders. We offer window assemblies tested to PAS 24:2022 for enhanced security, incorporating multi-point espagnolette locking, shoot-bolt engagement at top and bottom, and security glazing. Lockable restrictors can be specified to limit the opening angle while allowing controlled ventilation — a common requirement for upper-floor offices and healthcare buildings.

**Powder Coat Finish**

All aluminium window sections are powder-coated to BS EN 12206-1 in any RAL Classic or RAL Design colour. Marine-grade powder coat specifications are available for coastal installations where salt exposure demands enhanced corrosion protection.`,
    benefits: [
      {
        title: 'Slim Frames, Maximum Natural Light',
        description:
          'Aluminium window profiles are narrower than timber or PVC-U equivalents, allowing larger glass areas within the same structural opening. This maximises natural daylight penetration — a key requirement for retail display and office working environments.',
      },
      {
        title: 'Thermally Broken for Energy Compliance',
        description:
          'All our commercial aluminium windows use thermally broken profiles as standard, meeting Building Regulations Part L U-value requirements without compromising frame strength or sightline width.',
      },
      {
        title: 'BS 6375 Weather Rated',
        description:
          'Every window system is independently tested for air permeability, watertightness, and wind resistance to BS 6375, providing documented assurance that the installation will perform in the UK climate.',
      },
      {
        title: 'Maintenance-Free Aluminium Construction',
        description:
          'Aluminium does not rot, rust, or warp, and the powder-coat finish requires only periodic cleaning to maintain its appearance. This eliminates the painting and timber treatment cycles that other frame materials demand.',
      },
    ],
    faqs: [
      {
        question: 'Can aluminium windows be installed in an existing shopfront?',
        answer:
          'Yes. Opening aluminium windows — typically top-hung or tilt-and-turn — can be integrated into an existing aluminium shopfront system by replacing a fixed glazed panel with an opening frame. This is a common upgrade for retail units that lack adequate ventilation. We assess compatibility with the existing profile system at the survey stage.',
      },
      {
        question: 'Are aluminium windows energy efficient?',
        answer:
          'Yes. Our thermally broken aluminium windows achieve overall U-values of 1.2 to 1.6 W/m²K with standard double glazing, meeting Building Regulations Part L. With triple glazing and enhanced thermal break profiles, U-values below 1.0 W/m²K are achievable for projects with higher energy performance targets.',
      },
      {
        question: 'What colours are available for aluminium windows?',
        answer:
          'We offer the full RAL Classic and RAL Design range — over 2,500 colours. Dual-colour finishes (different colours inside and outside) are available. Non-standard colours typically add five to seven working days to the lead time.',
      },
      {
        question: 'How long do aluminium windows last?',
        answer:
          'Commercial aluminium windows typically provide 30 to 40 years of reliable service with minimal maintenance. The aluminium frame is inherently corrosion-resistant, and the powder-coat finish is guaranteed for 10 years against fading and peeling under normal UK conditions.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Requirements Discussion',
        description:
          'Contact us to discuss your window requirements — fixed, opening, or a combination — along with ventilation needs, security requirements, and colour preferences.',
      },
      {
        step: 2,
        title: 'Site Survey',
        description:
          'Our surveyor measures each window opening, assesses the structural condition of the reveals, and notes exposure conditions and any planning constraints.',
      },
      {
        step: 3,
        title: 'Specification & Quote',
        description:
          'We specify the frame profile, opening type, glazing, hardware, and colour, then provide a fixed-price quotation with drawings for approval.',
      },
      {
        step: 4,
        title: 'Manufacture & Installation',
        description:
          'Windows are fabricated to the surveyed dimensions and installed by our team. All opening mechanisms, restrictors, and locking hardware are adjusted and demonstrated on completion.',
      },
    ],
    pricingGuide: {
      heading: 'What Do Commercial Aluminium Windows Cost?',
      content:
        'Aluminium window pricing depends on the window size, opening type, glazing specification, and thermal performance requirements. Fixed-light windows are the most economical; opening windows with security hardware carry a premium.',
      ranges: [
        { item: 'Fixed-light window (per m²)', price: '£250 – £500' },
        { item: 'Top-hung opening window', price: '£400 – £900' },
        { item: 'Tilt-and-turn window', price: '£500 – £1,100' },
        { item: 'PAS 24 security window', price: '£700 – £1,400' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'Are aluminium windows better than PVC-U for commercial buildings?',
        answer:
          'For most commercial applications, yes. Aluminium provides greater structural strength, allowing larger window sizes with slimmer frame profiles. It has a longer service life, accepts higher-security hardware, and is fully recyclable. PVC-U is more appropriate for domestic and light-duty commercial use.',
      },
      {
        question: 'Can aluminium windows be double or triple glazed?',
        answer:
          'Yes. Double glazing is standard on all our commercial aluminium windows. Triple glazing is available for projects requiring enhanced thermal or acoustic performance. Our frame profiles accommodate sealed units from 24 mm to 44 mm in total thickness.',
      },
      {
        question: 'Do aluminium windows need planning permission?',
        answer:
          'Like-for-like replacement of existing windows does not normally require planning permission. However, changes to window size, position, or style in conservation areas or on listed buildings may need planning approval. We advise on the planning position at the survey stage.',
      },
      {
        question: 'How are aluminium windows secured against break-in?',
        answer:
          'Our commercial aluminium windows feature multi-point espagnolette locking with shoot bolts at top and bottom. For enhanced security, we offer PAS 24:2022 certified window assemblies with security glazing and reinforced frame profiles, meeting the requirements of most commercial insurers.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'aluminium-doors', 'glass-replacement', 'curtain-walling'],
  },

  {
    slug: 'curtain-walling',
    name: 'Curtain Walling',
    shortDescription:
      'Aluminium curtain wall systems for commercial facades. Stick-built and unitised solutions with structural glazing, thermally broken mullions, and full weather testing to BS EN 13830.',
    heroImage: 'sigma-front-wide.jpeg',
    primaryKeyword: 'curtain walling UK',
    metaTitle: 'Curtain Walling UK | Aluminium Facade Systems',
    metaDescription:
      'Aluminium curtain walling design and installation for commercial buildings. Stick-built & unitised systems, structural glazing, BS EN 13830 tested. UK-wide service.',
    description: `Curtain walling is a non-load-bearing facade system that spans between floor slabs or structural frames, creating a continuous glazed or panelled envelope around a commercial building. Unlike a traditional shopfront — which is installed within a single-storey structural opening — a curtain wall can extend across multiple storeys and is designed to resist wind loads, support its own dead weight, accommodate thermal and structural movement, and provide weather exclusion, thermal insulation, and acoustic attenuation for the entire building envelope.

Sigma Shop Fronts designs and installs aluminium curtain wall systems for a range of commercial applications: multi-storey office buildings, retail developments, mixed-use schemes, hotels, educational buildings, and healthcare facilities. We work with stick-built and unitised curtain wall systems, using profiles from established fabricators whose products are tested and certified to BS EN 13830 — the European standard for curtain walling.

**Stick-Built vs Unitised Systems**

*Stick-built curtain walling* is assembled on site from individual aluminium mullions (vertical members) and transoms (horizontal members), with glass or panel infills glazed into the grid after the framework is erected. Stick-built systems are versatile, cost-effective for smaller projects, and allow adjustments during installation to accommodate site tolerances. They are the most common curtain wall type for single and two-storey commercial facades.

*Unitised curtain walling* consists of factory-assembled panels — each containing a section of mullion, transom, glazing, and weather seals — that are craned into position and clipped together on site. Unitised systems offer faster on-site installation, higher factory quality control, and better weather sealing, but require greater upfront design investment and are typically specified for larger multi-storey projects where the speed and consistency benefits justify the premium.

**Structural Performance**

Curtain wall mullions and transoms are structural members that resist wind loads — both positive pressure and negative suction — and transfer these loads to the primary building structure at each floor level or structural bracket point. The mullion section is sized by structural calculation to resist the design wind pressure for the building height, location, and exposure category, calculated in accordance with BS EN 1991-1-4 (Eurocode 1: Wind actions).

Our structural calculations are prepared by a qualified engineer and submitted to the building control body as part of the Building Regulations application. Deflection limits for curtain wall mullions are typically L/200 under design wind load (where L is the span between fixings), although more stringent limits may apply for specific glazing types or for buildings with enhanced serviceability requirements.

**Thermal Performance**

Curtain wall systems must comply with Building Regulations Part L for non-domestic buildings, achieving overall facade U-values that contribute to the building's target energy performance. Our curtain wall profiles incorporate polyamide thermal breaks within the aluminium mullions and transoms, reducing the frame-zone U-value to between 1.5 and 2.5 W/m²K depending on the profile depth and thermal break width.

Combined with high-performance double-glazed units (typically 1.0 to 1.1 W/m²K centre-pane) and insulated spandrel panels, the overall curtain wall assembly achieves the facade U-values required for compliance with Part L and, where specified, BREEAM or other sustainability assessment targets.

**Weather Performance and Testing**

Curtain wall systems are tested to BS EN 13830 for air permeability, watertightness, and wind resistance. This standard is specific to curtain walling and differs from BS 6375 (which applies to windows and doors). The test sequence includes static air permeability, watertightness under static and dynamic pressure, and wind resistance under positive and negative pressure.

Our systems are also tested for resistance to water penetration under pulsating air pressure — the "hose test" — which simulates the driving rain conditions encountered on exposed UK building facades. Weather sealing is achieved through a combination of EPDM gaskets, silicone weather seals, and pressure-equalised drainage chambers within the mullion and transom profiles.

**Glazing and Infill Options**

Curtain wall infill panels can be glazed or opaque. Glazed infills use double-glazed sealed units with performance specifications selected to meet the project's thermal, solar, acoustic, and safety requirements. Spandrel panels — the opaque sections typically located at floor-slab and beam levels — use insulated aluminium composite, enamelled glass, or stone cladding backed by thermal insulation.

Structural glazing — where the glass is bonded to the aluminium frame with structural silicone rather than retained by external pressure plates — creates a flush external appearance with no visible frame on the outside face. Structural glazing requires specific design calculations, silicone compatibility testing, and quality-controlled application, all of which we manage as part of the project.

**Fire Compartmentation**

Where a curtain wall passes across a fire compartment boundary — typically at each floor slab — fire stopping is required to prevent fire and smoke from spreading through the void between the curtain wall and the floor slab edge. We install tested fire-stop systems using mineral wool and intumescent sealant, certified to achieve the required fire resistance period (typically 60 or 120 minutes) at each compartment junction.`,
    benefits: [
      {
        title: 'Full-Height Glazed Facades',
        description:
          'Curtain walling spans between floor slabs, creating continuous glazed elevations that maximise natural light, provide uninterrupted views, and give the building a contemporary commercial aesthetic that traditional punched-window construction cannot achieve.',
      },
      {
        title: 'Engineered Wind Load Resistance',
        description:
          'Unlike shopfront systems designed for single-storey use, curtain wall mullions are structurally calculated to resist the full design wind load for the building height and exposure. This provides documented structural performance that satisfies Building Regulations and building control requirements.',
      },
      {
        title: 'Thermal and Acoustic Performance',
        description:
          'Thermally broken mullions and transoms, combined with high-performance glazing and insulated spandrel panels, achieve the facade U-values and acoustic ratings required for modern commercial buildings, including BREEAM-rated and Part L compliant developments.',
      },
      {
        title: 'Design Flexibility',
        description:
          'Curtain wall grids can be configured in any module width and height, with a mix of fixed glazing, opening vents, spandrel panels, and louvre sections. This flexibility allows the facade design to respond to internal layouts, ventilation strategy, and the architect\'s aesthetic intent.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a shopfront and curtain walling?',
        answer:
          'A shopfront is a ground-floor glazed facade installed within a single structural opening, typically up to one storey in height. Curtain walling is a multi-storey facade system that spans between floor slabs and is designed to resist the wind loads, thermal movements, and weather conditions associated with taller buildings. For ground-floor commercial frontages, a shopfront system is usually more cost-effective; for multi-storey facades or large glazed areas spanning above ground floor, curtain walling is the appropriate specification.',
      },
      {
        question: 'How long does a curtain wall installation take?',
        answer:
          'Installation timescales depend on the system type and facade area. A typical two-storey stick-built curtain wall of 50 to 100 m² can be erected and glazed within two to three weeks. Larger unitised installations proceed at a faster rate per square metre once the initial set-out is complete, but require more upfront design and manufacturing time.',
      },
      {
        question: 'Does curtain walling need Building Regulations approval?',
        answer:
          'Yes. Curtain walling installations require Building Regulations approval for structural performance, thermal performance (Part L), fire stopping at compartment boundaries, and safety glazing compliance. We manage the Building Regulations application and provide all structural calculations, thermal calculations, and fire-stopping details as part of our project service.',
      },
      {
        question: 'Can curtain walling include opening windows?',
        answer:
          'Yes. Opening vents — typically top-hung or parallel-opening — can be integrated within the curtain wall grid to provide natural ventilation. These openings are fitted with the same weather sealing and locking hardware as standalone commercial windows, and are positioned within the grid layout to suit the building\'s ventilation strategy.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Design Brief',
        description:
          'We discuss the facade area, building height, structural frame type, and performance requirements — thermal, acoustic, solar, and fire — to establish the appropriate curtain wall system.',
      },
      {
        step: 2,
        title: 'Site Survey & Structural Review',
        description:
          'Our surveyor measures the facade, records the structural fixing points, and coordinates with the project structural engineer to confirm bracket positions and load capacities.',
      },
      {
        step: 3,
        title: 'Detailed Design & Calculations',
        description:
          'We prepare structural calculations for mullion sizing, thermal calculations for Part L compliance, and detailed fabrication drawings showing every mullion, transom, and infill panel.',
      },
      {
        step: 4,
        title: 'Fabrication & Installation',
        description:
          'Aluminium sections are fabricated, powder-coated, and delivered to site. Our installation team erects the framework, glazes the infills, installs fire stopping, and commissions any opening vents.',
      },
      {
        step: 5,
        title: 'Testing & Handover',
        description:
          'On completion, we carry out a hose test to verify watertightness and provide all documentation including structural calculations, fire-stopping certificates, and maintenance guidance.',
      },
    ],
    pricingGuide: {
      heading: 'What Does Curtain Walling Cost?',
      content:
        'Curtain wall pricing is typically quoted per square metre of facade area and depends on the system type, glazing specification, opening vent requirements, and complexity of the facade geometry.',
      ranges: [
        { item: 'Stick-built system (per m²)', price: '£350 – £650' },
        { item: 'Unitised system (per m²)', price: '£500 – £900' },
        { item: 'Structural glazing upgrade', price: '£80 – £150 per m²' },
        { item: 'Fire stopping (per linear metre)', price: '£50 – £120' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey and structural design.',
    },
    peopleAlsoAsk: [
      {
        question: 'What is curtain walling used for?',
        answer:
          'Curtain walling creates the external envelope of commercial buildings — offices, retail centres, hotels, schools, and hospitals. It provides weather protection, thermal insulation, natural daylight, and the visual appearance of the building while transferring wind loads to the primary structure.',
      },
      {
        question: 'Is curtain walling load-bearing?',
        answer:
          'No. Curtain walling is a non-load-bearing cladding system. It carries its own weight and resists wind loads, but does not support the floors or roof of the building. These loads are carried by the primary structural frame (steel, concrete, or timber), and the curtain wall is fixed to the frame at each floor level.',
      },
      {
        question: 'How is curtain walling maintained?',
        answer:
          'Regular maintenance includes external cleaning of the glass and aluminium frames, inspection and replacement of perimeter weather seals (typically every 15 to 20 years), checking drainage channels for blockage, and inspection of fire-stopping at compartment boundaries. We provide a maintenance schedule as part of the handover documentation.',
      },
      {
        question: 'Can curtain walling be retrofitted to an existing building?',
        answer:
          'Yes, provided the existing structural frame can support the curtain wall brackets and the additional wind loads. Retrofit curtain walling is commonly used to modernise the appearance and thermal performance of older commercial buildings. We coordinate with a structural engineer to verify the frame capacity before design.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'aluminium-windows', 'aluminium-doors', 'glass-replacement'],
  },

  {
    slug: 'glass-shopfronts',
    name: 'Glass Shopfronts',
    shortDescription:
      'Frameless and structural glass shopfront systems for maximum transparency and visual impact. Toughened safety glass, patch fittings, and minimal frame details for a contemporary retail entrance.',
    heroImage: 'aluminium-shopfront-1.jpeg',
    primaryKeyword: 'glass shopfronts',
    metaTitle: 'Glass Shopfronts UK | Frameless & Structural',
    metaDescription:
      'Toughened glass shopfronts — frameless and structural glass installations across the UK. BS EN 12150 safety glass, patch fittings, minimal framing. Maximum visibility.',
    description: `Glass shopfronts — also known as frameless shopfronts or structural glass facades — use minimal or no visible aluminium framing to create the most transparent possible retail entrance. Where a traditional aluminium shopfront uses mullions and transoms to support the glazing, a glass shopfront relies on the structural capacity of the toughened glass itself, supported by patch fittings, point fixings, or slender stainless-steel hardware that is visually unobtrusive.

The result is a shopfront with maximum transparency: an uninterrupted view of the retail interior from the street, maximum natural light penetration, and a contemporary, high-end aesthetic that communicates quality and openness to prospective customers.

Sigma Shop Fronts designs and installs glass shopfront systems for retail units, showrooms, restaurants, galleries, and any commercial premises where visual transparency is a primary design objective.

**Frameless Glass Construction**

In a frameless glass shopfront, each glass panel is a structural element. The glass is toughened to BS EN 12150-1 — typically 10 mm or 12 mm thick for shopfront applications — and is self-supporting within the limits of the panel size and wind load. Panels are joined at their edges by patch fittings (stainless-steel clamps fixed through holes drilled in the glass), by structural silicone bonding, or by channel fixings at head and sill that allow the glass to stand vertically without intermediate mullions.

The absence of aluminium mullions means that each glass panel must be sized to resist the full wind load on its area without deflecting beyond acceptable limits. Maximum panel sizes are determined by the glass thickness, aspect ratio, and the design wind pressure for the site. Typical maximum panel sizes for 12 mm toughened glass in a shopfront application are approximately 3.0 m in height by 2.0 m in width, although this varies with wind loading and support conditions.

**Glass Door Options**

Glass shopfront entrance doors can be frameless (using patch fittings and a floor spring or overhead pivot) or framed within a minimal stainless-steel or slim aluminium frame. Frameless glass doors use 10 mm or 12 mm toughened glass with top and bottom patch fittings, a floor-spring closer recessed into the threshold, and pull handles bolted through the glass.

For premises requiring automatic operation, we integrate automatic sliding or swing door operators within the glass shopfront design. Sliding systems use a slim overhead track with minimal visible hardware; swing systems use a concealed floor-spring or overhead operator. See our automatic doors service for full details.

**Structural Glazing and Point Fixings**

For larger glass facades or multi-storey applications, point-fixed structural glazing uses stainless-steel spider fittings or button fixings to connect the glass panels to a supporting structure — typically stainless-steel rods, cable trusses, or structural glass fins. This approach allows floor-to-ceiling glazing with no visible framing, creating the most transparent possible facade.

Point-fixed glazing requires specialist engineering: each fixing must be designed to transfer wind loads and dead loads through the glass without inducing unacceptable stress concentrations around the fixing holes. Our systems use countersunk stainless-steel fixings with nylon bushes that distribute the load across the glass thickness, and all fixing positions are verified by finite-element stress analysis.

**Safety and Compliance**

All glass in shopfront applications must comply with BS 6262 for glazing in buildings and must use safety glass — toughened to BS EN 12150-1 or laminated to BS EN ISO 12543 — in all critical locations as defined by the standard. For frameless glass doors, the glass must also comply with BS EN 12600 for impact classification.

Where the glass shopfront incorporates a DDA-compliant entrance, manifestation markings are applied to the glass at two height bands (850–1000 mm and 1400–1600 mm above floor level) to make the glazing visible to partially sighted people, as required by BS 8300 and Approved Document M.

**Thermal Considerations**

Single-pane frameless glass shopfronts do not achieve the U-values required by Building Regulations Part L for new-build or major refurbishment. Where Part L compliance is required, we can specify frameless double-glazed units using structural silicone edge bonding, or specify a hybrid system with minimal aluminium framing at head and sill to support a double-glazed sealed unit. The appropriate solution depends on the building control body's interpretation of Part L requirements for the specific project.

For existing shopfront replacements that do not trigger Part L requirements, single-pane toughened glass frameless systems remain a popular and visually striking option.`,
    benefits: [
      {
        title: 'Maximum Visual Transparency',
        description:
          'Frameless glass shopfronts eliminate the visual barrier of aluminium mullions and transoms, creating an uninterrupted view between the street and the retail interior. This is particularly effective for premium retail, galleries, showrooms, and restaurants where visual connection with passers-by drives footfall.',
      },
      {
        title: 'Contemporary, High-End Aesthetic',
        description:
          'A frameless glass facade communicates quality, modernity, and openness. For businesses positioning themselves at the premium end of their market, a glass shopfront reinforces brand values more effectively than a conventional framed system.',
      },
      {
        title: 'Toughened Safety Glass Throughout',
        description:
          'All glass panels are toughened to BS EN 12150-1, providing four to five times the strength of standard float glass and a safe fragmentation pattern in the event of breakage. This meets all safety glazing requirements for commercial shopfront applications.',
      },
      {
        title: 'Flexible Door Integration',
        description:
          'Glass shopfronts can incorporate frameless glass doors, framed glass doors, automatic sliding doors, or bi-fold panels, allowing the entrance design to be tailored precisely to the operational requirements and aesthetic goals of the business.',
      },
    ],
    faqs: [
      {
        question: 'How secure is a glass shopfront?',
        answer:
          'Toughened glass is significantly stronger than standard glass and resists casual impact. For enhanced security, we specify laminated toughened glass — a multi-layer construction that holds together when broken, resisting smash-and-grab attacks. Glass shopfronts can also be combined with roller shutters for overnight security.',
      },
      {
        question: 'Can a glass shopfront be energy efficient?',
        answer:
          'Single-pane frameless systems have limited thermal performance. Where energy efficiency is a priority or Building Regulations Part L compliance is required, we specify frameless double-glazed units or hybrid systems with minimal framing. These achieve U-values comparable to conventional aluminium shopfronts while maintaining the frameless visual aesthetic.',
      },
      {
        question: 'How are frameless glass panels cleaned?',
        answer:
          'Frameless glass shopfronts are cleaned using the same methods as any commercial glazing — professional window cleaning with water-fed poles or squeegees. The absence of aluminium frames actually makes cleaning easier, as there are fewer ledges and channels where dirt accumulates.',
      },
      {
        question: 'What happens if a glass panel is broken?',
        answer:
          'We provide emergency boarding and glass replacement as part of our shopfront repair service. Toughened glass shatters into small granules on impact, which are relatively safe but leave the opening exposed. We can typically source and install a replacement toughened glass panel within 48 hours of measurement.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Design Consultation',
        description:
          'We discuss your visual objectives, entrance requirements, and any planning constraints. Our design team advises on the most appropriate glass system — fully frameless, patch-fitted, or hybrid — for your premises.',
      },
      {
        step: 2,
        title: 'Site Survey & Engineering',
        description:
          'Our surveyor measures the opening and assesses the structural head and sill conditions. For larger installations, we prepare wind-load calculations and glass stress analysis to determine the correct glass thickness and fixing positions.',
      },
      {
        step: 3,
        title: 'Specification & Quote',
        description:
          'We specify the glass type and thickness, fixing hardware, door configuration, and any manifestation requirements. A fixed-price quotation with technical drawings is provided.',
      },
      {
        step: 4,
        title: 'Installation',
        description:
          'Our glazing team installs the channel fixings, patch fittings, and glass panels. Doors are hung and adjusted, and all hardware is demonstrated. Typical installation for a single-unit shopfront is one to two days.',
      },
    ],
    pricingGuide: {
      heading: 'What Does a Glass Shopfront Cost?',
      content:
        'Glass shopfront pricing depends on the glass thickness, panel sizes, fixing type, and door configuration. Frameless systems are typically 10 to 30 per cent more expensive than equivalent aluminium-framed shopfronts due to the thicker glass and specialist hardware required.',
      ranges: [
        { item: 'Frameless glass shopfront (single unit)', price: '£3,500 – £7,000' },
        { item: 'Frameless glass door (patch fittings)', price: '£1,500 – £3,000' },
        { item: 'Point-fixed structural glazing (per m²)', price: '£400 – £800' },
        { item: 'Manifestation markings', price: '£150 – £400' },
      ],
      note: 'All prices exclude VAT. Final cost confirmed after site survey.',
    },
    peopleAlsoAsk: [
      {
        question: 'What is the difference between a glass shopfront and an aluminium shopfront?',
        answer:
          'An aluminium shopfront uses aluminium mullions and transoms to support the glazing — the glass sits within the metal framework. A glass shopfront eliminates or minimises these metal frames, using the structural capacity of the toughened glass itself with patch fittings or point fixings. Glass shopfronts offer greater transparency but are typically more expensive and have more limited thermal performance.',
      },
      {
        question: 'Are glass shopfronts suitable for all types of retail?',
        answer:
          'Glass shopfronts work best for businesses where visual transparency is a priority — premium retail, galleries, showrooms, restaurants, and professional services. For businesses requiring greater privacy, security, or thermal performance, a conventional aluminium shopfront may be more appropriate.',
      },
      {
        question: 'Do glass shopfronts need planning permission?',
        answer:
          'Replacing an existing shopfront with a glass system is usually permitted development for commercial premises. In conservation areas or for listed buildings, the change in appearance may require planning approval. We advise on the planning position at the survey stage.',
      },
      {
        question: 'How thick is the glass in a frameless shopfront?',
        answer:
          'Frameless shopfront glass is typically 10 mm or 12 mm thick toughened safety glass. The specific thickness is determined by the panel dimensions and the design wind load. Larger panels and more exposed locations require thicker glass to maintain acceptable deflection limits.',
      },
    ],
    relatedServices: ['aluminium-shopfronts', 'glass-replacement', 'automatic-doors', 'shopfront-repairs'],
  },
];
