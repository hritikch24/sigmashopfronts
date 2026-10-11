/**
 * Every fact this site states about the business, in one place.
 *
 * Pages, JSON-LD, llms.txt and emails all read from here, so a fact can only
 * be wrong in one spot. Nothing in this file is decorative: if it is not true
 * and checkable, it does not belong here.
 *
 * What is deliberately absent — and must stay absent until the owner supplies
 * something real — is anything that would need inventing: review counts,
 * ratings, years trading, project totals, named clients, accreditations
 * beyond the ones listed under `trustBasis`.
 */

export const business = {
  name: 'Sigma Shopfronts',
  /** As registered at Companies House. */
  legalName: 'Sigma Shopfronts and Shutter Limited',
  companyNumber: '16794487',
  companiesHouseUrl: 'https://find-and-update.company-information.service.gov.uk/company/16794487',
  /** Incorporated 19 October 2025. Never phrase this as "years of experience". */
  incorporated: '2025-10-19',

  phones: {
    main: { display: '07414 779594', tel: '+447414779594' },
    second: { display: '07397 066538', tel: '+447397066538' },
  },
  /** WhatsApp runs on the second number. */
  whatsapp: '447397066538',
  /**
   * Mail stays on the old domain by the owner's choice (10 Oct 2026): the .com
   * keeps its mailboxes even though its website now only redirects. Keep
   * sigmashopfronts.com registered for as long as this address is in use.
   */
  email: 'sales@sigmashopfronts.com',
  /** Sender for site notifications; the .com is the domain already verified with Resend. */
  emailFrom: 'noreply@sigmashopfronts.com',

  registeredOffice: {
    street: '4 Thornwood Close',
    locality: 'Oldbury',
    region: 'West Midlands',
    postcode: 'B68 9LX',
    country: 'GB',
  },

  /**
   * The operating model, exactly as the owner gave it. Repairs are bounded by
   * road distance from Birmingham; installation is UK-wide. The emergency
   * promise is a REPLY within two hours — not attendance. Do not upgrade the
   * wording anywhere: copy, schema, ads, alt text.
   */
  repairRadiusMiles: 100,
  repairCentre: 'Birmingham',
  emergencyPromise: 'We reply to emergency repair calls within two hours and come out the same day.',
  /**
   * Confirmed by the owner on 11 October 2026: quotations and site visits are
   * free, and emergency repairs get a same-day call-out. NOT confirmed: 24/7
   * cover or any guarantee — do not add either until the owner says so.
   */
  freeQuote: 'Free quote and free site visit',
  sameDay: 'Same-day call-outs for emergency repairs',
  installArea: 'England, Scotland, Wales and Northern Ireland',

  /** What a customer can actually check. This is the whole trust story. */
  trustBasis: [
    'Registered at Companies House, number 16794487',
    'Insured — ask for the certificate with your quote',
    'Fitters carry CSCS cards',
    'A free site visit to look at the job and measure up',
    'A free written quote before any work starts',
    'Products chosen to meet the right British Standards',
  ],

  instagram: 'https://www.instagram.com/sigmashopfrontsuk/',
} as const;

/**
 * Facts that are not yet confirmed for the new domain. While any entry here
 * is `pending`, the site must stay `noindex` — `scripts/launch-gate.mjs`
 * fails the build if indexing is switched on with a pending fact.
 */
// Cleared 11 Oct 2026: the owner confirmed the indicative prices on /costs and
// approved the privacy notice and terms of business as published.
export const pendingFacts: Record<string, string> = {};

/** Not blockers for indexing, but owed before ads run again. */
export const followUps: Record<string, string> = {
  googleAdsTag: 'Sigma needs its own Google Ads conversion tag (NEXT_PUBLIC_SIGMA_ADS_ID). The old one was shared with another firm and has been removed.',
  analytics: 'A new GA4 property and GTM container for the new domain, if wanted (NEXT_PUBLIC_SIGMA_GA4_ID / NEXT_PUBLIC_SIGMA_GTM_ID).',
  indexNow: 'A new IndexNow key for the new domain (SIGMA_INDEXNOW_KEY). The old key file was removed.',
};

/** Tracking IDs come only from environment variables, so none can be copied in by accident. */
export const tracking = {
  gtm: clean(process.env.NEXT_PUBLIC_SIGMA_GTM_ID, /^GTM-[A-Z0-9]+$/i),
  ga4: clean(process.env.NEXT_PUBLIC_SIGMA_GA4_ID, /^G-[A-Z0-9]+$/i),
  googleAds: clean(process.env.NEXT_PUBLIC_SIGMA_ADS_ID, /^AW-\d+$/),
  /** Search Console HTML-tag verification (URL-prefix property). A Domain property uses a DNS TXT record instead. */
  googleVerification: clean(process.env.NEXT_PUBLIC_SIGMA_GSC_VERIFICATION, /^[A-Za-z0-9_-]{20,100}$/),
  bingVerification: clean(process.env.NEXT_PUBLIC_SIGMA_BING_VERIFICATION, /^[A-F0-9]{20,64}$/i),
};

function clean(raw: string | undefined, shape: RegExp): string | undefined {
  const v = raw?.trim().replace(/^["']|["']$/g, '');
  return v && shape.test(v) ? v : undefined;
}

/**
 * Indexing is opt-in. A preview build, a local build and a production build
 * without the variable all emit `noindex`. Set SIGMA_INDEXING=on in Vercel
 * only when `pendingFacts` is empty.
 */
export const indexingOn = process.env.SIGMA_INDEXING === 'on';
