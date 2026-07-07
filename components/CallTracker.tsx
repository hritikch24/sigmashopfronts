'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function getSessionId(): string {
  const key = '_sigma_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function getDevice(): string {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  return 'Other';
}

// Phone patterns to detect in copied text
const PHONE_REGEX = /(?:0\d{4}\s?\d{6}|0\d{3}\s?\d{3}\s?\d{4}|\+?44\d{10,11}|07\d{3}\s?\d{6})/;

function sendTrackEvent(action: string, phone: string, page: string, searchParams: URLSearchParams) {
  const payload = {
    action,
    phone,
    page,
    referrer: document.referrer || null,
    utmSource: searchParams.get('utm_source'),
    utmMedium: searchParams.get('utm_medium'),
    utmCampaign: searchParams.get('utm_campaign'),
    device: getDevice(),
    browser: getBrowser(),
    sessionId: getSessionId(),
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track-call', JSON.stringify(payload));
  } else {
    fetch('/api/track-call', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }

  // Fire gtag conversion if available (both conversion IDs)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-16801337867/TcCuCK3Jk7IcEIukwMs-',
    });
    window.gtag('event', 'conversion', {
      send_to: 'AW-16801337867/u-x7CNe428gcEIukwMs-',
    });
  }
}

export default function CallTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Track tel: link clicks and WhatsApp link clicks
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // tel: link click
      const telAnchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (telAnchor) {
        const phone = telAnchor.href.replace('tel:', '').replace(/[\s\-()]/g, '');
        sendTrackEvent('call_click', phone, pathname, searchParams);
        return;
      }

      // WhatsApp link click
      const waAnchor = target.closest('a[href*="wa.me"], a[href*="whatsapp"]') as HTMLAnchorElement | null;
      if (waAnchor) {
        const href = waAnchor.href;
        const match = href.match(/wa\.me\/(\d+)/);
        const phone = match ? match[1] : 'whatsapp';
        sendTrackEvent('whatsapp_click', phone, pathname, searchParams);
        return;
      }
    }

    // 2. Track phone number copy events
    function handleCopy() {
      const selection = document.getSelection()?.toString() || '';
      if (!selection) return;

      const phoneMatch = selection.match(PHONE_REGEX);
      if (phoneMatch) {
        const phone = phoneMatch[0].replace(/[\s\-()]/g, '');
        sendTrackEvent('phone_copy', phone, pathname, searchParams);
      }
    }

    document.addEventListener('click', handleClick, true);
    document.addEventListener('copy', handleCopy, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('copy', handleCopy, true);
    };
  }, [pathname, searchParams]);

  return null;
}
