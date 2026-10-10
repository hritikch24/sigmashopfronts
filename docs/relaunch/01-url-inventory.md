# Sigma relaunch: URL inventory and migration classification

Status: **classification written before any redirect code** (brief §4).
Branch: `uk-relaunch` (cut from `sigma-relaunch`, which already contains `site-url-config`).
Old host: `www.sigmashopfronts.com` (+ apex). New host: `sigmashopfrontshutters.co.uk`.

## Where the inventory came from

| Source | URLs |
|---|---|
| Live `https://www.sigmashopfronts.com/sitemap.xml` (fetched 9 Oct 2026) | 80 |
| Live `https://www.sigmashopfronts.com/sitemap-retire.xml` | 574 |
| Live redirect `/blog/shopfront-installation-cost-uk-2025` (307 → 2026) | 1 |
| Private/business paths in `app/` on `main` | 4 patterns |
| **Total public URLs** | **655** |

**Correction to the brief.** The matrix is **14 services × 41 cities = 574**, not
14 × 42 = 588. `main:data/cities.ts` defines 41 cities (`grep -c slug:` returns 42
because the interface declares `slug: string`), and the live retirement sitemap
lists exactly 41 cities under each of the 14 services. Everything below uses 574.

## Three buckets

### 301 → keep (mapped one by one, no wildcards)

The page *intent* carries over. The **content does not**: every destination is
rewritten from scratch and must pass the originality gate (§7 of the brief) like
everything else. Destination paths differ from the brief where the brief's path
is already used by a sibling (see "Paths changed from the brief" below).

| Old path | New path | Note |
|---|---|---|
| `/` | `/` | |
| `/about` | `/company` | |
| `/contact` | `/enquire` | |
| `/cost-guide` | `/costs` | |
| `/faq` | `/questions` | questions rewritten around consent, grants and enforcement |
| `/glossary` | `/shopfront-anatomy` | rewritten as the named parts of a shopfront, the vocabulary a conservation officer uses |
| `/privacy-policy` | `/privacy` | |
| `/terms` | `/terms-of-business` | |

### 410 Gone → removed on purpose

`410`, never a redirect to a hub (a hub redirect is a soft 404).

| Old path(s) | Count | Why |
|---|---|---|
| `/services/[service]/[city]` | **574** | the scaled-content cluster Google delisted on 21 Aug 2026 |
| `/blog` and `/blog/*` (10 live + 1 redirecting) | 12 | every slug is shared with two siblings; replaced by new topics, not moved |
| `/reviews` | 1 | built on fabricated reviews (removed on `sigma-relaunch`); nothing to carry |
| `/why-choose-us` | 1 | shared template page |
| `/instant-quote` | 1 | shared template tool, replaced by `/frontage-check` (a different tool, not a successor) |
| `/gallery` | 1 | its photographs are byte-identical to sibling sites; `/jobs` is a new page with only Sigma's own photos, so not a successor |

### Rewrite before carrying across (moves only if it passes the gate)

| Old path | New path | Condition |
|---|---|---|
| `/services` | `/shopfronts` | rewritten |
| `/services/aluminium-shopfronts` | `/shopfronts/aluminium` | rewritten, gate < 20% |
| `/services/roller-shutters` | `/shopfronts/roller-shutters` | 〃 |
| `/services/security-doors` | `/shopfronts/security-doors` | 〃 |
| `/services/automatic-doors` | `/shopfronts/automatic-doors` | 〃 |
| `/services/bi-fold-doors` | `/shopfronts/folding-doors` | 〃 |
| `/services/fire-doors` | `/shopfronts/fire-doors` | 〃 |
| `/services/shopfront-repairs` | `/shopfronts/repairs` | 〃 |
| `/services/emergency-callout` | `/shopfronts/emergency-repairs` | 〃 — and the "24/7 rapid response" claim does not survive; the promise is a two-hour **reply** |
| `/services/shutter-repair` | `/shopfronts/shutter-repairs` | 〃 |
| `/services/glass-replacement` | `/shopfronts/glass-replacement` | 〃 |
| `/services/aluminium-doors` | `/shopfronts/aluminium-doors` | 〃 |
| `/services/aluminium-windows` | `/shopfronts/aluminium-windows` | 〃 |
| `/services/curtain-walling` | `/shopfronts/curtain-walling` | 〃 |
| `/services/glass-shopfronts` | `/shopfronts/frameless-glass` | 〃 |
| `/areas` | `/planning` | rewritten |
| `/areas/[city]` (41) | `/planning/[authority]` | **only** where the authority page exists — i.e. we can say something true and specific about that council, with a source. Otherwise **410**. Final per-city list: `02-authority-outcomes.md`. |

