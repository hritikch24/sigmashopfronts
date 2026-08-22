/**
 * Instant estimate engine.
 *
 * Every base range below is taken from the published figures on /cost-guide so
 * the instant estimate never contradicts the site's own price guide. Ranges for
 * services that the cost guide does not list are marked ESTIMATED and are the
 * ones most worth reviewing against real job costs.
 *
 * The estimate deliberately leans to the low end of each range — see
 * ESTIMATE_LEAN. It is an indication only; the customer is always told the
 * formal quote may come back higher or lower.
 */

export interface Variant {
  id: string;
  label: string;
  /** Published low end, £, supply and install. */
  low: number;
  /** Published high end, £, supply and install. */
  high: number;
}

export interface ServiceEstimate {
  slug: string;
  name: string;
  unitNoun: string;
  variants: Variant[];
}

/**
 * How far into each base range the top of the shown estimate reaches.
 * 0 = quote the floor price, 1 = quote the full published range.
 * Kept low on purpose so the indication reads as attractive rather than
 * off-putting. Raise it if quotes are routinely landing above the estimate.
 */
export const ESTIMATE_LEAN = 0.45;

export const SERVICES: ServiceEstimate[] = [
  {
    slug: 'aluminium-shopfronts',
    name: 'Aluminium Shopfronts',
    unitNoun: 'shopfront',
    variants: [
      { id: 'single-bay', label: 'Single bay — up to approx. 4m wide', low: 2000, high: 5000 },
      { id: 'double-bay', label: 'Double bay — wider frontage with mullion', low: 4000, high: 8000 },
      { id: 'multi-unit', label: 'Three or more bays / large format', low: 8000, high: 20000 },
    ],
  },
  {
    slug: 'roller-shutters',
    name: 'Roller Shutters',
    unitNoun: 'shutter',
    variants: [
      { id: 'manual', label: 'Manual — spring-balanced or hand-crank', low: 800, high: 1500 },
      { id: 'electric', label: 'Electric — tubular motor, key switch or remote', low: 1200, high: 2500 },
      { id: 'fire-rated', label: 'Fire-rated to BS EN 16034', low: 2000, high: 4000 },
      { id: 'lps1175', label: 'LPS 1175 security rated (SR1–SR3)', low: 2500, high: 5000 },
    ],
  },
  {
    slug: 'security-doors',
    name: 'Security Doors',
    unitNoun: 'door',
    variants: [
      { id: 'standard', label: 'Standard galvanised steel, multipoint lock', low: 800, high: 1500 },
      { id: 'sr2', label: 'LPS 1175 SR2 rated', low: 1500, high: 3000 },
      { id: 'sr3', label: 'LPS 1175 SR3 rated', low: 2500, high: 5000 },
    ],
  },
  {
    slug: 'automatic-doors',
    name: 'Automatic Doors',
    unitNoun: 'entrance',
    variants: [
      { id: 'swing-retrofit', label: 'Swing operator retrofit to existing door', low: 1500, high: 3000 },
      { id: 'sliding', label: 'Sliding bi-parting automatic entrance', low: 3000, high: 6000 },
    ],
  },
  {
    slug: 'bi-fold-doors',
    name: 'Bi-Fold Doors',
    unitNoun: 'set',
    variants: [
      { id: '3-panel', label: '3 panel — up to approx. 3m opening', low: 3000, high: 5000 },
      { id: '5-panel', label: '5 panel — up to approx. 5m opening', low: 5000, high: 8000 },
      { id: '8-panel', label: '8 panel — wide-span frontage', low: 8000, high: 14000 },
    ],
  },
  {
    slug: 'fire-doors',
    name: 'Fire Doors',
    unitNoun: 'doorset',
    variants: [
      { id: 'fd30', label: 'FD30 single leaf — 30 minute integrity', low: 400, high: 800 },
      { id: 'fd60', label: 'FD60 single leaf — 60 minute integrity', low: 600, high: 1200 },
      { id: 'fd90', label: 'FD90 single leaf — 90 minute integrity', low: 1000, high: 2000 },
    ],
  },
  // ── Ranges below are ESTIMATED — not published on /cost-guide. Review these.
  {
    slug: 'shopfront-repairs',
    name: 'Shopfront Repairs',
    unitNoun: 'repair',
    variants: [
      { id: 'minor', label: 'Minor — hinges, locks, closers, seals', low: 180, high: 450 },
      { id: 'panel', label: 'Frame or panel section replacement', low: 400, high: 1200 },
      { id: 'major', label: 'Major — structural or full section rebuild', low: 1200, high: 3500 },
    ],
  },
  {
    slug: 'emergency-callout',
    name: 'Emergency Callout',
    unitNoun: 'callout',
    variants: [
      { id: 'boarding', label: 'Emergency boarding / make-safe', low: 180, high: 500 },
      { id: 'glazing', label: 'Emergency glazing replacement', low: 350, high: 1100 },
      { id: 'shutter', label: 'Emergency shutter release and repair', low: 250, high: 900 },
    ],
  },
  {
    slug: 'shutter-repair',
    name: 'Shutter Repair',
    unitNoun: 'repair',
    variants: [
      { id: 'service', label: 'Service and adjustment', low: 150, high: 350 },
      { id: 'motor', label: 'Motor or control replacement', low: 400, high: 1100 },
      { id: 'curtain', label: 'Curtain slat or barrel replacement', low: 600, high: 1800 },
    ],
  },
  {
    slug: 'glass-replacement',
    name: 'Glass Replacement',
    unitNoun: 'pane',
    variants: [
      { id: 'single', label: 'Single glazed toughened pane', low: 220, high: 600 },
      { id: 'double', label: 'Double glazed sealed unit', low: 380, high: 1000 },
      { id: 'laminated', label: 'Laminated or safety-rated pane', low: 500, high: 1400 },
    ],
  },
  {
    slug: 'aluminium-doors',
    name: 'Aluminium Doors',
    unitNoun: 'door',
    variants: [
      { id: 'single', label: 'Single commercial entrance door', low: 900, high: 2000 },
      { id: 'double', label: 'Double entrance doorset', low: 1600, high: 3400 },
    ],
  },
  {
    slug: 'aluminium-windows',
    name: 'Aluminium Windows',
    unitNoun: 'window',
    variants: [
      { id: 'standard', label: 'Standard commercial window', low: 420, high: 1000 },
      { id: 'large', label: 'Large format / structural opening', low: 900, high: 2400 },
    ],
  },
  {
    slug: 'curtain-walling',
    name: 'Curtain Walling',
    unitNoun: 'elevation',
    variants: [
      { id: 'small', label: 'Small elevation — up to approx. 15m²', low: 4500, high: 9000 },
      { id: 'medium', label: 'Medium elevation — approx. 15–40m²', low: 9000, high: 20000 },
      { id: 'large', label: 'Full height / multi-storey', low: 20000, high: 45000 },
    ],
  },
  {
    slug: 'glass-shopfronts',
    name: 'Glass Shopfronts',
    unitNoun: 'shopfront',
    variants: [
      { id: 'semi-frameless', label: 'Semi-frameless toughened glass front', low: 2200, high: 5000 },
      { id: 'frameless', label: 'Fully frameless structural glass front', low: 4000, high: 9000 },
    ],
  },
];

