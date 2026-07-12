import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/* ── Rate-limiter (in-memory, per-instance) ──────────────────────────── */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now >= entry.resetAt) rateLimitMap.delete(ip);
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

/* ── Grok client (X.AI — OpenAI-compatible) ──────────────────────────── */

function getAIClient(): OpenAI | null {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey, baseURL: "https://api.x.ai/v1" });
}

/* ── Static fallback when AI is unavailable ───────────────────────────── */

function getStaticResponse(lastMessage: string): string {
  const lower = lastMessage.toLowerCase();

  if (lower.includes("emergency") || lower.includes("break-in") || lower.includes("broken") || lower.includes("urgent"))
    return "For emergencies, please call us immediately on 07414 779594 — we offer 24/7 rapid response and can usually be on site within the hour.";

  if (lower.includes("price") || lower.includes("cost") || lower.includes("quote") || lower.includes("how much"))
    return "Every project is different, so we provide free no-obligation quotes after a site survey. You can use our online estimator at sigmashopfronts.com/cost-guide or call 07414 779594 to arrange a free survey — usually within 48 hours.";

  if (lower.includes("area") || lower.includes("cover") || lower.includes("location") || lower.includes("where"))
    return "We cover the entire UK — London, Birmingham, Manchester, Leeds, Liverpool, Bristol, Sheffield, and 15+ more cities. Visit sigmashopfronts.com/areas for the full list.";

  if (lower.includes("shutter") || lower.includes("roller"))
    return "We supply and install steel and aluminium roller shutters — manual, electric, or remote-controlled. Prices typically range from £1,200 to £3,500 depending on size. Call 07414 779594 or fill in our quote form for an exact price.";

  if (lower.includes("security") || lower.includes("door"))
    return "We install LPS 1175 rated security doors and composite doors for maximum premises security. Prices from around £1,800. Call 07414 779594 for a free site survey and quote.";

  if (lower.includes("automatic"))
    return "We install sliding, swing, and revolving automatic door systems compliant with BS 7036. Prices from around £3,500. Call 07414 779594 for a free survey.";

  if (lower.includes("repair") || lower.includes("fix") || lower.includes("glass"))
    return "We offer same-day repair services for shopfront glass, frames, shutters, and mechanisms. Call 07414 779594 and we can usually attend within a few hours.";

  if (lower.includes("time") || lower.includes("long") || lower.includes("when") || lower.includes("schedule"))
    return "Most standard installations take 1 to 3 days. We can usually arrange a free site survey within 48 hours of your enquiry. Call 07414 779594 to book.";

  return "I can help with information about our shopfront services, pricing estimates, or arranging a free site survey. What would you like to know? You can also call us on 07414 779594 or fill in the quote form on our contact page.";
}

/* ── System prompt ────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are the Sigma Shop Fronts AI assistant, powered by advanced AI to help potential customers find the right shopfront solution.

Company: Sigma Shopfronts and Shutter Limited (Company No. 16794487)
Location: 4 Thornwood Close, Oldbury, West Midlands, B68 9LX
Phone: 07414 779594 | WhatsApp: +44 7397 066538
Email: sales@sigmashopfronts.com
Hours: Mon–Fri 8am–6pm, Sat 9am–4pm, Emergency 24/7
Website: sigmashopfronts.com

Services & typical price ranges (indicative only — exact quote after free survey):
• Aluminium Shopfronts: £2,800–£6,500+ (thermally broken, toughened glazing, any RAL colour)
• Roller Shutters: £1,200–£3,500 (steel/aluminium, manual or electric)
• Security Doors: £1,800–£4,500 (LPS 1175 rated, steel & composite)
• Automatic Doors: £3,500–£8,000 (sliding, swing, revolving — BS 7036 compliant)
• Bi-Fold Doors: £3,000–£7,000 (commercial-grade aluminium folding)
• Fire Doors: £450–£1,200 per door (FD30, FD60, FD90 certified)
• Shopfront Repairs: £300–£2,000 (same-day glass, frame & mechanism)
• Shutter Repair: £150–£1,200 (spring, motor, curtain repairs)
• Glass Replacement: £200–£1,800 (toughened, laminated, DGU)
• Emergency Callout: 24/7 rapid response — call 07414 779594

Coverage: London, Birmingham, Manchester, Leeds, Liverpool, Sheffield, Bristol, Leicester, Nottingham, Coventry, Glasgow, Edinburgh, Cardiff, Newcastle, and more — full UK nationwide.

Guidelines:
- Be helpful, professional, concise (2–4 sentences per response)
- Use British English spelling and tone
- When a customer describes their needs, suggest the most appropriate service(s) and explain briefly why
- Always try to capture their requirements and direct them to: call 07414 779594, WhatsApp, or fill in the contact form
- If asked about pricing, give the indicative range above and emphasise that every project is different — free site survey gives the exact quote
- For emergencies (break-in, broken shutter/glass), immediately give the emergency number: 07414 779594
- Never fabricate information — if unsure, say you'll need the team to confirm and suggest they call
- Do not use emojis
- If the conversation is going well, suggest: "I'd recommend filling in our quick quote form or calling us on 07414 779594 — we can usually arrange a free site survey within 48 hours."`;

/* ── POST handler ─────────────────────────────────────────────────────── */

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
    if (!msg || typeof msg.content !== "string" || (msg.role !== "user" && msg.role !== "assistant")) {
      return NextResponse.json(
        { error: "Each message must have role 'user'|'assistant' and string content." },
        { status: 400 }
      );
    }
  }

  /* Try Grok AI first; fall back to static responses if unavailable */
  const client = getAIClient();

  if (!client) {
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    return NextResponse.json({
      message: getStaticResponse(lastUserMsg?.content ?? ""),
    });
  }

  try {
    const response = await client.chat.completions.create({
      model: "grok-3-mini-fast",
      max_tokens: 350,
      temperature: 0.7,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    const responseText = response.choices[0]?.message?.content || "";

    return NextResponse.json({ message: responseText });
  } catch (err) {
    console.error("[chat] Grok API error:", err);

    /* Graceful fallback to static response */
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    return NextResponse.json({
      message: getStaticResponse(lastUserMsg?.content ?? ""),
    });
  }
}
