/**
 * What we make and fit, written from the side no one else writes it from:
 * what the council, building control and the standards will make of it.
 *
 * Technical references (BS EN numbers, LPS 1175, FD ratings, Approved
 * Documents) are shared industry facts. Every sentence around them is ours.
 * Prices come only from `data/costs.ts`, never typed in here.
 */

export type Consent = 'planning' | 'advert' | 'listed' | 'building-regs' | 'none-usually';

export interface ConsentLine {
  consent: Consent;
  likelihood: 'usually' | 'often' | 'sometimes' | 'rarely';
  why: string;
}

export interface Shopfront {
  slug: string;
  legacySlug: string;
  name: string;
  /** One line for index cards. */
  card: string;
  /** 2–3 sentences: what it is, who it suits, price band, where we cover. */
  answer: string;
  /** Key into data/costs.ts groups, if we publish indicative prices for it. */
  costGroup?: string;
  area: 'uk' | 'repair-radius';
  consents: ConsentLine[];
  /** Question-shaped sections. */
  sections: { q: string; body: string[] }[];
  standards: { ref: string; what: string }[];
  questions: { q: string; a: string }[];
  photo?: { src: string; alt: string; w: number; h: number };
  related: string[];
}

export const shopfronts: Shopfront[] = [
  {
    slug: 'aluminium',
    legacySlug: 'aluminium-shopfronts',
    name: 'Aluminium shopfronts',
    card: 'Framed glazed fronts in powder-coated aluminium, proportioned to the building they sit in.',
    answer:
      'A complete glazed front — frame, doors, glass, fascia zone and stallriser — made in powder-coated aluminium and fitted across the UK. It suits most retail and food units; our indicative range for a single bay up to about four metres wide is £2,000–£5,000. A new front almost always needs planning permission, so we draw it to suit the council before we quote it to suit you.',
    costGroup: 'shopfronts',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'Replacing a shopfront changes how the building looks from the street, which is development needing permission.' },
      { consent: 'advert', likelihood: 'often', why: 'The new fascia sign is a separate consent. Illuminated lettering, or any sign in a conservation area, makes it more likely.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Required on any listed building, inside or out, before work starts.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Safety glazing, level access and means of escape all apply to a new entrance.' },
    ],
    sections: [
      {
        q: 'Will the council accept aluminium on an older building?',
        body: [
          'Often, yes — the objection is rarely to the metal itself. What gets a scheme refused is proportion: a single sheet of glass from pavement to fascia, a fascia twice the depth of the original, and the pilasters and stallriser stripped out. An aluminium front that keeps those lines usually reads as a shopfront, not a hole in the building.',
          'On a listed building, or where a council’s guidance asks for timber, ask before you specify. Several of the council documents we track expect historic shopfronts to be repaired rather than replaced at all.',
        ],
      },
      {
        q: 'What makes an aluminium front look right on a high street?',
        body: [
          'Three things: a stallriser of a sensible height, so the glass does not start at the pavement; a fascia sized to the building rather than the brand guidelines; and frame profiles slim enough that the glass, not the metal, is what you see. Glazing bars that line up with the windows above help a frontage sit in a terrace.',
          'Colour does more than people expect. A recessed, dark finish — anthracite, a deep green or a near-black — lets the front sit back into an old façade. Bright white and silver anodised push it forward.',
        ],
      },
      {
        q: 'How is security handled without a shutter?',
        body: [
          'Laminated glass in the frame, a solid stallriser and a properly specified lock do most of the work, and they are what many councils now ask for first. If a shutter is still wanted, plan the box into the fascia at the drawing stage — retrofitting one to a new front is where most bad shopfronts come from.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Safety glazing in critical locations — low-level glass and glass in and beside doors.' },
      { ref: 'Approved Document M', what: 'Access to and use of the building, including entrance thresholds and door widths.' },
      { ref: 'BS EN 12150 / BS EN 14449', what: 'Toughened and laminated safety glass.' },
      { ref: 'BS EN 356', what: 'Classes of glass resistance to manual attack, used when laminated glass is doing a security job.' },
    ],
    questions: [
      {
        q: 'Do I need planning permission to replace a shopfront?',
        a: 'Usually yes, because a new shopfront changes the appearance of the building. Like-for-like repair generally does not. Your council confirms either way; our frontage check gives you a first indication.',
      },
      {
        q: 'Can you make an aluminium shopfront look traditional?',
        a: 'It can be proportioned traditionally — stallriser, pilasters, a fascia sized to the building, glazing bars that line up with the floors above — and finished in a dark heritage colour. Whether that satisfies a particular council on a particular building is their decision, so we show them the drawing early.',
      },
    ],
    photo: { src: '/assets/sigma-retail-front.jpeg', alt: 'Dark grey aluminium shopfront with a glazed entrance door, fixed glazing and a painted fascia above', w: 1600, h: 1200 },
    related: ['frameless-glass', 'aluminium-doors', 'roller-shutters'],
  },
  {
    slug: 'roller-shutters',
    legacySlug: 'roller-shutters',
    name: 'Roller shutters and grilles',
    card: 'Internal, lattice and vision shutters chosen for the street they face, not just the risk.',
    answer:
      'Steel or aluminium shutters and grilles, manual or motorised, fitted across the UK. Solid external shutters are the single most common reason a shopfront application is refused, so we start from internal and open-lattice designs and only go solid where the setting allows it. Indicative prices run from £800–£1,500 for a manual shutter to £1,200–£2,500 motorised.',
    costGroup: 'shutters',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'An external shutter, its box and guides change the look of the frontage. Internal shutters behind the glass often avoid this.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Any shutter on a listed building, including an internal one fixed to historic fabric.' },
      { consent: 'building-regs', likelihood: 'rarely', why: 'Mostly where a shutter closes off an escape route or forms part of a fire separation.' },
    ],
    sections: [
      {
        q: 'Why do solid shutters get refused?',
        body: [
          'A street of closed solid shutters is dead after six o’clock: nothing to look at, no light on the pavement and nowhere for anyone to see in. Councils link that to fear of crime and graffiti, and most of the shopfront guides we track either rule solid external shutters out in conservation areas or accept them only in narrow exceptions.',
          'Perforated or “pinhole” shutters do not get you round this. Several councils say plainly that they look almost solid once they are down.',
        ],
      },
      {
        q: 'Which shutter types are easiest to get approved?',
        body: [
          'Roughly from easiest to hardest: an internal lattice grille behind the glass; a removable mesh grille; an external lattice or brick-bond grille; a punched or polycarbonate “vision” shutter; a perforated shutter; a solid one. Where the box goes matters as much as the curtain — behind the fascia, never hung on the face of the building.',
          'Colour is the cheap win. A shutter powder-coated to match the shopfront reads as part of it; bare galvanised steel reads as an afterthought, and some councils name it as unacceptable.',
        ],
      },
      {
        q: 'Manual or motorised?',
        body: [
          'Manual spring-balanced shutters suit narrow openings used once a day. Wider or heavier curtains, or a shutter someone lifts several times a day, should be motorised. Powered shutters have to meet the safety-in-use standard for powered doors, which covers safety edges and safe stopping — not optional extras.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 13241', what: 'Product standard for industrial, commercial and garage doors and gates, including shutters.' },
      { ref: 'BS EN 12453', what: 'Safety in use of power-operated doors: forces, safety edges and stopping.' },
      { ref: 'LPS 1175', what: 'Loss Prevention Standard for intruder-resistant products. Older grades run SR1–SR8; Issue 8 uses ratings such as B3 or C5, where the letter is the tool category and the number the minutes of resistance.' },
      { ref: 'BS EN 16034', what: 'Fire-resistance characteristics, used with BS EN 13241 for fire shutters.' },
    ],
    questions: [
      {
        q: 'Do I need planning permission for a roller shutter?',
        a: 'For an external shutter, usually yes, because the shutter, box and guides change how the shopfront looks. An internal shutter fitted behind the glass often does not, though on a listed building listed building consent can still apply.',
      },
      {
        q: 'Are perforated shutters treated differently from solid ones?',
        a: 'Not by much. Several councils class perforated and pinhole shutters with solid ones because from the street they look closed. Lattice, brick-bond and clear polycarbonate shutters are the types councils tend to name as acceptable.',
      },
    ],
    photo: { src: '/assets/sigma-mall-front.jpeg', alt: 'Single-storey shop with a new dark aluminium glazed front and sliding doors, a roller shutter on the neighbouring unit', w: 1600, h: 1200 },
    related: ['shutter-repairs', 'aluminium', 'security-doors'],
  },
  {
    slug: 'security-doors',
    legacySlug: 'security-doors',
    name: 'Security doors',
    card: 'Steel doorsets for rear, side and service entrances, rated to a recognised attack standard.',
    answer:
      'Steel and steel-faced doorsets for back doors, stock rooms, plant rooms and side entrances, fitted across the UK. They suit premises where the vulnerable door is not on the shop window. Indicative prices start at £800–£1,500 for a standard steel door, rising with the security rating.',
    costGroup: 'doors',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'sometimes', why: 'A rear service door rarely needs it. A new door on a front or prominent side elevation, or in a conservation area, may.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Replacing a historic door or its frame on a listed building.' },
      { consent: 'building-regs', likelihood: 'often', why: 'If the door is on an escape route its hardware must let people out without a key.' },
    ],
    sections: [
      {
        q: 'What does an LPS 1175 rating actually tell you?',
        body: [
          'It tells you how long a tested doorset resisted a defined attack with a defined tool kit — not that it cannot be opened. A rating is only worth having if the whole set was tested together: leaf, frame, hinges, locks and fixings. A strong door in a weak frame is not a rated door.',
          'Ask for the certificate and check the product on it matches what is being fitted. Insurers sometimes specify the rating; when they do, they will want the paperwork too.',
        ],
      },
      {
        q: 'Can a security door also be a fire exit?',
        body: [
          'Yes, and it often has to be. A door on an escape route needs hardware that opens from inside in one action without a key — emergency exit devices for staff-only routes, panic bars where the public may use it. Security comes from the outside face and the frame, not from locking people in.',
        ],
      },
    ],
    standards: [
      { ref: 'LPS 1175', what: 'Intruder resistance — security rating of the complete doorset.' },
      { ref: 'BS EN 1627', what: 'Burglar resistance classes RC1–RC6 for doors, windows and shutters.' },
      { ref: 'BS EN 179 / BS EN 1125', what: 'Emergency exit devices (staff-only routes) and panic exit devices (public routes).' },
    ],
    questions: [
      {
        q: 'Does a steel back door need planning permission?',
        a: 'Usually not when it replaces an existing rear door in the same opening. It may if the door faces the street, changes the opening, or the building is listed or in a conservation area — ask the council if any of those apply.',
      },
    ],
    photo: { src: '/assets/sigma-commercial-entrance.jpeg', alt: 'Pair of fully glazed aluminium entrance doors with long pull handles under a glazed fanlight', w: 1024, h: 768 },
    related: ['fire-doors', 'roller-shutters', 'aluminium-doors'],
  },
  {
    slug: 'automatic-doors',
    legacySlug: 'automatic-doors',
    name: 'Automatic doors',
    card: 'Sliding and swing entrances that open on approach, with the safety standards they need.',
    answer:
      'Powered sliding and swing doors for shop and office entrances, installed across the UK. They suit busy entrances, food stores where staff carry stock, and any business making its entrance easier to use. Indicative prices: £3,000–£6,000 for a bi-parting sliding door; £1,500–£3,000 to add an operator to a suitable existing door.',
    costGroup: 'automatic',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'sometimes', why: 'Swapping a door for an automatic one within the same frontage often needs nothing new; a changed frontage or a visible operator box on a sensitive building can.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Fixing an operator or track to historic fabric.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'A new entrance must keep level access, clear width and a safe escape route if the power fails.' },
    ],
    sections: [
      {
        q: 'What happens to an automatic door in a fire or a power cut?',
        body: [
          'If the door is on an escape route it must still let people out. Sliding doors on escape routes are usually specified with break-out leaves or fail-safe opening, so the set can be pushed open or opens itself when power or the alarm signal is lost. That choice belongs on the drawing, not on site.',
        ],
      },
      {
        q: 'Does an automatic door help with the Equality Act?',
        body: [
          'It is one of the clearest reasonable adjustments a shop can make to its entrance, especially with a step-free threshold. It does not replace the other access points — width, threshold height, the ironmongery on any manual leaf — which building control will look at anyway.',
        ],
      },
      {
        q: 'Inside or at the street line?',
        body: [
          'Not every powered door is a shop entrance. We also fit them inside premises, such as a sliding door into a chilled drinks room, where staff and customers are going through all day and a manual door gets left open. The safety standards are the same; planning usually has nothing to say about an internal door.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 16005', what: 'Safety in use of power-operated pedestrian doorsets.' },
      { ref: 'BS 7036-0', what: 'Code of practice for safety at powered doors for pedestrian use.' },
      { ref: 'Approved Document M', what: 'Effective clear widths and level thresholds at entrances.' },
    ],
    questions: [
      {
        q: 'Do automatic doors need servicing?',
        a: 'Yes. Sensors and safety settings drift, and the safety standard for powered pedestrian doors expects them to be maintained and checked. Ask whoever fits yours what the service interval is and what is checked.',
      },
    ],
    photo: { src: '/assets/automatic-door-sigma.jpeg', alt: 'Automatic sliding glass door in a dark aluminium frame opening into a shop with drinks shelving', w: 480, h: 848 },
    related: ['aluminium-doors', 'aluminium', 'repairs'],
  },
  {
    slug: 'folding-doors',
    legacySlug: 'bi-fold-doors',
    name: 'Folding glazed doors',
    card: 'Bi-fold fronts that open a café or restaurant to the street, and still lock up properly.',
    answer:
      'Multi-panel aluminium folding doors that open most of a frontage, fitted across the UK. They suit cafés, bars and restaurants that trade onto the pavement in good weather. Indicative prices run from £3,000–£5,000 for three panels to £8,000–£14,000 for an eight-panel run.',
    costGroup: 'folding',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'Opening up a frontage changes its appearance, and a café spilling onto the street can raise questions beyond design.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Almost certain to be needed — and hard to get — on a listed shopfront.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Escape routes, safety glazing and thresholds all apply.' },
    ],
    sections: [
      {
        q: 'Will a council allow bi-folds on a traditional frontage?',
        body: [
          'It depends heavily on the building. On a modern unit they are often uncontroversial. On a traditional front the problem is that a folding system replaces the stallriser, pilasters and fixed glazing with a stack of frames, and when the doors are shut the proportions are rarely those of a shopfront. Show the council the closed elevation, not just the summer photo.',
        ],
      },
      {
        q: 'Can folding doors be a fire exit?',
        body: [
          'A folding set is a poor primary escape door: the leaves have to be unlocked and folded in sequence. Keep a conventional door within the run, or elsewhere, as the escape route.',
        ],
      },
      {
        q: 'Do I need anything from the council to put tables outside?',
        body: [
          'Planning for the doors and permission for tables on the pavement are different things. Furniture on the public highway usually needs a pavement or street café licence from the council — check that before the doors are designed around it.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Safety glazing in doors and side panels.' },
      { ref: 'Approved Document B', what: 'Fire safety, including escape doors and routes.' },
      { ref: 'BS EN 14351-1', what: 'Product standard for windows and external pedestrian doorsets.' },
    ],
    questions: [
      {
        q: 'How secure are bi-fold doors when closed?',
        a: 'A good commercial system with multi-point locking, laminated glass and secure intermediate locks is reasonable. They are not a shutter; on a high-risk site, plan an internal grille or roller into the design from the start.',
      },
    ],
    related: ['aluminium', 'frameless-glass', 'roller-shutters'],
  },
  {
    slug: 'fire-doors',
    legacySlug: 'fire-doors',
    name: 'Fire doors',
    card: 'Certified doorsets for stairs, plant rooms and escape routes, fitted so the rating holds.',
    answer:
      'Certified fire-resisting doorsets — FD30, FD60 and above — for commercial premises across the UK. They suit stair enclosures, plant and bin stores, kitchens and any door your fire risk assessment marks. Indicative prices: £400–£800 for an FD30 single leaf, £600–£1,200 for FD60.',
    costGroup: 'fire',
    area: 'uk',
    consents: [
      { consent: 'building-regs', likelihood: 'often', why: 'New fire separations and escape routes are building-regulations work.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Upgrading or replacing historic internal doors in a listed building.' },
      { consent: 'none-usually', likelihood: 'usually', why: 'Planning rarely applies to internal fire doors.' },
    ],
    sections: [
      {
        q: 'Who is responsible for the fire doors in a shop?',
        body: [
          'The responsible person under the Regulatory Reform (Fire Safety) Order 2005 — usually the employer, or whoever controls the premises. Your fire risk assessment should say which doors are fire doors and how they are checked. We fit and repair them; the assessment is a separate job.',
        ],
      },
      {
        q: 'What do FD30 and FD60 mean?',
        body: [
          'The number is the minutes of fire integrity the doorset achieved in test. An “S” after it — FD30S — means it also has smoke seals. The rating belongs to the whole set: leaf, frame, intumescent seals, hinges, closer and glazing. Swap a hinge for a cheaper one, or cut in a vision panel on site, and you no longer have the rated door.',
        ],
      },
    ],
    standards: [
      { ref: 'BS 476-22 / BS EN 1634-1', what: 'Fire-resistance tests behind FD and E/EI ratings.' },
      { ref: 'Approved Document B', what: 'Where fire doors are required and how they must perform.' },
      { ref: 'Regulatory Reform (Fire Safety) Order 2005', what: 'Duties of the responsible person for non-domestic premises.' },
    ],
    questions: [
      {
        q: 'Can you repair a fire door or does it need replacing?',
        a: 'Many faults — gaps, damaged seals, a closer that no longer closes, hinges — can be repaired to keep the rating, using parts that match the certification. Damage to the leaf itself often means replacement.',
      },
    ],
    related: ['security-doors', 'repairs', 'aluminium-doors'],
  },
  {
    slug: 'repairs',
    legacySlug: 'shopfront-repairs',
    name: 'Shopfront repairs',
    card: 'Doors that drop, locks that stick, frames that leak — fixed within 100 road miles of Birmingham.',
    answer:
      'Repairs to aluminium and glazed shopfronts: dropped and dragging doors, worn floor springs and closers, failed locks, leaking frames and damaged panels. We cover premises within 100 road miles of Birmingham. Most repairs are priced after we have seen the fault, and the quote comes in writing before any work.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Like-for-like repairs generally need no planning permission.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Repairs that affect the character of a listed building can still need consent — replacing original glass or joinery, for instance.' },
    ],
    sections: [
      {
        q: 'Is it worth repairing an old shopfront rather than replacing it?',
        body: [
          'Often, and the council may prefer it. Some of the shopfront guides we track will not support removing a historic shopfront in a conservation area unless it is shown that repair cannot be done. A front that is structurally sound but has a failed floor spring or a dropped door is a repair, not a rebuild.',
        ],
      },
      {
        q: 'What usually goes wrong with an aluminium shopfront door?',
        body: [
          'The floor spring or overhead closer wears and the door slams or will not latch; the top pivot works loose and the door drops and drags; the lock’s cylinder or keep goes out of line; seals perish and the frame starts to whistle and leak. Most are a single visit once the part is identified.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Replacement glass in critical locations must be safety glass.' },
      { ref: 'BS EN 1154', what: 'Controlled door closing devices — the standard for closers and floor springs.' },
    ],
    questions: [
      {
        q: 'Do you repair shopfronts you did not install?',
        a: 'Yes. Most repair calls are to fronts fitted by someone else, often years ago. A photograph of the fault and of any maker’s label on the frame or closer helps us bring the right part.',
      },
    ],
    photo: { src: '/assets/sigma-front-wide.jpeg', alt: 'Black-framed internal glazed screen with a glazed door, set in a newly fitted office', w: 1600, h: 1200 },
    related: ['emergency-repairs', 'shutter-repairs', 'glass-replacement'],
  },
  {
    slug: 'emergency-repairs',
    legacySlug: 'emergency-callout',
    name: 'Emergency repairs',
    card: 'Break-ins, smashed glass and shutters stuck shut — a reply within two hours.',
    answer:
      'Making a shopfront safe and secure after a break-in, an accident or a failed shutter, within 100 road miles of Birmingham. We reply to emergency repair calls within two hours, then agree with you what can be done and when. Typical first steps are boarding, temporary glazing, or getting a jammed shutter open or locked.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Temporary boarding to make premises safe does not need permission.' },
      { consent: 'listed', likelihood: 'rarely', why: 'Fixing boards to historic joinery should be done with care; the permanent repair may need consent.' },
    ],
    sections: [
      {
        q: 'What exactly does the two-hour promise mean?',
        body: [
          'It means a person replies to you within two hours of your call or message — not that a van arrives within two hours. Once we have spoken we tell you honestly when we can be there and what we can do on that visit. Further from Birmingham, a closer contractor may reach you sooner, and we will say so.',
        ],
      },
      {
        q: 'What should I do before anyone arrives?',
        body: [
          'Keep people away from broken glass. If there has been a break-in, report it to the police and get a crime reference number — your insurer will want it, and so will a council if you later apply for an external shutter. Photograph the damage before anything is moved.',
        ],
      },
      {
        q: 'Is the permanent repair the same job?',
        body: [
          'Not always. Toughened glass cannot be cut once it is made, so a replacement pane is made to measure and takes days; the first visit makes the front secure and the second fits the glass. A smash is also a natural moment to switch to laminated glass, which many councils prefer to a shutter.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 12150', what: 'Toughened safety glass — made to size, cannot be cut afterwards.' },
      { ref: 'BS EN 14449', what: 'Laminated glass, which holds together when broken.' },
    ],
    questions: [
      {
        q: 'How quickly will someone get to me?',
        a: 'We reply to emergency repair calls within two hours. When we can attend depends on where you are and what else is in hand, and we tell you that when we reply rather than promising a time we cannot keep.',
      },
    ],
    related: ['glass-replacement', 'shutter-repairs', 'repairs'],
  },
  {
    slug: 'shutter-repairs',
    legacySlug: 'shutter-repair',
    name: 'Shutter repairs',
    card: 'Stuck, noisy and off-track shutters repaired within 100 road miles of Birmingham.',
    answer:
      'Repairs to manual and motorised roller shutters and grilles: jammed curtains, broken springs, failed motors and limits, bent guides and damaged laths. We cover premises within 100 road miles of Birmingham and reply to emergency calls within two hours. Repairs are quoted in writing once the fault is found.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Repairing an existing, lawful shutter like-for-like generally needs nothing from the council.' },
      { consent: 'planning', likelihood: 'sometimes', why: 'Replacing a shutter with a different one can. Some councils now treat a replacement external shutter as a fresh application.' },
    ],
    sections: [
      {
        q: 'Should I repair the shutter or replace it?',
        body: [
          'If the box, axle and guides are sound, a repair is almost always cheaper. Replacement makes sense when the curtain is badly damaged, the motor and spring are both gone, or the shutter is the wrong type for the street. One thing to know before replacing: some councils now ask for the same justification for a replacement external shutter as for a new one — Bradford’s 2026 guide, for example, asks for a Crime Impact Statement.',
        ],
      },
      {
        q: 'Was my existing shutter put in with permission?',
        body: [
          'Worth checking before you spend money on it. Councils do take enforcement action over external roller shutters fitted without consent — Sheffield’s published register of enforcement notices for 2022–2026 includes several requiring shutters and their boxes to be removed. If yours was never approved, a like-for-like repair keeps the problem; a switch to an internal or lattice design may resolve it.',
        ],
      },
      {
        q: 'Why does my motorised shutter stop halfway?',
        body: [
          'Usually the limit settings have drifted, a safety edge is reading an obstruction, or the motor’s thermal cut-out has tripped from repeated cycling. Do not keep pressing the button — it can overheat the motor or drop the curtain out of its guides.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 12453', what: 'Safety in use of powered doors and shutters — what must be checked after a repair.' },
      { ref: 'BS EN 13241', what: 'Product standard the shutter was supplied under.' },
    ],
    questions: [
      {
        q: 'Can you repair a shutter another company fitted?',
        a: 'Yes. A photo of the motor label and the end of the box helps us bring compatible parts on the first visit.',
      },
    ],
    related: ['roller-shutters', 'emergency-repairs', 'repairs'],
  },
  {
    slug: 'glass-replacement',
    legacySlug: 'glass-replacement',
    name: 'Shopfront glass replacement',
    card: 'Broken panes replaced with the right safety glass — and the chance to upgrade to laminated.',
    answer:
      'Replacing broken or failed shopfront glass, from a single door pane to a full display window, within 100 road miles of Birmingham. Glass in shopfront doors and low-level panes has to be safety glass, and replacing it is the cheapest point at which to move to laminated. The price depends on size, type and access, and is quoted after measuring.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Like-for-like glass needs no planning permission.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Replacing historic glass, or adding film or etched lettering, on a listed building.' },
      { consent: 'building-regs', likelihood: 'often', why: 'Glass in critical locations must meet the safety-glazing rules even when only one pane is replaced.' },
    ],
    sections: [
      {
        q: 'Toughened or laminated?',
        body: [
          'Toughened glass is strong but, when it does break, it shatters into small pieces and leaves an open hole. Laminated glass cracks but stays in the frame, held by its interlayer — which is why councils keep recommending it in place of shutters. Laminated security glazing is classified by its resistance to manual attack; ask which class you are being quoted.',
        ],
      },
      {
        q: 'Where must the glass be safety glass?',
        body: [
          'In the critical locations the building regulations define: from floor level up to 800 mm in walls and screens, and up to 1500 mm in a door or in a side panel within 300 mm of a door’s edge. In a shopfront that covers most of the glazing.',
        ],
      },
      {
        q: 'Why can’t you cut a toughened pane on the day?',
        body: [
          'Toughened glass is made to final size and then heat-treated; cut it afterwards and it shatters. That is why a replacement usually means a make-safe first visit and a fitting visit a few days later.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Protection from impact: critical locations for safety glazing.' },
      { ref: 'BS EN 12600', what: 'Pendulum impact classification for safety glass.' },
      { ref: 'BS EN 356', what: 'Resistance of security glazing to manual attack (classes P1A–P8B).' },
    ],
    questions: [
      {
        q: 'Will laminated glass stop a break-in?',
        a: 'It slows one down and keeps the opening closed after an impact, which is why many councils prefer it to an external shutter. Higher attack-resistance classes resist longer. It is not a vault door; on a high-risk shop it is often combined with an internal grille.',
      },
    ],
    related: ['emergency-repairs', 'aluminium', 'frameless-glass'],
  },
  {
    slug: 'aluminium-doors',
    legacySlug: 'aluminium-doors',
    name: 'Aluminium entrance doors',
    card: 'Commercial entrance doors on floor springs or closers, with level thresholds.',
    answer:
      'Aluminium entrance doors for shops, offices and communal entrances, fitted across the UK. They suit an existing shopfront that is sound but whose door has had its day, as well as new fronts. A replacement door in a suitable frame is usually a short job; the price depends on size, glazing and hardware and is quoted in writing.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'sometimes', why: 'Replacing a door within an existing front in the same style rarely needs it; changing the opening or the look on a sensitive building can.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Any change to a historic entrance on a listed building.' },
      { consent: 'building-regs', likelihood: 'often', why: 'Clear width, threshold and safety glazing on a public entrance.' },
    ],
    sections: [
      {
        q: 'Floor spring or overhead closer?',
        body: [
          'A floor spring hides the closer in the floor and gives the cleanest look, which suits heritage settings and frameless doors; it needs a pit cut in the floor. An overhead closer is easier to fit to an existing door and to service. Both are rated by their power size, which must match the door’s width and weight.',
        ],
      },
      {
        q: 'What makes an entrance door accessible?',
        body: [
          'A level threshold, enough clear width once the door is open, an opening force a wheelchair user or parent with a buggy can manage, and handles at a usable height. A heavy glazed door on a strong closer fails the third test more often than any other.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 1154', what: 'Controlled door closing devices — closers and floor springs.' },
      { ref: 'Approved Document M', what: 'Entrance widths, thresholds and opening forces.' },
      { ref: 'BS EN 14351-1', what: 'Product standard for external pedestrian doorsets.' },
    ],
    questions: [
      {
        q: 'Can you replace just the door and keep the shopfront?',
        a: 'Usually, if the frame is sound and square. We check the frame and the floor at the survey; a door hung in a twisted frame will drop again however good it is.',
      },
    ],
    photo: { src: '/assets/sigma-modern-front.jpeg', alt: 'Shopfront under construction: a new dark aluminium frame with a glazed door, protective tape on the floor', w: 1600, h: 1200 },
    related: ['automatic-doors', 'aluminium', 'repairs'],
  },
  {
    slug: 'aluminium-windows',
    legacySlug: 'aluminium-windows',
    name: 'Commercial aluminium windows',
    card: 'Windows for the floors above the shop, chosen to match the street as well as the U-value.',
    answer:
      'Aluminium windows for commercial buildings and the upper floors above shops, fitted across the UK. They suit offices, flats over shops and mixed-use buildings where the existing windows have failed. Prices depend on size, opening type and glazing, and are quoted after a survey.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'often', why: 'A change in material, glazing pattern or opening style on a commercial building often needs permission, and more often in a conservation area.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Replacing historic windows on a listed building, which councils frequently resist.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Replacement windows are controlled work: energy performance, safety glazing and, in some rooms, escape and ventilation.' },
    ],
    sections: [
      {
        q: 'Why do upper-floor windows matter on a shopfront job?',
        body: [
          'Because the street reads the building as one thing. A shopfront that lines up with the windows above sits in its terrace; a new front under a row of mismatched upper windows looks bolted on. Councils assessing a shopfront often look up.',
        ],
      },
      {
        q: 'Does an Article 4 direction affect commercial windows?',
        body: [
          'Article 4 directions remove permitted development rights, and they are most often used for houses. A commercial building has fewer such rights to begin with, so window changes on it usually need permission anyway. Flats above shops are where it gets complicated — check the council’s Article 4 map for your street.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 14351-1', what: 'Product standard for windows.' },
      { ref: 'Approved Document L', what: 'Conservation of fuel and power for replacement windows.' },
      { ref: 'Approved Document K', what: 'Safety glazing in critical locations.' },
    ],
    questions: [
      {
        q: 'Do replacement windows on a shop need building control?',
        a: 'Yes, replacement windows are controlled work. A registered competent person can self-certify some window installations; otherwise building control is notified. Ask how your installer will certify the work before it starts.',
      },
    ],
    related: ['aluminium', 'curtain-walling', 'glass-replacement'],
  },
  {
    slug: 'curtain-walling',
    legacySlug: 'curtain-walling',
    name: 'Curtain walling',
    card: 'Stick-system glazed façades for new commercial buildings and major refits.',
    answer:
      'Glazed aluminium curtain walling for showrooms, offices and new commercial frontages, installed across the UK. It suits new-build and full-height glazed elevations rather than a single shop unit. Every scheme is designed and priced individually from drawings.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'A new or re-clad façade is a major change to a building’s appearance.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Structure, fire performance of the external wall, energy and safety glazing.' },
    ],
    sections: [
      {
        q: 'Is curtain walling right for a shop?',
        body: [
          'Seldom for an individual unit in a traditional street, where a shopfront system with a fascia and stallriser fits better. It comes into its own on new buildings, car showrooms and corner sites designed as glass from the outset.',
        ],
      },
      {
        q: 'Who designs it?',
        body: [
          'Curtain walling is engineered: wind loads, deflection, movement joints and fixings to the structure are calculated, not assumed. On larger schemes the system supplier’s engineers and the project’s structural engineer sign it off; our part is fabrication and installation to that design.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 13830', what: 'Product standard for curtain walling.' },
      { ref: 'Approved Document B', what: 'Fire performance of external walls.' },
      { ref: 'CWCT Standard for systemised building envelopes', what: 'Industry test and performance standard.' },
    ],
    questions: [
      {
        q: 'What is the difference between curtain walling and a shopfront system?',
        a: 'A shopfront system spans a single storey within a structural opening. Curtain walling hangs off the building’s structure across several storeys and is designed for wind load and movement over that height.',
      },
    ],
    related: ['aluminium', 'frameless-glass', 'aluminium-windows'],
  },
  {
    slug: 'frameless-glass',
    legacySlug: 'glass-shopfronts',
    name: 'Frameless glass fronts',
    card: 'Structural glass with patch fittings, for settings where the view in is the point.',
    answer:
      'Toughened and laminated glass fronts with minimal or no visible framing, patch-fitted doors and glass fins, installed across the UK. They suit modern buildings, showrooms and interiors. On a traditional street they are a harder sell to the council; we will say so before you commit.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'A new glass front is a change in appearance — often a dramatic one.' },
      { consent: 'advert', likelihood: 'often', why: 'Lettering on the glass, or a sign above it, can need advertisement consent.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Safety glazing throughout and manifestation so the glass is visible.' },
    ],
    sections: [
      {
        q: 'Will a conservation officer accept a frameless front?',
        body: [
          'On a traditional building, not often. Frameless glass removes exactly the elements — stallriser, pilasters, fascia, glazing bars — that conservation guidance asks to be kept. On a modern building, or inside a shopping centre, it is frequently the best answer.',
        ],
      },
      {
        q: 'Why the dots or bands on frameless glass?',
        body: [
          'That is manifestation: markings that make large areas of glass visible so people do not walk into them. The building regulations expect it on glazed doors and screens people could mistake for an opening, at two heights — roughly 850–1000 mm and 1400–1600 mm from the floor.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Safety glazing and manifestation of glazing.' },
      { ref: 'BS EN 12150 / BS EN 14449', what: 'Toughened and laminated glass.' },
      { ref: 'BS 6180', what: 'Barriers in and about buildings, where glass acts as a barrier.' },
    ],
    questions: [
      {
        q: 'How do you secure a frameless glass front at night?',
        a: 'Laminated glass and good patch locks first. If more is needed, an internal grille or shutter behind the glass keeps the clean look outside; an external shutter box on a frameless front is very hard to hide.',
      },
    ],
    related: ['aluminium', 'curtain-walling', 'glass-replacement'],
  },
];

export const shopfrontBySlug = new Map(shopfronts.map((s) => [s.slug, s]));

export const consentLabel: Record<Consent, string> = {
  planning: 'Planning permission',
  advert: 'Advertisement consent',
  listed: 'Listed building consent',
  'building-regs': 'Building regulations',
  'none-usually': 'Often nothing new from the council',
};
