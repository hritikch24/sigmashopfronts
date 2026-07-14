import { NextRequest, NextResponse } from 'next/server';
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
