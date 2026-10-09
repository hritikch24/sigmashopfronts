# Deploy runbook

Code is ready on `uk-relaunch`; `main` is an ancestor, so the merge is a fast-forward.

## Vercel environment variables (Production)

| Variable | Value | When |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.sigmashopfrontshutters.co.uk` | before the deploy |
| `SIGMA_INDEXING` | `on` | only once `pendingFacts` in `lib/business.ts` is empty — the build refuses otherwise |
| `SIGMA_INDEXNOW_KEY` | `393e04ceb0499919961a6125ffebdd68` | any time; served at `/indexnow.txt` |
| `NEXT_PUBLIC_SIGMA_GSC_VERIFICATION` | the token from Search Console's *HTML tag* method | only if verifying a URL-prefix property; a Domain property uses a DNS TXT record instead |
| `NEXT_PUBLIC_SIGMA_BING_VERIFICATION` | Bing's `msvalidate.01` token | optional |
| `NEXT_PUBLIC_SIGMA_GTM_ID` / `_GA4_ID` / `_ADS_ID` | Sigma's own IDs | when created — never another site's |

Existing variables (`DATABASE_URL`, `ADMIN_API_KEY`, `RESEND_API_KEY`, `TELEGRAM_*`) stay as they are.
`NEXT_PUBLIC_*` values are baked in at build time: change one, then redeploy.

## Domains (Vercel → Project → Settings → Domains)

- Add `www.sigmashopfrontshutters.co.uk` (primary) and `sigmashopfrontshutters.co.uk`. `proxy.ts` 301s the bare
  domain to `www` itself, so either Vercel setting works.
- Keep `www.sigmashopfronts.com` and `sigmashopfronts.com` attached as **normal** domains, not redirect domains:
  `proxy.ts` gives them the mapped 301s and 410s. A Vercel redirect domain would blanket-redirect the 574 matrix URLs.
- DNS on the .co.uk: the records Vercel shows (typically `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com`),
  plus the Search Console TXT record. Do not touch the .com DNS — its MX records carry `sales@sigmashopfronts.com`.

## Order

1. Owner signs off `/costs` prices and the legal pages → remove them from `pendingFacts`.
2. Search Console: Domain property for `sigmashopfrontshutters.co.uk` (TXT record). No Change of Address.
3. Domains + DNS as above; wait for "Valid Configuration" and SSL.
4. Set the environment variables; merge `uk-relaunch` into `main` and push.
5. `npm run test:smoke`, then `npm run indexnow` (with `SIGMA_INDEXNOW_KEY` set locally), then submit
   `https://www.sigmashopfrontshutters.co.uk/sitemap.xml` in Search Console.
6. Point any Google Ads final URLs at the new domain.
