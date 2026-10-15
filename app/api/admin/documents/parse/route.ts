import { NextRequest, NextResponse } from 'next/server';
import {
  PARSE_PROMPT,
  groundDraft,
  mergeDrafts,
  missingRequired,
  ruleParse,
  type DocType,
} from '@/lib/document-parse';
import { COMPAT_PROVIDERS, readWithCompat } from '@/lib/ai/openai-compatible-reader';

/**
 * POST /api/admin/documents/parse  { text, type? }
 *
 * Reads a typed or transcribed message into a quote, invoice or proforma draft. Creates
 * nothing: the admin page shows the draft, and the existing
 * POST /api/admin/documents saves it.
 *
 * Readers, first answer wins: Groq → Grok (xAI) → ChatGPT (OpenAI), each only
 * if its key is set (GROQ_API_KEY, XAI_API_KEY, OPENAI_API_KEY). Whatever answers is checked against the sentence
 * (lib/document-parse.ts); the rule reader always runs and fills the gaps,
 * and is the whole reading when no provider answers.
 */

export const maxDuration = 60;

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const [scheme, token] = (request.headers.get('authorization') ?? '').split(' ');
  return scheme === 'Bearer' && token === adminKey + 'nimda';
}

type Engine = 'groq' | 'grok' | 'openai' | 'rules';

async function aiReading(text: string): Promise<{ engine: Engine; reading: unknown } | null> {
  for (const p of COMPAT_PROVIDERS) {
    const reading = await readWithCompat(p, PARSE_PROMPT, text);
    if (reading) return { engine: p.name, reading };
  }
  return null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  let body: { text?: unknown; type?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  const text = typeof body.text === 'string' ? body.text.trim().slice(0, 4000) : '';
  if (text.length < 3) return NextResponse.json({ error: 'Type or say what the document is for.' }, { status: 400 });
  const fallbackType: DocType = body.type === 'invoice' || body.type === 'proforma' ? body.type : 'quote';

  const rules = ruleParse(text, fallbackType);
  const ai = await aiReading(text);
  const draft = ai ? mergeDrafts(groundDraft(ai.reading, text, fallbackType), rules) : rules;

  return NextResponse.json({ draft, missing: missingRequired(draft), engine: ai ? ai.engine : 'rules' });
}
