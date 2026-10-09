# `/frontage-check`: data model and guardrails

## What it answers

“What am I allowed to put here, and what will look right?” — in two parts, shown together, before any
contact detail is asked for.

## Inputs

| Input | Values | How it is resolved |
|---|---|---|
| Where | postcode **or** a council from the list | `/api/frontage` sends the postcode to postcodes.io (open data, no key) for `admin_district` and `country`, maps the district to one of our authorities (`authorityForDistrict`), and stores nothing. A council we do not hold resolves to “unknown”, with its name and nation. |
| Building status | listed · conservation area · neither · not sure | radio |
| Wants | fascia & signage · roller shutter/grille · new glazing/shopfront · illuminated sign · awning/canopy | checkboxes, any combination |
| Photo | optional | only in the enquiry offered **after** the answer; scaled down in the browser, emailed to the office as an attachment |

## Data

`data/authorities.ts`, one entry per council we can cite:

```ts
Authority {
  slug, council, place, legacyCity, nation, repairs: 'inside' | 'outside', retailStreets,
  headline,                  // answer-first sentence, also the meta description
  documents: SourceDoc[],    // title, date, status (adopted SPD / Local Plan policy / guidance / draft / advice note), url, checked
  heritageExternal,          // 'not-acceptable' | 'normally-refused' | 'exception-only' — from the council's own words
  securityOrder?,            // the council's stated order of preference, where it gives one
  shutters: Point[],         // { text, doc, ref } — every point tied to a document and paragraph
  heritage?: Point[], signage?: Point[],
  ourAdvice,                 // installer opinion, labelled as such wherever shown
}
grants: Grant[]              // name, status 'open' | 'closed', detail, url, checked
```

## Engine

`lib/frontage.ts → checkFrontage(input)` is a pure function, so it runs in the browser and is tested directly.

Part one — consents: planning permission, advertisement consent (England 2007 regulations; Scotland 1984;
Wales 1992; Northern Ireland 2015), listed building consent, building regulations (building warrant in
Scotland). Each gets a verdict of **likely**, **possible** or **check**, with the reason.

Lead warning: whenever a shutter meets a listed, conservation-area or not-sure building, the answer opens with
“Solid external roller shutters are the single most common refusal”, followed by the council’s own cited
points if we hold them.

Part two — what suits the building: security order (the council’s, then ours), shopfront proportion and finish,
fascia and lighting, awning. Labelled “our specification advice as installers. Not council policy.”

Then: grant (verified schemes only, with status and date), the named next step (“Confirm with {council}…”), the
council’s documents, and the installer disclaimer.

## Guardrails and how each is enforced

| Brief §6 rule | Enforcement |
|---|---|
| 1. Never state that permission is not required | `Verdict` has no “not needed” member; weakest is `check`. `tests/frontage.test.mjs` scans every output for “not required”, “no permission needed”, “do not need”, “without permission”, “guaranteed” and similar. |
| 2. Never invent council policy | Council statements come only from `authorities.ts`, each carrying its document and reference. For unknown councils the test asserts no council point, no lead citation, no sources, and that the text says we hold no data. |
| 3. No grant without a verifiable, dated source | Grants come only from the `grants` list; the test checks each mentioned grant has a URL and an ISO `checked` date. |
| 4. Answer before contact details | The result renders on submit with no network call except the optional postcode lookup. The enquiry form appears only below the answer. |
| 5. Labelled as installer guidance | Every result carries the disclaimer (“guidance from a shopfront installer … not a planning decision … confirm with your council”); the test asserts it. |

Test run: **2,520 combinations** (18 councils × 4 statuses × 31 want-combinations, plus 6 unknown councils × 4 nations × 4 × 31) — all pass.
