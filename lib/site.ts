/**
 * The single source of truth for this site's public origin.
 *
 * Every canonical, sitemap entry, og:url, JSON-LD @id and email link derives
 * from this value. Nothing else in the codebase may hardcode the domain — a
 * domain move should be one edit here (or one environment variable) plus a
 * path-preserving 301 from the old host, not a 45-file find-and-replace.
 *
 * NEXT_PUBLIC_SITE_URL overrides it, so a preview or a staging host can run
 * the same build without emitting production canonicals. The fallback is the
 * production origin on the UK domain.
 *
 * Always origin-only: scheme + host, no trailing slash. Compose paths as
 * `${SITE_URL}/services` so there is never a double slash.
 */
function normalise(raw: string | undefined, fallback: string): string {
  const value = raw?.trim().replace(/^["']|["']$/g, '') || fallback;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withScheme.replace(/\/+$/, '');
}

export const SITE_URL = normalise(
  process.env.NEXT_PUBLIC_SITE_URL,
  'https://www.sigmashopfrontshutters.co.uk',
);

/**
 * Hosts that used to serve this site. They no longer serve content: `proxy.ts`
 * answers every request on them with a mapped 301 or a 410 (see
 * `lib/legacy-urls.ts` and docs/relaunch/01-url-inventory.md).
 */
export const LEGACY_HOSTS = ['sigmashopfronts.com', 'www.sigmashopfronts.com'];

/** Host only, no scheme — for display text and `SITE`-style constants. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');
