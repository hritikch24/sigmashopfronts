/**
 * What we make and fit, written from the side no one else writes it from:
 * what the council, building control and the standards will make of it.
 *
 * Written in plain English for shop owners, many of whom speak English as a
 * second language: short sentences, everyday words, and any trade word
 * explained the first time it appears (see "Plain English" in CLAUDE.md).
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
  /** Its /services/{slug} path on the old .com, if it had one. */
  legacySlug?: string;
  name: string;
  /** One line for index cards. */
  card: string;
  /** 2–3 sentences: what it is, who it suits, price band, where we cover. */
  answer: string;
  /** Key into data/costs.ts groups, if we publish typical prices for it. */
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
    card: 'Glass shopfronts in strong, painted aluminium frames, made to suit the building.',
    answer:
      'A complete new shop front in painted aluminium: frame, doors, glass, the sign board area and the low panel under the window. We fit them anywhere in the UK. They suit most shops, cafés and takeaways. A single front up to about four metres wide typically costs £2,000–£5,000. A new front almost always needs planning permission, so we design it to suit the council before we give you a price.',
    costGroup: 'shopfronts',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'A new shopfront changes how the building looks from the street, so it usually needs permission.' },
      { consent: 'advert', likelihood: 'often', why: 'The new sign needs its own permission. You are more likely to need it for a light-up sign, or any sign in a conservation area.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed for any change to a listed building, inside or out, before work starts.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'A new entrance must have safety glass, step-free access and a safe way out.' },
    ],
    sections: [
      {
        q: 'Will the council accept aluminium on an older building?',
        body: [
          'Often, yes. Councils rarely object to the metal itself. They object to the shape. Councils often refuse a front with one big sheet of glass from the pavement to the sign. They also refuse a sign board twice as deep as the old one, or a front with the old side columns and low panel taken out. An aluminium front that keeps those parts usually looks like a proper shopfront.',
          'On a listed building, or where the council asks for wood, ask the council before you choose. Some councils want old shopfronts repaired, not replaced at all.',
        ],
      },
      {
        q: 'What makes an aluminium front look right on a high street?',
        body: [
          'Three things. A low panel under the window, so the glass does not start at the pavement. A sign board sized to the building, not to the brand’s rules. And slim frames, so you see the glass more than the metal. Glass bars that line up with the windows above also help the shop fit in with its neighbours.',
          'Colour matters more than people expect. A dark colour, like dark grey, deep green or near-black, sits well on an old building. Bright white and silver stand out more.',
        ],
      },
      {
        q: 'How do I keep the shop secure without a shutter?',
        body: [
          'Laminated glass (glass that holds together when it breaks), a solid low panel and a good lock do most of the work. Many councils now ask for these before they will consider a shutter. If you still want a shutter, plan where its box goes at the drawing stage. Adding a shutter to a new front later is where most bad-looking shopfronts come from.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Safety glass in risky places: low glass, and glass in or next to doors.' },
      { ref: 'Approved Document M', what: 'Getting into and using the building, including door steps and door widths.' },
      { ref: 'BS EN 12150 / BS EN 14449', what: 'Toughened and laminated safety glass.' },
      { ref: 'BS EN 356', what: 'How well glass resists someone trying to break it, when laminated glass is used for security.' },
    ],
    questions: [
      {
        q: 'Do I need planning permission to replace a shopfront?',
        a: 'Usually yes, because a new shopfront changes how the building looks. A repair that keeps the same look usually does not. Your council gives the final answer. Our free permission check gives you a first idea.',
      },
      {
        q: 'Can you make an aluminium shopfront look traditional?',
        a: 'Yes. We can give it a traditional shape: a low panel, side columns, a sign board that suits the building and glass bars that line up with the floors above. We can also paint it a dark heritage colour. Whether a council accepts it on your building is their decision, so we show them the drawing early.',
      },
    ],
    photo: { src: '/assets/sigma-retail-front.jpeg', alt: 'Dark grey aluminium shopfront with a glazed entrance door, fixed glazing and a painted fascia above', w: 1600, h: 1200 },
    related: ['frameless-glass', 'aluminium-doors', 'roller-shutters'],
  },
  {
    slug: 'roller-shutters',
    legacySlug: 'roller-shutters',
    name: 'Roller shutters and grilles',
    card: 'Shutters and grilles chosen for your street, so the council is more likely to say yes.',
    answer:
      'Steel or aluminium shutters and grilles, pulled by hand or electric, fitted anywhere in the UK. Solid shutters on the outside are the most common reason councils refuse a shopfront plan. So we start with shutters inside the glass, or open grilles you can see through, and only fit solid ones where the street allows it. Typical prices are £800–£1,500 for a hand-pulled shutter and £1,200–£2,500 for an electric one.',
    costGroup: 'shutters',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'A shutter on the outside, with its box and side tracks, changes the look of the shop. A shutter inside, behind the glass, often does not need it.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed for any shutter on a listed building, even one fixed inside to old parts of the building.' },
      { consent: 'building-regs', likelihood: 'rarely', why: 'Mostly when a shutter closes off a fire exit or is part of a fire wall.' },
    ],
    sections: [
      {
        q: 'Why do councils refuse solid shutters?',
        body: [
          'A street of closed solid shutters looks dead after six o’clock. There is nothing to look at, no light on the pavement and no way to see inside. Councils link this to fear of crime and to graffiti. Most of the council guides we follow either ban solid outside shutters in conservation areas or allow them only in rare cases.',
          'Shutters with small holes (perforated shutters) do not get round this. Several councils say clearly that they look almost solid when they are down.',
        ],
      },
      {
        q: 'Which shutters are easiest to get approved?',
        body: [
          'From easiest to hardest: an open grille inside, behind the glass; a mesh grille you can take down; an open grille on the outside; a shutter with clear see-through panels; a shutter with small holes; and a solid shutter. Where the box goes matters too. It should sit behind the sign board, not be fixed on the front of the building.',
          'Colour is an easy win. A shutter painted to match the shopfront looks like part of it. Bare grey metal looks like an afterthought, and some councils say it is not acceptable.',
        ],
      },
      {
        q: 'Hand-pulled or electric?',
        body: [
          'Hand-pulled shutters suit narrow openings that are opened once a day. Wider or heavier shutters, or ones you open several times a day, should be electric. Electric shutters must meet a safety standard. It covers safety edges that stop the shutter if something is in the way, and safe stopping. These are required, not extras.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 13241', what: 'The main product standard for shutters, and for commercial, industrial and garage doors.' },
      { ref: 'BS EN 12453', what: 'Safety of electric doors and shutters: closing force, safety edges and stopping.' },
      { ref: 'LPS 1175', what: 'A security test against break-ins. Older grades go from SR1 to SR8. The newer Issue 8 uses grades like B3 or C5: the letter is the type of tools used, the number is how many minutes it held out.' },
      { ref: 'BS EN 16034', what: 'Fire resistance, used with BS EN 13241 for fire shutters.' },
    ],
    questions: [
      {
        q: 'Do I need planning permission for a roller shutter?',
        a: 'For a shutter on the outside, usually yes, because the shutter, box and tracks change how the shop looks. A shutter inside, behind the glass, often does not. On a listed building you may still need listed building consent.',
      },
      {
        q: 'Do councils treat shutters with small holes differently from solid ones?',
        a: 'Not much. Several councils treat shutters with small holes the same as solid ones, because from the street they look closed. Open grilles, brick-pattern grilles and clear see-through shutters are the types councils most often accept.',
      },
    ],
    photo: { src: '/assets/sigma-mall-front.jpeg', alt: 'Single-storey shop with a new dark aluminium glazed front and sliding doors, a roller shutter on the neighbouring unit', w: 1600, h: 1200 },
    related: ['shutter-repairs', 'industrial-shutters', 'aluminium', 'security-doors'],
  },
  {
    slug: 'security-doors',
    legacySlug: 'security-doors',
    name: 'Security doors',
    card: 'Strong steel doors for back, side and delivery entrances, tested against break-ins.',
    answer:
      'Steel doors for back doors, stock rooms, plant rooms and side entrances, fitted anywhere in the UK. They suit shops and businesses where the weak door is at the back or side, not at the front window. Typical prices start at £800–£1,500 for a standard steel door, and go up with the security grade.',
    costGroup: 'doors',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'sometimes', why: 'A back door rarely needs it. A new door at the front, on a side people can see, or in a conservation area may need it.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed to replace an old door or its frame on a listed building.' },
      { consent: 'building-regs', likelihood: 'often', why: 'If the door is a fire exit, people must be able to open it from inside without a key.' },
    ],
    sections: [
      {
        q: 'What does an LPS 1175 rating tell you?',
        body: [
          'It tells you how long a door held out in a test against a set attack with set tools. It does not mean the door can never be opened. The rating only counts if the whole door was tested together: door, frame, hinges, locks and fixings. A strong door in a weak frame is not a rated door.',
          'Ask for the certificate, and check that the product on it is the one being fitted. Sometimes your insurer asks for a certain rating. If so, they will want the paperwork too.',
        ],
      },
      {
        q: 'Can a security door also be a fire exit?',
        body: [
          'Yes, and it often has to be. A fire exit door must open from inside in one move, without a key. Staff-only exits use an emergency handle. Exits the public may use need a push bar. The security comes from the outside face and the frame, not from locking people in.',
        ],
      },
    ],
    standards: [
      { ref: 'LPS 1175', what: 'Security grade of the whole door against break-ins.' },
      { ref: 'BS EN 1627', what: 'Break-in resistance grades RC1 to RC6 for doors, windows and shutters.' },
      { ref: 'BS EN 179 / BS EN 1125', what: 'Emergency exit handles (staff only) and push bars (public exits).' },
    ],
    questions: [
      {
        q: 'Does a steel back door need planning permission?',
        a: 'Usually not, if it replaces a back door in the same opening. It may if the door faces the street, the opening changes, or the building is listed or in a conservation area. If any of those apply, ask the council.',
      },
    ],
    photo: { src: '/assets/sigma-commercial-entrance.jpeg', alt: 'Pair of fully glazed aluminium entrance doors with long pull handles under a glazed fanlight', w: 1024, h: 768 },
    related: ['fire-doors', 'roller-shutters', 'aluminium-doors', 'composite-doors'],
  },
  {
    slug: 'automatic-doors',
    legacySlug: 'automatic-doors',
    name: 'Automatic doors',
    card: 'Sliding and swing doors that open by themselves, fitted to the safety standards.',
    answer:
      'Electric sliding and swing doors for shop and office entrances, fitted anywhere in the UK. They suit busy entrances, food shops where staff carry stock in and out, and any business that wants an easier way in. Typical prices are £3,000–£6,000 for a sliding door where two doors slide apart, and £1,500–£3,000 to add a motor to a suitable door you already have.',
    costGroup: 'automatic',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'sometimes', why: 'Changing a door to an automatic one in the same shopfront often needs nothing new. A changed shopfront, or a motor box people can see on a protected building, can need it.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed if the motor or track is fixed to old parts of a listed building.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'A new entrance must stay step-free, wide enough, and safe to get out of if the power fails.' },
    ],
    sections: [
      {
        q: 'What happens to an automatic door in a fire or a power cut?',
        body: [
          'If the door is a fire exit, people must still be able to get out. Sliding doors on fire exits usually have panels you can push open, or they open by themselves when the power or fire alarm signal is lost. This is decided on the drawing, not on the day of fitting.',
        ],
      },
      {
        q: 'Does an automatic door help with the Equality Act?',
        body: [
          'Yes. It is one of the clearest changes a shop can make to help disabled customers get in, especially with no step at the door. But it does not replace the other checks: door width, step height and the handles on any door you open by hand. Building control will look at those anyway.',
        ],
      },
      {
        q: 'Do you fit them inside too?',
        body: [
          'Yes. Not every automatic door is a shop entrance. We also fit them inside, for example a sliding door into a cold drinks room. Staff and customers go through it all day, and a normal door gets left open. The safety standards are the same. Planning rules usually do not cover a door inside the shop.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 16005', what: 'Safety of electric doors that people walk through.' },
      { ref: 'BS 7036-0', what: 'Guidance on safety at electric doors for people on foot.' },
      { ref: 'Approved Document M', what: 'Door widths and step-free entrances.' },
    ],
    questions: [
      {
        q: 'Do automatic doors need servicing?',
        a: 'Yes. Sensors and safety settings change over time, and the safety standard expects the doors to be checked and looked after. Ask whoever fits yours how often it should be serviced and what gets checked.',
      },
    ],
    photo: { src: '/assets/automatic-door-sigma.jpeg', alt: 'Automatic sliding glass door in a dark aluminium frame opening into a shop with drinks shelving', w: 480, h: 848 },
    related: ['aluminium-doors', 'aluminium', 'repairs'],
  },
  {
    slug: 'folding-doors',
    legacySlug: 'bi-fold-doors',
    name: 'Folding glazed doors',
    card: 'Folding glass doors that open a café or restaurant to the street, and still lock up properly.',
    answer:
      'Aluminium folding doors with several glass panels that open up most of the shop front. We fit them anywhere in the UK. They suit cafés, bars and restaurants that open onto the pavement in good weather. Typical prices are £3,000–£5,000 for three panels, up to £8,000–£14,000 for eight panels.',
    costGroup: 'folding',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'Opening up the front changes how it looks. A café opening onto the street can also raise other questions for the council.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Almost always needed on a listed shopfront, and hard to get.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Fire exits, safety glass and door steps all have rules.' },
    ],
    sections: [
      {
        q: 'Will a council allow folding doors on an old-style shopfront?',
        body: [
          'It depends a lot on the building. On a modern shop they are often fine. On an old-style front, folding doors replace the low panel, side columns and fixed glass with a row of frames. When the doors are shut, it rarely looks like a proper shopfront. Show the council a drawing of the doors closed, not only a summer photo.',
        ],
      },
      {
        q: 'Can folding doors be a fire exit?',
        body: [
          'They make a poor main fire exit, because each panel has to be unlocked and folded in order. Keep a normal door as the fire exit, either in the same front or somewhere else.',
        ],
      },
      {
        q: 'Do I need permission from the council to put tables outside?',
        body: [
          'Permission for the doors and permission for tables on the pavement are two different things. Tables and chairs on the pavement usually need a pavement licence from the council. Check this before you design the doors around it.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Safety glass in doors and side panels.' },
      { ref: 'Approved Document B', what: 'Fire safety, including fire exit doors and routes.' },
      { ref: 'BS EN 14351-1', what: 'Product standard for windows and outside doors.' },
    ],
    questions: [
      {
        q: 'How secure are folding doors when closed?',
        a: 'A good commercial set, with locks at several points, laminated glass and secure locks between panels, is reasonably secure. But it is not a shutter. On a high-risk shop, plan a grille or shutter inside from the start.',
      },
    ],
    related: ['aluminium', 'frameless-glass', 'roller-shutters'],
  },
  {
    slug: 'fire-doors',
    legacySlug: 'fire-doors',
    name: 'Fire doors',
    card: 'Certified fire doors for stairs, plant rooms and fire exits, fitted so the rating still counts.',
    answer:
      'Certified fire doors, such as FD30 and FD60, for shops and businesses anywhere in the UK. They suit stairways, plant rooms, bin stores, kitchens and any door your fire risk assessment says must be a fire door. Typical prices are £400–£800 for an FD30 single door and £600–£1,200 for FD60.',
    costGroup: 'fire',
    area: 'uk',
    consents: [
      { consent: 'building-regs', likelihood: 'often', why: 'New fire walls and fire exit routes come under building regulations.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed to upgrade or replace old inside doors in a listed building.' },
      { consent: 'none-usually', likelihood: 'usually', why: 'Planning rules rarely cover fire doors inside the building.' },
    ],
    sections: [
      {
        q: 'Who is responsible for the fire doors in a shop?',
        body: [
          'The “responsible person” under the Regulatory Reform (Fire Safety) Order 2005. This is usually the employer, or whoever is in charge of the building. Your fire risk assessment should list which doors are fire doors and how they are checked. We fit and repair fire doors. The fire risk assessment is a separate job.',
        ],
      },
      {
        q: 'What do FD30 and FD60 mean?',
        body: [
          'The number is how many minutes the door held back fire in a test. An “S” after it, as in FD30S, means it also has smoke seals. The rating belongs to the whole door set: door, frame, fire seals, hinges, closer and glass. If you swap a hinge for a cheaper one, or cut a window into the door on site, it is no longer a rated fire door.',
        ],
      },
    ],
    standards: [
      { ref: 'BS 476-22 / BS EN 1634-1', what: 'The fire tests behind FD and E/EI ratings.' },
      { ref: 'Approved Document B', what: 'Where fire doors are needed and how they must work.' },
      { ref: 'Regulatory Reform (Fire Safety) Order 2005', what: 'What the responsible person must do in shops, offices and other non-home buildings.' },
    ],
    questions: [
      {
        q: 'Can you repair a fire door, or does it need replacing?',
        a: 'Many faults can be repaired and keep the rating, using parts that match the certificate. These include gaps, damaged seals, a closer that no longer shuts the door, and worn hinges. If the door itself is damaged, it often needs replacing.',
      },
    ],
    related: ['security-doors', 'repairs', 'aluminium-doors'],
  },
  {
    slug: 'repairs',
    legacySlug: 'shopfront-repairs',
    name: 'Shopfront repairs',
    card: 'Doors that drop, locks that stick, frames that leak: fixed within 100 road miles of Birmingham.',
    answer:
      'Repairs to aluminium and glass shopfronts: doors that have dropped or drag on the floor, worn door closers, broken locks, leaking frames and damaged panels. We cover shops and businesses within 100 road miles of Birmingham. We usually price a repair after we have seen the fault, and you get the price in writing before any work.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'A repair that keeps the same look usually needs no planning permission.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Some repairs to a listed building still need consent, for example replacing old glass or old woodwork.' },
    ],
    sections: [
      {
        q: 'Is it worth repairing an old shopfront instead of replacing it?',
        body: [
          'Often, yes, and the council may prefer it. Some councils will not let you remove an old shopfront in a conservation area unless you show it cannot be repaired. If the front is solid but a door closer has failed or a door has dropped, that is a repair, not a new front.',
        ],
      },
      {
        q: 'What usually goes wrong with an aluminium shop door?',
        body: [
          'The closer in the floor or above the door wears out, so the door slams or will not shut. The top hinge point works loose, so the door drops and drags. The lock goes out of line. Or the rubber seals wear out, and the frame starts to whistle and leak. Most of these are fixed in one visit once we know which part is needed.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'New glass in risky places must be safety glass.' },
      { ref: 'BS EN 1154', what: 'The standard for door closers, including closers in the floor.' },
    ],
    questions: [
      {
        q: 'Do you repair shopfronts you did not fit?',
        a: 'Yes. Most repair calls are for fronts fitted by someone else, often years ago. A photo of the fault, and of any maker’s label on the frame or closer, helps us bring the right part.',
      },
    ],
    photo: { src: '/assets/sigma-front-wide.jpeg', alt: 'Black-framed internal glazed screen with a glazed door, set in a newly fitted office', w: 1600, h: 1200 },
    related: ['emergency-repairs', 'shutter-repairs', 'glass-replacement'],
  },
  {
    slug: 'emergency-repairs',
    legacySlug: 'emergency-callout',
    name: 'Emergency repairs',
    card: 'Break-ins, smashed glass and stuck shutters: a reply within two hours, out the same day.',
    answer:
      'Making your shop safe and secure after a break-in, an accident or a broken shutter, within 100 road miles of Birmingham. We reply to emergency repair calls within two hours and come out the same day. When we reply, we agree with you what we can do and when. The first job is usually boarding up, fitting temporary glass, or getting a stuck shutter open or locked.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Boarding up to make a shop safe does not need permission.' },
      { consent: 'listed', likelihood: 'rarely', why: 'Take care fixing boards to old woodwork. The permanent repair may need consent.' },
    ],
    sections: [
      {
        q: 'What does the two-hour promise mean?',
        body: [
          'It means a person replies to you within two hours of your call or message. It does not mean a van arrives within two hours. When we speak, we tell you honestly what time we can be there that day and what we can do on that visit.',
        ],
      },
      {
        q: 'What should I do before anyone arrives?',
        body: [
          'Keep people away from broken glass. If there has been a break-in, report it to the police and get a crime reference number. Your insurer will want it. So will the council, if you later apply for a shutter on the outside. Take photos of the damage before anything is moved.',
        ],
      },
      {
        q: 'Is the permanent repair the same visit?',
        body: [
          'Not always. Toughened glass cannot be cut after it is made, so a new pane has to be made to size, which takes a few days. On the first visit we make the shop secure. On the second visit we fit the glass. A smashed window is also a good time to change to laminated glass, which many councils prefer to a shutter.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 12150', what: 'Toughened safety glass: made to size, cannot be cut afterwards.' },
      { ref: 'BS EN 14449', what: 'Laminated glass, which holds together when broken.' },
    ],
    questions: [
      {
        q: 'How quickly will someone get to me?',
        a: 'We reply to emergency repair calls within two hours and come out the same day. The time we arrive depends on where you are. We tell you that time when we reply, so you are not left waiting.',
      },
    ],
    related: ['glass-replacement', 'shutter-repairs', 'repairs'],
  },
  {
    slug: 'shutter-repairs',
    legacySlug: 'shutter-repair',
    name: 'Shutter repairs',
    card: 'Stuck, noisy and broken shutters repaired within 100 road miles of Birmingham.',
    answer:
      'Repairs to hand-pulled and electric roller shutters and grilles: stuck shutters, broken springs, failed motors, bent side tracks and damaged slats. We cover shops and businesses within 100 road miles of Birmingham. We reply to emergency calls within two hours and come out the same day. Once we find the fault, you get the price in writing.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Repairing a shutter that was approved, and keeping the same look, usually needs nothing from the council.' },
      { consent: 'planning', likelihood: 'sometimes', why: 'Changing to a different shutter can. Some councils now treat a new outside shutter as a new application, even when it replaces an old one.' },
    ],
    sections: [
      {
        q: 'Should I repair the shutter or replace it?',
        body: [
          'If the box, the roller and the side tracks are in good shape, a repair is almost always cheaper. Replacing makes sense when the shutter itself is badly damaged, when both the motor and the spring have gone, or when it is the wrong type for the street. One thing to know first: some councils now want the same reasons for a replacement outside shutter as for a new one. Bradford’s 2026 guide, for example, asks for a Crime Impact Statement.',
        ],
      },
      {
        q: 'Did my shutter have permission when it was fitted?',
        body: [
          'Check this before you spend money on it. Councils do take action over outside shutters fitted without permission. Sheffield’s published list of enforcement notices for 2022–2026 includes several that made owners remove shutters and their boxes. If yours never had permission, repairing it keeps the problem. Changing to a shutter inside, or an open grille, may solve it.',
        ],
      },
      {
        q: 'Why does my electric shutter stop halfway?',
        body: [
          'Usually the stop settings have moved, a safety edge thinks something is in the way, or the motor has overheated from being used again and again. Do not keep pressing the button. It can burn out the motor or pull the shutter out of its tracks.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 12453', what: 'Safety of electric doors and shutters: what must be checked after a repair.' },
      { ref: 'BS EN 13241', what: 'The product standard the shutter was sold under.' },
    ],
    questions: [
      {
        q: 'Can you repair a shutter another company fitted?',
        a: 'Yes. A photo of the label on the motor, and of the end of the shutter box, helps us bring the right parts on the first visit.',
      },
    ],
    related: ['roller-shutters', 'emergency-repairs', 'repairs'],
  },
  {
    slug: 'glass-replacement',
    legacySlug: 'glass-replacement',
    name: 'Shopfront glass replacement',
    card: 'Broken glass replaced with the right safety glass, and a chance to upgrade to laminated.',
    answer:
      'Replacing broken or misted shopfront glass, from one door pane to a full shop window, within 100 road miles of Birmingham. Glass in shop doors and low panes must be safety glass. A replacement is also the cheapest time to change to laminated glass. The price depends on size, glass type and access, and we give it after measuring.',
    area: 'repair-radius',
    consents: [
      { consent: 'none-usually', likelihood: 'usually', why: 'Replacing glass with the same kind needs no planning permission.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed on a listed building to replace old glass, or to add window film or etched lettering.' },
      { consent: 'building-regs', likelihood: 'often', why: 'Glass in risky places must meet the safety glass rules, even if you replace only one pane.' },
    ],
    sections: [
      {
        q: 'Toughened or laminated glass?',
        body: [
          'Toughened glass is strong. But when it breaks, it falls into small pieces and leaves an open hole. Laminated glass cracks but stays in the frame, held together by a layer inside it. That is why councils keep suggesting it instead of shutters. Laminated security glass is graded by how well it resists attack, so ask which grade you are being offered.',
        ],
      },
      {
        q: 'Where must the glass be safety glass?',
        body: [
          'In the risky places set out in building regulations. In walls and screens, that is from the floor up to 800 mm. In a door, or a side panel within 300 mm of a door’s edge, it is up to 1500 mm. In a shopfront, that covers most of the glass.',
        ],
      },
      {
        q: 'Why can’t you cut toughened glass on the day?',
        body: [
          'Toughened glass is cut to its final size first and then heated to make it strong. If you cut it after that, it shatters. That is why a replacement usually means one visit to make the shop safe, and a second visit a few days later to fit the glass.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Protection from impact: the risky places where safety glass is needed.' },
      { ref: 'BS EN 12600', what: 'Impact test grades for safety glass.' },
      { ref: 'BS EN 356', what: 'How well security glass resists attack (grades P1A to P8B).' },
    ],
    questions: [
      {
        q: 'Will laminated glass stop a break-in?',
        a: 'It slows a break-in down and keeps the window closed after it is hit. That is why many councils prefer it to a shutter on the outside. Higher grades hold out for longer. It is not a safe door, so on a high-risk shop it is often used with a grille inside.',
      },
    ],
    related: ['emergency-repairs', 'aluminium', 'frameless-glass'],
  },
  {
    slug: 'aluminium-doors',
    legacySlug: 'aluminium-doors',
    name: 'Aluminium entrance doors',
    card: 'Strong shop entrance doors with smooth closers and no step at the door.',
    answer:
      'Aluminium entrance doors for shops, offices and shared entrances, fitted anywhere in the UK. They suit a shopfront that is still in good shape but has a worn-out door, as well as new fronts. Fitting a new door in a good frame is usually a quick job. The price depends on size, glass and handles, and you get it in writing.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'sometimes', why: 'A new door in the same style, in the same front, rarely needs it. Changing the opening or the look on a protected building can.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed for any change to an old entrance on a listed building.' },
      { consent: 'building-regs', likelihood: 'often', why: 'A public entrance has rules on door width, the step and safety glass.' },
    ],
    sections: [
      {
        q: 'Closer in the floor or above the door?',
        body: [
          'A closer in the floor is hidden and gives the cleanest look. It suits old buildings and all-glass doors, but we have to cut a hole in the floor for it. A closer above the door is easier to fit to an existing door and easier to service. Both come in power sizes, which must match the door’s width and weight.',
        ],
      },
      {
        q: 'What makes an entrance door easy for everyone to use?',
        body: [
          'No step at the door. Enough space to get through when the door is open. A door light enough for a wheelchair user, or a parent with a pushchair, to open. And handles at a height people can reach. A heavy glass door on a strong closer fails the third test more often than any other.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 1154', what: 'Door closers, including closers in the floor.' },
      { ref: 'Approved Document M', what: 'Entrance widths, steps and how hard a door is to open.' },
      { ref: 'BS EN 14351-1', what: 'Product standard for outside doors.' },
    ],
    questions: [
      {
        q: 'Can you replace just the door and keep the shopfront?',
        a: 'Usually, if the frame is in good shape and straight. We check the frame and the floor when we visit. A door hung in a bent frame will drop again, however good the door is.',
      },
    ],
    photo: { src: '/assets/sigma-modern-front.jpeg', alt: 'Shopfront under construction: a new dark aluminium frame with a glazed door, protective tape on the floor', w: 1600, h: 1200 },
    related: ['automatic-doors', 'aluminium', 'repairs'],
  },
  {
    slug: 'aluminium-windows',
    legacySlug: 'aluminium-windows',
    name: 'Commercial aluminium windows',
    card: 'Windows for the floors above the shop, chosen to suit the street and keep the heat in.',
    answer:
      'Aluminium windows for business buildings and the floors above shops, fitted anywhere in the UK. They suit offices, flats over shops and buildings with both, where the old windows have failed. The price depends on size, how the windows open and the glass. We give it after a site visit.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'often', why: 'Changing the material, the glass pattern or the way windows open on a business building often needs permission, more so in a conservation area.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Needed to replace old windows on a listed building, and councils often say no.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'New windows have rules on keeping heat in, safety glass and, in some rooms, fresh air and a way out in a fire.' },
    ],
    sections: [
      {
        q: 'Why do the upstairs windows matter on a shopfront job?',
        body: [
          'Because from the street, people see the building as one thing. A shopfront that lines up with the windows above fits in with its neighbours. A new front under a row of mismatched windows looks stuck on. Councils checking a shopfront often look at the floors above too.',
        ],
      },
      {
        q: 'Does an Article 4 direction affect business windows?',
        body: [
          'An Article 4 direction is a council rule that takes away some changes you could normally make without permission. It is mostly used for houses. A business building has fewer of these rights anyway, so changing its windows usually needs permission already. Flats above shops are where it gets complicated. Check the council’s Article 4 map for your street.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 14351-1', what: 'Product standard for windows.' },
      { ref: 'Approved Document L', what: 'Keeping heat in, for replacement windows.' },
      { ref: 'Approved Document K', what: 'Safety glass in risky places.' },
    ],
    questions: [
      {
        q: 'Do new windows on a shop need building control?',
        a: 'Yes, new windows come under building regulations. Some registered installers can sign off their own work. If not, building control must be told. Ask your installer how the work will be signed off before it starts.',
      },
    ],
    related: ['aluminium', 'curtain-walling', 'glass-replacement', 'house-windows'],
  },
  {
    slug: 'curtain-walling',
    legacySlug: 'curtain-walling',
    name: 'Curtain walling',
    card: 'Full glass walls for new business buildings and big refits.',
    answer:
      'Aluminium and glass walls, called curtain walling, for showrooms, offices and new business buildings, fitted anywhere in the UK. It suits new buildings and walls of glass over more than one floor, not a single shop. We design and price every job separately from the drawings.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'A new or re-covered outside wall is a big change to how a building looks.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'Strength, fire safety of the outside wall, keeping heat in and safety glass all have rules.' },
    ],
    sections: [
      {
        q: 'Is curtain walling right for a shop?',
        body: [
          'Rarely for one shop on an old street. A shopfront with a sign board and a low panel under the window fits there better. Curtain walling is best on new buildings, car showrooms and corner buildings that were designed to be glass from the start.',
        ],
      },
      {
        q: 'Who designs it?',
        body: [
          'Curtain walling has to be worked out by engineers. Wind, bending, movement and fixings are all calculated. On bigger jobs, the system maker’s engineers and the project’s structural engineer approve it. Our part is to make it and fit it to that design.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 13830', what: 'Product standard for curtain walling.' },
      { ref: 'Approved Document B', what: 'Fire safety of outside walls.' },
      { ref: 'CWCT Standard for systemised building envelopes', what: 'Industry test and performance standard.' },
    ],
    questions: [
      {
        q: 'What is the difference between curtain walling and a shopfront?',
        a: 'A shopfront fills one opening on one floor. Curtain walling hangs on the building’s frame across several floors. It is designed to handle wind and movement over that height.',
      },
    ],
    related: ['aluminium', 'frameless-glass', 'aluminium-windows'],
  },
  {
    slug: 'frameless-glass',
    legacySlug: 'glass-shopfronts',
    name: 'Frameless glass fronts',
    card: 'All-glass fronts with almost no frame, for shops where the view inside is the point.',
    answer:
      'Glass shopfronts with little or no frame showing, with glass doors and glass supports, fitted anywhere in the UK. They suit modern buildings, showrooms and inside shopping centres. On an old-style street the council is less likely to agree. We will tell you that before you decide.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'usually', why: 'A new glass front changes how the building looks, often a lot.' },
      { consent: 'advert', likelihood: 'often', why: 'Lettering on the glass, or a sign above it, can need sign permission.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'All the glass must be safety glass, with markings so people can see it.' },
    ],
    sections: [
      {
        q: 'Will the council accept an all-glass front?',
        body: [
          'On an old building, not often. All-glass fronts remove the parts that council heritage rules ask you to keep: the low panel, side columns, sign board and glass bars. On a modern building, or inside a shopping centre, it is often the best choice.',
        ],
      },
      {
        q: 'Why are there dots or strips on glass fronts?',
        body: [
          'They are markings that help people see large glass so they do not walk into it. Building regulations expect them on glass doors and glass walls that people could mistake for an open space. They go at two heights: about 850–1000 mm and 1400–1600 mm from the floor.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document K', what: 'Safety glass, and markings on glass.' },
      { ref: 'BS EN 12150 / BS EN 14449', what: 'Toughened and laminated glass.' },
      { ref: 'BS 6180', what: 'Barriers in and around buildings, where glass acts as a barrier.' },
    ],
    questions: [
      {
        q: 'How do you secure an all-glass front at night?',
        a: 'Start with laminated glass and good locks on the glass doors. If you need more, a grille or shutter inside, behind the glass, keeps the clean look from outside. A shutter box on the outside of an all-glass front is very hard to hide.',
      },
    ],
    related: ['aluminium', 'curtain-walling', 'glass-replacement'],
  },
  {
    slug: 'industrial-shutters',
    name: 'Industrial shutters',
    card: 'Big steel and insulated roller doors for warehouses, workshops and loading bays.',
    answer:
      'Steel and insulated roller shutters for warehouses, factories, workshops and loading bays, pulled by hand or electric, fitted anywhere in the UK. They suit openings that vans and lorries drive through, and doors that open many times a day. We size each one to its opening and to the wind on your site. We visit first, and then give you the price in writing.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'rarely', why: 'A new shutter in an existing opening on an industrial building rarely needs permission. Making a new opening, or working on a unit next to homes or in a conservation area, can.' },
      { consent: 'building-regs', likelihood: 'sometimes', why: 'If the building is heated, or the shutter is in a fire wall, the new door must meet the heat or fire rules.' },
    ],
    sections: [
      {
        q: 'Why does an industrial door need a wind rating?',
        body: [
          'A shutter several metres wide catches the wind like a sail. It has to hold against the wind on your site without bending and pulling out of its tracks. An open estate near the coast gets far more wind than a sheltered yard. Doors are graded for this under BS EN 12424. Wind locks on the ends of the slats keep a wide shutter in its tracks.',
        ],
      },
      {
        q: 'Insulated or single-skin?',
        body: [
          'A single layer of steel is fine for an unheated store, or an opening that only needs locking. In a heated building, insulated slats (two layers of steel with foam between) cut heat loss and damp. Approved Document L limits how much heat a large vehicle door in a heated building can let out.',
        ],
      },
      {
        q: 'What keeps an electric industrial door safe?',
        body: [
          'The danger is a heavy shutter coming down on a person or a vehicle. BS EN 12453 sets the safety features an electric door needs: limits on closing force, safety edges or light sensors, and a way to free someone who is trapped. The Workplace (Health, Safety and Welfare) Regulations 1992 say doors at work must have these features and be kept working. In practice that means regular servicing, with a written record.',
        ],
      },
    ],
    standards: [
      { ref: 'BS EN 13241', what: 'Product standard for industrial and commercial doors, which says how the shutter performs.' },
      { ref: 'BS EN 12424', what: 'Grades for how much wind a door can take.' },
      { ref: 'BS EN 12453', what: 'Electric doors: closing force, safety edges, light sensors and release.' },
      { ref: 'BS EN 16034', what: 'Fire resistance, where the shutter is also a fire shutter.' },
    ],
    questions: [
      {
        q: 'Can you make a hand-pulled industrial shutter electric?',
        a: 'Often, if the shutter, roller and tracks are in good shape and the shutter is not too heavy for an add-on motor. Once it is electric, it must meet the safety standard for electric doors. So the job includes safety edges and a manual release, not only a motor.',
      },
    ],
    photo: { src: '/assets/sigma-industrial-shutter.jpg', alt: 'Dark green steel roller shutter closed across a loading opening in a clad industrial unit, with a yellow bottom rail', w: 1000, h: 1000 },
    related: ['roller-shutters', 'shutter-repairs', 'fire-doors'],
  },
  {
    slug: 'upvc-doors',
    name: 'uPVC doors',
    card: 'Front, back and flat doors in uPVC, for homes and the back of the shop.',
    answer:
      'uPVC doors for houses, flats over shops, and the back or side doors of shops and businesses, fitted anywhere in the UK. They suit doors where low upkeep and a warm, draught-free door matter more than an old-fashioned look. Every door is made to measure, so we measure the opening first and give you the price in writing.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'rarely', why: 'On a house, a new door that looks like the old one is normally allowed without permission. Flats, Article 4 areas and doors on the street side of a shop have different rules.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Any new door on a listed building needs consent, and uPVC in place of an old door is rarely accepted.' },
      { consent: 'building-regs', likelihood: 'often', why: 'A new door that is more than half glass comes under building regulations: keeping heat in and safety glass.' },
    ],
    sections: [
      {
        q: 'Does a new uPVC door need planning permission?',
        body: [
          'For a house, usually not. You can normally replace a door with one that looks like the old one without permission. There are three exceptions. Flats do not have these rights. Some houses, usually in conservation areas, lose them because the council has made an Article 4 direction. And listed buildings need consent whatever the material.',
          'On a business building, the question is whether the change makes the building look different. Replacing a back door with a similar one rarely does. Replacing an old wooden door at the front with white uPVC can, and councils often refuse this in conservation areas.',
        ],
      },
      {
        q: 'Who signs off the building regulations?',
        body: [
          'If a door is more than half glass, the work must be signed off. Either the installer is a member of an approved scheme and signs off their own work, or the council’s building control is told before work starts. Ask which way your installer will do it before you agree a price. Keep the certificate at the end. A solicitor will ask for it if you sell.',
        ],
      },
      {
        q: 'What makes one uPVC door more secure than another?',
        body: [
          'The locks and the glass, more than the plastic. Look for a lock that locks into the frame at several points. Look for a lock barrel rated TS 007 three-star or SS 312 Diamond, so it resists snapping. Use laminated glass in any glass panel. And choose a door tested to PAS 24.',
        ],
      },
    ],
    standards: [
      { ref: 'BS 7412', what: 'Standard for uPVC windows and doors.' },
      { ref: 'PAS 24', what: 'Security test for doors and windows.' },
      { ref: 'TS 007 / SS 312', what: 'Grades for lock barrels that resist snapping and other attacks.' },
      { ref: 'Approved Document L', what: 'Keeping heat in, for new doors and windows in homes.' },
    ],
    questions: [
      {
        q: 'Is a uPVC door good for the back of a shop?',
        a: 'For a staff, delivery or flat door at the back, often yes. A main customer door that opens hundreds of times a day wears uPVC out quickly. An aluminium door on a proper closer lasts much longer there.',
      },
    ],
    related: ['composite-doors', 'house-windows', 'security-doors'],
  },
  {
    slug: 'composite-doors',
    name: 'Composite doors',
    card: 'Heavy, strong front doors in traditional styles, for houses and flats over shops.',
    answer:
      'Composite doors have a strong core covered by a weatherproof outer layer, in many styles and colours. We fit them anywhere in the UK, for houses and for flats above shops. They suit a front door that should feel solid and look traditional, without the upkeep of wood. Each door is made to order after we measure, and you get the price in writing.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'rarely', why: 'On a house, a new front door that looks like the old one is normally allowed without permission. Flats and Article 4 areas lose that right.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'A listed building needs consent for a new door, and councils usually expect wood.' },
      { consent: 'building-regs', likelihood: 'sometimes', why: 'A door that is more than half glass must be signed off. A flat door onto a shared stair or landing must stay a fire door.' },
    ],
    sections: [
      {
        q: 'Composite or uPVC?',
        body: [
          'A uPVC door is a panel in a uPVC frame. A composite door is a thicker, heavier door with a solid wood or foam core and a tough plastic outer layer. It usually hangs in a uPVC or aluminium frame. A composite door feels more like wood and takes wood-grain finishes and deep colours better. A uPVC door costs less. Both rely on the same locks and glass for security.',
        ],
      },
      {
        q: 'What about the front door of a flat above a shop?',
        body: [
          'If the flat door opens onto a shared stair or landing, its job is to hold back fire and smoke while people get out. So it should be a certified fire door, usually FD30S, with a closer and smoke seals. A normal composite front door is not a fire door, however solid it looks. Fire-rated composite doors do exist, but the whole set must be the one that was tested: frame, glass, seals and handles.',
          'In blocks of flats where the top floor is more than 11 metres above the ground, the Fire Safety (England) Regulations 2022 apply. The responsible person must try to check flat front doors every year, and fire doors in shared areas every three months.',
        ],
      },
      {
        q: 'Why does a dark composite door sometimes stick in summer?',
        body: [
          'In full sun, a dark outer layer gets much hotter than the inside. The door can bend slightly and catch at the top or bottom. Most doors go back to normal as they cool. If one keeps catching, the hinges or lock usually need adjusting, not a new door.',
        ],
      },
    ],
    standards: [
      { ref: 'PAS 24', what: 'The security test a break-in-resistant composite door should have passed.' },
      { ref: 'BS 476-22 / BS EN 1634-1', what: 'Fire tests for doors, where the door must also be a fire door.' },
      { ref: 'Approved Document B', what: 'Fire safety, including flat front doors onto shared areas.' },
      { ref: 'BS EN 14351-1', what: 'Product standard that says how an outside door performs.' },
    ],
    questions: [
      {
        q: 'Can a composite door be a fire door?',
        a: 'Yes, if it is supplied and fitted as a certified fire door set, with the frame, glass, seals and closer it was tested with. A fire-rated door hung in an ordinary frame is not a fire door.',
      },
    ],
    related: ['upvc-doors', 'fire-doors', 'security-doors'],
  },
  {
    slug: 'house-windows',
    name: 'House windows',
    card: 'New double- and triple-glazed windows for homes and flats, in uPVC or aluminium.',
    answer:
      'New double- and triple-glazed windows for houses and flats, in uPVC or aluminium, fitted anywhere in the UK. They suit homes with misted glass, rotting frames or draughts. They also suit flats over shops, where the windows are part of the same building as the shopfront. We measure every window and give you the price in writing.',
    area: 'uk',
    consents: [
      { consent: 'planning', likelihood: 'rarely', why: 'On a house, new windows that look like the old ones are normally allowed without permission. Flats, Article 4 areas and new bay windows are the exceptions.' },
      { consent: 'listed', likelihood: 'sometimes', why: 'Listed buildings need consent, and councils often refuse uPVC in place of old windows.' },
      { consent: 'building-regs', likelihood: 'usually', why: 'New windows come under building regulations: keeping heat in, safety glass, fresh air and, upstairs, a way out in a fire.' },
    ],
    sections: [
      {
        q: 'Do I need permission to replace my windows?',
        body: [
          'On a house, normally not, as long as the new windows look like the old ones. That is the test the Planning Portal gives. A new bay window counts as an extension. Upstairs windows in a side wall must have frosted glass, and must either not open or open only above 1.7 metres from the floor.',
          'Flats do not have the same rights as houses, so a change of material or style can need planning permission. Councils usually accept a true like-for-like replacement without it. In a conservation area, check for an Article 4 direction first. Councils use them to stop old wooden sash windows being swapped for uPVC.',
        ],
      },
      {
        q: 'What does building control check on a new window?',
        body: [
          'Four things. Keeping heat in, under Approved Document L. Safety glass in risky places, such as low panes and glass in or next to doors, under Approved Document K. Fresh air: under Approved Document F, a new window should not leave the room with less air than before, which usually means small vents in the frame. And a way out: under Approved Document B, an upstairs window used as a fire escape must still open wide enough.',
          'Either an installer in an approved scheme signs off the work, or building control is told. Ask which before you agree a price, and keep the certificate.',
        ],
      },
      {
        q: 'Should the windows above a shop match the shopfront?',
        body: [
          'From the street, the upstairs windows and the shopfront are seen as one building. Council shopfront guides often ask that a new front suits the floors above, and the same idea works the other way. Choosing a frame colour and glass pattern that go with the shopfront costs almost nothing extra. It makes the building look planned, not patched.',
        ],
      },
    ],
    standards: [
      { ref: 'Approved Document L', what: 'Keeping heat in, for new windows in homes.' },
      { ref: 'Approved Document F', what: 'Fresh air when windows are replaced.' },
      { ref: 'Approved Document K', what: 'Safety glass in risky places.' },
      { ref: 'BS 6375', what: 'How windows and doors perform: keeping weather out, opening and strength.' },
    ],
    questions: [
      {
        q: 'Double or triple glazing?',
        a: 'A good double-glazed window meets the current standard for new windows. Triple glazing is warmer and quieter next to a busy road, but heavier and dearer. It is worth it for noisy or north-facing rooms.',
      },
    ],
    related: ['upvc-doors', 'composite-doors', 'aluminium-windows'],
  },
];

export const shopfrontBySlug = new Map(shopfronts.map((s) => [s.slug, s]));

export const consentLabel: Record<Consent, string> = {
  planning: 'Planning permission',
  advert: 'Sign permission (advertisement consent)',
  listed: 'Listed building consent',
  'building-regs': 'Building regulations',
  'none-usually': 'Usually nothing from the council',
};
