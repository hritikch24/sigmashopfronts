/**
 * Garage door repairs and installation. DRAFT: the owner has not yet
 * confirmed this work (see `garageDoors` in lib/business.ts). Nothing here is
 * public until `garageDoors.published` is true.
 *
 * Same Plain English rules as data/shopfronts.ts. Two more for garage doors:
 *  - Never tell a customer how to adjust or change a spring, a cable, or
 *    anything inside a motor. Safe checks only (power, remote battery,
 *    blocked sensors), then call us.
 *  - No prices until the owner gives them. No maker names until the owner
 *    confirms Sigma buys from that maker.
 */
import type { ConsentLine } from './shopfronts';
import type { GarageDoorType } from '@/lib/business';

export interface GaragePage {
  path: '/garage-door-repairs' | '/garage-door-installation';
  /** The H1, and the start of the <title>. */
  name: string;
  title: string;
  /** Meta description, under 155 characters with all four types. `{types}` as below. */
  description: string;
  /** Answer-first opening. `{types}` is replaced with the confirmed door types. */
  answer: string;
  /** One short paragraph per door type; only confirmed types are shown. */
  types: Record<GarageDoorType, string>;
  typesHeading: string;
  sections: { id?: string; q: string; body: string[] }[];
  steps: string[];
  priceFactors: string[];
  notCovered: string[];
  consents: ConsentLine[];
  standards: { ref: string; what: string }[];
  questions: { q: string; a: string }[];
  related: { href: string; label: string; why: string }[];
}

export const doorTypeName: Record<GarageDoorType, string> = {
  roller: 'roller',
  sectional: 'sectional',
  'up-and-over': 'up-and-over',
  'side-hinged': 'side-hinged',
};

