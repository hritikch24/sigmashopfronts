/**
 * Planning authorities we can say something true and specific about.
 *
 * This file is the reason the site exists. Each entry is built from a council
 * document that was fetched and read on the date in `checked`, and every
 * policy point carries the document and paragraph it came from. Nothing here
 * is inferred from a neighbouring council, from "most councils", or from what
 * a council probably thinks.
 *
 * Rules for editing:
 *  - No document, no entry. A council we cannot cite does not get a page; the
 *    frontage check tells the visitor plainly that we hold no data for it.
 *  - Quote sparingly and only where the exact words matter. Otherwise
 *    paraphrase, and keep the paragraph reference so anyone can check.
 *  - `status` says what the document actually is. A draft is called a draft.
 *  - Grants only with a dated source and a stated status (open / closed).
 *  - `ourAdvice` is an installer's opinion and is labelled as such on the page.
 *    It must never read as council policy.
 */

export type Nation = 'england' | 'scotland' | 'wales' | 'northern-ireland';

export type DocStatus =
  | 'adopted-spd'
  | 'local-plan-policy'
  | 'guidance'
  | 'draft'
  | 'advice-note';

export interface SourceDoc {
  id: string;
  title: string;
  date: string;
  status: DocStatus;
  url: string;
  /** ISO date the URL returned 200 and the text was read. */
  checked: string;
}

export interface Point {
  text: string;
  doc: string;
  ref?: string;
}

/**
 * How the council's own words place an external shutter on a conservation-area
 * or listed frontage. Used by the frontage check to decide what to lead with.
 *  - 'not-acceptable'  the document says no (or never) for that setting
 *  - 'normally-refused' "will not normally", "will be resisted", "unlikely"
 *  - 'exception-only'  only in narrowly defined exceptions the document names
 */
export type HeritageExternalLine = 'not-acceptable' | 'normally-refused' | 'exception-only';

export interface Grant {
  name: string;
  status: 'open' | 'closed';
  detail: string;
  url: string;
  checked: string;
}

export interface Authority {
  slug: string;
  council: string;
  /** What people type: the town or city. */
  place: string;
  /** Legacy /areas/{city} slug this page succeeds, for the 301 map. */
  legacyCity?: string;
  nation: Nation;
  /** Inside the 100-road-mile repair radius from Birmingham? */
  repairs: 'inside' | 'outside';
  retailStreets: string[];
  /** Answer-first sentence: the page opens with it and the meta description uses it. */
  headline: string;
  intro: string[];
  documents: SourceDoc[];
  heritageExternal: HeritageExternalLine;
  /** The council's own order of preference for security, where it states one. */
  securityOrder?: string[];
  shutters: Point[];
  heritage?: Point[];
  signage?: Point[];
  grant?: Grant;
  ourAdvice: string;
}

const CHECKED = '2026-10-09';
const SHEFFIELD_CHECKED = '2026-10-11';

