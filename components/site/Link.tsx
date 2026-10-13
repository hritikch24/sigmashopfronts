'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent, TouchEvent } from 'react';

/**
 * next/link that prefetches on intent, not on sight.
 *
 * The default prefetched every link the moment it scrolled into view: a
 * home-page view pulled ~37 page payloads, which multiplied ISR reads and
 * origin transfer on the Vercel plan. Here a page is fetched only when the
 * visitor hovers or touches its link, which still lands before the click
 * completes, so navigation feels the same.
 *
 * Crawlers are unaffected: the server HTML is the same plain <a href>.
 * Pass prefetch explicitly to opt one link back into viewport prefetch.
 */
export default function Link({ prefetch, onMouseEnter, onTouchStart, ...props }: ComponentProps<typeof NextLink>) {
  const router = useRouter();
  const href = typeof props.href === 'string' ? props.href : null;

  function warm() {
    if (href && href.startsWith('/') && !href.startsWith('//')) router.prefetch(href);
  }

  return (
    <NextLink
      {...props}
      prefetch={prefetch ?? false}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        onMouseEnter?.(e);
        warm();
      }}
      onTouchStart={(e: TouchEvent<HTMLAnchorElement>) => {
        onTouchStart?.(e);
        warm();
      }}
    />
  );
}
