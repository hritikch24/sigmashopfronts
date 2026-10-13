/**
 * Lead events for Google Analytics (and, through it, Google Ads conversions).
 *
 * Safe to call anywhere on the client: it does nothing when no GA4 ID is set
 * or the tag has not loaded. Consent Mode decides what Google may store; the
 * event itself is always a count with no personal details in it.
 */
type Gtag = (...args: unknown[]) => void;

export type LeadEvent =
  | 'call_click' // tapped a phone number
  | 'whatsapp_click' // opened WhatsApp
  | 'generate_lead' // an enquiry form was sent and accepted
  | 'frontage_check'; // finished the frontage check (not a lead; a signal)

export function measure(event: LeadEvent, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === 'function') gtag('event', event, params);
}
