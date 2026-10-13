import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/**
 * next/link without background prefetch. Every page here is static and
 * served from the CDN, so a click is already fast; prefetching each link in
 * view only multiplied ISR reads and origin transfer (a home-page view pulled
 * ~37 payloads). Pass prefetch explicitly to opt back in for one link.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
