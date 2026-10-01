> **Read `PORTFOLIO-HANDOFF.md` in this repo first.** It carries the
> cross-site state as of 1 Oct 2026: the live deploy hold, open actions,
> and the things already ruled out so they are not re-proposed.
> Evidence lives in `docs/portfolio/`.

# Sigma Shop Fronts — agent notes

Next.js 16 App Router · TypeScript · Tailwind v4 · Prisma + PostgreSQL · Vercel
(auto-deploys from `main`).

**Live:** https://www.sigmashopfronts.com
**Theme:** Dark, cyan/violet accent
**Phone:** 07397 066538 · **Base:** 4 Thornwood Close, Oldbury, B68 9LX
**Instagram:** instagram.com/sigmashopfrontsuk · Company No. 16794487

**Positioning:** Aluminium, glass and shutter servicing. Birmingham repairs within 50 miles; projects UK-wide.

This file exists so an agent does not have to re-derive the same context from
the code every session. It is the shared spine plus this site's specifics —
read it before touching anything.

## Before you change anything

```bash
npm run test          # contamination + sanity + smoke
```

`npm run build` runs `prisma db push` first and needs a live `DATABASE_URL`.
To build locally without a database:

```bash
DATABASE_URL="postgresql://u:p@localhost:5432/noop" npx next build
```

Three suites, and they exist because each caught a real bug that reached
production:

| Suite | Catches |
|---|---|
| `test:contamination` | A sibling's brand, phone or asset path copied into this repo |
| `test:sanity` | Dead internal links, doubled brand suffixes, bad canonical, contrast |
| `test:smoke` | Live production checks — sitemap size, locked endpoints, own phone |

`test:smoke` hits **production**, so it reflects the deployed site, not your
working tree. A sitemap count that disagrees with your local build usually
means the deploy has not landed yet, not that you broke something.

## Hard rules

**1. Never mix this site with its siblings.** Three separate repos, three
separate brands, one shared codebase lineage:

| Repo | Brand | Domain |
|---|---|---|
| `grewal-shopfronts` | Grewal Shopfront & Shutters | grewalshopfrontandshutters.co.uk |
| `sigmashopfronts` | Sigma Shop Fronts | sigmashopfronts.com |
| `Urban-shopfronts-limited` | Urban Shopfronts | urbanshopfronts.co.uk |

Code gets copied between them, and that is how branding leaks — a file lifted
from a sibling carries its phone number, domain, asset paths and localStorage
keys. `tests/site-config.mjs` lists every marker string; keep it in sync across
all three, and only `SITE` should differ.

This applies to comments too. A sibling brand name in a code comment has
already failed this test once and required a follow-up push.

**2. Never touch the logo.** Asset paths and logo files are per-site and have
been broken by copying before.

**3. Do not add programmatic pages.** See the history section below.

**4. Do not fabricate structured data.** No `aggregateRating` without real
reviews. `sameAs` entries must be live URLs — four fabricated profile links
were found and removed in Sept 2026, including a `g.co/kgs/` link that could
never have existed, and a sibling's Google profile declared on the wrong site.
Anything you add to `sameAs` should be fetched and checked first.

**5. Small, verifiable changes.** The owner's standing instruction: *"If you
think we shouldn't make changes daily don't make them."* Traffic here is real
revenue. Prefer leaving a working site alone over an unproven improvement.

## The history that explains the code

**The duplicate cluster.** All three sites published the same
`services x cities` cross-product at the same URL paths under different
brands — 574 pages each, ~87% of each sitemap. Measured 8-gram shingle
overlap: **84% of one site's phrasing also appeared on a sibling.**

On **21 August 2026** Google delisted Sigma's entire cross-product.
Impressions went 1,091 to 43 overnight. Hand-written pages were untouched.
No manual action, no security issue — a scaled-content classifier.

This is why the constant below exists, why new services do not automatically
get city pages, and why "add 400 more location pages" is the wrong instinct
on any of these three sites.

