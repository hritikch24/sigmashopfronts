/**
 * Identity of this site, and of its sibling sites.
 *
 * The three shopfront sites share a codebase lineage, so code is regularly
 * copied between them. That copying is how branding leaks: a file lifted from
 * a sibling brings its phone number, domain, asset paths and storage keys with
 * it. `npm run test:contamination` fails the build on any such leak.
 *
 * KEEP THIS FILE IN SYNC across all three repos — only `SITE` differs.
 */

export const SITES = {
  grewal: {
    key: 'grewal',
    name: 'Grewal Shopfront & Shutters',
    shortName: 'Grewal',
    domain: 'www.grewalshopfrontandshutters.co.uk',
    origin: 'https://www.grewalshopfrontandshutters.co.uk',
    phoneDisplay: '07597 630000',
    phoneTel: '07597630000',
    whatsapp: '447597630000',
    // Every distinctive string that must NOT appear in the other two repos.
    markers: [
      'grewal',
      'grewalshopfrontandshutters',
      '07597630000',
      '07597 630000',
      '447597630000',
    ],
  },
  sigma: {
    key: 'sigma',
    name: 'Sigma Shop Fronts',
    shortName: 'Sigma',
    domain: 'www.sigmashopfronts.com',
    origin: 'https://www.sigmashopfronts.com',
    phoneDisplay: '07414 779594',
    phoneTel: '07414779594',
    whatsapp: '447397066538',
    markers: [
      'sigmashopfronts',
      '07414779594',
      '07414 779594',
      '447397066538',
      '07397 066 538',
    ],
  },
  urban: {
    key: 'urban',
    name: 'Urban Shopfronts',
    shortName: 'Urban',
    domain: 'www.urbanshopfronts.co.uk',
    origin: 'https://www.urbanshopfronts.co.uk',
    phoneDisplay: '07471 043827',
    phoneTel: '07471043827',
    whatsapp: '447471043827',
    markers: [
      'urbanshopfronts',
      '07471043827',
      '07471 043827',
      '447471043827',
    ],
  },
};

/** Which site this repo is. Change this line and nothing else when copying. */
export const SITE = SITES.sigma;

export const SIBLINGS = Object.values(SITES).filter((s) => s.key !== SITE.key);

/**
 * Substrings that legitimately contain a sibling marker.
 *
 * "suburban" and "urban heat island" appear throughout the city copy and are
 * not leaks. Keep this list tight — every entry is a hole in the check.
 */
export const FALSE_POSITIVES = [
  'suburban',
  'urban area',
  'urban areas',
  'urban heat',
  'urban centre',
  'urban center',
  'urban realm',
  'urban environment',
  'urban regeneration',
  'urban fabric',
  'urban location',
  'urban setting',
  'interurban',
  'urbanisation',
  'urbanization',
];

/** Files where a sibling name may legitimately appear (design cross-references). */
export const ALLOWED_SIBLING_MENTIONS = [
  'components/ExitIntentPopup.tsx',
  'tests/site-config.mjs',
];
