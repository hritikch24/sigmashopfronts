/**
 * The frontage check: what consent a shopfront job is likely to need, and what
 * would suit the building. Pure function, no I/O, so it runs in the browser and
 * is tested directly (tests/frontage.test.mjs).
 *
 * Guardrails, enforced by the shape of the types and by the tests:
 *  1. There is no "not required" verdict. The weakest statement is "check",
 *     and every result ends by telling the visitor to confirm with the council.
 *  2. Council-specific statements come only from data/authorities.ts, each with
 *     its document and reference. A council we hold no data for is reported as
 *     unknown — never filled in from a neighbour or from "most councils".
 *  3. A grant is mentioned only if it is in the verified grants list, with its
 *     status and the date it was checked.
 *  4. The whole result is computed before any contact detail is asked for.
 *  5. The result is labelled as an installer's guidance, not a planning decision.
 */
import { authorityBySlug, grants, type Authority, type Nation, type Point } from '@/data/authorities';

export type Status = 'listed' | 'conservation' | 'neither' | 'unsure';
export type Want = 'fascia' | 'shutter' | 'glazing' | 'illuminated' | 'awning';

export interface FrontageInput {
  /** A slug from data/authorities.ts, or null when we hold no data. */
  authority: string | null;
  /** Council name as resolved from the postcode, for councils we hold no data on. */
  councilName?: string;
  nation: Nation;
  status: Status;
  wants: Want[];
}

/** Deliberately has no "not needed" member. See guardrail 1. */
export type Verdict = 'likely' | 'possible' | 'check';

export interface ConsentResult {
  name: string;
  verdict: Verdict;
  why: string;
}

export interface Cited extends Point {
  docTitle: string;
  docDate: string;
  url: string;
}

export interface FrontageResult {
  councilLabel: string;
  known: boolean;
  lead?: { title: string; text: string; cited: Cited[] };
  consents: ConsentResult[];
  councilPoints: Cited[];
  spec: { title: string; items: string[] }[];
  grant: { found: true; name: string; status: 'open' | 'closed'; detail: string; url: string; checked: string } | { found: false; text: string };
  nextStep: string;
  sources: { title: string; date: string; url: string }[];
  disclaimer: string;
}

const WANT_LABEL: Record<Want, string> = {
  fascia: 'fascia and signage',
  shutter: 'a roller shutter or grille',
  glazing: 'new glazing or a new shopfront',
  illuminated: 'an illuminated sign',
  awning: 'an awning or canopy',
};

function cite(a: Authority, p: Point): Cited {
  const d = a.documents.find((x) => x.id === p.doc)!;
  return { ...p, docTitle: d.title, docDate: d.date, url: d.url };
}

function buildingConsentName(nation: Nation): string {
  return nation === 'scotland' ? 'Building warrant' : 'Building regulations approval';
}

function advertRegs(nation: Nation): string {
  switch (nation) {
    case 'scotland':
      return 'the Scottish advertisement regulations (1984)';
    case 'wales':
      return 'the advertisement regulations that apply in Wales (1992, as amended)';
    case 'northern-ireland':
      return 'the Northern Ireland advertisement regulations (2015)';
    default:
      return 'the 2007 advertisement regulations for England';
  }
}

