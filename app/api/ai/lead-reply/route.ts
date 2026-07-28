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
    const serviceInsights: Record<string, string> = {
      'Aluminium Shopfronts': 'Thermally broken frames, double glazing, any RAL colour, 10-year guarantee.',
      'Roller Shutters': 'Insurance-approved, can reduce premiums 15-20%. Electric with remote/key fob.',
      'Security Doors': 'LPS 1175 certified, multipoint locking, police-recommended standard.',
      'Automatic Doors': 'DDA-compliant, studies show 12% more walk-ins. Low energy, safety sensors.',
      'Bi-Fold Doors': 'Fully retractable, seamless frontage. Ideal for cafes and retail.',
      'Shopfront Repairs': 'Same-day service, common parts carried on our vans.',
      'Shutter Repair': 'Emergency same-day. Motors, slats, guide rails — all brands.',
      'Glass Replacement': 'Toughened, laminated, or double-glazed. Usually fitted within 24-48 hours.',
    };
    const serviceInfo = serviceInsights[lead.service] || '';

    const prompt = `Draft a first-contact email to a potential shopfront customer who just enquired.

LEAD:
- Name: ${lead.name} (use first name "${lead.name.split(' ')[0]}")
- Service: ${lead.service}
- Location: ${lead.location}
${lead.message ? `- Their message: "${lead.message}"` : '- No message — form enquiry only'}

SERVICE KNOWLEDGE: ${serviceInfo}

WRITE AN EMAIL THAT:
1. Thanks them and references their SPECIFIC need (not generic)
2. Shows trade knowledge — mention 1 relevant insight about ${lead.service}
3. Asks 2-3 smart questions (dimensions? existing setup? timeline? specific concerns?)
4. Mentions you work in ${lead.location} regularly
5. Offers a free site survey — "gives us an exact picture so we can quote properly"
6. Ends with a clear next step, not vague "let me know"

STYLE: British English, conversational professional — like a knowledgeable tradesman who's good with people. No corporate fluff. Short paragraphs. Sign off as Sigma Shopfronts team with phone 07414 779594.

Respond in JSON only:
{
  "subject": "Specific subject referencing their service need — not generic",
  "body": "Full email body. Line breaks between paragraphs."
}`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 600,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are the senior sales person at Sigma Shopfronts, a UK-wide shopfront installation company based in Oldbury, West Midlands. 15+ years in the trade. You write emails that feel personal and knowledgeable — never templated. You focus on understanding the customer's situation before selling. Phone: 07414 779594. Respond ONLY with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content || "";

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      const sanitised = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, (ch) => {
        if (ch === '\n') return '\\n';
        if (ch === '\r') return '\\r';
        if (ch === '\t') return '\\t';
        return '';
      });
      const reply = JSON.parse(sanitised) as { subject: string; body: string };
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
