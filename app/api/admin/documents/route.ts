import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

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

interface LineItem {
  description: string;
  qty: number;
  unitPrice: number;
}

function computeTotals(lineItems: LineItem[], vatRate: number) {
  const subtotal = lineItems.reduce((sum, li) => sum + li.qty * li.unitPrice, 0);
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

async function nextNumber(type: string): Promise<string> {
  const prefix = type === 'invoice' ? 'INV' : 'Q';
  const year = new Date().getFullYear();
  const count = await prisma.document.count({ where: { type } });
  return `${prefix}-${year}-${String(count + 1).padStart(4, '0')}`;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  const where: Record<string, unknown> = {};
  if (type && type !== 'all') where.type = type;
  if (status && status !== 'all') where.status = status;

  try {
    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return NextResponse.json({ documents });
  } catch (err) {
    console.error('[admin/documents] GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch documents.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type, customerId, customerName, customerEmail, customerPhone, customerAddress,
      lineItems, vatRate, notes, depositPercent, validUntil, dueDate,
    } = body;

    if (type !== 'quote' && type !== 'invoice') {
      return NextResponse.json({ error: 'Type must be "quote" or "invoice".' }, { status: 400 });
    }
    if (!customerName || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: 'Customer name and at least one line item are required.' }, { status: 400 });
    }

    const cleanItems: LineItem[] = lineItems.map((li: LineItem) => ({
      description: String(li.description || '').trim(),
      qty: Number(li.qty) || 0,
      unitPrice: Number(li.unitPrice) || 0,
    }));

    const rate = Number(vatRate) || 0;
    const { subtotal, vatAmount, total } = computeTotals(cleanItems, rate);
    const number = await nextNumber(type);

    const document = await prisma.document.create({
      data: {
        type,
        number,
        customerId: customerId || null,
        customerName: String(customerName).trim(),
        customerEmail: customerEmail ? String(customerEmail).trim() : null,
        customerPhone: customerPhone ? String(customerPhone).trim() : null,
        customerAddress: customerAddress ? String(customerAddress).trim() : null,
        lineItems: cleanItems as unknown as Prisma.InputJsonValue,
        subtotal,
        vatRate: rate,
        vatAmount,
        total,
        notes: notes ? String(notes).trim() : null,
        depositPercent: depositPercent ? Number(depositPercent) : null,
        validUntil: validUntil ? new Date(validUntil) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: 'sent',
      },
    });

    return NextResponse.json({ ok: true, document });
  } catch (err) {
    console.error('[admin/documents] POST error:', err);
    return NextResponse.json({ error: 'Failed to create document.' }, { status: 500 });
  }
}
