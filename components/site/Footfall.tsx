'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * First-party visit and phone-tap counting for the owner's own dashboard.
 * No cookies; a random id lives in sessionStorage for the tab's lifetime.
 */
const KEY = 'sigma.visit';

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'no-storage';
  }
}

function device(): string {
  const w = window.innerWidth;
  return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
}

function send(url: string, body: Record<string, unknown>) {
  const payload = JSON.stringify(body);
  if (navigator.sendBeacon) navigator.sendBeacon(url, payload);
  else fetch(url, { method: 'POST', body: payload, keepalive: true }).catch(() => {});
}

export default function Footfall() {
  const path = usePathname();
  const last = useRef('');

  useEffect(() => {
    if (path === last.current) return;
    last.current = path;
    const q = new URLSearchParams(window.location.search);
    send('/api/visit', {
      path,
      referrer: document.referrer || null,
      utmSource: q.get('utm_source'),
      utmMedium: q.get('utm_medium'),
      utmCampaign: q.get('utm_campaign'),
      gclid: q.get('gclid'),
      device: device(),
      sessionId: sessionId(),
    });
  }, [path]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a[data-dial]') as HTMLAnchorElement | null;
      if (!a) return;
      send('/api/dial', {
        line: a.dataset.dial,
        page: window.location.pathname,
        device: device(),
        sessionId: sessionId(),
      });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
