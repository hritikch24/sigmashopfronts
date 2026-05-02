/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx for simple use cases.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a UK phone number for display.
 * Handles both 07xxx and +447xxx formats.
 *
 * @example
 *   formatPhoneForDisplay("07397225530")  // "07397 225 530"
 *   formatPhoneForDisplay("+447397225530") // "07397 225 530"
 */
export function formatPhoneForDisplay(phone: string): string {
  // Strip whitespace and dashes
  const cleaned = phone.replace(/[\s\-()]/g, "");

  // Convert +447xxx to 07xxx
  const normalised = cleaned.startsWith("+44")
    ? "0" + cleaned.slice(3)
    : cleaned;

  // Format 07xxx xxx xxx  (11 digits starting with 07)
  if (/^07\d{9}$/.test(normalised)) {
    return `${normalised.slice(0, 5)} ${normalised.slice(5, 8)} ${normalised.slice(8)}`;
  }

  // Format 01xxx / 02xxx / 03xxx landlines (11 digits)
  if (/^0[123]\d{9}$/.test(normalised)) {
    return `${normalised.slice(0, 4)} ${normalised.slice(4, 7)} ${normalised.slice(7)}`;
  }

  // Return as-is if pattern not recognised
  return phone;
}

const WHATSAPP_NUMBER = "447397225530";

/**
 * Returns a wa.me deep-link for the SigmaShopfronts WhatsApp number.
 *
 * @param message - Optional pre-filled message text.
 */
export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
