import type { MetadataRoute } from 'next';
import { absolute } from '@/lib/seo';
import { garageDoors, garageLive, indexingOn } from '@/lib/business';
import { shopfronts } from '@/data/shopfronts';
import { authorities } from '@/data/authorities';
import { explainers } from '@/data/explainers';
import { towns } from '@/data/towns';

const GARAGE_PATHS = ['/garage-door-repairs', '/garage-door-installation'];

/**
 * Indexable pages only. While the site is held at noindex the sitemap is empty,
 * so it never lists a page that tells crawlers not to index it.
 */
export const PUBLIC_PATHS = [
  '/',
  '/frontage-check',
  '/shopfronts',
  ...shopfronts.map((s) => `/shopfronts/${s.slug}`),
  '/planning',
  '/planning/conservation-areas',
  ...authorities.map((a) => `/planning/${a.slug}`),
  '/grants',
  '/explained',
  ...explainers.map((e) => `/explained/${e.slug}`),
  '/repair-radius',
  ...towns.map((t) => `/repair-radius/${t.slug}`),
  '/jobs',
  '/costs',
  '/questions',
  '/shopfront-anatomy',
  '/company',
  '/enquire',
  '/privacy',
  '/terms-of-business',
  // Built only once confirmed, or as a draft on a preview (see garageDoors).
  ...(garageLive ? GARAGE_PATHS : []),
];

// Fixed, not "now": a lastmod that changes on every build tells crawlers every
// page changed every day.
const LAST_CHANGED = '2026-10-14';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingOn) return [];
  return PUBLIC_PATHS.filter((p) => garageDoors.published || !GARAGE_PATHS.includes(p)).map((p) => ({
    url: absolute(p),
    lastModified: LAST_CHANGED,
  }));
}
