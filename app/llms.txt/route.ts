import { SITE_URL } from '@/lib/site';
import { business } from '@/lib/business';
import { authorities } from '@/data/authorities';
import { shopfronts } from '@/data/shopfronts';
import { explainers } from '@/data/explainers';

export const dynamic = 'force-static';

/** A plain summary of this site's own facts and key pages, for AI assistants. */
export function GET() {
  const o = business.registeredOffice;
  const body = `# ${business.name}

> ${business.legalName} (Companies House ${business.companyNumber}), registered office ${o.street}, ${o.locality}, ${o.postcode}. Designs and fits aluminium shopfronts, roller shutters, doors and commercial glazing across the UK. Repairs within ${business.repairRadiusMiles} road miles of ${business.repairCentre}. ${business.emergencyPromise}

Phone: ${business.phones.main.display} or ${business.phones.second.display} (WhatsApp). Email: ${business.email}.

## What is distinctive here
- [Frontage check](${SITE_URL}/frontage-check): likely consents and a suitable specification for a shopfront job, using the council's own published guidance where held. Installer guidance, not a planning decision.
- [Shopfront rules by council](${SITE_URL}/planning): what ${authorities.length} UK councils' documents say about shopfronts, shutters and signs, each point cited with the date it was read.

## Councils
${authorities.map((a) => `- [${a.place} — ${a.council}](${SITE_URL}/planning/${a.slug}): ${a.headline}`).join('\n')}

## Services
${shopfronts.map((s) => `- [${s.name}](${SITE_URL}/shopfronts/${s.slug}): ${s.card}`).join('\n')}

## Guides
${explainers.map((e) => `- [${e.title}](${SITE_URL}/explained/${e.slug}): ${e.summary}`).join('\n')}

## Other
- [Shopfront grants we can verify](${SITE_URL}/grants)
- [Repair radius](${SITE_URL}/repair-radius)
- [Costs](${SITE_URL}/costs)
- [The company](${SITE_URL}/company)
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
