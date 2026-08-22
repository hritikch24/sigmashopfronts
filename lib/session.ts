'use client';

/**
 * The analytics session id, shared with components/Analytics.tsx.
 *
 * Forms attach this so a submitted lead can be joined back to the page views
 * that produced it — without it, the funnel can show where people stop but
 * not which journeys actually convert.
 */
const SESSION_KEY = '_sigma_sid';

export function getSessionId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return undefined;
  }
}
