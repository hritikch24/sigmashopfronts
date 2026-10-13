# Sigma Shopfronts — agent notes

Next.js 16 App Router · TypeScript · Tailwind v4 · Prisma + Postgres · Vercel (auto-deploys from `main`).

**Domain:** `www.sigmashopfrontshutters.co.uk` (from `NEXT_PUBLIC_SITE_URL`, fallback in `lib/site.ts`).
**Old domain:** `www.sigmashopfronts.com` — serves nothing; `proxy.ts` answers every request with a mapped 301 or a 410.
**Legal entity:** Sigma Shopfronts and Shutter Limited, Companies House 16794487, incorporated 19 Oct 2025.
**Phones:** 07414 779594 · 07397 066538 (WhatsApp). **Registered office:** Oldbury, B68 9LX.
**Email:** `sales@sigmashopfronts.com` — mail stays on the old domain by the owner's choice; site notifications send from `noreply@sigmashopfronts.com`. Never let `sigmashopfronts.com` lapse.
**Promise:** repairs within 100 road miles of Birmingham; "we reply to emergency repair calls within two hours and come out the same day". Free quotation and free site visit. All three confirmed by the owner on 11 Oct 2026 (`lib/business.ts`). **Not** confirmed: 24/7 cover, guarantees — the sanity suite still rejects both.

Cross-site state, the portfolio rules and every other site's fingerprint live in `~/Projects/seo-plan/`
(`PORTFOLIO-RULES.md`, `portfolio-registry.json`, `SESSION-HANDOFF.md`). Read them before changing anything here.
The relaunch reasoning is in `docs/relaunch/`.

## What the site is

A planning-led shopfront site. The commercial pages exist, but the reason the site is different is the data:

| Path | Built from |
|---|---|
| `/frontage-check` | `lib/frontage.ts` (pure function) + `components/site/FrontageCheck.tsx` |
| `/planning/[authority]` (19) | `data/authorities.ts` — every point cited to a council document, with the date read |
| `/grants` | `grants` in `data/authorities.ts` — only verified, dated schemes, open or closed as published |
| `/shopfronts/[service]` (18) | `data/shopfronts.ts` |
| `/explained/[slug]` (6) | `data/explainers.ts` |
| `/repair-radius/[town]` (34) | `data/towns.ts` |
| `/questions`, `/costs`, `/jobs` | `data/questions.ts`, `data/costs.ts`, `data/jobs.ts` |

All business facts: `lib/business.ts`. All metadata and JSON-LD: `lib/seo.ts`. Nothing else writes a canonical,
a robots directive or a schema.org object.

## Hard rules

1. **No `services × locations` matrix, at any path depth.** The old one (574 pages) was delisted by Google's
   August 2026 spam update. It returns 410 now and must never come back.
2. **No council page without a source.** An authority gets a page only if we fetched and read its current
   guidance. No inferring policy from a neighbouring council. A draft is called a draft.
3. **The frontage check never says consent is unnecessary**, never states policy for a council we hold no data
   on, never mentions a grant without a dated source, and gives the answer before asking for contact details.
   `npm run test:frontage` enforces all four across 2,520 combinations.
4. **Nothing fabricated**: no ratings, review counts, years trading, project counts, accreditations, named
   clients or case studies. The company is under a year old. 113 fabricated testimonials were removed in
   Sept/Oct 2026; do not reintroduce any in any form, including in the admin AI prompts (`lib/sales-facts.ts`).
5. **Never touch the logo files.** `tests/logo-hashes.json` pins all 12; the sanity suite fails on any change.
6. **Never mix with the other sites.** No shared copy, components, photos, phones, tracking IDs or URL patterns.
   `tests/contamination.test.mjs` and `~/Projects/seo-plan/check-portfolio.mjs` both enforce this. Refer to other
   sites by registry key in docs; their brand or domain in this repo fails the checks.
