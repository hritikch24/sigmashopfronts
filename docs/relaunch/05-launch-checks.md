# Launch checks (brief §10)

Run on 10 October 2026 against a local production build of branch `uk-relaunch`. **Not deployed.**

| Check | Result | How |
|---|---|---|
| 8-gram overlap under 20% against every other site, per page | **Pass — worst 1.0%** (85 pages) | `npm run gate` → `originality-report.md` |
| 8-gram overlap under 20% against every other page here | **Pass — worst 15.2%** | same |
| `seo-plan/check-portfolio.mjs` | **Sigma passes**: nothing shared with `safeandsecure` or `highstreet`; with `urban`/`grewal` only private tooling remains (known); Sigma’s gate passes. The run still exits 1 on 12 **pre-existing** ties between `safeandsecure` and the two older sites (see below). | `node seo-plan/check-portfolio.mjs` |
| No fabricated claim in copy, schema or metadata | **Pass** | `test:sanity` pattern scan of every built page + JSON-LD; admin AI prompts rewritten (`lib/sales-facts.ts`) |
| Frontage check never asserts consent is unnecessary; never states an unsourced grant | **Pass — 2,520 combinations** | `npm run test:frontage` |
| Every `sameAs` and external URL returns 200 | **Pass — 28/28** | `npm run test:links` |
| No tracking ID, phone, address or database shared with another site | **Pass** for tracking (shared Ads tag `AW-16801337867` removed; none hardcoded), phones, address. Database: separate per site as far as this repo can show; model names are shared with the old template (see “still shared”). | `test:sanity`, `test:contamination` |
| Sitemap lists only indexable pages; no matrix page reachable; old paths 410 | **Pass** — sitemap empty while held at noindex, 85 paths once indexing is on; 574/574 matrix URLs → 410 on both hosts; 42 one-to-one 301s, no chains | `test:sanity`, curl against `next start` |
| Logo files byte-identical | **Pass — 12/12** | `tests/logo-hashes.json` |
| Core Web Vitals on mobile | **Pass in lab** — see table | Lighthouse 12, DevTools throttling (slow 4G, 4× CPU), median of 3 |
| Build and sanity suite pass | **Pass** | `npm test`, `next build` |
| No horizontal overflow at 390 px | **Pass — 85/85 pages** | CDP device emulation |
| Accessibility | **100** on all pages measured | Lighthouse |

## Core Web Vitals (lab, mobile)

| Page | Perf | A11y | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|
| `/` | 100 | 100 | 1.48 s | 0 | 0 ms |
| `/frontage-check` | 99 | 100 | 1.66 s | 0 | 0 ms |
| `/planning/birmingham` | 100 | 100 | 1.35 s | 0 | 3 ms |
| `/planning/york` | 100 | 100 | 1.35 s | 0 | 1 ms |
| `/shopfronts/aluminium` | 100 | 100 | 1.35 s | 0 | 2 ms |
| `/jobs` | 100 | 100 | 1.56 s | 0 | 6 ms |
| `/explained/advertisement-consent` | 100 | 100 | 1.32 s | 0 | 0 ms |
| `/repair-radius/dudley` | 100 | 100 | 1.33 s | 0 | 0 ms |
| `/questions` | 100 | 100 | 1.33 s | 0 | 0 ms |
| `/costs` | 100 | 100 | 1.33 s | 0 | 0 ms |

Lab figures from a local server. Field data (CrUX) only exists once the domain has traffic. Best practices 96: the
only failing audit is a console error from `/api/visit`, which has no database locally. SEO 69: `is-crawlable`,
because the site is deliberately `noindex` until launch.

What it took: self-hosted fonts with `display: optional` (a late font swap was setting LCP), public pages split
from the private tools’ Tailwind stylesheet (61 KB → 16 KB CSS), no Suspense swap on the frontage check (CLS 0.18 → 0).

## Still shared with the older template sites (known, private)

Admin, metrics, quote and invoice pages and their API paths (`/api/leads`, `/api/metrics`, `/api/ai/*`,
`/api/admin/*`) and Prisma model names come from the shared template. They are not public content. Renaming them is
a separate job: customers hold quote/invoice links, the metrics dashboard in `~/Projects/shopfront-metrics` reads
`/api/metrics`, and renaming models under `prisma db push` would drop the leads table.

## Found in other repos (read-only — not touched)

- `safeandsecure` publishes `/services`, `/services/[slug]`, `/about`, `/contact`, `/gallery` and `/api/contact` — the
  same patterns as `urban` and `grewal`. These are the 12 remaining portfolio-check failures.
- `urban` and `grewal` still publish the same 574-page `services × cities` matrix that was delisted on Sigma.
