# Testing runbook

This project is three near-identical Next.js sites that share a codebase lineage:

| Site | Repo | Live |
|---|---|---|
| Grewal Shopfront & Shutters | `grewal-shopfronts` | https://www.grewalshopfrontandshutters.co.uk |
| Sigma Shop Fronts | `sigmashopfronts` | https://www.sigmashopfronts.com |
| Urban Shopfronts | `Urban-shopfronts-limited` | https://www.urbanshopfronts.co.uk |

Because code gets copied between them, the dangerous bugs are **silent** ones —
the site still builds and deploys, it just quietly shows the wrong brand, has
invisible text, or links to pages that do not exist. `next build` catches none
of these. That is what this suite is for.

---

## TL;DR — run this before and after every deploy

```bash
# In each repo, before pushing:
npm run test          # contamination + sanity — must exit 0
npm run build         # must succeed

# After the deploy goes live:
npm run test:smoke    # hits the real site over HTTPS
```

All three commands exit `0` on success and `1` on failure, so they can be wired
into CI or a pre-push hook without further work.

---

## The three test files

Everything lives in `tests/`. There is no test framework and no dependency to
install — they are plain Node scripts and run on any recent Node.

### 1. `npm run test:contamination` — cross-site branding leaks

Scans `app/`, `components/`, `lib/`, `data/` and `scripts/` for any mention of
a *sibling* site's brand name, domain, phone number or WhatsApp number.

**Why this exists:** Sigma's metrics dashboard once shipped titled
"Grewal Metrics" with a broken `/assets/grewal-icon-512.png`, because the file
had been copied from Grewal without swapping the branding. On its first run the
same check also found Grewal's `scripts/index-now.js` pointing at
`www.urbanshopfronts.co.uk`, meaning it would have submitted Urban's URLs.

Words like "suburban" and "urban heat island" appear all through the city copy
and are masked out via `FALSE_POSITIVES` in `tests/site-config.mjs`. Keep that
list tight — every entry is a hole in the check.

### 2. `npm run test:sanity` — static checks, no server needed

| Check | Catches |
|---|---|
| internal links | `href`s pointing at routes that do not exist. 23 of these were live on Grewal's header, footer and homepage at one point. |
| theme contrast | Invisible text. Reads the palette out of `app/globals.css` and computes real WCAG contrast for every `bg-X` / `text-Y` pair. |
| utility classes | `btn-*` / `card-surface` classes used but never defined in `globals.css` — these render as unstyled plain text. |
| sitemap | A public page exists but is missing from `app/sitemap.ts`. |
| page titles | Title already ends with the brand, so the layout template doubles it: "Terms \| Grewal \| Grewal". |
| social titles | `openGraph`/`twitter` titles that *lack* the brand — the template never applies to those. |
| canonical | `siteUrl` in the layout does not match this site's domain. |
| hreflang | A hardcoded `hrefLang` pointing every page at one URL. |

**Why the contrast check computes rather than pattern-matches:** `charcoal` is
`#4A4A4A` (dark) on Grewal but `#e0e6f0` (near-white) on Sigma and Urban. So
`bg-white text-charcoal` is correct on one site and invisible on the other two.
It measured **1.12:1** on Sigma — every contact form on the site had text you
could not see as you typed it.

### 3. `npm run test:smoke` — against the live site

Run **after** deploying. ~30 seconds, 37 checks:

- 18 core pages return `200` (including a service page, an area page and a
  service-city combo page)
- canonicals point at this host, not a sibling's
- no sibling branding rendered on the homepage
- page titles do not contain the brand twice
- `sitemap.xml` reachable and still has 500+ URLs (catches a collapsed sitemap)
- `robots.txt` points at this site's sitemap
- `POST /api/instant-quote` rejects an incomplete payload with `400`
  (validation path only — deliberately creates no lead)
- `/api/metrics` and `/api/admin/documents` return `401`; `/metrics` returns
  `404` without the admin key
- homepage links to `/instant-quote` and shows this site's own phone number

Point it at a preview deploy with `BASE_URL`:

```bash
BASE_URL=https://my-preview.vercel.app npm run test:smoke
```

---

## Adding a fourth site, or changing a phone number

Everything site-specific is in **`tests/site-config.mjs`**. That file is
identical across all three repos apart from one line:

```js
export const SITE = SITES.grewal;   // ← the only line that differs per repo
```

To change a phone number or domain, edit the `SITES` map **in all three repos**
so each site still knows what its siblings look like. If the maps drift, the
contamination check stops catching leaks in the direction that drifted.

---

## Instructions for an AI assistant picking this up cold

You have no prior context. Do this:

1. **Run the suite in all three repos first.** Do not assume the working tree is
   clean:
   ```bash
   for d in ~/Projects/grewal-shopfronts ~/Projects/sigmashopfronts ~/Projects/Urban-shopfronts-limited; do
     echo "=== $d ==="; (cd "$d" && npm run test)
   done
   ```

2. **Never copy a file between the three repos without swapping branding.**
   This is the single most common way this project breaks. After any copy, run
   `npm run test:contamination` in the destination repo before doing anything
   else. The substitutions needed are: business name, domain, `tel:` number,
   display phone, WhatsApp number, asset paths (`*-icon-512.png`), and
   `sessionStorage`/`localStorage` keys.

3. **Prefer patching over copying.** When porting a feature between sites,
   extract just the new block and insert it into the destination's existing
   file, rather than overwriting the whole file. The destination's styling and
   branding are usually different even when the logic is identical — Grewal's
   metrics page uses `text-zinc-*` and an `<img>` logo; Sigma's and Urban's use
   `text-grey-*` and an inline SVG.

4. **Theme tokens are inverted between sites.** Grewal is a light cream theme;
   Sigma and Urban are dark. The *same token name* means opposite things:

   | Token | Grewal | Sigma | Urban |
   |---|---|---|---|
   | `charcoal` | `#4A4A4A` dark | `#e0e6f0` light | `#d8dce8` light |
   | `white` | `#FFFFFF` | `#f0f2f8` | `#eef0f6` |
   | `grey-500` | `#4A4A4A` dark | `#8b8eb0` mid | `#8385a8` mid |

   For surfaces that must look the same on every site, use Tailwind's fixed
   `zinc-*` scale, or `card-surface` / `text-charcoal`, which invert *together*.
   Only `navy`, `obsidian` and `void` are dark on all three.

5. **`btn-outline-dark` only exists on Grewal.** Using it elsewhere renders an
   unstyled text link. The sanity check catches this.

6. **After changing anything, run `npm run test && npm run build`.** After
   deploying, run `npm run test:smoke`.

---

## Known limitations

- The smoke test does not submit a real lead, so the full write path
  (database + notification emails) is not exercised end to end. Test that
  manually after changing `/api/contact` or `/api/instant-quote`.
- Contrast is only checked where a `bg-` and `text-` class appear in the *same*
  class string. Colours split across a parent and child element are not caught.
- Urban's smoke test only makes sense once
  `feature/conversion-and-seo-parity` is merged and deployed; before then the
  `/instant-quote` checks will fail because the page is not live yet.
- These are static and HTTP checks. They do not render pages in a browser, so
  layout and overlap problems still need a visual pass.
