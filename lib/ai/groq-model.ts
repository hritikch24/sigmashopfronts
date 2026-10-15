/**
 * The Groq model every AI feature on this site uses.
 *
 * Groq retires models: llama-3.3-70b-versatile was shut down on 16 Aug 2026
 * and every call to it failed with "model_not_found" until this file existed.
 * When Groq announces the next retirement, set GROQ_MODEL in Vercel and
 * redeploy; no code change is needed.
 */
export const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

/**
 * gpt-oss models think before they answer, and the thinking counts against
 * max_tokens. Keeping it short leaves room for the reply.
 */
export const groqExtras: { reasoning_effort?: 'low' } = GROQ_MODEL.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low' } : {};
