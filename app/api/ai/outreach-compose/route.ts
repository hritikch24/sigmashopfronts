import { NextRequest, NextResponse } from 'next/server';
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

    const prompt = `You are writing email #${emailNumber} in a sales conversation with a potential shopfront installation customer.

LEAD DETAILS:
- Name: ${lead.name}
- Email: ${lead.email}
- Phone: ${lead.phone}
- Location: ${lead.location}
- Service interested in: ${lead.service}
- Their message: ${lead.message || 'None provided'}
- Lead status: ${lead.status}
- First contacted: ${lead.createdAt.toLocaleDateString('en-GB')}

PREVIOUS EMAIL THREAD:
${threadContext}

${instruction ? `SPECIFIC INSTRUCTION FOR THIS EMAIL: ${instruction}` : `Write the next appropriate follow-up email. If this is email #1, introduce yourself and ask about their specific requirements. If follow-up, reference what was discussed and move the conversation forward — ask about timeline, budget, or offer a site visit.`}

RULES:
- Be professional, warm, and persuasive but NOT pushy
- Reference their specific service need (${lead.service}) and location (${lead.location})
- If follow-up, reference previous emails naturally — show you remember the conversation
- Always work towards booking a free site survey
- Keep it concise — 3-4 short paragraphs max
- Sign off as Sigma Shopfronts team
- British English only
- Address them by first name (${lead.name.split(' ')[0]})

Respond in JSON only:
{
  "subject": "Professional subject line${emails.length > 0 ? ' (can use Re: if following up)' : ''}",
  "body": "Full email body with proper paragraphs"
}`;

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 700,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: 'You are a professional sales assistant at Sigma Shopfronts, a UK-wide commercial shopfront installation and repair company. Your goal is to win the job by being helpful, knowledgeable, and building trust. You write persuasive but professional emails. Respond ONLY with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to generate reply.' }, { status: 500 });
    }

    const reply = JSON.parse(jsonMatch[0]) as { subject: string; body: string };
    if (!reply.subject || !reply.body) {
      return NextResponse.json({ error: 'Incomplete response.' }, { status: 500 });
    }

    return NextResponse.json({ reply, emailNumber });
  } catch (err) {
    console.error('[outreach-compose] error:', err);
    return NextResponse.json({ error: 'AI service error.' }, { status: 500 });
  }
}
