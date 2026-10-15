/**
 * Turns one typed or spoken message into a quote, invoice or proforma draft.
 *
 *   "invoice for Hritik, email hritik@example.com, number 07123 456789,
 *    job: replace shutter motor, price £450 plus VAT"
 *
 * Two readers, then a guard:
 *  - `ruleParse` — regexes only. Always runs, needs no network, and is the
 *    whole parser when the AI is unavailable.
 *  - The AI reading (done by the API route) is passed through `groundDraft`,
 *    which keeps a value only if it is actually in the sentence: the email
 *    and phone verbatim, every price and quantity as a number that was typed,
 *    and free text mostly made of the sentence's own words. A model that
 *    invents a surname, a phone digit or a price is caught here, not on a
 *    customer's invoice.
 *  - VAT, document type and deposit are read by rules only.
 *
 * Name and a price are required (`missingRequired`). Everything else is
 * optional and left out when not given, so the document shows only what
 * was said.
 *
 * No imports: plain TypeScript, so `node tests/document-parse.test.mts` can
 * load it directly.
 */

export type DocType = 'quote' | 'invoice' | 'proforma';

export interface DraftItem {
  description: string;
  qty: number;
  unitPrice: number;
}

export interface Draft {
  type: DocType;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  lineItems: DraftItem[];
  /** 20 when the sentence says VAT is added or included; 0 otherwise. */
  vatRate: number;
  depositPercent?: number;
  /** Invoice or proforma: payment due this many days from today. */
  dueInDays?: number;
  /** Quote: valid this many days from today. */
  validForDays?: number;
  notes?: string;
  projectReference?: string;
  scope?: string;
  leadTime?: string;
}

const VAT_RATE = 20;

/* ── small helpers ───────────────────────────────────────────────────── */

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/;
/** UK numbers: 07…, 01…/02…/03…, or +44 forms, spaces/dashes allowed. */
const PHONE = /(?:\+44[\s-]?\(?0?\)?|\b0)(?:\d[\s-]?){9,10}\b/;

