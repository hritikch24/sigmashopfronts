import OpenAI from 'openai';
import { GROQ_MODEL, groqExtras } from './groq-model';

/**
 * Groq, xAI (Grok) and OpenAI (ChatGPT) all speak the OpenAI chat API, so
 * one reader serves the three. Each is used only when its key is set; a
 * missing key, an error or a timeout returns null and the caller moves on.
 */
export interface CompatProvider {
  name: 'groq' | 'grok' | 'openai';
  keyEnv: string;
  baseURL?: string;
  model: string;
  /** Whether the provider accepts response_format: json_object. */
  jsonMode: boolean;
}

export const COMPAT_PROVIDERS: CompatProvider[] = [
  { name: 'groq', keyEnv: 'GROQ_API_KEY', baseURL: 'https://api.groq.com/openai/v1', model: GROQ_MODEL, jsonMode: true },
  { name: 'grok', keyEnv: 'XAI_API_KEY', baseURL: 'https://api.x.ai/v1', model: process.env.XAI_MODEL || 'grok-3-mini', jsonMode: true },
  { name: 'openai', keyEnv: 'OPENAI_API_KEY', model: process.env.OPENAI_MODEL || 'gpt-4o-mini', jsonMode: true },
];

export async function readWithCompat(p: CompatProvider, system: string, text: string): Promise<unknown | null> {
  const apiKey = process.env[p.keyEnv];
  if (!apiKey) return null;
  try {
    const client = new OpenAI({ apiKey, baseURL: p.baseURL, timeout: 15_000, maxRetries: 0 });
    const ask = (json: boolean) =>
      client.chat.completions.create({
        model: p.model,
        temperature: 0,
        max_tokens: 2000,
        ...(p.name === 'groq' ? groqExtras : {}),
        ...(json ? { response_format: { type: 'json_object' as const } } : {}),
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: text },
        ],
      });
    let res;
    try {
      res = await ask(p.jsonMode);
    } catch (err) {
      // A model that rejects JSON mode still answers in JSON when asked to;
      // parseJson below copes with any prose around it.
      if (!p.jsonMode || (err as { status?: number }).status !== 400) throw err;
      res = await ask(false);
    }
    return parseJson(res.choices[0]?.message?.content);
  } catch (err) {
    console.error(`[documents/parse] ${p.name} failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/** The JSON object in a reply, even if the model wrapped it in prose or a code fence. */
export function parseJson(raw: string | null | undefined): unknown | null {
  if (!raw) return null;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}