/** London carries the biggest premium — /cost-guide states 15–25% above average. */
const LONDON = new Set(['london']);

/** Coastal work needs marine-grade finishes — /cost-guide states 10–15% on materials. */
const COASTAL = new Set([
  'plymouth', 'brighton', 'bournemouth', 'portsmouth', 'swansea',
  'aberdeen', 'exeter', 'southampton', 'cardiff', 'liverpool',
]);

export interface EstimateOptions {
  serviceSlug: string;
  variantId: string;
  quantity: number;
  citySlug?: string;
  /** Restricted access, high-level work, or scaffolding required. */
  difficultAccess?: boolean;
  /** Existing unit needs stripping out and disposing of. */
  removalRequired?: boolean;
  /** Install must happen outside trading hours. */
  outOfHours?: boolean;
}

export interface EstimateResult {
  serviceName: string;
  variantLabel: string;
  quantity: number;
  low: number;
  high: number;
  /** Human-readable list of what moved the number, for the admin record. */
  factors: string[];
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function findService(slug: string): ServiceEstimate | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function calculateEstimate(opts: EstimateOptions): EstimateResult | null {
  const service = findService(opts.serviceSlug);
  if (!service) return null;

  const variant = service.variants.find((v) => v.id === opts.variantId);
  if (!variant) return null;

  const qty = Math.min(Math.max(Math.floor(opts.quantity) || 1, 1), 50);
  const factors: string[] = [];

  // Start at the published floor, and reach only part-way up the range.
  let low = variant.low;
  let high = variant.low + (variant.high - variant.low) * ESTIMATE_LEAN;

  let multiplier = 1;

  if (opts.citySlug && LONDON.has(opts.citySlug)) {
    multiplier *= 1.2;
    factors.push('London rates (+20%)');
  } else if (opts.citySlug && COASTAL.has(opts.citySlug)) {
    multiplier *= 1.1;
    factors.push('Coastal — marine-grade finish (+10%)');
  }

  if (opts.difficultAccess) {
    multiplier *= 1.15;
    factors.push('Restricted or high-level access (+15%)');
  }

  if (opts.outOfHours) {
    multiplier *= 1.15;
    factors.push('Out-of-hours installation (+15%)');
  }

  low *= multiplier;
  high *= multiplier;

  // Per-unit strip-out and disposal.
  if (opts.removalRequired) {
    low += 150;
    high += 260;
    factors.push('Removal and disposal of existing unit');
  }

  low *= qty;
  high *= qty;

  // Modest volume saving — shared travel, survey and set-up across units.
  if (qty >= 3) {
    const discount = qty >= 6 ? 0.9 : 0.95;
    low *= discount;
    high *= discount;
    factors.push(`Multi-unit saving (${Math.round((1 - discount) * 100)}%)`);
  }

  // Round to something that reads like a guide price, not a calculation.
  const step = low >= 5000 ? 250 : low >= 1000 ? 100 : 50;

  return {
    serviceName: service.name,
    variantLabel: variant.label,
    quantity: qty,
    low: Math.max(roundTo(low, step), step),
    high: Math.max(roundTo(high, step), step * 2),
    factors,
  };
}

export function formatGBP(value: number): string {
  return '£' + value.toLocaleString('en-GB');
}