const digits = (s: string) => s.replace(/\D/g, '');
const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'");
const words = (s: string) => norm(s).match(/[a-z0-9@.'-]+/g) ?? [];

function titleCase(s: string): string {
  return s
    .trim()
    .split(/\s+/)
    .map((w) => (w.length > 1 && w === w.toLowerCase() ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

/** Every number typed in the sentence (commas and £ removed), outside the email and phone. */
function numbersIn(text: string): number[] {
  const scrubbed = text.replace(EMAIL, ' ').replace(PHONE, ' ');
  return [...scrubbed.matchAll(/£?\s?(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?\s*(k\b)?/gi)].map((m) => {
    const n = Number(`${m[1].replace(/,/g, '')}${m[2] ? `.${m[2]}` : ''}`);
    return m[3] ? n * 1000 : n;
  });
}

/** Words that end a field when reading "name is …", "job: …", etc. */
const STOP =
  "(?=\\s*(?:[,;\\n]|\\.(?:\\s|$)|\\b(?:and\\s+)?(?:his|her|their|the|customer'?s?)?\\s*(?:e-?mail|email\\s+address|phone|mobile|number|tel|contact|job|work|description|desc|price|cost|costing|total|amount|charge|for\\s+£|at\\s+£|£|address|lives|located|postcode|vat|plus|deposit|due|valid|ref|reference|notes?|scope|lead\\s*time|quantity|qty)\\b|$))";

function field(text: string, labels: string): string | undefined {
  const m = text.match(new RegExp(`\\b(?:${labels})\\b\\s*(?:is|are|=|:|-|of)?\\s*([\\s\\S]+?)${STOP}`, 'i'));
  const v = m?.[1]?.trim().replace(/^["']|["']$/g, '');
  return v ? v : undefined;
}

/* ── deterministic pieces ────────────────────────────────────────────── */

export function detectType(text: string, fallback: DocType): DocType {
  const t = norm(text);
  // "proforma invoice" names a proforma, not an invoice.
  if (/\bpro[\s-]?forma\b/.test(t)) return 'proforma';
  const inv = t.search(/\binvoices?\b|\bbill\b/);
  const quo = t.search(/\bquot(?:e|es|ation|ations)\b|\bestimate\b/);
  if (inv === -1 && quo === -1) return fallback;
  if (inv === -1) return 'quote';
  if (quo === -1) return 'invoice';
  return inv < quo ? 'invoice' : 'quote';
}

/** 'add' = price is before VAT; 'inc' = price already includes it; null = no VAT. */
export function vatMode(text: string): 'add' | 'inc' | null {
  const t = norm(text);
  if (/\b(?:no|without|zero|0%?)\s+vat\b|\bvat\s*(?:free|exempt)\b/.test(t)) return null;
  if (/\b(?:inc|incl|including|inclusive\s+of|with)\s+vat\b|\bvat\s+(?:included|inclusive|inc)\b/.test(t)) return 'inc';
  if (/(?:\+|\bplus|\badd|\bexc|\bexcl|\bexcluding|\bex)\s*vat\b|\bvat\s+(?:on\s+top|extra|to\s+be\s+added)\b|\b(?:charge|apply)\s+vat\b/.test(t)) return 'add';
  return null;
}

function priceFromRules(text: string): number | undefined {
  const scrubbed = text.replace(EMAIL, ' ').replace(PHONE, ' ');
  const money = String.raw`(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?\s*(k\b)?`;
  const pick = (m: RegExpMatchArray | null) =>
    m ? Number(`${m[1].replace(/,/g, '')}${m[2] ? `.${m[2]}` : ''}`) * (m[3] ? 1000 : 1) : undefined;
  return (
    pick(scrubbed.match(new RegExp(`£\\s?${money}`, 'i'))) ??
    pick(scrubbed.match(new RegExp(`${money}\\s*(?:pounds?|quid|gbp)\\b`, 'i'))) ??
    pick(
      scrubbed.match(
        new RegExp(`\\b(?:price|priced|cost|costs|costing|total|amount|charge|fee|for|of|at)\\b\\s*(?:is|was|will be|of|=|:|-|at)?\\s*${money}`, 'i'),
      ),
    )
  );
}

const NOT_A_NAME =
  /^(?:the|a|an|this|that|my|our|new|supply|supplying|install|installing|installation|fit|fitting|repair|repairs|repairing|replace|replacing|replacement|fix|fixing|works?|job|labour|service|servicing|shop|shutter|shutters|door|doors|glass|window|windows|aluminium|roller|garage|£|\d)\b/i;

function nameFromRules(text: string): string | undefined {
  const name =
    field(text, "(?:customer|client|user)'?s?\\s+name|name") ??
    field(text, '(?:for|to)\\s+(?:the\\s+)?(?:customer|client|user|mr|mrs|ms|miss|dr)\\.?') ??
    field(text, '(?:customer|client|user)') ??
    field(text, '(?:pro[\\s-]?forma(?:\\s+invoice)?|invoice|invoices|quote|quotation|estimate|bill)\\s+(?:for|to)');
  if (!name) return undefined;
  // "invoice for the shutter repair" names a job, not a person.
  if (NOT_A_NAME.test(name)) return undefined;
  const clean = name.replace(/[^A-Za-z' .-]/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = clean.split(' ').filter(Boolean).slice(0, 4);
  return parts.length ? titleCase(parts.join(' ')) : undefined;
}

/** The regex reading of the sentence. Never invents: every field is a substring. */
export function ruleParse(text: string, fallbackType: DocType): Draft {
  const type = detectType(text, fallbackType);
  const email = text.match(EMAIL)?.[0];
  const phone = text.match(PHONE)?.[0]?.trim();
  const price = priceFromRules(text);
  const description =
    field(text, 'job\\s+description|description|desc|job|work(?:\\s+done)?|for\\s+the\\s+job\\s+of|for\\s+(?=(?:supply|install|fit|repair|replace|fix|new)\\b)') ?? undefined;
  const qtyMatch = text.match(/\b(?:qty|quantity)\s*(?:is|:|=|of)?\s*(\d{1,4})\b/i) ?? text.match(/\b(\d{1,3})\s*[x×]\s/i);
  const qty = qtyMatch ? Number(qtyMatch[1]) : 1;
  // Speech often comes back as "40 percent" rather than "40%".
  const deposit = text.match(/\b(\d{1,2}(?:\.\d)?)\s?(?:%|percent|per\s+cent)\s*deposit\b|\bdeposit\s*(?:of|:)?\s*(\d{1,2}(?:\.\d)?)\s?(?:%|percent|per\s+cent)/i);
  const due = text.match(/\bdue\s*(?:in|within)\s*(\d{1,3})\s*days?\b|\b(\d{1,3})\s*days?\s*(?:to\s+pay|payment\s+terms)\b/i);
  const valid = text.match(/\bvalid\s*(?:for)?\s*(\d{1,3})\s*days?\b/i);
  const vat = vatMode(text);

  const draft: Draft = {
    type,
    customerName: nameFromRules(text),
    customerEmail: email,
    customerPhone: phone,
    customerAddress: field(text, 'address|lives\\s+at|located\\s+at|site\\s+at|property\\s+at'),
    lineItems: [],
    vatRate: vat ? VAT_RATE : 0,
    depositPercent: deposit ? Number(deposit[1] ?? deposit[2]) : undefined,
    dueInDays: due ? Number(due[1] ?? due[2]) : undefined,
    validForDays: valid ? Number(valid[1]) : undefined,
    notes: field(text, 'notes?'),
    projectReference: field(text, 'ref(?:erence)?|project\\s+ref(?:erence)?|po(?:\\s+number)?'),
    leadTime: field(text, 'lead\\s*time'),
  };
  if (price !== undefined && price > 0) {
    const unit = qty > 1 && /\b(?:each|per|a\s+unit|per\s+unit)\b/i.test(text) ? price : price / qty;
    draft.lineItems.push({ description: description ? cap(description) : '', qty, unitPrice: round2(vat === 'inc' ? unit / (1 + VAT_RATE / 100) : unit) });
  }
  return draft;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/* ── guarding an AI reading ──────────────────────────────────────────── */

/** True when most of the value's words are words of the sentence. */
function grounded(value: string, text: string, share = 0.6): boolean {
  const have = new Set(words(text));
  const w = words(value).filter((x) => x.length > 2);
  if (w.length === 0) return false;
  return w.filter((x) => have.has(x)).length / w.length >= share;
}

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
const num = (v: unknown) => {
  const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v.replace(/[£,\s]/g, '')) : NaN;
  return Number.isFinite(n) ? n : undefined;
};

/**
 * Keeps only what the sentence supports. `candidate` is whatever JSON the
 * model returned; anything unrecognised or unsupported is dropped.
 */
export function groundDraft(candidate: unknown, text: string, fallbackType: DocType): Draft {
  const c = (candidate && typeof candidate === 'object' ? candidate : {}) as Record<string, unknown>;
  const typed = new Set(numbersIn(text).map((n) => round2(n)));
  const textNorm = norm(text);
  const textDigits = digits(text);
  const vat = vatMode(text);

  const name = str(c.customerName);
  const nameOk = name && words(name).length > 0 && words(name).every((w) => textNorm.includes(w));
  const email = str(c.customerEmail);
  const phone = str(c.customerPhone);
  const phoneDigits = phone ? digits(phone).replace(/^44/, '0') : '';
  const phoneOk = phoneDigits.length >= 10 && (textDigits.includes(phoneDigits) || textDigits.includes(phoneDigits.replace(/^0/, '44')));

  const items: DraftItem[] = [];
  for (const raw of Array.isArray(c.lineItems) ? c.lineItems : []) {
    const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const unit = num(r.unitPrice);
    const qty = num(r.qty) ?? 1;
    if (unit === undefined || unit <= 0 || !typed.has(round2(unit))) continue;
    if (qty !== 1 && !typed.has(qty)) continue;
    const desc = str(r.description);
    items.push({
      description: desc && grounded(desc, text, 0.5) ? cap(desc) : '',
      qty: qty > 0 ? qty : 1,
      unitPrice: round2(vat === 'inc' ? unit / (1 + VAT_RATE / 100) : unit),
    });
  }

  const freeText = (k: string) => {
    const v = str(c[k]);
    return v && grounded(v, text) ? v : undefined;
  };
  const typedInt = (k: string, max: number) => {
    const v = num(c[k]);
    return v !== undefined && v > 0 && v <= max && typed.has(v) ? v : undefined;
  };

  return {
    type: detectType(text, fallbackType),
    customerName: nameOk ? titleCase(name!) : undefined,
    customerEmail: email && textNorm.includes(norm(email)) ? email : undefined,
    customerPhone: phoneOk ? phone : undefined,
    customerAddress: freeText('customerAddress'),
    lineItems: items,
    vatRate: vat ? VAT_RATE : 0,
    depositPercent: typedInt('depositPercent', 100),
    dueInDays: typedInt('dueInDays', 365),
    validForDays: typedInt('validForDays', 365),
    notes: freeText('notes'),
    projectReference: freeText('projectReference'),
    scope: freeText('scope'),
    leadTime: freeText('leadTime'),
  };
}

/** The AI reading wins where it survived the guard; the rule reading fills the gaps. */
export function mergeDrafts(primary: Draft, backup: Draft): Draft {
  const out: Draft = { ...backup, ...Object.fromEntries(Object.entries(primary).filter(([, v]) => v !== undefined)) } as Draft;
  out.lineItems = primary.lineItems.length ? primary.lineItems : backup.lineItems;
  // A description the rules found is better than none.
  if (out.lineItems.length === 1 && !out.lineItems[0].description && backup.lineItems[0]?.description) {
    out.lineItems = [{ ...out.lineItems[0], description: backup.lineItems[0].description }];
  }
  return out;
}

/** What must be added before a document can be made. */
export function missingRequired(d: Draft): string[] {
  const out: string[] = [];
  if (!d.customerName) out.push('customer name');
  if (!d.lineItems.some((li) => li.unitPrice > 0)) out.push('price');
  return out;
}

/** The instruction given to the model. JSON only; nothing is ever guessed. */
export const PARSE_PROMPT = `You extract quote, invoice and proforma invoice details for a UK shopfront and shutter company from one message.
The message may be typed or transcribed from speech, so it can be long and conversational.
Return JSON only, with these keys (omit a key, or use null, when the message does not state it):
{"customerName": string, "customerEmail": string, "customerPhone": string, "customerAddress": string,
 "lineItems": [{"description": string, "qty": number, "unitPrice": number}],
 "depositPercent": number, "dueInDays": number, "validForDays": number,
 "notes": string, "projectReference": string, "scope": string, "leadTime": string}
Rules:
- Copy names, emails, phone numbers and addresses exactly as written. Never invent, complete or correct them.
- unitPrice is the number the message gives for that item, as typed (no VAT maths). qty defaults to 1.
- If the message lists several jobs with their own prices, make one line item each.
- description is the job or work described, in the message's own words, as a short line-item title.
- If one price covers several components (for example "supply and fit: a double door, a letter box and cladding for 6630"),
  make ONE line item. Its description is the heading, then each component on its own line starting with "• ", in the message's words.
- Do not add anything that is not in the message.`;