`/areas/london` → **410**. London is 33 planning authorities, not one; a single
"London" planning page would have to generalise, which is the failure mode.

### Private and business paths (not content)

| Path | Old host | New host |
|---|---|---|
| `/quote/[id]`, `/invoice/[id]` | path-preserving 308 to the new host — customers hold these links | served, `noindex`, unchanged |
| `/admin/*`, `/metrics/*` | path-preserving 308 | served, 404 without key, `X-Robots-Tag: noindex, nofollow` |
| `/api/*` | path-preserving 308 | served |
| `/assets/*` (images) | path-preserving 301; files deleted for being shared with siblings then 404 on the new host | |

**Anything else on the old host → 410.** No catch-all redirect to the homepage.

On the **new** host the same table applies to legacy paths: `/about` 301s to
`/company`, and every matrix path returns 410. So a stray legacy link to the
new domain behaves exactly like one to the old domain.

## The WordPress site that held the .co.uk

Before this build, `sigmashopfrontshutters.co.uk` ran a separate WordPress site (Astra/Elementor, Namecheap
hosting). Its `wp-sitemap.xml`, read 10 October 2026, listed 24 pages on the bare domain with trailing slashes.
`WORDPRESS_MOVED` / `WORDPRESS_GONE` in `lib/legacy-urls.ts` answer every one in a single hop: `proxy.ts` sends
the bare domain and a trailing slash straight to the final URL (Next's own slash redirect is off for this).

- **301 (19):** each to the page doing the same job, e.g. `/about-us/` → `/company`, `/bi-fold-doors/` →
  `/shopfronts/folding-doors`, motor, servicing and repair pages → `/shopfronts/shutter-repairs`, emergency
  pages → `/shopfronts/emergency-repairs`, electric, installation, conversion and security-shutter pages →
  `/shopfronts/roller-shutters`.
- **410 (4):** `/upvc-door/`, `/composite-door/`, `/house-window-installed/` (domestic work this site does not
  offer) and `/industrial-shutters/` (no industrial page). Not redirected to a near miss — that is a soft 404.
- **410, machinery:** `/wp-*` (sitemaps, admin, assets), `/elementor-hf/*`, `/author/*`, `/feed`, `/xmlrpc.php`.

## Paths changed from the brief, with evidence

The brief pinned `/repairs`, `/repairs/[area]`, `/guides/[slug]`, `/our-work`,
`/prices`, `/the-firm` and `/talk-to-us`. **Every one of those is already
registered to another site in the portfolio** (`seo-plan/portfolio-registry.json`,
the `highstreet` entry's `publicUrlScheme`). PORTFOLIO-RULES §2 (which overrides the brief)
makes the URL scheme per-site unique, and `check-portfolio.mjs` fails on a
shared route pattern. Renamed:

| Brief | Used here | Already used by (registry key) |
|---|---|---|
| `/repairs`, `/repairs/[area]` | `/repair-radius`, `/repair-radius/[town]` | `highstreet` |
| `/guides/[slug]` | `/explained/[slug]` | `highstreet` |
| `/our-work` | `/jobs` | `highstreet` |
| `/prices` | `/costs` | `highstreet` |
| `/the-firm` | `/company` | `highstreet` |
| `/talk-to-us` | `/enquire` | `highstreet` |

Kept as pinned (verified free in the registry and every sibling's `app/`):
`/shopfronts/[service]`, `/planning/[authority]`, `/planning/conservation-areas`,
`/grants`, `/frontage-check`.

## Search Console

Brief §4 says **do not** use Change of Address. `SESSION-HANDOFF.md` §6 says to
use it. The brief is the newer instruction, and I agree with it: Change of Address
exists to transfer the old property's site-level signals, and the old property's
site-level history now includes a scaled-content classification. Verify the new
property separately; let it earn its own history. The 301s above still pass
page-level signals for the eight kept pages, which is what we want to keep.
