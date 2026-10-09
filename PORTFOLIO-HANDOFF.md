# Portfolio handoff — Sigma

Cross-site state is kept in one place, `~/Projects/seo-plan/` (`SESSION-HANDOFF.md`, `PORTFOLIO-RULES.md`,
`portfolio-registry.json`). This file only records what is specific to Sigma, so the two cannot drift apart.

## State as of 10 October 2026

- The UK relaunch is built on branch `uk-relaunch` (cut from `sigma-relaunch`, which contains
  `site-url-config`). **Not merged, not pushed, not deployed.**
- Decisions and evidence: `docs/relaunch/` — URL inventory and 301/410 classification, authority outcomes,
  frontage-check model, design direction, originality report, final checks.
- The September 2026 spam update showed a 13-day duration from 24 September on the Search Status Dashboard when
  checked on 9 October, without an explicit "complete" label. Confirm it is marked complete before deploying.

## Before deploying

Full runbook: `docs/relaunch/06-deploy.md`.

1. Owner signs off the `pendingFacts` in `lib/business.ts`. Email stays `sales@sigmashopfronts.com` (decided 10 Oct 2026), so keep the .com domain and its mail records.
2. Add `sigmashopfrontshutters.co.uk` (and `www.`) to the Vercel project; keep `sigmashopfronts.com` attached
   so `proxy.ts` can answer it with 301/410. Set `NEXT_PUBLIC_SITE_URL`.
3. Verify the new domain as its **own** Search Console property. Do not use Change of Address
   (reasoning in `docs/relaunch/01-url-inventory.md`).
4. Only then set `SIGMA_INDEXING=on`.
