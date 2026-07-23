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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Full edit — if lineItems are provided, it's a full update
    if (body.lineItems) {
      const {
        customerName, customerEmail, customerPhone, customerAddress,
        lineItems, vatRate, notes, meta, depositPercent, validUntil, dueDate,
      } = body;

      const cleanItems: LineItem[] = lineItems.map((li: LineItem) => ({
        description: String(li.description || '').trim(),
        qty: Number(li.qty) || 0,
        unitPrice: Number(li.unitPrice) || 0,
      }));

      const rate = Number(vatRate) || 0;
      const subtotal = cleanItems.reduce((sum, li) => sum + li.qty * li.unitPrice, 0);
      const vatAmount = subtotal * (rate / 100);
      const total = subtotal + vatAmount;

      const document = await prisma.document.update({
        where: { id },
        data: {
          customerName: String(customerName).trim(),
          customerEmail: customerEmail ? String(customerEmail).trim() : null,
          customerPhone: customerPhone ? String(customerPhone).trim() : null,
          customerAddress: customerAddress ? String(customerAddress).trim() : null,
          lineItems: cleanItems as unknown as Prisma.InputJsonValue,
          subtotal: Math.round(subtotal * 100) / 100,
          vatRate: rate,
          vatAmount: Math.round(vatAmount * 100) / 100,
          total: Math.round(total * 100) / 100,
          notes: notes ? String(notes).trim() : null,
          meta: meta && typeof meta === 'object' ? (meta as Prisma.InputJsonValue) : undefined,
          depositPercent: depositPercent ? Number(depositPercent) : null,
          validUntil: validUntil ? new Date(validUntil) : null,
          dueDate: dueDate ? new Date(dueDate) : null,
        },
      });

      return NextResponse.json({ ok: true, document });
    }

    // Status-only update
    const { status } = body;
    const data: Record<string, unknown> = {};
    if (status !== undefined) {
      data.status = String(status);
      if (status === 'paid') data.paidAt = new Date();
    }

    const document = await prisma.document.update({ where: { id }, data });
    return NextResponse.json({ ok: true, document });
  } catch (err) {
    console.error('[admin/documents/:id] PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update document.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.document.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/documents/:id] DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete document.' }, { status: 500 });
  }
}
