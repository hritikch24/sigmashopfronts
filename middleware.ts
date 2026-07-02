import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Block /admin and /metrics from public access
  // Access with ?key=<ADMIN_API_KEY value> to get through
  if (pathname.startsWith('/admin') || pathname.startsWith('/metrics')) {
    const key = searchParams.get('key');
    const adminKey = process.env.ADMIN_API_KEY;

    const fullKey = adminKey + 'nimda';
    if (!adminKey || key !== fullKey) {
      // Return 404 — page doesn't exist for unauthorized visitors
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    // Add X-Robots-Tag header to prevent indexing even if crawled
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/metrics/:path*'],
};