7. **Originality gate:** every built page under 20% 8-gram overlap against all other sites and against every
   other page here. `npm run gate`; report in `docs/relaunch/originality-report.md`.
8. **Launch hidden.** Indexing is off unless `SIGMA_INDEXING=on`. The prebuild launch gate fails if it is on
   while `pendingFacts` in `lib/business.ts` is not empty. While held, the sitemap is empty.

## Plain English

Many customers are shop owners and staff who speak English as a second language. Write so they understand on
first reading: short sentences (the sanity suite fails any over 32 words on customer pages), everyday words
("quote" not "quotation", "shop" not "premises" or "frontage", "typical prices" not "indicative"), and explain
a trade word the first time it appears ("laminated glass (it holds together when broken)"). English only — no
translated pages. Council policy wording on `/planning` and `/explained` stays accurate to the source, but the
sentences around it follow the same rule.

## Commands

```bash
npm test                     # contamination + frontage guardrails + sanity (needs a build)
npm run gate                 # per-page originality gate (needs a build)
npm run gate:snapshot        # refresh scripts/sibling-shingles.json after another site changes
npm run test:links           # every external URL and sameAs returns 200 (network)
DATABASE_URL="postgresql://u:p@localhost:5432/noop" npx next build   # local build without a DB
```

On Vercel, `npm run build` runs the launch gate, `prisma db push` (without `--accept-data-loss` — a destructive
schema change now fails the build instead of dropping the leads table), `next build`, the originality gate
against the hashed sibling snapshot, and the sanity suite.

## Deploying

Runbook, environment variables and DNS: `docs/relaunch/06-deploy.md`. Preview hosts (`*.vercel.app`) always
get `X-Robots-Tag: noindex`; the bare new domain 301s to `www` in `proxy.ts`.

## Gotchas

- `proxy.ts` is Next 16's middleware. It holds the legacy map (`lib/legacy-urls.ts`) and the admin lock.
- `title.template` does not apply to the segment that defines it; `pageMeta()` passes `{ absolute }` for `/`.
- Headless Chrome will not lay out narrower than 500 px; use CDP device emulation to test 390 px.
- Private tools (`/admin`, `/metrics`, `/quote/[id]`, `/invoice/[id]`) keep the old colour tokens and Tailwind in
  `app/private.css`. Public pages load only `app/site.css` (no Tailwind utilities) and the `.public` wrapper.
- `/quote/[id]` and `/invoice/[id]` links are held by customers; the old host redirects them path-preserved.

## Still owed (see `pendingFacts` and `followUps` in lib/business.ts)

Indexing went on 11 Oct 2026 (prices and legal pages approved; `pendingFacts` is empty).
Still owed: Sigma's own GA4 property (`NEXT_PUBLIC_SIGMA_GA4_ID`) and IndexNow key. Ads conversions are GA4 key events
(`call_click`, `whatsapp_click`, `generate_lead`, sent from `lib/measure.ts`) imported into Google Ads; the GA4 tag
loads with Consent Mode (denied until the visitor says yes). Never put the Ads account's AW- tag on this site: the
account also runs another firm's campaigns. Real case studies (town, shop type, what was fitted, when) would strengthen
`/jobs` — only with the client's agreement.

## External consumer: the lead hub

`~/Projects/lead-hub` reads this site in production. It is not part of this
repo and this repo does not know about it at runtime, but **three things here
are now a contract**:

- `GET /api/leads?status=new` — the hub's queue
- `PATCH /api/leads/:id` with `{ status }` — how Telegram buttons write back
- `POST /api/ai/lead-reply` — how drafts are generated
- `ADMIN_API_KEY`, sent as `Bearer <key>nimda`

The status vocabulary `new → contacted → quoted → won → lost` is shared with
the hub's buttons. Renaming a status, changing the auth scheme or moving these
routes breaks it **silently** — the hub just stops posting.

`~/Projects/shopfront-metrics` depends on `/api/metrics` the same way. If you
change either contract, update both and say so in the commit.
