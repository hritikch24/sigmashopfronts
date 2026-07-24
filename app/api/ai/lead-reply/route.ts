import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/* ── Auth ─────────────────────────────────────────────────────────────── */

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const fullKey = adminKey + 'nimda';
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token === fullKey) return true;
  }
  return false;
}

/* ── Groq client ──────────────────────────────────────────────────────── */

function getAIClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
}

/* ── POST handler ─────────────────────────────────────────────────────── */

interface LeadInput {
  name: string;
  service: string;
  location: string;
  message?: string | null;
  email?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  let lead: LeadInput;
  try {
    lead = await request.json();
    if (!lead.name || !lead.service) {
      throw new Error("Missing fields");
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const client = getAIClient();
  if (!client) {
    return NextResponse.json({ error: "AI service not configured." }, { status: 503 });
  }

  try {
    const prompt = `A potential customer has submitted an enquiry on our shopfront installation website. Draft a professional follow-up email reply to learn more about their requirements.

Customer details:
- Name: ${lead.name}
- Service interested in: ${lead.service}
- Location: ${lead.location}
${lead.message ? `- Their message: "${lead.message}"` : '- No additional message provided'}

Write a professional, warm email reply that:
1. Thanks them for their enquiry
2. Shows we understand their specific need (${lead.service})
3. Asks 2-3 relevant follow-up questions to understand scope (e.g. dimensions, existing setup, timeline, specific requirements)
4. Mentions we serve their area (${lead.location})
5. Offers a free site survey
6. Signs off as Sigma Shopfronts team

Respond in JSON format only:
{
  "subject": "A concise, professional email subject line",
  "body": "The full email body text. Use proper paragraphs. British English. Address them by first name."
}`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 600,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are a professional sales assistant at Sigma Shopfronts, a UK-wide commercial shopfront installation company. Write warm, professional emails in British English. Respond ONLY with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content || "";

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      const reply = JSON.parse(jsonMatch[0]) as { subject: string; body: string };
      if (!reply.subject || !reply.body) throw new Error("Incomplete");
      return NextResponse.json({ reply, source: "ai" });
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }
  } catch (err) {
    console.error("[lead-reply] AI error:", err);
    return NextResponse.json({ error: "AI service error." }, { status: 500 });
  }
}