**Diagnose from daily data, never 24-hour or 28-day totals.** The collapse was
a single-day cliff. In a 28-day average it looked like gradual decline, which
points at completely the wrong fix.

**The real constraint is backlinks, not pages.** Six external links across
eight domains, none editorial. More pages rank where the last ones did —
position 25 to 64. Content work does not move this; directories,
accreditation bodies, local press and main-contractor case studies do.

## Gotchas that have cost time

**Next.js metadata merging.** Raw `<meta>` tags in `<head>` **append**;
`metadata.other` **merges by key**. Geo tags were hardcoded in `<head>`, so
city pages shipped two conflicting locations. They live in `metadata.other`
now — keep them there.

**`title.template` does not apply to the segment that defines it.** The root
layout's `default` must spell out the brand itself.

**`dynamicParams = false`** means any path not in `generateStaticParams` is a
hard 404, not a soft fallback. Any link you add to a service/city combination
must correspond to a generated param or the sanity suite will fail.

**`grep -c` counts lines, not occurrences.** Next's RSC payload repeats strings,
so a rendered page can look wrong when it is fine. Check the actual `<meta>`.

**BSD `sed` has no `\?`.** Use `grep -oE` on macOS.

## Analytics

A metrics dashboard aggregating all three sites lives at
`~/Projects/shopfront-metrics` (`npm start`, localhost:8787). Zero
dependencies. It reads each site's `/api/metrics` with the site's
`ADMIN_API_KEY`.

### Site-specific notes

- **`INDEX_SERVICE_CITY_PAGES = false`** in `app/services/[slug]/[city]/page.tsx`
  is the retirement switch. It applies `robots: { index: false, follow: true }`
  to all 574 service x city pages. This is the fix for the August 2026
  delisting. **Do not flip it back on** without a deliberate decision — it is
  working, and 90 pages now sit correctly under "Excluded by noindex".
- `app/sitemap.ts` dropped the cross-product: 654 to 80 URLs.
- `app/sitemap-retire.xml/route.ts` exists so Google recrawls the retired URLs
  and sees the noindex. Its `lastmod` is a **fixed date string** — it was
  regenerating daily, which told Google the pages changed every day.
- Title qualifier is `' | Made & Fitted'`.
- **Live commercial thread:** pricing for the Boots Primary Contractor
  Framework via H&J Martin Fit Out (Belfast). SOR draft at
  `~/Desktop/Sigma-Boots-SOR-Rates.csv`, 42 line items, awaiting Sigma
  commercial sign-off. Open question is whether the framework's PI £10m /
  PL £20m insurance limits flow down to subcontractors.

## Current state

- 14 services in `data/services.ts`, 41 cities in `data/cities.ts`
- Deploys on push to `main`; Vercel builds run `prisma db push`, so nullable
  schema columns apply automatically
- Repo is **public** on GitHub

## Open work across all three sites

- Body-copy rewrite per specialism — the real fix for the remaining
  duplication, and the one thing that would let all three rank independently
- Backlink building — the binding constraint, and nothing else moves it
- ~20 byte-identical photographs are shared across all three domains

---

# Update — 1 October 2026

Everything below was established after this file was first written and is not
reflected above. Supporting detail lives in `~/Projects/seo-plan/`.

## The August delisting has a confirmed cause

**Google's August 2026 spam update completed on 21 August 2026** — the exact
day Sigma's cross-product was delisted. It targeted **scaled content abuse**:
programmatic pages, AI-generated pages at scale, pages built mainly to rank.
A SpamBrain enforcement pass on existing policy, global, all languages.

574 templated city x service pages with 84% shared phrasing across three
domains is a textbook match. The diagnosis is no longer inference from a
traffic shape; the date and the target both line up.

## A spam update is rolling right now

**September 2026 spam update: started 24 September, roughly two weeks**, so it
lands around 8 October. Google has not said what it targets.

