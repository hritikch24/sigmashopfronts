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

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const jobType = searchParams.get('jobType');

  const where: Record<string, unknown> = {};
  if (status && status !== 'all') where.status = status;
  if (jobType && jobType !== 'all') where.jobType = jobType;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
      { email: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const [customers, stats] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 200,
      }),
      prisma.$queryRawUnsafe<{ status: string; count: bigint }[]>(
        `SELECT status, COUNT(*)::bigint as count FROM customers GROUP BY status`
      ).catch(() => []),
    ]);

    const totalCustomers = await prisma.customer.count();
    const completedJobs = await prisma.customer.count({ where: { status: 'completed' } });

    return NextResponse.json({
      customers,
      stats: {
        total: totalCustomers,
        completed: completedJobs,
        byStatus: stats.map(s => ({ status: s.status, count: Number(s.count) })),
      },
    });
  } catch (err) {
    console.error('[admin/customers] GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch customers.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, phone, email, location, service, jobType, status, price, notes } = body;

    if (!name || !location || !service) {
      return NextResponse.json({ error: 'Name, location, and service are required.' }, { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        name: String(name).trim(),
        phone: phone ? String(phone).trim() : '',
        email: email ? String(email).trim() : null,
        location: String(location).trim(),
        service: String(service),
        jobType: jobType || 'installation',
        status: status || 'enquiry',
        price: price ? parseFloat(price) : null,
        notes: notes ? String(notes).trim() : null,
        completedAt: status === 'completed' ? new Date() : null,
      },
    });

    return NextResponse.json({ ok: true, customer });
  } catch (err) {
    console.error('[admin/customers] POST error:', err);
    return NextResponse.json({ error: 'Failed to create customer.' }, { status: 500 });
  }
}
