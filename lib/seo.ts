/**
 * Metadata and structured data, built in one place.
 *
 * Every public page calls `pageMeta()` for its <head> and, where it needs one,
 * a JSON-LD helper below. Nothing else in the codebase writes a canonical, a
 * robots directive or a schema.org object.
 *
 * The @id scheme is this site's own: `${SITE_URL}/company#org`,
 * `${SITE_URL}/#site`, and `<page url>#svc | #crumbs | #qa`.
 */
import type { Metadata } from 'next';
import { SITE_URL } from './site';
import { business, indexingOn } from './business';

export const ORG_ID = `${SITE_URL}/company#org`;
export const SITE_ID = `${SITE_URL}/#site`;

export function absolute(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

interface PageMetaInput {
  path: string;
  title: string;
  description: string;
  /** Pages that should never be indexed, even once the site is live. */
  noindex?: boolean;
  image?: string;
}

export function pageMeta({ path, title, description, noindex, image }: PageMetaInput): Metadata {
  const url = absolute(path);
  const index = indexingOn && !noindex;
  const og = image ?? '/assets/sigma-og.png';
  return {
    // The home page carries the brand in its own title; elsewhere the layout's
    // template appends it.
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
      : { index: false, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url,
      siteName: business.name,
      title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: `${business.name} — install, repair, transform` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [og] },
  };
}

/* ─── JSON-LD ────────────────────────────────────────────────────────── */

type Json = Record<string, unknown>;

export function organisation(): Json {
  const o = business.registeredOffice;
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': ORG_ID,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    telephone: business.phones.main.tel,
    email: business.email,
    logo: `${SITE_URL}/assets/sigma-logo-square-white.png`,
    image: `${SITE_URL}/assets/sigma-og.png`,
    foundingDate: business.incorporated,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Companies House company number',
      value: business.companyNumber,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.street,
      addressLocality: o.locality,
      addressRegion: o.region,
      postalCode: o.postcode,
      addressCountry: o.country,
    },
    // Installation is UK-wide; repairs are bounded by ROAD miles, which a
    // GeoCircle (straight-line radius) would overstate, so it is described
    // in words on the repair Service instead.
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    makesOffer: [
      { '@type': 'Offer', name: 'Free quotation and site visit', price: '0', priceCurrency: 'GBP' },
      { '@type': 'Offer', name: `Same-day call-out for emergency repairs within ${business.repairRadiusMiles} road miles of ${business.repairCentre}` },
    ],
    // Only profiles that exist and were fetched before shipping. See
    // tests/sameas.test.mjs, which re-checks each one.
    sameAs: [business.instagram],
  };
}

export function website(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: business.name,
    inLanguage: 'en-GB',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbs(path: string, trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absolute(path)}#crumbs`,
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absolute(t.path),
    })),
  };
}

export function service(path: string, name: string, description: string, area: 'uk' | 'repair-radius', place?: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absolute(path)}#svc`,
    name,
    description,
    provider: { '@id': ORG_ID },
    url: absolute(path),
    areaServed: place
      ? { '@type': 'City', name: place }
      : area === 'uk'
        ? { '@type': 'Country', name: 'United Kingdom' }
        : { '@type': 'AdministrativeArea', name: `Within ${business.repairRadiusMiles} road miles of ${business.repairCentre}` },
  };
}

/** Only for Q&A that is visible on the same page. */
export function questions(path: string, qa: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absolute(path)}#qa`,
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function article(path: string, headline: string, description: string, dateModified: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absolute(path)}#doc`,
    headline,
    description,
    dateModified,
    inLanguage: 'en-GB',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: absolute(path),
  };
}
