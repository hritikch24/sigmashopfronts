'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Exit-intent trigger, shared verbatim across all three shopfront sites.
 * Only the banner design differs per site — this file should stay identical
 * so a fix made on one site can be copied straight to the others.
 *
 * Rules:
 *   - Fires only on genuine exit intent (cursor leaving the top of the
 *     viewport). There is deliberately no timer: interrupting someone who is
 *     still engaged is what made the previous version feel like spam.
 *   - Never fires on pages where the visitor is filling something in or
 *     reading at length.
 *   - Never fires while a form field is focused, or once the visitor has
 *     started typing into any form on the page.
 *   - Once dismissed, stays gone for DISMISS_COOLDOWN_DAYS, and never
 *     reappears twice in the same tab session.
 */

/** Routes where the visitor is entering information — never interrupt. */
const INPUT_ROUTES = [
  '/contact',
  '/instant-quote',
  '/quote',
  '/invoice',
  '/admin',
  '/metrics',
];

/** Routes where the visitor is reading at length — never interrupt. */
const READING_ROUTES = [
  '/blog',
  '/cost-guide',
  '/glossary',
  '/faq',
  '/terms',
  '/privacy-policy',
  '/reviews',
];

const DISMISS_KEY = 'exit_banner_dismissed_until';
const SESSION_KEY = 'exit_banner_shown_this_session';
const DISMISS_COOLDOWN_DAYS = 7;

export function isSuppressedPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  return [...INPUT_ROUTES, ...READING_ROUTES].some(
    (prefix) => path === prefix || path.startsWith(prefix + '/')
  );
}

function isDismissed(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return true;
    const until = localStorage.getItem(DISMISS_KEY);
    if (!until) return false;
    if (Date.now() < Number(until)) return true;
    localStorage.removeItem(DISMISS_KEY);
    return false;
  } catch {
    // Private browsing can throw on storage access — fail closed and stay quiet.
    return true;
  }
}

function recordDismissal(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
    localStorage.setItem(
      DISMISS_KEY,
      String(Date.now() + DISMISS_COOLDOWN_DAYS * 24 * 60 * 60 * 1000)
    );
  } catch {
    /* storage unavailable — the in-memory guard still prevents a repeat */
  }
}

/** True when the visitor is mid-interaction with a form on this page. */
function isBusyWithForm(): boolean {
  const el = document.activeElement;
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    return true;
  }
  // Also stay quiet if they have typed anything at all, even if focus moved.
  return Array.from(document.querySelectorAll('input, textarea')).some((f) => {
    const v = (f as HTMLInputElement | HTMLTextAreaElement).value;
    const type = (f as HTMLInputElement).type;
    return type !== 'hidden' && type !== 'checkbox' && type !== 'radio' && v.trim().length > 0;
  });
}

export interface ExitIntentState {
  show: boolean;
  /** Close and remember, so it will not reappear for the cooldown period. */
  dismiss: () => void;
}

export function useExitIntent(): ExitIntentState {
  const [show, setShow] = useState(false);
  const firedRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isSuppressedPath(pathname)) return;
    if (isDismissed()) return;

    function handleMouseOut(e: MouseEvent) {
      // Only the top edge reads as "leaving" — sideways exits are usually
      // the visitor reaching for a bookmark or another window.
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      if (firedRef.current) return;
      if (isBusyWithForm()) return;

      firedRef.current = true;
      setShow(true);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* nothing to do */
      }
    }

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [pathname]);

  // Route changes should close it rather than leave it floating over new content.
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  function dismiss() {
    setShow(false);
    recordDismissal();
  }

  return { show, dismiss };
}

/** Escape key and background-scroll lock, shared by both banner designs. */
export function useModalChrome(open: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}
