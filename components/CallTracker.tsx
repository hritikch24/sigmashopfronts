'use client';

import { useEffect } from 'react';

export default function CallTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="tel:"]');
      if (anchor && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-16801337867/call_click',
        });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