export function checkFrontage(input: FrontageInput): FrontageResult {
  const a = input.authority ? authorityBySlug.get(input.authority) : undefined;
  const known = Boolean(a);
  const councilLabel = a?.council ?? input.councilName ?? 'your council';
  const want = new Set(input.wants);
  const heritage = input.status === 'listed' || input.status === 'conservation';
  const maybeHeritage = heritage || input.status === 'unsure';

  /* ── Part one: consents ─────────────────────────────────────────────── */

  const consents: ConsentResult[] = [];

  if (want.has('glazing') || want.has('shutter') || want.has('awning') || want.has('fascia') || want.has('illuminated')) {
    const strong = want.has('glazing') || want.has('awning') || want.has('shutter');
    consents.push({
      name: 'Planning permission',
      verdict: strong ? 'likely' : 'check',
      why: strong
        ? `Work that changes how the frontage looks — ${[...want].filter((w) => w !== 'fascia' && w !== 'illuminated').map((w) => WANT_LABEL[w]).join(', ')} — is usually development needing permission. An internal shutter fitted wholly behind the glass is the case most often treated differently; ask.`
        : 'A new sign on an existing fascia is mainly an advertisement matter, but new fascia boards, lighting fixings or changes to the shopfront itself can need permission. Ask before ordering.',
    });
  }

  if (want.has('fascia') || want.has('illuminated') || want.has('awning')) {
    let verdict: Verdict = 'possible';
    let why = `Signs are controlled separately under ${advertRegs(input.nation)}. Some signs have deemed consent within strict size and height limits; others need an application.`;
    if (want.has('illuminated') && maybeHeritage) {
      verdict = 'likely';
      why =
        input.nation === 'england'
          ? 'In England the class that allows some internally lit signs without an application does not apply in conservation areas, and signs on listed buildings need consent in their own right. Plan to apply for advertisement consent.'
          : `An illuminated sign in a sensitive setting is very likely to need express consent under ${advertRegs(input.nation)}.`;
    } else if (input.status === 'listed') {
      verdict = 'likely';
      why = `A sign fixed to a listed building will usually need advertisement consent under ${advertRegs(input.nation)} as well as listed building consent.`;
    } else if (want.has('illuminated')) {
      verdict = 'likely';
      why = `Illuminated signs are allowed without an application only within narrow conditions under ${advertRegs(input.nation)}. Expect to apply.`;
    }
    consents.push({ name: 'Advertisement consent', verdict, why });
  }

  if (input.status === 'listed') {
    consents.push({
      name: 'Listed building consent',
      verdict: 'likely',
      why: 'Any work affecting the character of a listed building — signs, shutters, glazing, fixings, even some repairs — needs listed building consent before it starts. Working without it is a criminal offence.',
    });
  } else if (input.status === 'unsure') {
    consents.push({
      name: 'Listed building consent',
      verdict: 'check',
      why: 'Find out first whether the building is listed. If it is, consent is needed for almost every item on your list. Search the national list for the address, or ask the council.',
    });
  }

  if (want.has('glazing') || want.has('awning') || want.has('shutter')) {
    consents.push({
      name: buildingConsentName(input.nation),
      verdict: want.has('glazing') ? 'likely' : 'check',
      why: want.has('glazing')
        ? 'A new shopfront brings in safety glazing, entrance access and often a means of escape. Building control confirms what applies.'
        : 'Usually only if a shutter or canopy affects an escape route, a fire separation or the structure. Check with building control.',
    });
  }

  /* ── Lead warning: solid shutters ───────────────────────────────────── */

  let lead: FrontageResult['lead'];
  if (want.has('shutter') && maybeHeritage) {
    const cited = a ? a.shutters.map((p) => cite(a, p)) : [];
    const firm =
      a?.heritageExternal === 'not-acceptable'
        ? `${a.council}’s own guidance rules out external shutters of the kind most people picture in this setting.`
        : a?.heritageExternal === 'normally-refused'
          ? `${a.council}’s guidance says external shutters will normally be refused or resisted in this setting.`
          : a?.heritageExternal === 'exception-only'
            ? `${a.council}’s guidance allows external shutters here only in the narrow cases it names.`
            : 'We hold no shopfront guidance for this council, so we cannot tell you its position — but the councils we do track all restrict solid external shutters in conservation areas.';
    lead = {
      title: 'Solid external roller shutters are the single most common refusal',
      text: `${firm} Plan on laminated glass and an internal or open-lattice grille instead, and treat a solid external shutter as the option least likely to be approved.`,
      cited,
    };
  }

  /* ── Council-specific points ────────────────────────────────────────── */

  const councilPoints: Cited[] = [];
  if (a) {
    if (want.has('glazing')) for (const p of a.heritage ?? []) councilPoints.push(cite(a, p));
    if (want.has('fascia') || want.has('illuminated')) for (const p of a.signage ?? []) councilPoints.push(cite(a, p));
    if (want.has('shutter') && !lead) for (const p of a.shutters) councilPoints.push(cite(a, p));
  }

  /* ── Part two: what would suit the building (installer's view) ──────── */

  const spec: FrontageResult['spec'] = [];

  if (want.has('shutter')) {
    const items: string[] = [];
    if (a?.securityOrder?.length) items.push(`${a.council}’s stated order of preference: ${a.securityOrder.join(' → ')}.`);
    items.push('Start with laminated glass in the shopfront. It does much of a shutter’s job and is invisible from the street.');
    if (maybeHeritage) {
      items.push('If more is needed, an internal lattice or brick-bond grille behind the glass, with its box hidden above the ceiling line or behind the fascia.');
      items.push('Avoid perforated and pinhole shutters: several councils treat them as solid.');
    } else {
      items.push('If an external shutter is justified, choose an open lattice, brick-bond or clear polycarbonate curtain rather than solid or pinhole laths.');
    }
    items.push('Box behind the fascia, never hung on the face of the building; guides inside the opening so pilasters stay visible.');
    items.push('Powder-coat the shutter, guides and box to match the shopfront. Bare galvanised steel reads as an afterthought.');
    spec.push({ title: 'Security', items });
  }

  if (want.has('glazing')) {
    const items = [
      'Keep — or put back — the stallriser, pilasters and a proper fascia. They are what make a glazed opening read as a shopfront.',
      'Use slim frame profiles and line any glazing bars up with the windows above.',
    ];
    if (maybeHeritage) {
      items.push('Choose a recessed, dark finish — anthracite, near-black or a deep heritage green — rather than bright white or silver anodised.');
      items.push('Ask before specifying full-height glass from pavement to fascia; on a traditional building it is often the first thing an officer objects to.');
      if (input.status === 'listed') items.push('On a listed building, assume repair before replacement and ask whether the council will accept aluminium at all.');
    } else {
      items.push('Full-height glazing can work on a modern building; keep a solid base or kick plate where trolleys and feet hit.');
    }
    spec.push({ title: 'Shopfront and glazing', items });
  }

  if (want.has('fascia') || want.has('illuminated')) {
    const items = [
      'Size the fascia to the building, not the brand guidelines: no deeper than the original or its neighbours, and below the first-floor window sills.',
      'Individual letters — painted or fixed — rather than a box sign standing proud of the fascia.',
    ];
    if (want.has('illuminated')) {
      items.push(
        maybeHeritage
          ? 'Light it from outside — a slim trough or discreet spot lights — or use halo-lit letters, and keep the light white and static.'
          : 'Halo-lit letters or external trough lighting look better than an internally lit box and are easier to get consented.',
      );
    }
    if (input.status === 'listed') items.push('On a listed building, expect hand-painted lettering on the existing fascia to be the default.');
    spec.push({ title: 'Fascia and signage', items });
  }

  if (want.has('awning')) {
    spec.push({
      title: 'Awning or canopy',
      items: [
        'A retractable canvas blind with its box set into or above the fascia suits most settings, traditional ones especially.',
        'Fixed rigid canopies and lettering on the blind are the versions councils most often question.',
        'Keep clear headroom over the pavement and check whether the highway authority has a say.',
      ],
    });
  }

  /* ── Grant ──────────────────────────────────────────────────────────── */

  const g = grants.find((x) => x.council === councilLabel || (input.councilName && x.council.toLowerCase().includes(input.councilName.toLowerCase())));
  const grant: FrontageResult['grant'] = g
    ? { found: true, name: g.name, status: g.status, detail: g.detail, url: g.url, checked: g.checked }
    : {
        found: false,
        text: `We have no verified shopfront grant on record for ${councilLabel}. That does not mean none exists — ask the council’s regeneration or conservation team.`,
      };

  /* ── Next step and sources ──────────────────────────────────────────── */

  const nextStep = known
    ? `Confirm with ${councilLabel} before ordering anything. Their guidance is linked below; a pre-application enquiry gets you a written view on your drawings.`
    : `Confirm with ${councilLabel} before ordering anything. We do not hold their shopfront guidance, so look for it on their planning pages or ask for pre-application advice.`;

  return {
    councilLabel,
    known,
    lead,
    consents,
    councilPoints,
    spec,
    grant,
    nextStep,
    sources: a ? a.documents.map((d) => ({ title: d.title, date: d.date, url: d.url })) : [],
    disclaimer:
      'This is guidance from a shopfront installer, based on the council documents cited. It is not planning advice and not a planning decision. Only the council can confirm what consent you need. Indicative only — confirm with your council.',
  };
}

/** Map a postcodes.io admin_district to one of our authorities. */
const DISTRICTS: Record<string, string> = {
  birmingham: 'birmingham',
  coventry: 'coventry',
  leicester: 'leicester',
  nottingham: 'nottingham',
  derby: 'derby',
  gloucester: 'gloucester',
  oxford: 'oxford',
  'bristol, city of': 'bristol',
  bristol: 'bristol',
  'cheshire west and chester': 'cheshire-west-and-chester',
  york: 'york',
  leeds: 'leeds',
  bradford: 'bradford',
  reading: 'reading',
  southampton: 'southampton',
  'brighton and hove': 'brighton-and-hove',
  plymouth: 'plymouth',
  'bournemouth, christchurch and poole': 'bournemouth-christchurch-and-poole',
  'city of edinburgh': 'edinburgh',
  edinburgh: 'edinburgh',
};

export function authorityForDistrict(district: string): string | null {
  return DISTRICTS[district.trim().toLowerCase()] ?? null;
}

export function nationFromCountry(country: string): Nation {
  const c = country.toLowerCase();
  if (c.includes('scotland')) return 'scotland';
  if (c.includes('wales')) return 'wales';
  if (c.includes('northern ireland')) return 'northern-ireland';
  return 'england';
}
