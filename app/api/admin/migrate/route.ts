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

const MIGRATIONS = [
  `ALTER TABLE documents ADD COLUMN IF NOT EXISTS meta jsonb`,
  `ALTER TABLE documents ADD COLUMN IF NOT EXISTS deposit_percent double precision`,
  `ALTER TABLE documents ADD COLUMN IF NOT EXISTS issue_date timestamp(3)`,
  `ALTER TABLE documents ADD COLUMN IF NOT EXISTS valid_until timestamp(3)`,
  `ALTER TABLE documents ADD COLUMN IF NOT EXISTS due_date timestamp(3)`,
];

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const results: { sql: string; status: string }[] = [];

  for (const sql of MIGRATIONS) {
    try {
      await prisma.$executeRawUnsafe(sql);
      results.push({ sql, status: 'ok' });
    } catch (err) {
      results.push({ sql, status: String(err) });
    }
  }

  return NextResponse.json({ ok: true, results });
}
