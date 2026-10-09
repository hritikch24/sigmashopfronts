/** IndexNow key file. The key is this site's own, from the environment. */
export function GET() {
  const key = process.env.SIGMA_INDEXNOW_KEY?.trim();
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) return new Response('Not found', { status: 404 });
  return new Response(key, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
