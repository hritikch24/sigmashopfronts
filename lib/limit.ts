/**
 * Small per-instance rate limiter. Serverless instances do not share memory,
 * so this blunts bursts from one client rather than enforcing a hard quota.
 */
const buckets = new Map<string, { n: number; reset: number }>();

export function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now >= b.reset) {
    buckets.set(key, { n: 1, reset: now + windowMs });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (now >= v.reset) buckets.delete(k);
    return false;
  }
  b.n += 1;
  return b.n > max;
}

export function clientKey(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}
