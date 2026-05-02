import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token === adminKey) return true;
  }
  const { searchParams } = new URL(request.url);
  return searchParams.get('key') === adminKey;
}

function getSchemaFiles(): { name: string; sql: string }[] {
  const dir = path.join(process.cwd(), 'db');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort()
    .map((f) => ({ name: f, sql: fs.readFileSync(path.join(dir, f), 'utf-8') }));
}

async function ensureMigrationsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "_migrations" (
      "name" TEXT NOT NULL,
      "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "_migrations_pkey" PRIMARY KEY ("name")
    );
  `);
}

async function getAppliedMigrations(): Promise<Set<string>> {
  const rows = await prisma.$queryRawUnsafe<{ name: string }[]>(
    `SELECT "name" FROM "_migrations" ORDER BY "name"`
  );
  return new Set(rows.map((r) => r.name));
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    await ensureMigrationsTable();

    const schemas = getSchemaFiles();
    const applied = await getAppliedMigrations();
    const pending = schemas.filter((s) => !applied.has(s.name));

    if (pending.length === 0) {
      const tables = await prisma.$queryRawUnsafe<{ table_name: string }[]>(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name != '_migrations' ORDER BY table_name`
      );
      const tableInfo = await Promise.all(
        tables.map(async (t) => {
          const countResult = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
            `SELECT COUNT(*)::bigint as count FROM "${t.table_name}"`
          );
          return { name: t.table_name, rows: Number(countResult[0]?.count ?? 0) };
        })
      );

      return NextResponse.json({
        status: 'up_to_date',
        applied: [...applied].sort(),
        pending: [],
        tables: tableInfo,
      });
    }

    const results: { name: string; status: string; error?: string }[] = [];

    for (const migration of pending) {
      try {
        const statements = migration.sql
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        for (const stmt of statements) {
          await prisma.$executeRawUnsafe(stmt);
        }

        await prisma.$executeRawUnsafe(
          `INSERT INTO "_migrations" ("name") VALUES ($1) ON CONFLICT DO NOTHING`,
          migration.name
        );
        results.push({ name: migration.name, status: 'applied' });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.push({ name: migration.name, status: 'error', error: msg });
        break;
      }
    }

    const failed = results.some((r) => r.status === 'error');

    return NextResponse.json({
      status: failed ? 'partial' : 'migrated',
      results,
    }, { status: failed ? 207 : 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ status: 'error', error: msg }, { status: 500 });
  }
}
