import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { classify } from '@/lib/legacy-urls';
import { LEGACY_HOSTS, SITE_HOST, SITE_URL } from '@/lib/site';

const CANONICAL_HOST = SITE_HOST.toLowerCase();
/** The bare new domain, when the canonical host is its www form. */
const BARE_HOST = CANONICAL_HOST.startsWith('www.') ? CANONICAL_HOST.slice(4) : null;

/**
 * Three jobs, in order:
 *  1. Old host: every request gets a mapped 301, a path-preserving redirect for
 *     business links, or a 410. The old host never serves content again.
 *  2. Legacy paths on this host behave the same way, so a stray old link to the
 *     new domain is answered exactly as it would be on the old one.
 *  3. Private tools return 404 without the key and are never indexed.
 * Also: the bare new domain 301s to www (whatever Vercel's domain setting
 * says), and preview deployments are never indexable.
 */

const GONE_HTML = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>This page has been removed</title><style>body{font:17px/1.6 system-ui,sans-serif;max-width:36rem;margin:12vh auto;padding:0 1rem;color:#0a1420;background:#f3f5f7}a{color:#0049a3}</style></head><body><h1>This page has been removed</h1><p>It was taken down on purpose and is not coming back.</p><p><a href="${SITE_URL}/">Go to the Sigma Shopfronts home page</a> or <a href="${SITE_URL}/frontage-check">check what your council will accept</a>.</p></body></html>`;

function gone(): NextResponse {
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=3600' },
  });
}

export function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  const host = (request.headers.get('host') ?? '').toLowerCase().split(':')[0];
  const legacyHost = LEGACY_HOSTS.includes(host);
  const outcome = classify(pathname);

  if (BARE_HOST && host === BARE_HOST) {
    return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 301);
  }

  if (legacyHost) {
    if (outcome.kind === 'moved') return NextResponse.redirect(`${SITE_URL}${outcome.to}`, 301);
    if (outcome.kind === 'pass') return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 308);
    return gone();
  }

  if (outcome.kind === 'moved' && outcome.to !== pathname) {
    return NextResponse.redirect(new URL(outcome.to, request.url), 301);
  }
  if (outcome.kind === 'gone') return gone();

  if (pathname.startsWith('/admin') || pathname.startsWith('/metrics')) {
    const key = searchParams.get('key');
    const adminKey = process.env.ADMIN_API_KEY;
    if (!adminKey || key !== adminKey) {
      return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 });
    }
  }

  const res = NextResponse.next();
  if (/^\/(admin|metrics|quote|invoice)(\/|$)/.test(pathname)) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  // Preview and other non-canonical hosts (e.g. *.vercel.app) must never be indexed.
  else if (host && host !== CANONICAL_HOST && host !== 'localhost') res.headers.set('X-Robots-Tag', 'noindex');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