export const garageRepairs: GaragePage = {
  path: '/garage-door-repairs',
  name: 'Garage door repairs',
  title: 'Garage door repairs: springs, cables, motors and remotes',
  description: 'Repairs to {types} garage doors: springs, cables, motors and remotes. Send a photo. You get the price in writing.',
  answer:
    'We repair {types} garage doors at homes and businesses. That includes doors that are stuck, noisy or off their track, broken springs and cables, and electric doors whose motor or remote has stopped working. Send us a photo first. You get the price in writing before any work starts.',
  typesHeading: 'Which garage doors do you repair?',
  types: {
    roller:
      'Roller garage doors roll up into a box above the opening. Common repairs are slats bent by a car, doors that run at an angle and catch, worn side tracks, and failed motors.',
    sectional:
      'Sectional doors are four or five panels that run up and back under the garage ceiling on small wheels. The usual faults are a broken spring above the opening, a snapped lifting cable, worn wheels and loose hinges between the panels.',
    'up-and-over':
      'Up-and-over doors are one big panel that swings out at the bottom and slides up into the roof. They lift on springs or weights at the sides. Springs, cables, worn arms and stiff locks or handles are the common repairs.',
    'side-hinged':
      'Side-hinged doors open out like a pair of house doors. They drop and drag on the ground as hinges wear. Bolts and locks then stop lining up, and timber doors can swell in wet weather.',
  },
  sections: [
    {
      q: 'My garage door is stuck. What should I do now?',
      body: [
        'Stop using it. Do not force the door up or down, and do not stand under it. If it is electric, turn off the power to the motor. Keep children, pets and cars away from it.',
        'If you heard a loud bang just before it stuck, a spring has probably broken. A door with a broken spring is much heavier than it looks, and it can drop. Leave it where it is and call us.',
        'Take a photo of the whole door from outside, and one from inside if you can get in safely. Send them with your postcode. That is often enough for us to know which part to bring.',
      ],
    },
    {
      q: 'Why should I not fix a garage door spring myself?',
      body: [
        'The springs hold up almost the whole weight of the door, so they are wound very tight. If a spring or its fixing lets go while you work on it, it can cause a serious injury. Cables are under the same load.',
        'Changing them needs the right tools and the right replacement part for the weight of your door. We do not give instructions for this work, on this page or on the phone.',
      ],
    },
    {
      q: 'My electric garage door will not open. Is it the motor?',
      body: [
        'Not always. There are a few safe things to check first. Is there power to the motor? Does the remote work after you change its battery? Has someone pulled the manual release cord? Is anything blocking the two small sensors either side of the opening?',
        'If all of those are fine, the fault is probably in the motor, its control board, or the door itself. Send a photo of the label on the motor. It tells us the make and model, so we can check parts before we come.',
        'After any repair to an electric door, we test that it stops and goes back up when something is in the way. That test is required for powered doors under BS EN 12453.',
      ],
    },
    {
      q: 'Why is my garage door so noisy?',
      body: [
        'Grinding or squealing usually means dry or worn wheels and hinges. Banging often means the door is out of balance, or a track has come loose. A new, loud bang that happens once is usually a spring breaking. If the noise is new and the door feels heavier, stop using it.',
      ],
    },
    {
      q: 'My garage door has come off its track. Can it be fixed?',
      body: [
        'Usually, yes, if the track and the panels are not badly bent. A door off its track is under strain and can fall. Do not try to push it back. Leave it as it is and send us a photo.',
      ],
    },
    {
      id: 'servicing',
      q: 'Does a garage door need a service?',
      body: [
        'An electric door that is used every day should be checked about once a year. A check covers the balance of the door, the springs and cables, the wheels and hinges, the tracks, and the safety stop.',
        'A worn cable or a weak spring found at a check costs far less than a door that drops. If you want a check while we are with you for a repair, ask when you book.',
      ],
    },
    {
      q: 'Is it worth repairing an old garage door?',
      body: [
        'If the panels are sound, a repair is usually cheaper. A new door makes more sense when the panel is rusted through or badly bent, when the parts are no longer made, or when the door keeps failing. We will tell you which, and give you both prices if you ask.',
      ],
    },
  ],
  steps: [
    'Send a photo of the door and your postcode, by WhatsApp or the form below. For an electric door, add a photo of the label on the motor.',
    'We tell you what is likely wrong and whether we need to visit.',
    'We find the fault and give you the price in writing before any work.',
    'We repair the door, test it, and show you that it opens, closes and stops safely.',
  ],
  priceFactors: [
    'Which part has failed, and whether it is a standard part or has to be ordered',
    'The type and size of the door. A double door has heavier springs and cables.',
    'The make of the motor. Some parts only come from the maker.',
    'How easy it is to reach the door and work around it',
    'How far you are from Birmingham',
  ],
  notCovered: [
    'Step-by-step help to change springs, cables or motor parts yourself. It is not safe.',
    'Door types not listed on this page',
    'Places outside our repair area',
  ],
  consents: [
    { consent: 'none-usually', likelihood: 'usually', why: 'Repairing a garage door and keeping the same look usually needs nothing from the council.' },
    { consent: 'listed', likelihood: 'sometimes', why: 'Old timber coach-house or stable-style doors on a listed building may need consent before parts are changed.' },
  ],
  standards: [
    { ref: 'BS EN 13241', what: 'The product standard garage doors are sold under.' },
    { ref: 'BS EN 12453', what: 'Safety of electric doors: how the safety stop must work and be tested.' },
    { ref: 'BS EN 12604', what: 'Springs, cables and fixings must not let the door fall if one part fails.' },
  ],
  questions: [
    {
      q: 'Can you repair a garage door another company fitted?',
      a: 'Yes. A photo of any label on the door, the springs or the motor helps us bring the right part.',
    },
    {
      q: 'Can you still get parts for an old garage door?',
      a: 'Often, yes. For some older up-and-over doors the parts are no longer made. If so, we tell you before you pay anything, and give you the price of a new door.',
    },
    {
      q: 'How much does a garage door repair cost?',
      a: 'It depends on the part that has failed and the type of door. We have not put typical garage door prices on this site yet. Send a photo and we will give you a price before we visit.',
    },
    {
      q: 'My remote has stopped working. Can you program a new one?',
      a: 'Usually, if we know the make of the motor. Send a photo of the label on the motor and of the old remote.',
    },
  ],
  related: [
    { href: '/garage-door-installation', label: 'New garage doors', why: 'when a repair is not worth it' },
    { href: '/shopfronts/shutter-repairs', label: 'Shutter repairs', why: 'for roller shutters on shops and businesses' },
    { href: '/shopfronts/industrial-shutters', label: 'Industrial shutters', why: 'for loading bays and large openings' },
  ],
};

