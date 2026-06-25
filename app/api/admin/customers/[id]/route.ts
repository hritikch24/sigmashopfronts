import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token === adminKey) return true;
  }
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') === adminKey) return true;
  return false;
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
    const { name, phone, email, location, service, jobType, status, price, notes } = body;

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = String(name).trim();
    if (phone !== undefined) data.phone = String(phone).trim();
    if (email !== undefined) data.email = email ? String(email).trim() : null;
    if (location !== undefined) data.location = String(location).trim();
    if (service !== undefined) data.service = String(service);
    if (jobType !== undefined) data.jobType = String(jobType);
    if (status !== undefined) {
      data.status = String(status);
      if (status === 'completed') data.completedAt = new Date();
    }
    if (price !== undefined) data.price = price ? parseFloat(price) : null;
    if (notes !== undefined) data.notes = notes ? String(notes).trim() : null;

    if (body.markContacted) {
      data.lastContact = new Date();
    }

    const customer = await prisma.customer.update({
      where: { id },
      data,
    });

    return NextResponse.json({ ok: true, customer });
  } catch (err) {
    console.error('[admin/customers] PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update customer.' }, { status: 500 });
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
    await prisma.customer.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/customers] DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete customer.' }, { status: 500 });
  }
}
