import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/* ── Rate limiter ─────────────────────────────────────────────────────── */

interface RateLimitEntry { count: number; resetAt: number }
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
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

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

/* ── Groq client ──────────────────────────────────────────────────────── */

function getAIClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
}

/* ── Static recommendation fallback ───────────────────────────────────── */

interface Answers {
  businessType: string;
  primaryNeed: string;
  priority: string;
  budget: string;
}

interface Recommendation {
  primary: string;
  secondary: string;
  reason: string;
  priceRange: string;
  cta: string;
}

function getStaticRecommendation(answers: Answers): Recommendation {
  const { primaryNeed, priority } = answers;

  if (primaryNeed === "emergency") {
    return {
      primary: "Emergency Callout",
      secondary: "Shopfront Repairs",
      reason: "For urgent situations like break-ins or storm damage, our 24/7 emergency team can be on site within the hour to secure your premises, with full repairs following.",
      priceRange: "£300 – £2,000",
      cta: "Call 07414 779594 now for immediate response.",
    };
  }

  if (primaryNeed === "repair") {
    return {
      primary: "Shopfront Repairs",
      secondary: "Glass Replacement",
      reason: "Our same-day repair service covers glass, frames, shutters, and mechanisms. We carry common parts and can usually fix issues in a single visit.",
      priceRange: "£150 – £2,000",
      cta: "Call 07414 779594 to arrange a same-day repair.",
    };
  }

  if (priority === "security") {
    return {
      primary: "Security Doors",
      secondary: "Roller Shutters",
      reason: "For maximum premises security, we recommend LPS 1175 rated steel doors paired with electric roller shutters for after-hours protection. This combination deters break-ins and keeps insurance premiums low.",
      priceRange: "£3,000 – £8,000",
      cta: "Call 07414 779594 for a free security assessment.",
    };
  }

  if (priority === "aesthetics") {
    return {
      primary: "Aluminium Shopfronts",
      secondary: "Bi-Fold Doors",
      reason: "Thermally broken aluminium with floor-to-ceiling glazing creates a striking, modern frontage that draws foot traffic. Powder-coated in any RAL colour to match your brand.",
      priceRange: "£2,800 – £7,000",
      cta: "Call 07414 779594 for a free design consultation.",
    };
  }

  if (priority === "efficiency") {
    return {
      primary: "Aluminium Shopfronts",
      secondary: "Automatic Doors",
      reason: "Thermally broken aluminium profiles with double-glazed units significantly reduce heat loss. Adding automatic doors prevents warm air escaping through open entrances.",
      priceRange: "£3,500 – £10,000",
      cta: "Call 07414 779594 for a free energy assessment.",
    };
  }

  if (priority === "budget") {
    return {
      primary: "Aluminium Shopfronts",
      secondary: "Roller Shutters",
      reason: "A standard aluminium shopfront with a manual roller shutter offers excellent value — professional appearance with solid after-hours security, without the premium of automatic systems.",
      priceRange: "£2,800 – £5,000",
      cta: "Call 07414 779594 for a free quote — we'll find a solution within your budget.",
    };
  }

  // Default
  return {
    primary: "Aluminium Shopfronts",
    secondary: "Security Doors",
    reason: "Based on your requirements, a professionally installed aluminium shopfront provides the best balance of appearance, security, and durability for commercial premises.",
    priceRange: "£2,800 – £6,500",
    cta: "Call 07414 779594 for a free site survey and exact quote.",
  };
}

/* ── POST handler ─────────────────────────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  let answers: Answers;
  try {
    const body = await request.json();
    answers = body.answers;
    if (!answers?.businessType || !answers?.primaryNeed || !answers?.priority || !answers?.budget) {
      throw new Error("Missing fields");
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  /* Always compute static recommendation as fallback */
  const staticRec = getStaticRecommendation(answers);

  const client = getAIClient();
  if (!client) {
    return NextResponse.json({ recommendation: staticRec, source: "static" });
  }

  try {
    const prompt = `A potential customer has completed our shopfront recommender quiz. Based on their answers, provide a personalised recommendation.

Customer answers:
- Business type: ${answers.businessType}
- Primary need: ${answers.primaryNeed}
- Top priority: ${answers.priority}
- Budget range: ${answers.budget}

Respond in JSON format only:
{
  "primary": "name of the primary recommended service",
  "secondary": "name of a complementary service",
  "reason": "2-3 sentences explaining why these are the best fit for their specific situation. Be specific to their business type and needs. British English.",
  "priceRange": "indicative price range like £X,XXX – £X,XXX",
  "cta": "A specific, helpful call-to-action mentioning phone 07414 779594"
}

Available services: Aluminium Shopfronts (£2,800-£6,500), Roller Shutters (£1,200-£3,500), Security Doors (£1,800-£4,500), Automatic Doors (£3,500-£8,000), Bi-Fold Doors (£3,000-£7,000), Fire Doors (£450-£1,200/door), Shopfront Repairs (£300-£2,000), Emergency Callout (24/7), Shutter Repair (£150-£1,200), Glass Replacement (£200-£1,800).`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 400,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: "You are a shopfront installation expert at Sigma Shop Fronts, a UK-wide commercial shopfront company. Respond ONLY with valid JSON. Be practical, specific, and helpful. Use British English.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content || "";

    /* Parse AI response; fall back to static if parsing fails */
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      const aiRec = JSON.parse(jsonMatch[0]) as Recommendation;
      if (!aiRec.primary || !aiRec.reason) throw new Error("Incomplete");
      return NextResponse.json({ recommendation: aiRec, source: "ai" });
    } catch {
      return NextResponse.json({ recommendation: staticRec, source: "static" });
    }
  } catch (err) {
    console.error("[recommend] Groq API error:", err);
    return NextResponse.json({ recommendation: staticRec, source: "static" });
  }
}
