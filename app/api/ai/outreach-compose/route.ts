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

    // Service-specific selling points
    const serviceInsights: Record<string, string> = {
      'Aluminium Shopfronts': 'Thermally broken aluminium frames with double glazing reduce energy bills by up to 30%. Powder-coated in any RAL colour to match branding. 10-year structural guarantee. We handle council planning if needed.',
      'Roller Shutters': 'Insurance-approved electric roller shutters can reduce premiums by 15-20%. Quiet tubular motors, key fob or remote operation. Same-day emergency fitting available.',
      'Security Doors': 'LPS 1175 certified steel doors — the standard insurers and police recommend. Multipoint locking, anti-drill cylinders. We fit to existing frames or supply complete.',
      'Automatic Doors': 'DDA-compliant automatic sliding or swing doors increase footfall — studies show 12% more walk-ins. Low energy consumption, safety sensors, full maintenance packages.',
      'Bi-Fold Doors': 'Fully retractable bi-fold systems create a seamless indoor-outdoor frontage. Ideal for cafes, restaurants, and retail. Thermally broken profiles for year-round comfort.',
      'Shopfront Repairs': 'Same-day repair service for broken glass, damaged frames, faulty locks, and mechanisms. We carry common parts on our vans so most jobs are done in one visit.',
      'Shutter Repair': 'Emergency shutter repair — stuck, jammed, or damaged roller shutters fixed same day. Motor replacements, slat repairs, guide rail fixes. All brands serviced.',
      'Glass Replacement': 'Like-for-like or upgraded glass replacement — toughened, laminated, or double-glazed units. Board-up service available for emergencies. Usually fitted within 24-48 hours.',
      'Fire Doors': 'FD30 and FD60 certified fire doors — fully compliant with Building Regulations. Essential for insurance and fire risk assessments. Supply and fit or supply only.',
      'Emergency Callout': '24/7 emergency response — we aim to be on site within 1 hour to secure your premises after break-ins, storm damage, or vandalism. Full repairs follow.',
    };

    const serviceInfo = serviceInsights[lead.service] || `Professional ${lead.service.toLowerCase()} installation and service. Competitive pricing with quality workmanship guaranteed.`;

    // Email sequence strategy
    let sequenceGuidance = '';
    if (emailNumber === 1) {
      sequenceGuidance = `EMAIL #1 — FIRST CONTACT. Goals:
- Thank them warmly for their enquiry
- Show you've READ their message — reference specific details they mentioned
- Demonstrate expertise with 1-2 specific insights about their chosen service
- Ask 2-3 smart questions that show you know the trade (dimensions, current setup, timeline, any specific concerns)
- Mention you regularly work in their area (${lead.location})
- Offer a free, no-obligation site survey — frame it as valuable to THEM ("lets us give you an exact quote rather than a rough estimate")
- Create gentle urgency if natural (e.g. "our schedule fills up quickly for [month]" or "current material prices are competitive")
- DO NOT mention price ranges — too early, makes you look cheap`;
    } else if (emailNumber === 2) {
      sequenceGuidance = `EMAIL #2 — FIRST FOLLOW-UP. Goals:
- Reference your previous email naturally, don't say "following up" (boring)
- Add NEW value — share a relevant insight, tip, or consideration they may not have thought of
- Light social proof: "we recently completed a similar ${lead.service.toLowerCase()} project in [nearby area]" or "one thing our clients in ${lead.location} often ask about is..."
- Reiterate the free site survey offer with a specific proposed date/timeframe: "I could pop by this week or next — what works for you?"
- Slightly more direct CTA — ask a specific question that's easy to reply to`;
    } else if (emailNumber === 3) {
      sequenceGuidance = `EMAIL #3 — WARM NUDGE. Goals:
- Keep it SHORT — 2 paragraphs max
- Acknowledge they're probably busy
- Offer something concrete: "I'll be in the ${lead.location} area on [day] — happy to stop by for a quick 10-minute look, no commitment"
- Mention a relevant benefit they'd miss out on: energy savings, insurance compliance, security improvement, or increased footfall
- Make replying effortless: "Just reply 'yes' and I'll sort the rest"`;
    } else {
      sequenceGuidance = `EMAIL #${emailNumber} — LATER FOLLOW-UP. Goals:
- Very brief and respectful of their time
- Offer a new angle or reason to get in touch (seasonal offer, new product, completed a nearby project)
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
          content: `You are the senior sales person at Sigma Shopfronts, a UK-wide commercial shopfront installation and repair company based in Oldbury, West Midlands. You have 15+ years of experience in the shopfront trade. You know materials, regulations, pricing factors, and what matters to business owners. You write emails that feel personal and knowledgeable — never templated. Your conversion rate is high because you focus on understanding the customer's specific situation before selling. You always offer a free site survey as the next step because you know seeing the site in person wins jobs. Phone: 07414 779594. Respond ONLY with valid JSON.`,
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
