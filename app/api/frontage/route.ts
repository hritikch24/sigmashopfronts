import { NextRequest, NextResponse } from 'next/server';
import { authorityForDistrict, nationFromCountry } from '@/lib/frontage';
import { clientKey, limited } from '@/lib/limit';

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

/**
 * Resolves a postcode to its council using postcodes.io (open data, no key).
 * The postcode is not stored or logged.
 */
export async function GET(req: NextRequest) {
  if (limited(`pc:${clientKey(req.headers)}`, 30, 60_000)) {
    return NextResponse.json({ error: 'Too many lookups — try again in a minute.' }, { status: 429 });
  }
  const pc = (req.nextUrl.searchParams.get('postcode') ?? '').trim().toUpperCase();
  if (!POSTCODE.test(pc)) return NextResponse.json({ error: 'That does not look like a UK postcode.' }, { status: 400 });
  try {
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc.replace(/\s+/g, ''))}`, {
      next: { revalidate: 86_400 },
    });
    if (r.status === 404) return NextResponse.json({ error: 'We could not find that postcode.' }, { status: 404 });
    if (!r.ok) throw new Error(`postcodes.io ${r.status}`);
    const { result } = await r.json();
    const district: string = result?.admin_district ?? '';
    const country: string = result?.country ?? '';
    return NextResponse.json({
      district,
      nation: nationFromCountry(country),
      authority: district ? authorityForDistrict(district) : null,
    });
  } catch (err) {
    console.error('[frontage] lookup failed', err);
    return NextResponse.json({ error: 'Postcode lookup is unavailable. Choose your council from the list instead.' }, { status: 502 });
  }
}
