import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') === fullKey) return true;
  return false;
}

const FROM_EMAIL = 'SigmaShopfronts <noreply@sigmashopfronts.com>';

/* ── GET — list leads with their email threads ────────────────────────── */

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const leadId = searchParams.get('leadId');

    // Single lead thread
    if (leadId) {
      const lead = await prisma.lead.findUnique({ where: { id: leadId } });
      if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

      const emails = await prisma.emailMessage.findMany({
        where: { leadId },
        orderBy: { createdAt: 'asc' },
      });

      return NextResponse.json({ lead, emails });
    }

    // All leads with email counts
    const where = statusFilter ? { status: statusFilter } : {};
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Get email counts per lead
    const leadIds = leads.map((l) => l.id);
    const emailCounts = await prisma.emailMessage.groupBy({
      by: ['leadId'],
      where: { leadId: { in: leadIds } },
      _count: true,
    });

    const countMap = Object.fromEntries(
      emailCounts.map((e: { leadId: string; _count: number }) => [e.leadId, e._count])
    );

    const leadsWithCounts = leads.map((l) => ({
      ...l,
      emailCount: countMap[l.id] || 0,
    }));

    return NextResponse.json({ leads: leadsWithCounts });
  } catch (err) {
    console.error('[outreach] GET error:', err);
    return NextResponse.json({ error: 'Failed.' }, { status: 500 });
  }
}

/* ── POST — send an email to a lead ───────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { leadId, subject, body } = await request.json();

    if (!leadId || !subject || !body) {
      return NextResponse.json({ error: 'leadId, subject, and body are required.' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

    // Build HTML email
    const htmlBody = body
      .split('\n')
      .map((line: string) => (line.trim() === '' ? '<br/>' : `<p style="margin:0 0 8px;color:#374151;font-size:15px;line-height:1.6;">${line}</p>`))
      .join('');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:24px;border-radius:8px;">
        <div style="background:#1a1a2e;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="color:#d4a843;margin:0;font-size:22px;">Sigma Shopfronts</h1>
        </div>
        <div style="background:#fff;padding:32px 24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
          ${htmlBody}
          <hr style="margin:28px 0;border:none;border-top:1px solid #e5e7eb;"/>
          <p style="font-size:12px;color:#9ca3af;text-align:center;margin:0;">
            Sigma Shopfronts · 07414 779594 · sales@sigmashopfronts.com<br/>
            <a href="https://www.sigmashopfronts.com" style="color:#9ca3af;">www.sigmashopfronts.com</a>
          </p>
        </div>
      </div>
    `;

    // Send via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
    }

    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      subject,
      html,
    });

    if (error) {
      // Store as failed
      await prisma.emailMessage.create({
        data: { leadId, direction: 'outbound', subject, body, toEmail: lead.email, fromEmail: FROM_EMAIL, status: 'failed' },
      });
      return NextResponse.json({ error: `Send failed: ${error.message}` }, { status: 500 });
    }

    // Store sent email
    const email = await prisma.emailMessage.create({
      data: {
        leadId,
        direction: 'outbound',
        subject,
        body,
        toEmail: lead.email,
        fromEmail: FROM_EMAIL,
        status: 'sent',
        resendId: data?.id || null,
      },
    });

    // Update lead status to contacted if still new
    if (lead.status === 'new') {
      await prisma.lead.update({ where: { id: leadId }, data: { status: 'contacted' } });
    }

    return NextResponse.json({ ok: true, email });
  } catch (err) {
    console.error('[outreach] POST error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