export const garageInstallation: GaragePage = {
  path: '/garage-door-installation',
  name: 'Garage door installation',
  title: 'Garage door installation: new and replacement doors',
  description: 'New {types} garage doors, made to measure, electric or by hand. We measure first and give you the price in writing.',
  answer:
    'We supply and fit new {types} garage doors, electric or by hand, in single and double widths. Every door is made to measure, so we measure your opening first and give you the price in writing. If your old door has failed, this is also the page for a replacement.',
  typesHeading: 'Which type of garage door is right for you?',
  types: {
    roller:
      'A roller door rolls up into a box above the opening. It needs no space in the drive and none under the ceiling, so you can park close to the door. Almost all are electric. Choose insulated slats if the garage is next to the house.',
    sectional:
      'A sectional door is made of panels that rise straight up and run back under the ceiling. It does not swing out, so it suits a short drive. The panels are usually insulated. It needs some space above the opening for the spring and the tracks, so we check the height when we measure.',
    'up-and-over':
      'An up-and-over door is one panel that swings out at the bottom and up into the roof. It is the simplest kind and works well by hand. The bottom swings out as it opens, so you cannot park right up against it. It also takes a little height from the opening.',
    'side-hinged':
      'Side-hinged doors open like a pair of house doors. You can open one side to walk in, which suits a garage used as a workshop or store. They need clear space outside for the doors to swing open.',
  },
  sections: [
    {
      q: 'Should I choose an electric or a manual garage door?',
      body: [
        'An electric door opens from a remote, so you do not have to get out of the car in the rain. It stops and goes back up if something is in the way. It needs a power supply near the top of the opening.',
        'A manual door costs less and has fewer parts to go wrong. It is a good choice for a garage you do not use every day.',
      ],
    },
    {
      id: 'automation',
      q: 'Can you add a motor to my garage door?',
      body: [
        'Often, yes. Most sectional doors and many up-and-over doors can take a motor that sits under the ceiling. The door must be in good shape and well balanced first, or the motor will wear out fast. We check that before we give you a price.',
      ],
    },
    {
      q: 'Do I need an insulated garage door?',
      body: [
        'If the garage is joined to the house, has a room above it, or you use it as a gym or workshop, insulation makes a real difference. It keeps the cold out and the noise of the road down. For a detached garage used only for a car or storage, it is less important.',
      ],
    },
    {
      q: 'Single, double or made to measure?',
      body: [
        'Garage doors come in standard sizes, but many openings are not quite standard. Older garages often are not square. We measure the width, the height, the space above and the space at each side. Then the door is made to fit.',
        'A double opening can take one wide door. If there is a pillar in the middle, it can take two single doors instead. Two doors cost more, but you only open the side you need.',
      ],
    },
    {
      q: 'What changes when I replace an old door?',
      body: [
        'We take out the old door and its frame, check the opening, and fit the new door to it. Sometimes the brick or the timber around the opening needs making good first. If so, we tell you at the survey, not on the day.',
        'Your written price says whether taking away the old door is included.',
      ],
    },
    {
      q: 'Is a garage door the same as a roller shutter?',
      body: [
        'Not quite. A garage door is the main way in and out of a garage, usually at a home. A roller shutter protects a shop window or door when the shop is closed. They work in a similar way but are built and sold for different jobs. For a shop or business, see roller shutters.',
      ],
    },
  ],
  steps: [
    'Send a photo of the opening from outside, rough sizes if you have them, and your postcode.',
    'We talk you through the door types that suit your garage.',
    'We visit, measure and give you the price in writing.',
    'The door is made to your size. We fit it, show you how it works, and leave the maker’s instructions with you.',
  ],
  priceFactors: [
    'The type of door, and its size',
    'Insulated or not',
    'Electric or manual, and how many remotes you need',
    'The colour and finish, and any windows in the door',
    'Whether the opening needs work before the door goes in',
    'How easy it is to get to the garage',
  ],
  notCovered: [
    'Building a new opening or making one wider. That needs a builder first, and building regulations approval for the new beam over the opening.',
    'Door types not listed on this page',
  ],
  consents: [
    { consent: 'planning', likelihood: 'rarely', why: 'On a house, a new garage door usually needs no planning permission. Flats, Article 4 areas and some new-build estates with special conditions are different.' },
    { consent: 'listed', likelihood: 'usually', why: 'Any new garage door on a listed building, or in its grounds, needs listed building consent.' },
    { consent: 'building-regs', likelihood: 'rarely', why: 'Swapping one garage door for another usually does not need building regulations. Making the opening wider does, because of the beam over it.' },
  ],
  standards: [
    { ref: 'BS EN 13241', what: 'The product standard for garage doors. A new door should come with a CE or UKCA mark and a declaration.' },
    { ref: 'BS EN 12453', what: 'Safety of electric doors: the door must stop and go back up when something is in the way.' },
    { ref: 'BS EN 12635', what: 'How a garage door must be fitted, and the instructions the owner must be given.' },
  ],
  questions: [
    {
      q: 'How long does it take to get a new garage door?',
      a: 'Most of the wait is the door being made to your size. Fitting is usually done in one day. We give you the fitting date when you order.',
    },
    {
      q: 'How much does a new garage door cost?',
      a: 'It depends on the type, the size, insulation and whether it is electric. We have not put typical garage door prices on this site yet. Send a photo and rough sizes, and we will give you a guide price before we visit.',
    },
    {
      q: 'Can you fit a garage door to a business unit?',
      a: 'For a small unit or a lock-up, often yes. For a loading bay or a wide opening on a warehouse, an industrial shutter is usually the better choice.',
    },
    {
      q: 'Can I keep my old frame?',
      a: 'Sometimes. An up-and-over door can often go into the old timber frame if it is sound. Roller and sectional doors fix to the brickwork and need the old frame out.',
    },
  ],
  related: [
    { href: '/garage-door-repairs', label: 'Garage door repairs', why: 'if your door can be saved' },
    { href: '/shopfronts/roller-shutters', label: 'Roller shutters', why: 'for shops and businesses' },
    { href: '/shopfronts/industrial-shutters', label: 'Industrial shutters', why: 'for loading bays and warehouses' },
  ],
};

export const garagePages = [garageRepairs, garageInstallation];
