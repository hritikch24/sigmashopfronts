import { NextRequest, NextResponse } from 'next/server';
import { draftingRules, serviceNotes } from '@/lib/sales-facts';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

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

function getAIClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' });
}

/* ── POST — AI compose with full thread context ───────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const client = getAIClient();
  if (!client) {
    return NextResponse.json({ error: 'AI service not configured.' }, { status: 503 });
  }

  try {
    const { leadId, instruction } = await request.json();
    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required.' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

    // Get full email history for this lead
    const emails = await prisma.emailMessage.findMany({
      where: { leadId },
      orderBy: { createdAt: 'asc' },
    });

    // Build thread context
    const threadContext = emails.length > 0
      ? emails.map((e: { direction: string; createdAt: Date; subject: string; body: string }, i: number) => `Email ${i + 1} (${e.direction}, ${new Date(e.createdAt).toLocaleDateString('en-GB')}):\nSubject: ${e.subject}\n${e.body}`).join('\n\n---\n\n')
      : 'No previous emails sent yet.';

    const emailNumber = emails.length + 1;

    // Service-specific selling points
    const serviceInsights = serviceNotes;

    const serviceInfo = serviceInsights[lead.service] || '';

    // Email sequence strategy
    let sequenceGuidance = '';
    if (emailNumber === 1) {
      sequenceGuidance = `EMAIL #1 — FIRST CONTACT. Goals:
- Thank them warmly for their enquiry
- Show you've READ their message — reference specific details they mentioned
- Demonstrate expertise with 1-2 specific insights about their chosen service
- Ask 2-3 smart questions that show you know the trade (dimensions, current setup, timeline, any specific concerns)
- If it is a repair, say whether ${lead.location} is inside our repair radius; never claim to have worked there before
- Offer a site survey — frame it as valuable to THEM ("lets us give you an exact quote rather than a rough estimate")
- No invented urgency, scarcity or price movements
- DO NOT mention price ranges — too early, makes you look cheap`;
    } else if (emailNumber === 2) {
      sequenceGuidance = `EMAIL #2 — FIRST FOLLOW-UP. Goals:
- Reference your previous email naturally, don't say "following up" (boring)
- Add NEW value — share a relevant insight, tip, or consideration they may not have thought of
- No social proof, past projects or client anecdotes unless they appear in the thread — do not invent them
- Reiterate the site survey offer and ask what timing suits them
- Slightly more direct CTA — ask a specific question that's easy to reply to`;
    } else if (emailNumber === 3) {
      sequenceGuidance = `EMAIL #3 — WARM NUDGE. Goals:
- Keep it SHORT — 2 paragraphs max
- Acknowledge they're probably busy
- Offer something concrete: a site survey at a time that suits them
- Mention one relevant, factual consideration (for example what their council's guidance says about shutters) — no savings figures
- Make replying effortless: "Just reply 'yes' and I'll sort the rest"`;
    } else {
      sequenceGuidance = `EMAIL #${emailNumber} — LATER FOLLOW-UP. Goals:
- Very brief and respectful of their time
- Offer a genuine new angle — a question, or a relevant planning point — never an invented offer or project
- Leave the door open: "No worries if the timing isn't right — we're here whenever you're ready"
- Stay warm, never passive-aggressive or guilt-tripping`;
    }

    const prompt = `You are writing email #${emailNumber} to a potential shopfront customer. Your goal is to WIN THIS JOB by being genuinely helpful, knowledgeable, and building trust.

LEAD DETAILS:
- Name: ${lead.name} (address as "${lead.name.split(' ')[0]}")
- Email: ${lead.email}
- Phone: ${lead.phone}
- Location: ${lead.location}
- Service: ${lead.service}
- Their original message: "${lead.message || 'No message — they filled out the enquiry form only'}"
- Lead status: ${lead.status}
- First enquiry date: ${lead.createdAt.toLocaleDateString('en-GB')}

SERVICE KNOWLEDGE (use naturally, don't dump all of it):
${serviceInfo}

PREVIOUS EMAILS IN THIS THREAD:
${threadContext}

${sequenceGuidance}

${instruction ? `\nADDITIONAL INSTRUCTION FROM SENDER: ${instruction}` : ''}

WRITING STYLE:
- British English, professional but conversational — like a knowledgeable tradesman who's also good with people
- No corporate fluff, no "I hope this email finds you well", no "don't hesitate to reach out"
- Short paragraphs (2-3 sentences each), easy to scan on mobile
- Sound like a real person, not a template
- End with a clear, specific next step (not a vague "let me know")
- Sign off: "Best regards," then the team name and phone number on next line

Respond in JSON only:
{
  "subject": "${emails.length > 0 ? 'Can use Re: for continuity or a fresh subject if changing topic' : 'Compelling subject that gets opened — reference their specific need, not generic'}",
  "body": "The complete email body text. Use line breaks between paragraphs."
}`;

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 700,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `You are the senior sales person at Sigma Shopfronts, a UK-wide commercial shopfront installation and repair company based in Oldbury, West Midlands. You know materials, regulations, pricing factors, and what matters to business owners. You write emails that feel personal and knowledgeable — never templated. Your conversion rate is high because you focus on understanding the customer's specific situation before selling. Offer a site survey as the next step where it makes sense. ${draftingRules} Respond ONLY with valid JSON.`,
        },
        { role: 'user', content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to generate reply.' }, { status: 500 });
    }

    // Sanitise control characters that the LLM sometimes puts inside JSON strings
    const sanitised = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, (ch) => {
      if (ch === '\n') return '\\n';
      if (ch === '\r') return '\\r';
      if (ch === '\t') return '\\t';
      return '';
    });

    const reply = JSON.parse(sanitised) as { subject: string; body: string };
    if (!reply.subject || !reply.body) {
      return NextResponse.json({ error: 'Incomplete response.' }, { status: 500 });
    }

    return NextResponse.json({ reply, emailNumber });
  } catch (err) {
    console.error('[outreach-compose] error:', err);
    return NextResponse.json({ error: 'AI service error.' }, { status: 500 });
  }
}
