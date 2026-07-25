import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return NextResponse.json({ error: 'No key.' }, { status: 500 });

  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') !== adminKey + 'nimda') {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS email_messages (
        id TEXT PRIMARY KEY,
        lead_id TEXT NOT NULL,
        direction TEXT NOT NULL,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        to_email TEXT NOT NULL,
        from_email TEXT,
        status TEXT NOT NULL DEFAULT 'sent',
        resend_id TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS idx_email_messages_lead_id ON email_messages(lead_id)`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS idx_email_messages_created ON email_messages("createdAt")`);

    // Add issue_date to documents
    await prisma.$executeRawUnsafe(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS issue_date TIMESTAMP(3)`);

    return NextResponse.json({ ok: true, message: 'Migrations applied.' });
  } catch (err) {
    console.error('[db-migrate]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
