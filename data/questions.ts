/**
 * Questions people ask before a shopfront job, grouped the way they come up.
 * Answers are general and say so; anything council-specific points to the
 * council's own page or to the frontage check.
 */
export interface QA {
  q: string;
  a: string;
  /** Internal link for the longer answer. */
  more?: { href: string; label: string };
}

export const questionGroups: { title: string; items: QA[] }[] = [
  {
    title: 'Permission and consent',
    items: [
      {
        q: 'Do I need planning permission to replace my shopfront?',
        a: 'In most cases, yes. A new shopfront changes how the building looks from the street, which counts as development. Repairing the existing front like-for-like usually does not. The council has the final word; ask them before you order anything.',
        more: { href: '/frontage-check', label: 'Run the frontage check' },
      },
      {
        q: 'Is advertisement consent the same thing as planning permission?',
        a: 'No. It is a separate consent under separate regulations, and a new shopfront often needs both. Some signs have “deemed consent” within strict size and height limits; illuminated signs in a conservation area are outside the deemed-consent class for internally lit signs, so assume you will need to apply.',
        more: { href: '/explained/advertisement-consent', label: 'Advertisement consent, explained' },
      },
      {
        q: 'My building is listed. What changes?',
        a: 'You need listed building consent for any work that affects the building’s character — inside or out, including signs, shutters, alarm boxes and even some repairs. Carrying out such work without consent is a criminal offence, not just a planning breach.',
        more: { href: '/explained/listed-building-consent', label: 'Listed building consent for shopfronts' },
      },
      {
        q: 'How do I find out whether my shop is in a conservation area?',
        a: 'Your council publishes a map or list of its conservation areas, usually on its planning or heritage pages. Many also publish an appraisal for each area describing what makes it special, which is worth reading before you design anything.',
        more: { href: '/planning/conservation-areas', label: 'What a conservation area changes' },
      },
      {
        q: 'What is an Article 4 direction and does it apply to shops?',
        a: 'It is a council order that removes some permitted development rights in a defined area, so work that would normally go ahead without an application needs one. They are used most on houses, but some cover commercial premises or flats above shops. The council keeps a list and map.',
        more: { href: '/explained/article-4-directions', label: 'Article 4 directions, explained' },
      },
      {
        q: 'Do I need building regulations approval for a new shopfront?',
        a: 'Usually. A new shopfront involves safety glazing, the entrance threshold and door width, and often an escape route — all building regulations matters, handled by building control rather than the planning department.',
      },
    ],
  },
  {
    title: 'Shutters and security',
    items: [
      {
        q: 'Why do councils refuse solid roller shutters?',
        a: 'A street of closed solid shutters is blank and dark at night, and councils link that to fear of crime and graffiti. Of the council documents we track, every one rules out or restricts solid external shutters in conservation areas, and several restrict them everywhere.',
        more: { href: '/explained/why-solid-shutters-get-refused', label: 'Why solid shutters get refused' },
      },
      {
        q: 'What security will a council usually accept instead?',
        a: 'The common order of preference is laminated or toughened glass first, then an internal grille behind the window, then an external open-lattice or demountable grille. The details differ by council, which is why we keep them council by council.',
        more: { href: '/planning', label: 'Shopfront rules by council' },
      },
      {
        q: 'Does a replacement shutter need permission if the old one did?',
        a: 'Often, yes — and a replacement is assessed against today’s policy, not the policy that applied when the old one went in. Some councils now ask for crime evidence even for a like-for-like replacement.',
      },
    ],
  },
  {
    title: 'Enforcement',
    items: [
      {
        q: 'What happens if I install a shutter or shopfront without permission?',
        a: 'The council can ask you to apply retrospectively, and if it would not have approved the work, it can serve an enforcement notice requiring it to be removed or changed. Councils do use these powers for shutters and shopfronts — their registers of enforcement notices are public.',
        more: { href: '/explained/after-an-enforcement-notice', label: 'What to do after an enforcement notice' },
      },
      {
        q: 'Can I appeal an enforcement notice?',
        a: 'In England, yes, to the Planning Inspectorate, and the notice is held while the appeal is decided. The deadline is strict: the appeal must be received before the date the notice takes effect, and that date is stated on the notice.',
        more: { href: '/explained/after-an-enforcement-notice', label: 'Enforcement notices, step by step' },
      },
    ],
  },
  {
    title: 'Grants',
    items: [
      {
        q: 'Are there grants for shopfront improvements?',
        a: 'Sometimes, usually run by a council for a particular town centre or conservation area, for a limited period, and often already allocated. We list only schemes we can point to on the council’s own website, with the date we checked and whether they were open.',
        more: { href: '/grants', label: 'Shopfront grants we can verify' },
      },
      {
        q: 'Do grants come with design conditions?',
        a: 'Almost always. Heritage shopfront grants typically pay towards restoring traditional features and expect the design to follow the council’s guidance, so the cheapest specification is rarely the one that gets funded.',
        more: { href: '/explained/heritage-shopfront-grants', label: 'Applying for a heritage grant' },
      },
    ],
  },
  {
    title: 'Working with us',
    items: [
      {
        q: 'Where do you work?',
        a: 'We install shopfronts, shutters and glazing across the UK. Repairs are limited to premises within 100 road miles of Birmingham, and we reply to emergency repair calls within two hours.',
        more: { href: '/repair-radius', label: 'The repair radius' },
      },
      {
        q: 'Will you deal with the planning application?',
        a: 'We draw what we propose to fit and can prepare the shopfront drawings an application needs. We are installers, not planning consultants: for a complex or contentious case — a listed building, an enforcement appeal — a planning consultant or architect is the right person to lead it.',
      },
      {
        q: 'Is the frontage check a planning decision?',
        a: 'No. It is guidance from an installer, drawn from council documents we have read and cited. Only the council can tell you whether you need consent and whether you will get it.',
        more: { href: '/frontage-check', label: 'Use the frontage check' },
      },
    ],
  },
];
