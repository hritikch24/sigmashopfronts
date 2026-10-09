# Authority outcomes for the 41 old city pages

Checked 9–10 October 2026. A city page moves (301) only to a council page built from that council’s own cited guidance. Otherwise it returns 410 — never a redirect to a hub.

| Old path | Outcome | New path / reason |
|---|---|---|
| `/areas/london` | 410 | 33 planning authorities, not one — a single London page would have to generalise |
| `/areas/birmingham` | 301 | `/planning/birmingham` |
| `/areas/manchester` | 410 | council site blocks automated access; its guidance could not be read and cited |
| `/areas/leeds` | 301 | `/planning/leeds` |
| `/areas/liverpool` | 410 | no shopfront guidance found on the council site |
| `/areas/bristol` | 301 | `/planning/bristol` |
| `/areas/sheffield` | 410 | no current shopfront policy found (its enforcement register is cited in a guide instead) |
| `/areas/glasgow` | 410 | council site blocks automated access |
| `/areas/cardiff` | 410 | council site blocks automated access, and the 2019 SPG address now returns 404 |
| `/areas/newcastle` | 410 | council server refused connections when checked |
| `/areas/nottingham` | 301 | `/planning/nottingham` |
| `/areas/leicester` | 301 | `/planning/leicester` |
| `/areas/edinburgh` | 301 | `/planning/edinburgh` |
| `/areas/southampton` | 301 | `/planning/southampton` |
| `/areas/brighton` | 301 | `/planning/brighton-and-hove` |
| `/areas/coventry` | 301 | `/planning/coventry` |
| `/areas/reading` | 301 | `/planning/reading` |
| `/areas/wolverhampton` | 410 | shopfront SPG referenced in the 2006 UDP but not retrievable; its grant is listed on /grants (closed) |
| `/areas/derby` | 301 | `/planning/derby` |
| `/areas/northampton` | 410 | West Northamptonshire: a consent-requirements page only, no shopfront guidance |
| `/areas/luton` | 410 | a shopfront design guide SPD is referenced but could not be retrieved |
| `/areas/swindon` | 410 | shop fronts coding guidance page found but the document was not retrieved |
| `/areas/stoke-on-trent` | 410 | no current shopfront guidance found |
| `/areas/plymouth` | 301 | `/planning/plymouth` |
| `/areas/bradford` | 301 | `/planning/bradford` |
| `/areas/swansea` | 410 | council site blocks automated access; the adopted 2017 guide could not be read |
| `/areas/oxford` | 301 | `/planning/oxford` |
| `/areas/cambridge` | 410 | Local Plan 2018 Policy 64 exists but the plan PDF could not be retrieved when checked |
| `/areas/york` | 301 | `/planning/york` |
| `/areas/bath` | 410 | the 1993 shopfront SPD is scanned images; its shutter guidance could not be read |
| `/areas/aberdeen` | 410 | no supplementary guidance retrieved |
| `/areas/belfast` | 410 | Northern Ireland system; no shopfront guidance found |
| `/areas/milton-keynes` | 410 | no shopfront guidance found |
| `/areas/middlesbrough` | 410 | no shopfront guidance found |
| `/areas/bournemouth` | 301 | `/planning/bournemouth-christchurch-and-poole` |
| `/areas/portsmouth` | 410 | council media host blocks automated access |
| `/areas/norwich` | 410 | no shopfront guidance found |
| `/areas/exeter` | 410 | old Local Plan server unreachable when checked |
| `/areas/chester` | 301 | `/planning/cheshire-west-and-chester` |
| `/areas/gloucester` | 301 | `/planning/gloucester` |
| `/areas/peterborough` | 410 | council documents blocked to automated access |

**18 moved, 23 gone.** Every 301 target lists its sources and the date each was read.

A council can be added later as soon as its guidance can be read and cited: add it to `data/authorities.ts` with `legacyCity`, and its 410 becomes a 301 automatically (the sanity suite checks the target exists).
