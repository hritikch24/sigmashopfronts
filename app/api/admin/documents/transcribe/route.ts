import { NextRequest, NextResponse } from 'next/server';
import OpenAI, { toFile } from 'openai';

/**
 * Speech to text for the quick-create box on /admin/documents.
 *
 *   GET  → { available }   whether a speech service is configured
 *   POST multipart "audio" → { text }
 *
 * Groq's Whisper is used when GROQ_API_KEY is set (the key the site already
 * uses), otherwise OpenAI's when OPENAI_API_KEY is. Nothing is stored: the
 * audio goes to the provider, the words come back to the admin's screen,
 * and they are only kept if the admin goes on to create a document.
 */

export const maxDuration = 60;

/** Vercel caps a request body at about 4.5 MB; the recorder stays well under. */
const MAX_BYTES = 4 * 1024 * 1024;

/** Trade words Whisper would otherwise mishear or spell the American way. */
const VOCABULARY =
  'Quote, invoice, proforma invoice, VAT, deposit, balance. Aluminium shopfront, roller shutter, toughened glass, laminated glass, ' +
  'double door, letter box, cladding, fascia, stallriser, bi-fold, curtain walling, powder coated, RAL, postcode.';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const [scheme, token] = (request.headers.get('authorization') ?? '').split(' ');
  return scheme === 'Bearer' && token === adminKey + 'nimda';
}

function provider(): { client: OpenAI; model: string } | null {
  if (process.env.GROQ_API_KEY) {
    return {
      client: new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1', timeout: 50_000, maxRetries: 0 }),
      model: 'whisper-large-v3-turbo',
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return { client: new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 50_000, maxRetries: 0 }), model: 'whisper-1' };
  }
  return null;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  return NextResponse.json({ available: provider() !== null });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  const p = provider();
  if (!p) return NextResponse.json({ error: 'No speech service is set up.' }, { status: 501 });

  let audio: File | null = null;
  try {
    const form = await request.formData();
    const v = form.get('audio');
    audio = v instanceof File ? v : null;
  } catch {
    return NextResponse.json({ error: 'Send the recording as form data.' }, { status: 400 });
  }
  if (!audio || audio.size === 0) return NextResponse.json({ error: 'The recording was empty.' }, { status: 400 });
  if (audio.size > MAX_BYTES) return NextResponse.json({ error: 'That recording is too long. Keep it under about four minutes.' }, { status: 413 });

  try {
    const name = audio.name && audio.name !== 'blob' ? audio.name : audio.type.includes('mp4') ? 'speech.mp4' : 'speech.webm';
    const file = await toFile(Buffer.from(await audio.arrayBuffer()), name, { type: audio.type || 'audio/webm' });
    const res = await p.client.audio.transcriptions.create({ file, model: p.model, language: 'en', prompt: VOCABULARY });
    const text = (res.text ?? '').trim();
    if (!text) return NextResponse.json({ error: 'No words were heard. Try again closer to the microphone.' }, { status: 422 });
    return NextResponse.json({ text });
  } catch (err) {
    console.error('[documents/transcribe]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not turn that recording into text. Try again, or type it.' }, { status: 502 });
  }
}
