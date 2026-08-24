import { NextRequest, NextResponse } from 'next/server';

/**
 * Email delivery health check.
 *
 *   GET /api/health/email?key=<ADMIN_API_KEY>
 *
 * Answers the question "will the instant estimate actually reach the customer
 * on this site?" without sending anything. Lead and estimate emails are
 * deliberately best-effort — a failure is logged and swallowed so the visitor
 * still gets their number — which means a broken Resend setup is otherwise
 * completely silent.
 *
 * Checks, in order:
 *   1. Is RESEND_API_KEY set at all?
 *   2. Does Resend accept it?
 *   3. Is the domain we send FROM actually verified on that account?
 *
 * Step 3 is the one that catches the common failure: a valid key on an account
 * where only one of the three shopfront domains has been verified.
 */

const FROM_ADDRESS = 'noreply@sigmashopfronts.com';

interface ResendDomain {
  name?: string;
  status?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided =
    new URL(request.url).searchParams.get('key') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!adminKey || provided !== adminKey) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const fromDomain = FROM_ADDRESS.split('@')[1];
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      fromAddress: FROM_ADDRESS,
      keyConfigured: false,
      keyValid: false,
      domainVerified: false,
      verdict: 'RESEND_API_KEY is not set — no estimate or lead emails are being sent.',
    });
  }

  let keyValid = false;
  let domainVerified = false;
  let domains: { name: string; status: string }[] = [];
  let detail = '';

  try {
    const res = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    });

    if (res.status === 401 || res.status === 403) {
      detail = 'Resend rejected the API key.';
    } else if (!res.ok) {
      detail = `Resend returned HTTP ${res.status}.`;
    } else {
      keyValid = true;
      const body = (await res.json()) as { data?: ResendDomain[] } | ResendDomain[];
      const list: ResendDomain[] = Array.isArray(body) ? body : body.data ?? [];
      domains = list.map((d) => ({ name: d.name ?? '', status: d.status ?? 'unknown' }));
      domainVerified = domains.some(
        (d) => d.name === fromDomain && d.status.toLowerCase() === 'verified'
      );
      if (!domainVerified) {
        detail = domains.some((d) => d.name === fromDomain)
          ? `${fromDomain} is on the account but not verified.`
          : `${fromDomain} is not on this Resend account at all.`;
      }
    }
  } catch (err) {
    detail = `Could not reach Resend: ${(err as Error).message}`;
  }

  const ok = keyValid && domainVerified;
  return NextResponse.json({
    ok,
    fromAddress: FROM_ADDRESS,
    keyConfigured: true,
    keyValid,
    domainVerified,
    domains,
    verdict: ok
      ? `Sending from ${fromDomain} is configured correctly.`
      : detail || 'Email is not correctly configured — customers will not receive estimates.',
  });
}