**Hold every deploy until the Search Status Dashboard marks it complete** —
not a fixed date, the dashboard. Shipping mid-rollout means any movement is
unattributable. Draft on a branch; do not push.

## Search Console review found no cross-site duplication

Read-only review of all three properties, 27-28 September
(`seo-plan/gsc-review.md`):

| | Pages in any duplicate bucket |
|---|---|
| Urban | 0 |
| Sigma | 0 |
| Grewal | 0 city pages (its 41 are legacy `.php`) |

Top-10 query lists across the three share exactly one term ("shopfronts").
The sites are **not** cannibalising each other. The problem is position
(26 / 32 / 52), not suppression — and a 301 carries the ranking assessment
with it, so **moving URLs does not reset anything**. A URL restructure was
proposed and dropped on this evidence.

Competitor check: `/services/{service}` is the industry-standard pattern —
shopfrontsbirmingham.co.uk uses the same shape. The URL structure is normal.
What no competitor does is a 574-page city x service cross-product.

## The portfolio is now five sites, not three

`~/Projects/seo-plan/portfolio-registry.json` is the authority, and
`PORTFOLIO-RULES.md` governs additions. Added since this file was written:
`safe-and-secure-shopfront-shutters` and `highstreet-shopfronts`. Check any
new site against every registry entry before launch.

## Sigma-specific — the domain move is now prepared in code

Sigma is expected to move to **sigmashopfrontshutters.co.uk** keeping the same
paths. That is now a one-line change rather than a 45-file edit.

**`lib/site.ts` is the single source of truth for the origin.** It exports
`SITE_URL` (and `SITE_HOST`), reading `NEXT_PUBLIC_SITE_URL` with the current
production origin as fallback. 151 hardcoded origins across 37 files were
replaced — canonicals, og:url, JSON-LD `@id`, sitemap, IndexNow and the HTML
email templates all derive from it now.

**Nothing else may hardcode the domain.** The sanity suite enforces this: it
checks the fallback in `lib/site.ts` and fails if `app/layout.tsx` reintroduces
a literal origin (scoped to this site's own domain, so GTM and Instagram pass).

Verified by building twice — at the default the output is byte-identical
(all 80 sitemap URLs unchanged); with `NEXT_PUBLIC_SITE_URL` set to the future
domain, every canonical, `@id` and sitemap entry switches.

**Email addresses were deliberately left hardcoded.** `sales@` and `noreply@`
are a mail-hosting decision, not a site-origin one.

**This work sits on branch `site-url-config` and is NOT pushed.** It is held
behind the September spam update. To ship the domain move later: set
`NEXT_PUBLIC_SITE_URL` in Vercel and add a path-preserving 301 from the .com.

### Why the move, and why not both domains

The owner's reasoning, in his words: `.co.uk` is native to the UK, and the
current `.co.uk` runs on a template that will not help SEO, so this Next.js
build should move onto it. The `.co.uk` is controlled by a different team —
part of the analysis was to give him a concrete argument for taking it over.

**Running both domains in parallel is the thing to avoid.** Two domains serving
the same business, same content, same contact email is the clearest duplicate
signal there is — and this portfolio has already lost 574 pages to a
duplicate-content enforcement pass. One domain, path-preserving 301 from the
other. Never both.

**Execution order, once the spam update has finished:**

1. Push `site-url-config`.
2. Set `NEXT_PUBLIC_SITE_URL=https://sigmashopfrontshutters.co.uk` in Vercel.
3. Add the domain in Vercel, point DNS.
4. **Path-preserving 301** from every `.com` path to the same path on the new
   domain. Never redirect everything to the homepage.
5. Add the new domain as a GSC property, use the Change of Address tool.
6. Keep the 301s permanently. Do not let the `.com` serve content again.

Expect a few weeks of fluctuation. If the city-page rewrite is also planned,
consider doing both in one move rather than two separate disruptions.

