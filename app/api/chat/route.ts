import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now >= entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

const SYSTEM_PROMPT = `You are the Sigma Shop Fronts virtual assistant. You help potential customers with questions about shopfront installation, roller shutters, security doors, and related services in the UK.

Company Info:
- Sigma Shop Fronts (Sigma Shopfronts and Shutter Limited, Company No. 16794487)
- Based in West Midlands, serving nationwide UK
- Services: Aluminium shopfronts, roller shutters, bi-fold doors, security doors, automatic doors, fire doors, repairs, 24/7 emergency
- Free site surveys available
- Phone: 07414 779594 | WhatsApp: +44 7397 066538
- Email: sales@sigmashopfronts.com
- Hours: Mon-Fri 8-6, Sat 9-4, 24/7 emergency

Guidelines:
- Be helpful, professional, and concise
- Always try to capture their name, phone, and what they need — then suggest they fill the quote form or call/WhatsApp directly
- If asked about pricing, explain that every project is different and we offer free no-obligation site surveys and quotes
- If asked about timelines, say most standard installations take 1-3 days and we have fast lead times
- If it's an emergency (broken shutter, break-in damage), give them the emergency number immediately: 07414 779594
- Keep responses short (2-4 sentences). Be British English. No emojis.
- You cannot book appointments or access any systems — always direct to phone, WhatsApp, or the contact form
- If conversation seems like a genuine lead, suggest: "I'd recommend filling in our quick quote form or calling us on 07414 779594 — we can usually arrange a free site survey within 48 hours."`;

export async function POST(request: NextRequest): Promise<NextResponse> {
  cleanupExpiredEntries();

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before continuing." },
      { status: 429 }
    );
  }

  let body: { messages?: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages must be a non-empty array." },
      { status: 400 }
    );
  }

  for (const msg of messages) {
    if (
      !msg ||
      typeof msg.content !== "string" ||
      (msg.role !== "user" && msg.role !== "assistant")
    ) {
      return NextResponse.json(
        { error: "Each message must have a role of 'user' or 'assistant' and a string content." },
        { status: 400 }
      );
    }
  }

  try {
    const groq = getGroqClient();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const responseText = response.choices[0]?.message?.content || "";

    return NextResponse.json({ message: responseText });
  } catch (err) {
    console.error("[chat] Groq API error:", err);
    return NextResponse.json(
      {
        error:
          "Our assistant is temporarily unavailable. Please call us on 07414 779594 or use the contact form.",
      },
      { status: 503 }
    );
  }
}
