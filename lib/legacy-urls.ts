/**
 * What happens to every URL the old site published.
 * Classification and reasoning: docs/relaunch/01-url-inventory.md.
 *
 *  - MOVED: one explicit old → new pair per page. No pattern rules.
 *  - GONE:  410, never redirected to a hub (that is a soft 404).
 *  - PASS:  business links customers hold (quotes, invoices) and private
 *           tools: path-preserving redirect from the old host only.
 *
 * Kept free of imports from React or Next so proxy.ts stays small.
 */
import { shopfronts } from '@/data/shopfronts';
import { authorities } from '@/data/authorities';

/** The 41 city slugs the old site had under /areas and in the matrix. */
export const LEGACY_CITIES = [
  'london', 'birmingham', 'manchester', 'leeds', 'liverpool', 'bristol', 'sheffield', 'glasgow', 'cardiff', 'newcastle',
  'nottingham', 'leicester', 'edinburgh', 'southampton', 'brighton', 'coventry', 'reading', 'wolverhampton', 'derby',
  'northampton', 'luton', 'swindon', 'stoke-on-trent', 'plymouth', 'bradford', 'swansea', 'oxford', 'cambridge', 'york',
  'bath', 'aberdeen', 'belfast', 'milton-keynes', 'middlesbrough', 'bournemouth', 'portsmouth', 'norwich', 'exeter',
  'chester', 'gloucester', 'peterborough',
] as const;

export const LEGACY_SERVICES = shopfronts.map((s) => s.legacySlug);

export const LEGACY_BLOG = [
  'how-to-maintain-commercial-roller-shutters',
  'aluminium-shopfront-planning-permission-uk',
  'fd30-vs-fd60-fire-door-commercial-premises',
  'what-is-lps-1175-security-rating',
  'emergency-shopfront-boarding-what-to-do',
  'shopfront-installation-cost-uk-2026',
  'shopfront-installation-cost-uk-2025',
  'best-shopfront-company-uk-how-to-choose',
  'shopfront-design-trends-uk-2026',
  'commercial-security-shutters-guide-uk',
  'shopfront-regulations-building-standards-uk-2026',
];

function buildMoved(): Map<string, string> {
  const m = new Map<string, string>([
    ['/', '/'],
    ['/about', '/company'],
    ['/contact', '/enquire'],
    ['/cost-guide', '/costs'],
    ['/faq', '/questions'],
    ['/glossary', '/shopfront-anatomy'],
    ['/privacy-policy', '/privacy'],
    ['/terms', '/terms-of-business'],
    ['/services', '/shopfronts'],
    ['/areas', '/planning'],
  ]);
  for (const s of shopfronts) m.set(`/services/${s.legacySlug}`, `/shopfronts/${s.slug}`);
  for (const a of authorities) if (a.legacyCity) m.set(`/areas/${a.legacyCity}`, `/planning/${a.slug}`);
  return m;
}

export const MOVED = buildMoved();

const GONE_EXACT = new Set(['/blog', '/reviews', '/why-choose-us', '/instant-quote', '/gallery', '/sitemap-retire.xml', '/towns']);

export function isGone(path: string): boolean {
  if (GONE_EXACT.has(path)) return true;
  if (path.startsWith('/blog/')) return true;
  if (path.startsWith('/towns/')) return true;
  const parts = path.split('/').filter(Boolean);
  // The whole services × cities matrix, whatever the slugs.
  if (parts[0] === 'services' && parts.length === 3) return true;
  // City pages with no successor council page.
  if (parts[0] === 'areas' && parts.length === 2 && !MOVED.has(path)) return true;
  return false;
}

/** Paths that are not content: redirect them unchanged from the old host. */
export function isPassThrough(path: string): boolean {
  return (
    /^\/(quote|invoice|admin|metrics|api|assets)(\/|$)/.test(path) ||
    ['/robots.txt', '/sitemap.xml', '/favicon.ico', '/manifest.json', '/llms.txt'].includes(path)
  );
}

export type LegacyOutcome = { kind: 'moved'; to: string } | { kind: 'gone' } | { kind: 'pass' } | { kind: 'unknown' };

export function classify(path: string): LegacyOutcome {
  const p = path.length > 1 ? path.replace(/\/+$/, '') : path;
  const to = MOVED.get(p);
  if (to) return { kind: 'moved', to };
  if (isGone(p)) return { kind: 'gone' };
  if (isPassThrough(p)) return { kind: 'pass' };
  return { kind: 'unknown' };
}