export const authorities: Authority[] = [
  {
    slug: 'birmingham',
    council: 'Birmingham City Council',
    place: 'Birmingham',
    legacyCity: 'birmingham',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['New Street', 'High Street', 'Corporation Street', 'Bullring', 'Grand Central'],
    headline:
      'Birmingham’s design guide wants laminated glass before any shutter, and the only shutter it accepts is one you can see through, fitted behind the glass.',
    intro: [
      'Birmingham folded its shopfront rules into the Birmingham Design Guide, adopted in September 2022. The shopfront notes sit in the Healthy Living and Working Places City Manual and cover retail, commercial and leisure units in the city centre, district centres, local centres and stand-alone units — not only the historic streets.',
      'That reach is what catches people out. A 1960s parade in Erdington starts from the same assumption as a listed frontage in the Jewellery Quarter: the glass does the security work, and a shutter has to earn its place.',
    ],
    documents: [
      {
        id: 'bdg',
        title: 'Birmingham Design Guide — Healthy Living and Working Places City Manual',
        date: 'September 2022',
        status: 'adopted-spd',
        url: 'https://www.birmingham.gov.uk/download/downloads/id/24168/4_healthy_living_and_working_city_manual_-_september_2022.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    securityOrder: ['Laminated glass', 'A see-through shutter fitted internally, only if still needed'],
    shutters: [
      { text: 'For out-of-hours security the guide asks for laminated glass rather than a shutter system.', doc: 'bdg', ref: 'para 2.180' },
      { text: 'If a shutter is still needed it must be visually permeable and fitted internally.', doc: 'bdg', ref: 'para 2.180' },
      { text: 'On a historic shopfront no shutter system is supported unless the need is proven and it can go in without harming the historic fabric.', doc: 'bdg', ref: 'para 2.180' },
    ],
    heritage: [
      { text: 'In a listed building or a conservation area the council will not support taking out a historic shopfront unless it is shown that repair cannot be done.', doc: 'bdg', ref: 'para 2.152' },
      { text: 'Where a historic shopfront survives, its components and detailing are expected to be kept and restored.', doc: 'bdg', ref: 'para 2.154' },
    ],
    signage: [
      { text: 'Fascia signs stay inside the fascia. Box fascias that stand proud of it are not supported; individual letters, painted or fixed, are expected.', doc: 'bdg', ref: 'para 2.182' },
      { text: 'Internally illuminated and box signs are not supported unless you can show they do no harm to the building or the street.', doc: 'bdg', ref: 'para 2.183' },
      { text: 'Projecting and hanging signs should generally sit at fascia level.', doc: 'bdg', ref: 'para 2.184' },
    ],
    ourAdvice:
      'Our base is six miles away in Oldbury, so Birmingham is home ground. For a Birmingham frontage our advice is to budget for laminated glass and, only if it is still needed, an internal lattice grille, and to drop the illuminated box fascia from the brief before it reaches a drawing. Those two items account for most of the back-and-forth we see with the council.',
  },
  {
    slug: 'coventry',
    council: 'Coventry City Council',
    place: 'Coventry',
    legacyCity: 'coventry',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Broadgate', 'Smithford Way', 'Lower Precinct', 'Cathedral Lanes'],
    headline:
      'Coventry’s adopted guidance says permission for external shutters will not normally be granted on listed or conservation-area shops — and spells out exactly what an exception has to look like.',
    intro: [
      'Coventry’s shopfront guidance was adopted on 26 June 2014 and was written for conservation areas and historic buildings. A city-wide replacement was being prepared in council papers in early 2026; until it is adopted, the 2014 document is the one on the council’s list of adopted SPDs.',
      'Coventry has a kind of building most cities do not: timber-framed houses, some of them moved to Spon Street from elsewhere in the city, where the ground floor never had a conventional shopfront. The guidance treats those differently, and so should anyone pricing work on them.',
    ],
    documents: [
      {
        id: 'cov14',
        title: 'Design Guidance on Shopfronts for Conservation Areas and Historic Buildings',
        date: 'Adopted 26 June 2014',
        status: 'adopted-spd',
        url: 'https://www.coventry.gov.uk/downloads/file/16454/design-guidance-on-shopfronts-for-conservation-areas-and-historic-buildings',
        checked: CHECKED,
      },
      {
        id: 'covlist',
        title: 'Coventry Local Plan — adopted supplementary planning documents',
        date: 'List as published',
        status: 'guidance',
        url: 'https://www.coventry.gov.uk/planning-policy/coventry-local-plan-2011-2031/2',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    shutters: [
      { text: 'Every external shutter and grille needs planning permission.', doc: 'cov14', ref: 'section 5' },
      { text: 'For listed and locally listed buildings and for properties in conservation areas, that permission will not normally be granted. Listed buildings also need listed building consent.', doc: 'cov14', ref: 'section 5' },
      { text: 'An exception has to be fully concealed: the box recessed behind the fascia and below the lintel, the runners hidden inside the pilasters, an open lattice with at least 50% transparency, and the metal colour-coated to match the shopfront.', doc: 'cov14', ref: 'section 5' },
      { text: 'Where an external shutter would damage the building, the alternatives are a shutter behind the window or demountable shutters taken down for the trading day.', doc: 'cov14', ref: 'section 5' },
    ],
    heritage: [
      { text: 'On timber-framed buildings with no traditional shopfront, the ground floor is a large glazed window in the frame; signage is limited to a bracket sign at first-floor level and modest window vinyl, and any shutter has to be internal.', doc: 'cov14' },
    ],
    ourAdvice:
      'The 50% figure is the most useful sentence in the document because it can be measured. If you are going for an exception, get the open-area percentage for the lattice in writing from the manufacturer and put it on the drawing, so the officer is checking a number rather than judging a photograph.',
  },
  {
    slug: 'leicester',
    council: 'Leicester City Council',
    place: 'Leicester',
    legacyCity: 'leicester',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Granby Street', 'Gallowtree Gate', 'Highcross'],
    headline:
      'Leicester’s Local Plan approves a replacement shutter only if the curtain lets people see into the shop, and it puts numbers on how bright an illuminated sign may be.',
    intro: [
      'Leicester handles shopfronts in its Local Plan rather than a separate guide. Policy DQP08 covers shopfronts and security and DQP09 covers signs, and both apply across the city.',
      'The signage section is unusually specific. It caps the luminance of internally lit signs by size and by how bright the surrounding district already is, which is the kind of figure most councils leave to officer judgement.',
    ],
    documents: [
      {
        id: 'llp',
        title: 'Leicester Local Plan — chapter 8, Delivering design quality (Policies DQP08 and DQP09)',
        date: 'As published on the council website',
        status: 'local-plan-policy',
        url: 'https://www.leicester.gov.uk/leicester-local-plan/delivering-design-quality',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    shutters: [
      { text: 'New shopfronts and roller shutters are expected to be designed as part of the whole building, matched to it in quality and proportion.', doc: 'llp', ref: 'Policy DQP08' },
      { text: 'Replacement shopfronts and shutters will normally be approved only if they keep or improve the quality of what they replace, suit the building and street, are unobtrusive, have a suitable finish applied before installation — and the shutter curtain lets people see into the shop when it is down.', doc: 'llp', ref: 'Policy DQP08 (a)–(e)' },
    ],
    signage: [
      { text: 'Internally illuminated signs are unlikely to be acceptable on listed buildings.', doc: 'llp', ref: 'para 8.33' },
      { text: 'Luminance limits for internally lit signs: up to 10 m², 800 cd/m² in medium-brightness areas and 1,000 cd/m² in high-brightness areas; over 10 m², 600 cd/m² in both.', doc: 'llp', ref: 'Table 7' },
      { text: 'Normally one projecting sign per frontage, and no fascia or projecting sign above first-floor windowsill level.', doc: 'llp', ref: 'para 8.35' },
    ],
    ourAdvice:
      'Ask the sign maker for the luminance in candelas per square metre and put it on the application. A light box ordered from a national chain’s standard specification can exceed Leicester’s limits as delivered, and dimming it afterwards is a fiddly job.',
  },
  {
    slug: 'nottingham',
    council: 'Nottingham City Council',
    place: 'Nottingham',
    legacyCity: 'nottingham',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Clumber Street', 'Bridlesmith Gate', 'Victoria Centre'],
    headline:
      'Nottingham’s planning policies say to avoid solid and perforated shutters, and name three external types that are typically acceptable: lattice grilles, punched-lath shutters and clear polycarbonate.',
    intro: [
      'Nottingham adopted its Land and Planning Policies document in January 2020, replacing the 2005 Local Plan. Policy DE4 deals with shopfronts and, unusually, sets out a full test for external security in the policy itself.',
      'What makes it practical is that it does not stop at “avoid solid shutters”. It lists the external types the council will typically consider, and it says where the box and guides should go.',
    ],
    documents: [
      {
        id: 'lapp',
        title: 'Nottingham City Land and Planning Policies (Local Plan Part 2), Policy DE4: Shopfronts',
        date: 'Adopted January 2020',
        status: 'local-plan-policy',
        url: 'https://www.nottinghamcity.gov.uk/media/vzxjnxaa/land-and-planning-policies-document-lapp-2020.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    securityOrder: ['Security glazing, lighting, strengthened stall risers, security doors, CCTV and alarms', 'Grilles or shutters mounted internally', 'External grilles, punched-lath or clear polycarbonate shutters, where need is shown'],
    shutters: [
      { text: 'External grilles or shutters are assessed on whether there is a demonstrable need, and whether other options — security glazing, lighting, strengthened stall risers, security doors, CCTV, alarms — have been considered.', doc: 'lapp', ref: 'DE4.2(a)' },
      { text: 'The council asks whether the grille or shutter could be mounted inside, behind the glass.', doc: 'lapp', ref: 'DE4.2(b)' },
      { text: 'Where external security is justified, solid or perforated shutters should be avoided. Typically acceptable: external lattice grilles, punched-lath shutters and transparent polycarbonate shutters.', doc: 'lapp', ref: 'DE4.3' },
      { text: 'Grilles and shutters should cover only the glazed areas, leaving stall risers and pilasters visible; boxes go inside, behind the fascia; every external face, guide and box is colour-coated.', doc: 'lapp', ref: 'DE4.4–DE4.6' },
      { text: 'Extra care applies on listed buildings and in conservation areas.', doc: 'lapp', ref: 'DE4.7' },
    ],
    ourAdvice:
      'The “glazed areas only” rule changes the shutter’s width, not just its look. Measure between the pilasters rather than across the whole frontage, and expect the guides to sit inside the opening. That is a different product order from a standard full-width shutter.',
  },
  {
    slug: 'derby',
    council: 'Derby City Council',
    place: 'Derby',
    legacyCity: 'derby',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['St Peter’s Street', 'Sadler Gate', 'Derbion'],
    headline:
      'Derby’s shopfront guide — published as a December 2008 draft — says permission for roller shutters will not normally be granted, and lists the alternatives it will consider.',
    intro: [
      'Derby’s shopfront and advertisement guide is on the council’s conservation pages marked “Draft – December 2008”, written to sit alongside the City of Derby Local Plan Review of 2006. Its status is worth confirming before you lean on it: a draft carries less weight than an adopted document, but it is still a clear statement of how the council approaches shopfronts.',
      'The guide singles out solid modern roller shutters for their effect on the street at night, for attracting graffiti and for housing boxes and rails that project from the front.',
    ],
    documents: [
      {
        id: 'dsg',
        title: 'Derby City Council shopfront guide',
        date: 'Draft – December 2008',
        status: 'draft',
        url: 'https://www.derby.gov.uk/media/derbycitycouncil/contentassets/documents/environmentandplanning/conservation/DerbyCityCouncil-shopfronts-guide.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    shutters: [
      { text: 'Security should be designed into the shopfront from the start rather than added afterwards.', doc: 'dsg' },
      { text: '“Permission for roller shutters will not normally be granted.”', doc: 'dsg' },
      { text: 'In conservation areas and on listed and locally listed buildings the council weighs the owner’s security need against the harm. Options it lists: wooden lift-off shutters on smaller traditional shopfronts, and internal or external grilles perforated in a see-through “letter box” design.', doc: 'dsg' },
    ],
    ourAdvice:
      'Wooden lift-off shutters are the option people forget. On a small traditional unit off Sadler Gate they can be made to slot into the existing frame, and they are the only security measure on the list that also looks right in daylight.',
  },
  {
    slug: 'gloucester',
    council: 'Gloucester City Council',
    place: 'Gloucester',
    legacyCity: 'gloucester',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Westgate Street', 'Southgate Street', 'Gloucester Quays'],
    headline:
      'Gloucester’s 2017 shopfront SPD ranks the options plainly: security glass and internal grilles yes, external grilles only in extreme cases, solid shutters not acceptable.',
    intro: [
      'Gloucester adopted its Shopfronts, Shutters and Signage design guidelines as an SPD in November 2017, supporting Policy BE.11 of the 2002 Local Plan. The SPD records fourteen adopted conservation areas, covering most of the city centre.',
      'The document is blunt in a useful way. It shows four photographs side by side — security glass, internal grille, external grille, solid shutter — and marks the last two as the wrong answers.',
    ],
    documents: [
      {
        id: 'gsss',
        title: 'Shopfronts, Shutters & Signage — Design Guidelines for Gloucester (SPD)',
        date: 'Adopted November 2017',
        status: 'adopted-spd',
        url: 'https://www.gloucester.gov.uk/media/3sfd0smy/shopfront-shutters-and-signage-design-guide-november-2017.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'exception-only',
    securityOrder: ['Security (laminated) glass', 'Internal retractable grilles behind the window', 'External grilles, extreme cases only'],
    shutters: [
      { text: 'The council encourages security glass over grilles or shutters, especially for listed buildings and conservation areas.', doc: 'gsss', ref: 'section 5' },
      { text: 'Internal grilles behind the window are the preferred method and will usually be permitted, subject to their design and colour.', doc: 'gsss', ref: 'section 5' },
      { text: 'External grilles only in extreme circumstances: demountable or on a roller, box behind the fascia where possible (otherwise clad), operating within the shop opening without covering pilasters, columns or fascia.', doc: 'gsss', ref: 'section 5' },
      { text: 'Grilles in a high-quality material such as brass, or powder-coated in a suitable colour — not raw aluminium.', doc: 'gsss', ref: 'section 5' },
      { text: 'Solid shutters are not acceptable.', doc: 'gsss', ref: 'section 5' },
    ],
    ourAdvice:
      'If you do end up with an external grille in Gloucester, specify the powder-coat colour on the application rather than leaving it as “to match”. Raw aluminium is the one finish the document rules out by name.',
  },
  {
    slug: 'oxford',
    council: 'Oxford City Council',
    place: 'Oxford',
    legacyCity: 'oxford',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Cornmarket Street', 'High Street', 'Westgate Oxford'],
    headline:
      'Oxford will not permit permanently fixed external grilles in public places, and its 2021 advice note steers shops towards toughened glass and internal window grilles.',
    intro: [
      'Oxford’s Shopfronts and Signage Technical Advice Note was published in July 2021 to explain Policy DH6 of the Oxford Local Plan 2036. It covers planning permission, advertisement consent and listed building consent in one place.',
      'The historic core sits inside the Central Conservation Area and holds many listed buildings, and the note says corporate branding has to adapt to that setting rather than the other way round.',
    ],
    documents: [
      {
        id: 'tan10',
        title: 'Shopfronts and Signage Technical Advice Note (TAN 10)',
        date: 'July 2021',
        status: 'guidance',
        url: 'https://www.oxford.gov.uk/downloads/file/1657/technical-advice-note-10---shopfronts-and-signage',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    shutters: [
      { text: 'Shutters and grilles are among the works that need planning permission because they change how the shopfront looks.', doc: 'tan10', ref: 'section 3' },
      { text: 'The council will not permit permanently fixed external grilles in public places.', doc: 'tan10', ref: 'para 18.4' },
      { text: 'Toughened glass is encouraged because it can protect a shop with almost no visible change.', doc: 'tan10', ref: 'para 18.5' },
      { text: 'For higher security, extra glazing bars and internal window grilles that keep views in and out are likely to be the most appropriate route.', doc: 'tan10', ref: 'para 18.6' },
    ],
    heritage: [
      { text: 'In the city centre, set within the Central Conservation Area, Policy DH6 requires historic shopfronts to be retained.', doc: 'tan10', ref: 'para 7.24' },
      { text: 'For conservation areas and listed buildings, applicants must justify the design with an analysis of the building’s significance.', doc: 'tan10', ref: 'para 7.25' },
    ],
    signage: [
      { text: 'Illuminated signs need advertisement consent in a number of cases, particularly in conservation areas.', doc: 'tan10', ref: 'para 3.6' },
    ],
    ourAdvice:
      'Extra glazing bars are worth a serious look on a wide Oxford frontage. Splitting one large pane into several smaller ones cuts the cost of any single breakage and makes a smash-and-grab slower, and nothing appears on the street at night.',
  },
  {
    slug: 'bristol',
    council: 'Bristol City Council',
    place: 'Bristol',
    legacyCity: 'bristol',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Broadmead', 'Park Street', 'Cabot Circus', 'Gloucester Road'],
    headline:
      'Bristol’s shopfront advice note says no external shutter of any type on a listed building, and expects open-lattice or demountable grilles everywhere else.',
    intro: [
      'Bristol’s shopfront guidance is Policy Advice Note 8, Shopfront Guidelines, from the Bristol Local Plan series. The note carries no date on its face; the council still publishes it as current advice.',
      'It sorts premises into three tiers — listed buildings, conservation areas, and everywhere else — and then pulls historic shopfronts on historic streets up into the conservation-area tier even when the street is not designated.',
    ],
    documents: [
      {
        id: 'pan8',
        title: 'Bristol Local Plan Policy Advice Note No. 8 — Shopfront Guidelines',
        date: 'Undated on its face',
        status: 'advice-note',
        url: 'https://www.bristol.gov.uk/files/documents/2683-pan8-shopfront/file',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    shutters: [
      { text: 'Listed buildings: security should come from reinforced stallrisers and laminated glass. External shutters of any type are not suitable; an open-lattice shutter set well back behind the window may be acceptable.', doc: 'pan8', ref: 'section 3' },
      { text: 'Conservation areas: the same measures as listed buildings. If a shutter is needed it should be open-lattice or demountable, preferably internal, with the housing kept behind the line of the fascia.', doc: 'pan8', ref: 'section 3' },
      { text: 'Elsewhere: historic shopfronts on historic streets are treated like conservation areas. For other shops, internal shutters are preferred and any external shutter should be open-lattice or demountable.', doc: 'pan8', ref: 'section 3' },
      { text: 'All external shutters and grilles need planning permission. They should cover the glazing only and be built into the fascia, pilasters and cill, finished to suit the shopfront.', doc: 'pan8', ref: 'section 3' },
    ],
    ourAdvice:
      'The “historic streets” clause is the one to read twice. A Victorian parade that has never been designated can still be judged as if it were, so check how the officer sees your street before you assume the lighter rules apply.',
  },
  {
    slug: 'cheshire-west-and-chester',
    council: 'Cheshire West and Chester Council',
    place: 'Chester',
    legacyCity: 'chester',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Eastgate Street', 'Watergate Street', 'Bridge Street'],
    headline:
      'Cheshire West and Chester’s Local Plan says external grilles and shutters will not normally be acceptable on traditional and historic shopfronts or in conservation areas, and the Chester Rows have their own design guide on top.',
    intro: [
      'Shopfront policy for Chester sits in the council’s Local Plan (Part Two), Policy DM 16. It applies across the borough, but in Chester it meets the Rows — the medieval galleried walkways where shops trade at street level and again on the level above.',
      'The council publishes a separate Rows Design Guide covering shopfronts, signage, the Row walkways and stallboards, so anyone working on a Rows frontage has two documents to satisfy.',
    ],
    documents: [
      {
        id: 'dm16',
        title: 'Local Plan (Part Two) Land Allocations and Detailed Policies — Policy DM 16: Shopfronts',
        date: 'As published',
        status: 'local-plan-policy',
        url: 'https://planningpolicy.cheshirewestandchester.gov.uk/publications/local-plan-part-two-land-allocations-and-detailed-policies/local-plan-part-two-land/11',
        checked: CHECKED,
      },
      {
        id: 'rows',
        title: 'Chester Rows Design Guide',
        date: 'As published',
        status: 'guidance',
        url: 'https://www.cheshirewestandchester.gov.uk/business/business-hub/chester-rows/rows-design-guide',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    shutters: [
      { text: 'Shutters and other security measures are supported only where a need is shown and the design adds no obtrusive features or harm.', doc: 'dm16', ref: 'Policy DM 16' },
      { text: 'Externally located grilles or security shutters will not normally be acceptable on traditional and historic shopfronts, or in conservation areas.', doc: 'dm16', ref: 'Policy DM 16' },
      { text: 'Solid metal shutters, metal shutter boxes and external grilles are unlikely to be acceptable in conservation areas or on listed buildings; toughened glass and alarms are encouraged instead.', doc: 'dm16', ref: 'explanation to DM 16' },
    ],
    heritage: [
      { text: 'A shopfront designed in a traditional style must include historically accurate detailing, and features of historic or architectural interest are kept.', doc: 'dm16', ref: 'Policy DM 16' },
    ],
    ourAdvice:
      'On the upper Row level the shopfront sits behind a public walkway, so access, scaffolding and working hours become as much of the job as the joinery. Plan the programme around the walkway before you plan the shopfront.',
  },
  {
    slug: 'york',
    council: 'City of York Council',
    place: 'York',
    legacyCity: 'york',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Coney Street', 'Parliament Street', 'The Shambles', 'Stonegate'],
    headline:
      'York’s Local Plan, adopted in February 2025, will not support solid or external see-through shutters in conservation areas or on heritage assets — with one exception, demountable open-mesh grilles.',
    intro: [
      'In York the shutter rule is not in a guidance note but in the Local Plan itself, adopted on 27 February 2025. Policy D12 covers shopfronts, D13 advertisements and D14 security shutters, so the position carries full development-plan weight.',
      'The plan notes that in the central historic core conservation area the survival of historic shopfronts is particularly high. It encourages replacing poor-quality shopfronts with well-designed ones, but says dilapidated shopfronts that matter to the building or area should be repaired rather than replaced.',
    ],
    documents: [
      {
        id: 'ylp',
        title: 'City of York Local Plan 2017–2033 — Policies D12, D13, D14',
        date: 'Adopted 27 February 2025',
        status: 'local-plan-policy',
        url: 'https://democracy.york.gov.uk/documents/s182116/Adopted%20Local%20Plan%20Final.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'exception-only',
    securityOrder: ['Laminated glass, secondary glazing or internal security film', 'Internal see-through shutters, where need is justified', 'Demountable open-mesh grilles (the only external option in heritage settings)'],
    shutters: [
      { text: 'Internal see-through shutters will be considered where other security measures are shown to be inadequate and the need is justified.', doc: 'ylp', ref: 'Policy D14' },
      { text: 'In conservation areas and on heritage assets, solid or external see-through shutters will not be supported unless they are externally demountable open-mesh grilles of a suitable scale that preserve the shopfront.', doc: 'ylp', ref: 'Policy D14' },
      { text: 'In those settings security should come from laminated glass, secondary glazing or internal security film. Approved internal shutter boxes must not be visible from outside.', doc: 'ylp', ref: 'para 8.70' },
    ],
    heritage: [
      { text: 'Within the central historic core conservation area the survival of historic shopfronts is particularly high.', doc: 'ylp', ref: 'para 8.62' },
      { text: 'Dilapidated shopfronts should be repaired rather than replaced where they contribute to the distinctiveness of the building or area.', doc: 'ylp', ref: 'para 8.64' },
    ],
    ourAdvice:
      'Secondary glazing is the option in York’s list that most shops have not priced. Behind an original or listed frontage it can carry the security load while the historic glass stays untouched.',
  },
  {
    slug: 'leeds',
    council: 'Leeds City Council',
    place: 'Leeds',
    legacyCity: 'leeds',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Briggate', 'Commercial Street', 'Trinity Leeds', 'Victoria Quarter'],
    headline:
      'Leeds’ shop-front security note treats an external roller shutter as a last resort for exceptionally high-risk shops away from sensitive streets — and never acceptable on a listed building.',
    intro: [
      'Leeds still publishes its shop-front security design aid, a guidance note from the council’s Department of Planning. It is a scanned leaflet with no date on it, so confirm with the council how much weight it carries today.',
      'It is stricter than many newer documents in one respect: it names “prime shopping areas” alongside conservation areas and listed buildings as places where external grilles are generally unacceptable.',
    ],
    documents: [
      {
        id: 'lsda',
        title: 'Shop front security design aid — Leeds City Council guidance note',
        date: 'Undated',
        status: 'guidance',
        url: 'https://www.leeds.gov.uk/docs/Shop%20front%20security%20design%20aid%20LCC%20guidance%20notelr.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    shutters: [
      { text: 'External roller shutters, usually solid or lightly perforated, are acceptable only in exceptional circumstances — for example an exceptionally high-risk shop in a non-sensitive location.', doc: 'lsda', ref: 'section 2.4' },
      { text: 'They always need planning permission, and approval is likely to come with conditions such as colour.', doc: 'lsda', ref: 'section 2.4' },
      { text: 'External roller shutters will never be acceptable on listed buildings.', doc: 'lsda', ref: 'section 2.4' },
      { text: 'External mesh grilles across a whole shopfront are generally unacceptable in conservation areas, prime shopping areas and on listed buildings, though a doorway may be an exception. Housings belong in the shopfront, usually behind the fascia.', doc: 'lsda', ref: 'section 2.3' },
    ],
    ourAdvice:
      'Do not assume an unlisted unit on a main street is outside the strict tier. Ask the planning officer whether your street counts as a prime shopping area before the shutter is ordered.',
  },
  {
    slug: 'bradford',
    council: 'City of Bradford Metropolitan District Council',
    place: 'Bradford',
    legacyCity: 'bradford',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Darley Street', 'Broadway Bradford', 'Kirkgate'],
    headline:
      'Bradford adopted a new Shopfront Design Guide in March 2026: solid shutters will not be supported, perforated ones are strongly discouraged, and any external security needs a Crime Impact Statement.',
    intro: [
      'Bradford adopted its Shopfront Design Guide SPD on 5 March 2026, and on the same day revoked the 2007 shopfront guide and the 2012 shopkeepers’ security guide. Anything you read about Bradford written before March 2026 may describe documents that no longer count.',
      'The new guide names the places where external security is generally unlikely to be suitable: Bradford city centre, the town centres of Keighley, Ilkley, Bingley and Shipley, conservation areas and listed buildings.',
    ],
    documents: [
      {
        id: 'bsdg',
        title: 'Bradford Shopfront Design Guide SPD',
        date: 'Adopted 5 March 2026',
        status: 'adopted-spd',
        url: 'https://www.bradford.gov.uk/media/q15n2nj5/shopfront-design-guide-2026.pdf',
        checked: CHECKED,
      },
      {
        id: 'bsdgpage',
        title: 'Shopfront Design Guide SPD — adoption and revocation notices',
        date: '5 March 2026',
        status: 'guidance',
        url: 'https://www.bradford.gov.uk/planning-and-building-control/planning-policy/shopfront-design-guide-supplementary-planning-document/',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    securityOrder: ['Internal lattice or brick-bond grilles', 'External open-design shutters covering vulnerable areas only, where justified'],
    shutters: [
      { text: 'The council’s preferred approach is internal grilles; internal lattice or brick-bond grilles are named as the sensitive option.', doc: 'bsdg', ref: 'section 8' },
      { text: 'Solid, bare metal shutters will not be supported. Perforated or pinhole shutters are strongly discouraged because they look almost solid.', doc: 'bsdg', ref: 'section 8' },
      { text: 'Every application for external security — including a replacement roller shutter — needs a Crime Impact Statement.', doc: 'bsdg', ref: 'section 8' },
      { text: 'In the named centres, conservation areas and on listed buildings, external security must be backed by clear evidence of crime risk and agreed jointly by the police Designing Out Crime Officer and the planning officer.', doc: 'bsdg', ref: 'section 8' },
      { text: 'Shutters should usually cover only the vulnerable parts — door or glazing — and bare steel is very unlikely to be acceptable; colour-matched powder-coated aluminium is better.', doc: 'bsdg', ref: 'section 8' },
    ],
    ourAdvice:
      'The Crime Impact Statement is the step that will be new to most shopkeepers. Start collecting crime reference numbers and dates now, and note what you have already tried, because the guide asks why other measures were unsuitable or did not work.',
  },
  {
    slug: 'sheffield',
    council: 'Sheffield City Council',
    place: 'Sheffield',
    legacyCity: 'sheffield',
    nation: 'england',
    repairs: 'inside',
    retailStreets: ['Fargate', 'The Moor', 'Division Street', 'London Road', 'Ecclesall Road', 'Meadowhall'],
    headline:
      'Sheffield’s draft shopfront policy says standard roller shutters should be avoided on prominent shopping streets as well as in conservation areas; the fallback is a shutter behind the glass, or a lattice or perforated one.',
    intro: [
      'Sheffield still decides applications on its 2009 Core Strategy and the saved policies of its 1998 Unitary Development Plan. The new Sheffield Plan was submitted for examination in October 2023 and its main modifications went out for consultation from March to May 2026; until the council adopts it, its shopfront policy, DE5, is a draft. It is still the clearest statement of what Sheffield wants from a shopfront, and the shutter wording is unchanged in the main modifications version.',
      'The part to notice is the reach. Most councils keep their shutter rules for heritage streets. Sheffield’s draft also covers prominent street frontages and busy pedestrian routes, so a unit on a main shopping street can be caught whether or not it sits in one of the city’s 38 conservation areas.',
    ],
    documents: [
      {
        id: 'shp2',
        title: 'Sheffield Plan Part 2: Development Management Policies and Implementation — main modifications consultation version',
        date: 'March 2026 (draft, not yet adopted)',
        status: 'draft',
        url: 'https://haveyoursay.sheffield.gov.uk/47120/widgets/145770/documents/102403',
        checked: SHEFFIELD_CHECKED,
      },
      {
        id: 'udp',
        title: 'Sheffield Unitary Development Plan — Built Environment chapter (saved policies)',
        date: 'Adopted March 1998',
        status: 'local-plan-policy',
        url: 'https://www.sheffield.gov.uk/sites/default/files/2022-07/03-udp-built-environment.pdf',
        checked: SHEFFIELD_CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    shutters: [
      { text: 'On prominent street frontages, including busy pedestrian routes, and within conservation areas, standard roller shutters should be avoided.', doc: 'shp2', ref: 'Policy DE5' },
      { text: 'Where that is not practicable, the shutter should be fitted behind the glazing, or be an open lattice or a colour-coated perforated, pierced or punched type.', doc: 'shp2', ref: 'Policy DE5' },
      { text: 'Where possible the shutter box goes inside the building so the fascia sits flush with the elevation, and the guide rails sit behind the pilasters.', doc: 'shp2', ref: 'Policy DE5 (f) and (g)' },
    ],
    heritage: [
      { text: 'New and replacement shopfronts should keep existing traditional features such as stall risers, transoms and pilasters.', doc: 'shp2', ref: 'Policy DE5 (c)' },
      { text: 'A new front should respond to the whole building, upper floors included, and to the character of the street.', doc: 'shp2', ref: 'Policy DE5 (a) and (b)' },
    ],
    signage: [
      { text: 'Under the adopted plan, a fully internally illuminated fascia sign is acceptable only outside conservation areas and areas of special character, and only if it does not affect the setting of a listed building.', doc: 'udp', ref: 'Policy BE13 (c)' },
      { text: 'The draft plan says fully internally illuminated fascias will generally not be acceptable in conservation areas and other sensitive places where they would look out of keeping, distract from important architectural features or add to clutter.', doc: 'shp2', ref: 'Policy DE7 (k)' },
      { text: 'The fascia should be in proportion to the shopfront, the building and the buildings either side.', doc: 'shp2', ref: 'Policy DE5 (d)' },
    ],
    ourAdvice:
      'Sheffield is about 86 road miles from Birmingham, inside our repair radius. For a new front on a main street, treat DE5 as if it were already adopted: put the shutter behind the glass or choose a colour-coated perforated curtain from the start, with the box inside the building and the guides behind the pilasters, and use externally lit or halo-lit letters rather than a lit box fascia. Designing to the draft now costs nothing extra and avoids a redesign if the officer applies it.',
  },
  {
    slug: 'reading',
    council: 'Reading Borough Council',
    place: 'Reading',
    legacyCity: 'reading',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Broad Street', 'The Oracle', 'Friar Street'],
    headline:
      'Reading’s 2022 shopfront SPD puts laminated glass first and internal grilles second, and calls solid shutters — inside or out — generally inappropriate.',
    intro: [
      'Reading adopted its Design Guide for Shopfronts SPD in January 2022. Its security section is short and direct, and it makes a claim worth knowing: that 10–15 mm laminated glass can often give the same security as a shutter.',
      'It also allows one practical exception that many councils do not spell out — an external shutter across a recessed doorway, to stop the recess being used out of hours.',
    ],
    documents: [
      {
        id: 'rsfd',
        title: 'Design Guide for Shopfronts SPD',
        date: 'Adopted January 2022',
        status: 'adopted-spd',
        url: 'https://images.reading.gov.uk/2022/01/Shopfront-Design-SPD-Adopted-January-2022.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    securityOrder: ['Laminated glass', 'Internal grilles', 'Demountable or removable grilles', 'External shutter to a recessed doorway, as see-through as possible'],
    shutters: [
      { text: 'Security shutters should be avoided in favour of laminated glass; the SPD notes that 10–15 mm glass can often achieve the same level of security.', doc: 'rsfd', ref: 'para 4.40' },
      { text: 'If laminated glass is not possible, internal grilles. Solid internal or external shutters are generally inappropriate, and demountable grilles are preferred to external roller grilles.', doc: 'rsfd', ref: 'para 4.40' },
      { text: 'An external shutter that closes off a recessed doorway outside trading hours may be appropriate, as long as it keeps as much visibility as possible.', doc: 'rsfd', ref: 'para 4.40' },
      { text: 'On listed buildings and in conservation areas, exterior shutters should be avoided in favour of laminated glass, and original timber shutters kept.', doc: 'rsfd', ref: 'para 4.71' },
    ],
    ourAdvice:
      'Demountable grilles need somewhere to live during the day. Before choosing them, find a place inside the shop where several heavy mesh panels can stand without blocking a fire exit.',
  },
  {
    slug: 'southampton',
    council: 'Southampton City Council',
    place: 'Southampton',
    legacyCity: 'southampton',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Above Bar Street', 'WestQuay', 'Oxford Street'],
    headline:
      'Southampton’s September 2025 advice note says open lattice shutters are the only acceptable security shutter in a conservation area.',
    intro: [
      'Southampton published its Shopfronts in Conservation Areas advice note in September 2025. It is short, aimed at owners and tenants, and states its security rule in a single sentence.',
      'It also gives the reason the council cares: poor shopfronts and solid shutters can erode a conservation area’s character badly enough that, in the worst case, the area could lose its designation.',
    ],
    documents: [
      {
        id: 'socan',
        title: 'Shopfronts in Conservation Areas — Advice Note',
        date: 'September 2025',
        status: 'advice-note',
        url: 'https://www.southampton.gov.uk/media/feajdbmj/shopfronts-in-conservation-areas-19112025.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'exception-only',
    shutters: [
      { text: 'Open-style lattice shutters are the only acceptable security shutter in a conservation area.', doc: 'socan' },
      { text: 'They should be mounted inside, behind the shopfront — or outside only if the box is built into the fascia design and does not sit proud of the shopfront.', doc: 'socan' },
      { text: 'Externally fitted solid or perforated shutters are not acceptable.', doc: 'socan' },
    ],
    signage: [{ text: 'Only a single hanging sign associated with the fascia would be supported.', doc: 'socan' }],
    ourAdvice:
      'If an existing external shutter box already sits proud of the fascia, the cleanest route is often a deeper new fascia that swallows the box. Price that alongside an internal shutter before deciding.',
  },
  {
    slug: 'brighton-and-hove',
    council: 'Brighton & Hove City Council',
    place: 'Brighton',
    legacyCity: 'brighton',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Western Road', 'North Street', 'The Lanes', 'North Laine'],
    headline:
      'Brighton & Hove’s shop front SPD rules out roller shutters of any type except in three narrow cases, and on listed buildings solid shutters and visible boxes are not acceptable at all.',
    intro: [
      'Brighton & Hove adopted its Shop Front Design SPD on 8 September 2005. It is old, but it is specific in a way many newer guides are not: rather than “discouraging” roller shutters, it lists the only three situations in which it will accept one.',
      'One of those situations is local to Brighton — the Kings Road Arches on the seafront, where there is no recognised need for a display after closing.',
    ],
    documents: [
      {
        id: 'spd02',
        title: 'Shop Front Design SPD',
        date: 'Adopted 8 September 2005',
        status: 'adopted-spd',
        url: 'https://www.brighton-hove.gov.uk/sites/default/files/migrated/article/inline/downloads/conservation/Shop_Front_Design_SPD_-_Final_Version.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    shutters: [
      { text: 'Roller shutters need planning permission and, of any type or design, are not acceptable except in three cases.', doc: 'spd02', ref: 'section 6' },
      { text: 'The three cases: isolated locations or special circumstances where police-backed evidence shows a real security problem and police-advised measures have been tried; open-fronted shops with no window, such as butchers, fishmongers and greengrocers; and places with no need for a display after hours, such as the Kings Road Arches.', doc: 'spd02', ref: 'section 6' },
      { text: 'Even then the box must be hidden behind or beneath the fascia, and the shutter painted to match the shopfront or bronze anodised.', doc: 'spd02', ref: 'section 6' },
      { text: 'On listed buildings, listed building consent is always required for security measures, and solid shutters and visible box housings are not acceptable.', doc: 'spd02', ref: 'section 8' },
    ],
    ourAdvice:
      'If you run an open-fronted shop with no display window, say so clearly in the application — it is one of the few routes the SPD leaves open, and an officer cannot apply it if the drawings make the unit look like an ordinary glazed shop.',
  },
  {
    slug: 'plymouth',
    council: 'Plymouth City Council',
    place: 'Plymouth',
    legacyCity: 'plymouth',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['New George Street', 'Cornwall Street', 'Drake Circus'],
    headline:
      'Plymouth’s Development Guidelines SPD says external solid or perforated shutters will normally be resisted, and sets out three alternatives in order of preference.',
    intro: [
      'Plymouth’s shopfront guidance is part of its Development Guidelines SPD, first adopted in April 2010 and reviewed in May 2013. It was written to support the former Core Strategy, which has since been replaced by the Plymouth and South West Devon Joint Local Plan, so confirm with the council that this section is still applied.',
      'The guidance makes the point that a street of solid shutters gives a hostile appearance at night, and asks for security to be part of the design from the outset.',
    ],
    documents: [
      {
        id: 'pdg',
        title: 'Development Guidelines Supplementary Planning Document, First Review',
        date: 'Adopted May 2013',
        status: 'adopted-spd',
        url: 'https://www.plymouth.gov.uk/sites/default/files/DevelopmentGuidelinesSupplementaryPlanningDocumentFirstReview_0.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'normally-refused',
    securityOrder: ['Security (laminated) glass', 'Internal shutter grilles, open mesh if feasible', 'External open-mesh grilles in some cases'],
    shutters: [
      { text: 'External solid or perforated metal shutters and grilles will normally be resisted.', doc: 'pdg', ref: 'para 4.2.31' },
      { text: 'Preferred, in order: laminated security glass; internal retractable shutter grilles, open mesh if feasible; then, in some instances, external open-mesh grilles with the display still visible and the box behind the fascia or recessed flush.', doc: 'pdg', ref: 'para 4.2.31' },
      { text: 'Alarms should never be fixed on architectural features such as pilasters or decorative mouldings.', doc: 'pdg', ref: 'para 4.2.32' },
    ],
    ourAdvice:
      'Because the SPD predates the Joint Local Plan, a quick email to the case officer asking which shopfront guidance they apply now will save a revision later.',
  },
  {
    slug: 'bournemouth-christchurch-and-poole',
    council: 'Bournemouth, Christchurch and Poole Council',
    place: 'Bournemouth',
    legacyCity: 'bournemouth',
    nation: 'england',
    repairs: 'outside',
    retailStreets: ['Commercial Road', 'Old Christchurch Road', 'The Square'],
    headline:
      'BCP Council’s March 2026 Shopfront Design Guide wants roller shutters fitted inside the glass, lattice style, with at least 65% visibility when they are down.',
    intro: [
      'BCP Council published its Shopfront Design Guide in March 2026, funded through Historic England’s Heritage Action Zone programme. It is read alongside the three legacy local plans for Bournemouth, Christchurch and Poole until a single BCP plan is adopted.',
      'It is one of the few guides to give a measurable transparency figure for shutters, which turns a matter of taste into something a drawing can show.',
    ],
    documents: [
      {
        id: 'bcpsdg',
        title: 'Bournemouth, Christchurch and Poole Shopfront Design Guide',
        date: 'March 2026',
        status: 'guidance',
        url: 'https://www.bcpcouncil.gov.uk/Assets/Planning-and-building-control/Shopfront-Design-Guide.pdf',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    shutters: [
      { text: 'Robust stall risers and security glazing are encouraged on new work.', doc: 'bcpsdg', ref: 'para 3.20' },
      { text: 'Any roller shutter should be fitted inside the windows and doors, in a chain-link or lattice style, and must allow clear views in: a minimum of 65% visibility when drawn.', doc: 'bcpsdg', ref: 'para 3.20' },
      { text: 'Bulky external shutter boxes and solid external shutters are not supported.', doc: 'bcpsdg', ref: 'para 3.20' },
      { text: 'A decorative gate across a recessed entrance can work, though it may not suit listed buildings or conservation areas.', doc: 'bcpsdg', ref: 'para 3.20' },
    ],
    ourAdvice:
      'Lattice products vary a lot in open area. Ask the manufacturer for the visibility figure and choose one comfortably above 65%, so a slightly heavier lath or a coat of powder does not push it under.',
  },
  {
    slug: 'edinburgh',
    council: 'City of Edinburgh Council',
    place: 'Edinburgh',
    legacyCity: 'edinburgh',
    nation: 'scotland',
    repairs: 'outside',
    retailStreets: ['Princes Street', 'George Street', 'Rose Street', 'Victoria Street'],
    headline:
      'Edinburgh calls solid roller shutters unacceptable everywhere, and in listed buildings and conservation areas rules out any externally mounted shutter.',
    intro: [
      'Edinburgh sets out its shopfront rules in its Guidance for Businesses, updated in January 2024. Scotland runs its own planning system, so the consents differ from England’s — but the shutter position is as firm as any council’s in the UK.',
      'The guidance has a section of its own for Princes Street signage, and stricter signage rules again for listed buildings, conservation areas and the Royal Mile.',
    ],
    documents: [
      {
        id: 'egfb',
        title: 'Guidance for Businesses',
        date: 'January 2024',
        status: 'guidance',
        url: 'https://www.edinburgh.gov.uk/downloads/file/27027/for-businesses',
        checked: CHECKED,
      },
    ],
    heritageExternal: 'not-acceptable',
    shutters: [
      { text: 'Solid roller shutters are unacceptable.', doc: 'egfb', ref: 'Altering a Shopfront — Security' },
      { text: 'Where shutters are not common in the immediate area they should be housed internally behind the window; elsewhere behind the fascia or a sub-fascia, never in a box projecting from the building.', doc: 'egfb', ref: 'Security, step 2' },
      { text: 'Non-solid shutters may be acceptable in perforated, lattice, brick-bond or open-weave patterns, and interlocking clear polycarbonate shutters outside the glass may also be acceptable.', doc: 'egfb', ref: 'Security, step 3' },
      { text: 'In listed buildings and conservation areas externally mounted shutters will not be considered acceptable. Toughened glass is the most appropriate measure; internal open-lattice shutters or removable mesh grilles may be acceptable; metal gates suit recessed doors.', doc: 'egfb', ref: 'Listed Buildings and Conservation Areas' },
    ],
    signage: [
      { text: 'On Princes Street, projecting signs and banners will not be supported and illumination must be white and static.', doc: 'egfb', ref: 'Princes Street' },
      { text: 'For listed buildings, conservation areas and the Royal Mile: signs in timber, etched glass or stainless steel, individual hand-painted letters on the original fascia, and applied fascia panels not normally acceptable.', doc: 'egfb' },
    ],
    ourAdvice:
      'Clear polycarbonate shutters are a genuine option in Edinburgh outside the listed and conservation settings, and few councils name them. They cost more than steel lattice but leave the window looking like a window at night.',
  },
];

export const authorityBySlug = new Map(authorities.map((a) => [a.slug, a]));

export const docStatusLabel: Record<DocStatus, string> = {
  'adopted-spd': 'Adopted supplementary planning document',
  'local-plan-policy': 'Local Plan policy',
  guidance: 'Council guidance',
  draft: 'Draft — confirm its status with the council',
  'advice-note': 'Council advice note',
};

/**
 * Verified heritage or shopfront grant schemes. Each has a dated source and a
 * status as published on the date it was checked. A closed scheme is shown as
 * closed. Councils not listed here: we hold no verified grant data — which is
 * not the same as "no grant exists".
 */
export const grants: (Grant & { council: string; area: string })[] = [
  {
    council: 'Lichfield District Council',
    area: 'Lichfield City centre conservation area',
    name: 'Heritage Shopfront Grant Scheme',
    status: 'open',
    detail:
      'A £400,000 scheme offering grants of up to £30,000 towards shopfront improvements within the Lichfield City centre conservation area. Expressions of interest are considered on a rolling basis until 31 March 2028, while funds last.',
    url: 'https://www.lichfielddc.gov.uk/planning/shopfront-grant-scheme',
    checked: CHECKED,
  },
  {
    council: 'City of Wolverhampton Council',
    area: 'City centre, Bilston, Wednesfield and other high streets',
    name: 'Vibrant High Streets grants 2026/27',
    status: 'closed',
    detail:
      'Up to £3,000 for frontage improvements (or £5,000 across two categories), with at least 20% match funding. The council’s page states the submission window closed at 5pm on 16 June 2026.',
    url: 'https://www.wolverhampton.gov.uk/business/employersupport/vibrant-high-street-grant',
    checked: CHECKED,
  },
];
