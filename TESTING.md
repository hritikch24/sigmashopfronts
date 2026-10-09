# Testing

| Command | What it proves |
|---|---|
| `npm run test:contamination` | No other site's brand, domain, phone or storage key in this repo's code |
| `npm run test:frontage` | Frontage-check guardrails hold for all 2,520 input combinations |
| `npm run test:sanity` | On the build: canonicals, unique titles/descriptions, internal links, fabricated-claim patterns, JSON-LD, alt text, logo hashes, 574 matrix URLs → 410, one-to-one 301s |
| `npm run gate` | Per-page 8-gram overlap < 20% against every other site and every other page here |
| `npm run test:links` | Every external link and `sameAs` returns 200 (network) |
| `npm run test:smoke` | Live production checks (only meaningful after launch) |

`test:sanity` and `gate` read `.next/`, so build first:
`DATABASE_URL="postgresql://u:p@localhost:5432/noop" npx next build`.
