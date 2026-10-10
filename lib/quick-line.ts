/**
 * Pulls a phone number, an email address and a UK postcode out of one line of
 * free text, so a customer can write "07123 456789, B66 3AA, shutter stuck"
 * instead of filling in a form. Used in the browser (to show what we picked
 * up) and on the server (to save the lead). Kept free of imports.
 */
export type QuickLine = { phone: string; email: string; postcode: string };

const EMAIL = /[^\s@,;<>()]+@[^\s@,;<>()]+\.[a-z]{2,}/i;
const POSTCODE = /\b([A-PR-UWYZ][A-HK-Y]?\d[A-Z\d]?)\s*(\d[ABD-HJLNP-UW-Z]{2})\b/i;
const PHONE = /(?:\+|00)?\d[\d\s().-]{8,17}\d/g;

export function readLine(line: string): QuickLine {
  const email = line.match(EMAIL)?.[0] ?? '';
  const rest = email ? line.replace(email, ' ') : line;
  const pc = rest.match(POSTCODE);
  const postcode = pc ? `${pc[1]} ${pc[2]}`.toUpperCase() : '';
  let phone = '';
  for (const m of (pc ? rest.replace(pc[0], ' ') : rest).matchAll(PHONE)) {
    const digits = m[0].replace(/\D/g, '');
    if (digits.length >= 10 && digits.length <= 13) {
      phone = m[0].trim();
      break;
    }
  }
  return { phone, email, postcode };
}

/** A WhatsApp link to the firm, with a message already typed. */
export function whatsappLink(number: string, text = 'Hello Sigma Shopfronts, I would like some help with: '): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
