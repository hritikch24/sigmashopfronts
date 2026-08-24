import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { calculateEstimate, findService, budgetLabel } from '@/lib/estimator';
import { sendLeadNotification, sendEstimateEmail } from '@/lib/resend';
import { sendTelegramLeadNotification } from '@/lib/telegram';

// Same limiter shape as /api/contact — instant estimates are cheap to request
// but each one creates a lead, so the ceiling is a little higher than a form.
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 6;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

async function nextAutoQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const result = await prisma.$queryRawUnsafe<{ max_num: number | null }[]>(
    `SELECT MAX(CAST(SPLIT_PART(number, '-', 3) AS INTEGER)) as max_num
     FROM documents WHERE number LIKE $1`,
    `AQ-${year}-%`
  );
  const maxNum = result[0]?.max_num || 0;
  return `AQ-${year}-${String(maxNum + 1).padStart(4, '0')}`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  cleanupExpiredEntries();

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many estimate requests. Please try again later or call us.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const {
    name, email, phone, citySlug, cityName, serviceSlug, variantId,
    quantity, difficultAccess, removalRequired, outOfHours, notes, budgetBand, sessionId,
  } = body as Record<string, string | number | boolean | undefined>;

  const missing: string[] = [];
  if (!String(name || '').trim()) missing.push('name');
  if (!String(email || '').trim()) missing.push('email');
  if (!String(phone || '').trim()) missing.push('phone');
  if (!String(serviceSlug || '').trim()) missing.push('service');
  if (!String(variantId || '').trim()) missing.push('option');
  if (missing.length > 0) {
    return NextResponse.json(
      { success: false, error: `Missing required fields: ${missing.join(', ')}.` },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(String(email).trim())) {
    return NextResponse.json(
      { success: false, error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  const service = findService(String(serviceSlug));
  if (!service) {
    return NextResponse.json({ success: false, error: 'Unknown service.' }, { status: 400 });
  }

  const estimate = calculateEstimate({
    serviceSlug: String(serviceSlug),
    variantId: String(variantId),
    quantity: Number(quantity) || 1,
    citySlug: citySlug ? String(citySlug) : undefined,
    difficultAccess: Boolean(difficultAccess),
    removalRequired: Boolean(removalRequired),
    outOfHours: Boolean(outOfHours),
  });

  if (!estimate) {
    return NextResponse.json(
      { success: false, error: 'That combination is not something we can price automatically. Please call us.' },
      { status: 400 }
    );
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPhone = String(phone).trim();
  const location = String(cityName || citySlug || '').trim() || 'Not specified';
  const cleanNotes = String(notes || '').trim();
  const budget = budgetLabel(budgetBand ? String(budgetBand) : null);

  // The estimate is shown even if persistence fails — the customer should never
  // lose their number because of a database hiccup.
  let quoteNumber: string | null = null;

  try {
    quoteNumber = await nextAutoQuoteNumber();
    await prisma.document.create({
      data: {
        type: 'auto-quote',
        number: quoteNumber,
        customerName: cleanName,
        customerEmail: cleanEmail,
        customerPhone: cleanPhone,
        customerAddress: location,
        lineItems: [
          {
            description: `${estimate.serviceName} — ${estimate.variantLabel}`,
            qty: estimate.quantity,
            unitPrice: Math.round(estimate.low / estimate.quantity),
          },
        ] as unknown as Prisma.InputJsonValue,
        subtotal: estimate.low,
        vatRate: 0,
        vatAmount: 0,
        total: estimate.high,
        notes: cleanNotes || null,
        meta: {
          autoGenerated: true,
          estimateLow: estimate.low,
          estimateHigh: estimate.high,
          factors: estimate.factors,
          inputs: {
            serviceSlug: String(serviceSlug),
            serviceName: estimate.serviceName,
            variantId: String(variantId),
            variantLabel: estimate.variantLabel,
            quantity: estimate.quantity,
            citySlug: citySlug ? String(citySlug) : null,
            cityName: location,
            difficultAccess: Boolean(difficultAccess),
            removalRequired: Boolean(removalRequired),
            outOfHours: Boolean(outOfHours),
            budgetBand: budgetBand ? String(budgetBand) : null,
            budgetLabel: budget,
          },
        } as unknown as Prisma.InputJsonValue,
        status: 'auto',
        issueDate: new Date(),
      },
    });
  } catch (err) {
    console.error('[instant-quote] Failed to save auto-quote:', err);
  }

  // Also record it as a lead so it lands in the existing follow-up pipeline.
  const summary = [
    `Instant estimate ${quoteNumber ?? '(unsaved)'}: £${estimate.low.toLocaleString('en-GB')} – £${estimate.high.toLocaleString('en-GB')}`,
    `${estimate.serviceName} — ${estimate.variantLabel} × ${estimate.quantity}`,
    estimate.factors.length ? `Factors: ${estimate.factors.join('; ')}` : '',
    budget ? `Stated budget: ${budget}` : '',
    cleanNotes ? `Customer notes: ${cleanNotes}` : '',
  ].filter(Boolean).join('\n');

  try {
    const lead = await prisma.lead.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        location,
        service: estimate.serviceName,
        message: summary,
        source: 'instant-quote',
        sessionId: sessionId ? String(sessionId).trim().slice(0, 100) : undefined,
      },
    });

    try {
      await sendLeadNotification(lead);
    } catch (err) {
      console.error('[instant-quote] Lead notification email failed:', err);
    }
    try {
      await sendTelegramLeadNotification(lead);
    } catch (err) {
      console.error('[instant-quote] Telegram notification failed:', err);
    }
  } catch (err) {
    console.error('[instant-quote] Failed to save lead:', err);
  }

  // Goes out within seconds of the visitor pressing the button. This is the
  // touch that holds the lead while we get to the callback, so it is sent
  // even if the lead or document write above failed.
  // Whether this actually left the building. The UI must not promise an email
  // that Resend rejected — an unconfigured key or an unverified sending domain
  // both fail here, and the customer would otherwise be told to check an inbox
  // that will stay empty.
  let emailed = false;
  try {
    await sendEstimateEmail({
      name: cleanName,
      email: cleanEmail,
      reference: quoteNumber,
      low: estimate.low,
      high: estimate.high,
      serviceName: estimate.serviceName,
      variantLabel: estimate.variantLabel,
      quantity: estimate.quantity,
      factors: estimate.factors,
    });
    emailed = true;
  } catch (err) {
    console.error('[instant-quote] Estimate email failed:', err);
  }

  return NextResponse.json({
    success: true,
    emailed,
    estimate: {
      low: estimate.low,
      high: estimate.high,
      serviceName: estimate.serviceName,
      variantLabel: estimate.variantLabel,
      quantity: estimate.quantity,
      factors: estimate.factors,
      reference: quoteNumber,
    },
  });
}
