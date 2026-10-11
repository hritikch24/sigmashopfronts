/**
 * Long-form guides on the consent side of shopfront work. Topics chosen
 * because no other site in this portfolio covers them. England first, with
 * the differences for Scotland, Wales and Northern Ireland flagged where they
 * matter. These are explanations, not legal advice, and each says so.
 */

export type Block =
  | { t: 'h2'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'note'; text: string }
  | { t: 'src'; items: { label: string; url: string }[] };

export interface Explainer {
  slug: string;
  title: string;
  /** Answer-first summary, also the meta description. */
  summary: string;
  updated: string;
  body: Block[];
  related: string[];
}

export const explainers: Explainer[] = [
  {
    slug: 'advertisement-consent',
    title: 'Advertisement consent for shop signs',
    summary:
      'Shop signs are controlled separately from the shopfront. Some need no application if they stay within strict limits; illuminated signs in a conservation area, and most signs on listed buildings, need express consent first.',
    updated: '2026-10-09',
    body: [
      { t: 'p', text: 'In England, signs are governed by the Town and Country Planning (Control of Advertisements) (England) Regulations 2007, not by ordinary planning permission. That surprises people who have just got permission for a new shopfront and assume the fascia sign came with it. It did not.' },
      { t: 'h2', text: 'The three routes a sign can take' },
      { t: 'ul', items: [
        'Excluded: a short list of signs the regulations do not control at all — for example some signs inside a building.',
        'Deemed consent: signs that are allowed without applying, provided they meet every condition of their class.',
        'Express consent: everything else. You apply to the council and wait for a decision before putting the sign up.',
      ] },
      { t: 'h2', text: 'What a shop can usually put up without applying' },
      { t: 'p', text: 'The government’s guide for advertisers summarises Class 5, which covers signs on business premises about the business itself. A Class 5 sign must not be illuminated (unless it shows medical services), its lettering must not exceed 0.75 m in height, its top must be no higher than 4.6 m and no higher than the bottom of the first-floor window, and on a shop it can only go on a wall that has a shop window in it.' },
      { t: 'p', text: 'Class 4 allows some internally lit or halo-lit signs without an application, within further limits — one fascia sign and one projecting sign, the lowest point at least 2.5 m up, and the fascia no more than 0.25 m off the wall. The point most people miss: Class 4 does not apply in a conservation area, an Area of Outstanding Natural Beauty, a National Park, the Broads or an Area of Special Control of Advertisements.' },
      { t: 'note', text: 'In practice: if your shop is in a conservation area and you want an illuminated sign, plan to apply for express consent.' },
      { t: 'h2', text: 'What the council looks at' },
      { t: 'p', text: 'Advertisement decisions are limited to two questions: amenity — how the sign affects the look of the building and street — and public safety, which mostly means not distracting drivers or obstructing the pavement. The sign’s wording and the business behind it are not the council’s concern. Councils’ own shopfront guides say what they mean by amenity: many ask for individual letters rather than box signs, external rather than internal lighting in historic streets, and one projecting sign at fascia level.' },
      { t: 'h2', text: 'Listed buildings' },
      { t: 'p', text: 'A sign fixed to a listed building will usually also need listed building consent, because it affects the building’s character. That is a second application with a different test.' },
      { t: 'h2', text: 'Why it matters more than an ordinary planning breach' },
      { t: 'p', text: 'Displaying an advertisement without the consent it needs is itself a criminal offence under the Town and Country Planning Act 1990. With most unauthorised building work the council first has to serve a notice; with an unauthorised sign it can prosecute.' },
      { t: 'h2', text: 'Scotland, Wales and Northern Ireland' },
      { t: 'p', text: 'Scotland has its own advertisement regulations from 1984, Wales still operates the 1992 regulations with Welsh amendments, and Northern Ireland has its 2015 regulations. The broad shape is similar — deemed classes, then express consent — but the limits differ, so check the rules for the nation your shop is in.' },
      { t: 'note', text: 'This is a plain-English summary from an installer, not legal advice. Your council decides.' },
      { t: 'src', items: [
        { label: 'Outdoor advertisements and signs: a guide for advertisers (DCLG, 2007)', url: 'https://www.gov.uk/government/publications/outdoor-advertisements-and-signs-a-guide-for-advertisers' },
      ] },
    ],
    related: ['listed-building-consent', 'why-solid-shutters-get-refused'],
  },
  {
    slug: 'article-4-directions',
    title: 'Article 4 directions and your shop',
    summary:
      'An Article 4 direction removes particular permitted development rights in a defined area, so work that would normally need no application needs one. Check the council’s list before assuming anything is permitted.',
    updated: '2026-10-09',
    body: [
      { t: 'p', text: 'Permitted development rights let certain work go ahead without a planning application. They come from the Town and Country Planning (General Permitted Development) (England) Order 2015. Article 4 of that Order lets a council switch specific rights off in a specific place — a street, a conservation area, a town centre.' },
      { t: 'h2', text: 'Why a shop owner should care' },
      { t: 'p', text: 'For a shopfront itself the effect is often small, because replacing a shopfront usually needs permission anyway. Where Article 4 directions bite for shops is in the rights that come with the building: changing the use of a ground-floor unit, converting it or the floors above to flats, or altering the frontage of a mixed-use building. Many town-centre directions exist precisely to stop shop units being converted to housing without an application.' },
      { t: 'h2', text: 'How to find out if one applies' },
      { t: 'ol', items: [
        'Look on the council’s planning website for “Article 4 directions”. Most publish a list with a map or boundary plan for each.',
        'Read the direction itself, not just its title — it lists exactly which rights are removed and where.',
        'If you are buying or leasing, the local land charges search will show directions affecting the property.',
      ] },
      { t: 'h2', text: 'Immediate and non-immediate directions' },
      { t: 'p', text: 'Some directions take effect straight away and are confirmed later; others are advertised first and only bite after a notice period. Either way, once in force, the removed rights are gone until the council cancels the direction.' },
      { t: 'h2', text: 'Is there a fee?' },
      { t: 'p', text: 'In England, a planning application needed only because an Article 4 direction removed the permitted development right does not attract the usual application fee. The application is still assessed in the normal way.' },
      { t: 'note', text: 'Plain-English summary, not legal advice. The direction’s own wording is what counts.' },
    ],
    related: ['listed-building-consent', 'advertisement-consent'],
  },
  {
    slug: 'listed-building-consent',
    title: 'Listed building consent for shopfronts',
    summary:
      'If the building is listed, almost any change to its shopfront — new signs, shutters, alarm boxes, replacement glass or joinery — needs listed building consent before work starts. Doing it without consent is a criminal offence.',
    updated: '2026-10-09',
    body: [
      { t: 'p', text: 'Listing protects the whole building, not just its best-looking parts. In England that is set out in the Planning (Listed Buildings and Conservation Areas) Act 1990, and it applies to the interior as well as the outside, and to fixtures attached to the building.' },
      { t: 'h2', text: 'What on a shopfront typically needs consent' },
      { t: 'ul', items: [
        'Replacing or altering the shopfront, including its doors and glazing.',
        'Any sign fixed to the building — in addition to advertisement consent.',
        'Shutters and grilles, inside or out, and their boxes and fixings.',
        'Alarm boxes, cameras, lights and their cabling on the façade.',
        'Repairs that change materials or remove historic fabric, such as replacing original glass or mouldings.',
      ] },
      { t: 'h2', text: 'How to check whether a building is listed' },
      { t: 'p', text: 'In England, search the National Heritage List for England, run by Historic England. In Scotland, Historic Environment Scotland’s portal; in Wales, Cadw’s records; in Northern Ireland, the Department for Communities’ buildings database. Listing descriptions are often brief — a building can be listed even if the description never mentions the shopfront.' },
      { t: 'h2', text: 'What makes an application go smoothly' },
      { t: 'ol', items: [
        'A heritage statement explaining what is significant about the building and how the work affects it.',
        'Drawings that show existing and proposed side by side, with sections through the fascia and stallriser.',
        'A repair-first approach: say what you are keeping before what you are replacing.',
        'Materials and finishes named, not left as “to match”.',
      ] },
      { t: 'h2', text: 'Why it is treated so seriously' },
      { t: 'p', text: 'Carrying out unauthorised works to a listed building is a criminal offence, and the council can also require the work to be reversed through a listed building enforcement notice. A new owner can inherit that problem from a previous one.' },
      { t: 'note', text: 'There is no fee for a listed building consent application in England. That is not a reason to skip it.' },
    ],
    related: ['advertisement-consent', 'why-solid-shutters-get-refused'],
  },
  {
    slug: 'after-an-enforcement-notice',
    title: 'What to do after an enforcement notice',
    summary:
      'An enforcement notice states what the council says is wrong, what you must do and by when. You can appeal, but only before the date the notice takes effect — so read the dates first.',
    updated: '2026-10-09',
    body: [
      { t: 'p', text: 'Shopfronts and shutters are a routine part of planning enforcement. Sheffield City Council’s published register of enforcement and stop notices for May 2022 to January 2026, for example, includes several notices requiring roller shutters and their boxes to be removed from shopfronts. It happens, and it is expensive to undo work you have already paid for.' },
      { t: 'h2', text: 'First, read four things on the notice' },
      { t: 'ol', items: [
        'The breach: what the council says was done without permission.',
        'The steps required: remove, alter or replace — exactly what is listed.',
        'The date it takes effect: your appeal must reach the Planning Inspectorate before this date.',
        'The period for compliance: how long you then have to carry out the steps.',
      ] },
      { t: 'h2', text: 'Your options' },
      { t: 'ul', items: [
        'Comply: carry out the required steps by the deadline.',
        'Talk to the council: if an acceptable alternative exists — an internal shutter instead of an external one, say — a fresh application may resolve it. Get any agreement in writing.',
        'Appeal: in England to the Planning Inspectorate, on the grounds set out in the Town and Country Planning Act 1990, including that permission ought to be granted. The notice is suspended while the appeal is decided.',
      ] },
      { t: 'h2', text: 'Time limits changed in 2024' },
      { t: 'p', text: 'In England the period after which unauthorised building work becomes immune from enforcement used to be four years. Under the Levelling-up and Regeneration Act 2023 it is now ten years for work substantially completed on or after 25 April 2024. A shutter fitted without permission recently will not quietly become lawful in four years.' },
      { t: 'h2', text: 'What not to do' },
      { t: 'p', text: 'Do not ignore the deadline. Failing to comply with an enforcement notice that has taken effect is a criminal offence. And do not let a contractor replace the unauthorised item like-for-like — that repeats the breach.' },
      { t: 'h2', text: 'Where an installer helps' },
      { t: 'p', text: 'Once a compliant design is agreed, the job is ours: taking out the external shutter and box, making good the fascia and pilasters, and fitting the internal or lattice alternative. For the appeal itself, use a planning consultant or solicitor.' },
      { t: 'note', text: 'This is general information, not legal advice. Deadlines on an enforcement notice are strict; take professional advice early.' },
      { t: 'src', items: [
        { label: 'Sheffield City Council — register of enforcement and stop notices, May 2022 to January 2026', url: 'https://www.sheffield.gov.uk/sites/default/files/2026-01/register_of_enforcement_and_stop_notices_658-786_may_2022_to_january_2026.pdf' },
        { label: 'Appeal an enforcement notice (GOV.UK)', url: 'https://www.gov.uk/appeal-enforcement-notice' },
      ] },
    ],
    related: ['why-solid-shutters-get-refused', 'listed-building-consent'],
  },
  {
    slug: 'heritage-shopfront-grants',
    title: 'Applying for a heritage shopfront grant',
    summary:
      'Heritage shopfront grants are local, time-limited and usually tied to a conservation area. They pay towards restoring traditional features, expect the design to follow the council’s guidance, and almost never pay for work started before approval.',
    updated: '2026-10-09',
    body: [
      { t: 'p', text: 'There is no national shopfront grant you can apply for. The money comes through councils, usually for one town centre or conservation area, often backed by a regeneration or heritage fund, and for a fixed window of time. Historic England’s High Streets Heritage Action Zone programme, which funded many such schemes, ran from 2020 to 2024.' },
      { t: 'h2', text: 'What a scheme typically funds' },
      { t: 'p', text: 'Taking Lichfield’s current scheme as an example, eligible work includes restoring traditional shopfronts, reinstating lost architectural features, replacing inappropriate modern additions, heritage-appropriate signage and lighting, improving access and high-quality external decoration. That is a list about character, not maintenance.' },
      { t: 'h2', text: 'How the process usually runs' },
      { t: 'ol', items: [
        'Expression of interest: a short form to check the property and project are eligible.',
        'Full application: drawings, quotes and often a heritage statement.',
        'Design agreed with the council, which may ask for changes before it will fund.',
        'Planning, advertisement and listed building consents obtained as needed.',
        'Grant offer, then work, then a claim with invoices and photographs.',
      ] },
      { t: 'h2', text: 'Mistakes that cost the grant' },
      { t: 'ul', items: [
        'Starting work, or ordering materials, before a grant offer is in writing.',
        'Choosing the cheapest specification. Schemes fund the right materials and details, not the lowest price.',
        'Leaving consents to the end. A grant offer does not grant planning permission.',
      ] },
      { t: 'h2', text: 'Finding a scheme' },
      { t: 'p', text: 'Search your council’s website for shopfront or heritage grants, and ask its conservation or regeneration team directly. We keep a short list of schemes we can verify on a council’s own website, with the date we checked them.' },
      { t: 'note', text: 'Grant rules vary scheme by scheme. Read the scheme’s own guidance before relying on anything here.' },
    ],
    related: ['listed-building-consent', 'advertisement-consent'],
  },
  {
    slug: 'why-solid-shutters-get-refused',
    title: 'Why solid shutters get refused',
    summary:
      'Solid external roller shutters are the most common reason a shopfront security application fails. Councils object to the blank, dark street they create at night, and most accept laminated glass, internal grilles or open-lattice designs instead.',
    updated: '2026-10-09',
    body: [
      { t: 'p', text: 'We track the shopfront guidance of eighteen UK councils. Every one of them either rules out or restricts solid external shutters in conservation areas, and several restrict them everywhere. The reasons they give are strikingly consistent.' },
      { t: 'h2', text: 'The reasons councils give' },
      { t: 'ul', items: [
        'A dead street after closing: no display, no light on the pavement, nothing to look at.',
        'Less natural surveillance: no one can see into a shop — or see an intruder inside it.',
        'Fear of crime: a row of shutters makes a street feel unsafe, which can deter people from using it at night.',
        'Graffiti: a flat steel surface is an invitation.',
        'Harm to the building: boxes and guide rails bolted over fascias, pilasters and cornices.',
      ] },
      { t: 'h2', text: 'Perforated is not the answer' },
      { t: 'p', text: 'Pinhole and lightly perforated shutters were sold for years as the compromise. Councils have caught up: Bradford’s 2026 guide strongly discourages them because they look almost solid, and Southampton’s 2025 advice note and Plymouth’s SPD both group perforated shutters with solid ones.' },
      { t: 'h2', text: 'What councils accept instead' },
      { t: 'ol', items: [
        'Laminated or toughened glass — Reading’s guide says 10–15 mm laminated glass can often match a shutter’s security.',
        'An internal grille or lattice shutter behind the glass, with its box out of sight.',
        'An external open-lattice, brick-bond or clear polycarbonate shutter, where need is shown, with the box behind the fascia and the finish matched to the shopfront.',
        'Demountable mesh grilles, put up at closing and taken down in the morning.',
      ] },
      { t: 'h2', text: 'When a solid shutter can still be accepted' },
      { t: 'p', text: 'Narrowly. Brighton & Hove names three cases: police-backed evidence of an exceptional security problem, open-fronted shops with no window such as butchers and greengrocers, and premises with no need for a display after hours. Leeds allows an external roller shutter only for an exceptionally high-risk shop away from sensitive streets, and never on a listed building. Bradford now asks for a Crime Impact Statement with any external security application.' },
      { t: 'h2', text: 'Making the case if you need more than glass' },
      { t: 'ul', items: [
        'Keep crime reference numbers and dates for every incident.',
        'Record what you have already tried and why it was not enough.',
        'Ask the police for a designing-out-crime view — some councils give it real weight.',
        'Propose the least visible option that meets the risk, not the one that is cheapest to fit.',
      ] },
      { t: 'p', text: 'Our frontage check leads with this point wherever it applies, because it is where most security applications go wrong.' },
    ],
    related: ['after-an-enforcement-notice', 'advertisement-consent'],
  },
];

export const explainerBySlug = new Map(explainers.map((e) => [e.slug, e]));
