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
    title: 'Council permission',
    items: [
      {
        q: 'Do I need planning permission to replace my shopfront?',
        a: 'In most cases, yes. A new shopfront changes how the building looks from the street, so the council counts it as development. Repairing the front you have, and keeping the same look, usually does not need permission. The council has the final word, so ask them before you order anything.',
        more: { href: '/frontage-check', label: 'Use the free permission check' },
      },
      {
        q: 'Is sign permission the same as planning permission?',
        a: 'No. Sign permission (called advertisement consent) is separate, under different rules, and a new shopfront often needs both. Some signs are allowed without applying, if they stay within strict size and height limits. But a sign lit from inside, in a conservation area, is not one of them, so expect to apply.',
        more: { href: '/explained/advertisement-consent', label: 'Sign permission, explained' },
      },
      {
        q: 'My building is listed. What changes?',
        a: 'You need listed building consent for any work that changes the building’s character, inside or out. That includes signs, shutters, alarm boxes and even some repairs. Doing this work without consent is a crime, not just a planning problem.',
        more: { href: '/explained/listed-building-consent', label: 'Listed building consent for shopfronts' },
      },
      {
        q: 'How do I find out whether my shop is in a conservation area?',
        a: 'Your council publishes a map or list of its conservation areas, usually on its planning or heritage pages. Many also publish a report on each area that explains what makes it special. It is worth reading before you design anything.',
        more: { href: '/planning/conservation-areas', label: 'What a conservation area changes' },
      },
      {
        q: 'What is an Article 4 direction and does it apply to shops?',
        a: 'It is a council rule for a set area. It means some work that normally needs no permission does need it there. They are used mostly for houses, but some cover shops, businesses or flats above shops. The council keeps a list and a map.',
        more: { href: '/explained/article-4-directions', label: 'Article 4 directions, explained' },
      },
      {
        q: 'Do I need building regulations approval for a new shopfront?',
        a: 'Usually. A new shopfront involves safety glass, the step at the door, the door width and often a fire exit. These are all building regulations matters. They are handled by building control, not the planning department.',
      },
    ],
  },
  {
    title: 'Shutters and security',
    items: [
      {
        q: 'Why do councils refuse solid roller shutters?',
        a: 'A street of closed solid shutters is blank and dark at night. Councils link that to fear of crime and to graffiti. Every council guide we follow bans or limits solid outside shutters in conservation areas, and several limit them everywhere.',
        more: { href: '/explained/why-solid-shutters-get-refused', label: 'Why solid shutters get refused' },
      },
      {
        q: 'What security will a council usually accept instead?',
        a: 'Most councils prefer, in this order: strong glass first, then a grille inside behind the window, then an open grille on the outside or one you can take down. The details are different for each council, so we keep them council by council.',
        more: { href: '/planning', label: 'Shopfront rules by council' },
      },
      {
        q: 'Does a replacement shutter need permission if the old one did?',
        a: 'Often, yes. A replacement is judged against today’s rules, not the rules when the old one went in. Some councils now ask for evidence of crime, even when the new shutter matches the old one.',
      },
    ],
  },
  {
    title: 'Enforcement',
    items: [
      {
        q: 'What happens if I install a shutter or shopfront without permission?',
        a: 'The council can ask you to apply after the work is done. If it would not have approved the work, it can send an enforcement notice telling you to remove or change it. Councils do this for shutters and shopfronts, and their lists of enforcement notices are public.',
        more: { href: '/explained/after-an-enforcement-notice', label: 'What to do after an enforcement notice' },
      },
      {
        q: 'Can I appeal an enforcement notice?',
        a: 'In England, yes, to the Planning Inspectorate. The notice is paused while the appeal is decided. The deadline is strict: your appeal must arrive before the date the notice takes effect. That date is written on the notice.',
        more: { href: '/explained/after-an-enforcement-notice', label: 'Enforcement notices, step by step' },
      },
    ],
  },
  {
    title: 'Grants',
    items: [
      {
        q: 'Are there grants for shopfront improvements?',
        a: 'Sometimes. They are usually run by a council for one town centre or conservation area, for a short time, and the money is often already given out. We only list grants we can show on the council’s own website, with the date we checked and whether they were open.',
        more: { href: '/grants', label: 'Shopfront grants we have checked' },
      },
      {
        q: 'Do grants come with design conditions?',
        a: 'Almost always. Heritage shopfront grants usually pay towards bringing back traditional features, and the design must follow the council’s guidance. So the cheapest option is rarely the one that gets the grant.',
        more: { href: '/explained/heritage-shopfront-grants', label: 'Applying for a heritage grant' },
      },
    ],
  },
  {
    title: 'Working with us',
    items: [
      {
        q: 'Where do you work?',
        a: 'We fit shopfronts, shutters and glass anywhere in the UK. We do repairs for shops and businesses within 100 road miles of Birmingham. We reply to emergency repair calls within two hours and come out the same day.',
        more: { href: '/repair-radius', label: 'Towns we cover for repairs' },
      },
      {
        q: 'Will you deal with the planning application?',
        a: 'We draw what we plan to fit, and we can make the shopfront drawings an application needs. But we fit shopfronts; we are not planning consultants. For a difficult case, like a listed building or an enforcement appeal, a planning consultant or architect should lead it.',
      },
      {
        q: 'Is your permission check a council decision?',
        a: 'No. It is guidance from an installer, based on council documents we have read and linked to. Only the council can tell you if you need permission and if you will get it.',
        more: { href: '/frontage-check', label: 'Use the permission check' },
      },
    ],
  },
];
