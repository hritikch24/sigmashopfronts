import OpenAI from 'openai';
import { calculateEstimate, findService, type EstimateOptions, type EstimateResult } from './estimator';

/**
 * AI-assisted pricing, with the rule-based engine as both fallback and guard.
 *
 * The model can read the free-text notes a customer leaves ("shutter is 6m
 * wide", "second floor, no lift", "listed building") which the dropdowns
 * cannot capture, so it can produce a better-informed range. But an
 * unconstrained model will occasionally return £40 or £400,000, and a wrong
 * price on a quote is worse than a rough one.
 *
 * So the deterministic estimate is computed first and used three ways:
 *   1. It grounds the prompt, so the model adjusts a real figure rather than
 *      inventing one.
 *   2. It bounds the answer — anything outside SANE_LOW..SANE_HIGH of it is
 *      rejected.
 *   3. It is returned unchanged whenever the AI path fails for any reason:
 *      no key, network error, timeout, malformed JSON, or an implausible
 *      number.
 *
 * The customer always gets a price. The AI only ever refines one.
 */

/** How far from the rule-based figure an AI answer may stray before we distrust it. */
const SANE_LOW = 0.6;
const SANE_HIGH = 1.8;

/** The customer is waiting on this, so give up quickly and use the fallback. */
const AI_TIMEOUT_MS = 6000;

export type EstimateEngine = 'ai' | 'rules';

export interface AiEstimateResult extends EstimateResult {
  engine: EstimateEngine;
  /** Why the AI path was not used, when it wasn't. Recorded for the admin. */
  fallbackReason?: string;
}

function getAIClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' });
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

interface AiOptions extends EstimateOptions {
  /** Free-text the customer typed — the reason the AI path is worth having. */
  notes?: string;
}

export async function estimateWithAI(opts: AiOptions): Promise<AiEstimateResult | null> {
  const base = calculateEstimate(opts);
  if (!base) return null;

  const fallback = (reason: string): AiEstimateResult => ({
    ...base,
    engine: 'rules',
    fallbackReason: reason,
  });

  const client = getAIClient();
  if (!client) return fallback('GROQ_API_KEY not configured');

  const service = findService(opts.serviceSlug);
  const variant = service?.variants.find((v) => v.id === opts.variantId);
  if (!service || !variant) return fallback('unknown service or variant');

  const notes = (opts.notes ?? '').trim().slice(0, 400);

  const prompt = [
    'You price UK commercial shopfront work. Adjust an existing estimate; do not invent one.',
    '',
    `Job: ${service.name} — ${variant.label}`,
    `Quantity: ${base.quantity}`,
    opts.citySlug ? `Location: ${opts.citySlug}` : 'Location: not given',
    `Published UK range for one unit: £${variant.low} to £${variant.high}`,
    `Rule-based estimate for this job: £${base.low} to £${base.high}`,
    base.factors.length ? `Already applied: ${base.factors.join('; ')}` : 'No adjustments applied yet.',
    notes ? `Customer notes: "${notes}"` : 'Customer left no notes.',
    '',
    'Adjust the range ONLY if the customer notes reveal something the rule-based',
    'estimate could not know (unusual size, access, structural work, urgency).',
    'If the notes add nothing, return the rule-based figures unchanged.',
    'Stay on the low side — this is an indication, not a quote.',
    '',
    'Reply with JSON only, no prose:',
    '{"low": <integer>, "high": <integer>, "note": "<max 12 words, or empty>"}',
  ].join('\n');

  try {
    const response = await client.chat.completions.create(
      {
        model: 'llama-3.3-70b-versatile',
        max_tokens: 150,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      },
      { timeout: AI_TIMEOUT_MS }
    );

    const raw = response.choices[0]?.message?.content;
    if (!raw) return fallback('empty AI response');

    let parsed: { low?: unknown; high?: unknown; note?: unknown };
    try {
      parsed = JSON.parse(raw);
    } catch {
      return fallback('AI returned non-JSON');
    }

    const low = Number(parsed.low);
    const high = Number(parsed.high);

    if (!Number.isFinite(low) || !Number.isFinite(high)) {
      return fallback('AI returned non-numeric figures');
    }
    if (low <= 0 || high <= 0 || low > high) {
      return fallback('AI returned an incoherent range');
    }
    // The rule-based figure is the sanity bound. A model that drifts far from
    // it is guessing, and a wrong price is worse than a rough one.
    if (
      low < base.low * SANE_LOW || low > base.low * SANE_HIGH ||
      high < base.high * SANE_LOW || high > base.high * SANE_HIGH
    ) {
      return fallback(`AI figures out of range (got ${low}-${high}, expected near ${base.low}-${base.high})`);
    }

    const step = low >= 5000 ? 250 : low >= 1000 ? 100 : 50;
    const note = typeof parsed.note === 'string' ? parsed.note.trim().slice(0, 80) : '';

    return {
      ...base,
      low: Math.max(roundTo(low, step), step),
      high: Math.max(roundTo(high, step), step * 2),
      factors: note ? [...base.factors, note] : base.factors,
      engine: 'ai',
    };
  } catch (err) {
    return fallback(`AI request failed: ${(err as Error).name}`);
  }
}
