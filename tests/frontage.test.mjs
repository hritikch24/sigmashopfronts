#!/usr/bin/env node
/**
 * Guardrails of the frontage check (brief §6), tested against the real engine
 * across every combination of council, building status and request.
 *   1. Never says consent is not required.
 *   2. Never states council policy for a council we hold no data on.
 *   3. Never mentions a grant without a dated, verified source.
 *   4. Always ends with "confirm with the council" and the installer label.
 *   5. Leads with the solid-shutter warning where a shutter meets a heritage setting.
 */
import { checkFrontage } from '@/lib/frontage';
import { authorities, grants } from '@/data/authorities';

const STATUSES = ['listed', 'conservation', 'neither', 'unsure'];
const WANTS = ['fascia', 'shutter', 'glazing', 'illuminated', 'awning'];
const NATIONS = ['england', 'scotland', 'wales', 'northern-ireland'];

const FORBIDDEN = [
  /\bnot (?:be )?(?:required|needed|necessary)\b/i,
  /\bno (?:planning )?(?:permission|consent)s? (?:is |are )?(?:required|needed|necessary)\b/i,
  /\b(?:do|does|will) not need\b/i,
  /\b(?:don'?t|doesn'?t|won'?t) need\b/i,
  /\bpermission[- ]free\b/i,
  /\bwithout (?:planning )?permission\b/i,
  /\bguaranteed?\b/i,
];

const subsets = (arr) => arr.flatMap((_, i) => arr.slice(i).map((__, j) => arr.slice(i, i + j + 1)));
const wantSets = [...new Set(subsets(WANTS).map((s) => s.join(',')))].map((s) => s.split(','));

let checked = 0;
const failures = [];
const fail = (msg) => failures.push(msg);

function textOf(r) {
  return JSON.stringify(r);
}

function assertCommon(r, label) {
  const t = textOf(r);
  for (const re of FORBIDDEN) if (re.test(t)) fail(`${label}: forbidden phrase ${re}`);
  if (!/confirm with/i.test(r.nextStep)) fail(`${label}: next step does not say to confirm with the council`);
  if (!/not a planning decision/i.test(r.disclaimer) || !/installer/i.test(r.disclaimer)) fail(`${label}: missing installer / not-a-decision label`);
  if (!r.consents.length) fail(`${label}: no consent lines`);
  for (const c of r.consents) if (!['likely', 'possible', 'check'].includes(c.verdict)) fail(`${label}: unexpected verdict ${c.verdict}`);
  if (r.grant.found) {
    const g = grants.find((x) => x.name === r.grant.name);
    if (!g || !g.url || !/^\d{4}-\d{2}-\d{2}$/.test(g.checked)) fail(`${label}: grant without verified dated source`);
  }
}

// Known councils.
for (const a of authorities) {
  for (const status of STATUSES) {
    for (const wants of wantSets) {
      const label = `${a.slug}/${status}/${wants.join('+')}`;
      const r = checkFrontage({ authority: a.slug, nation: a.nation, status, wants });
      checked++;
      assertCommon(r, label);
      for (const c of [...r.councilPoints, ...(r.lead?.cited ?? [])]) {
        if (!c.url || !c.docTitle) fail(`${label}: council point without a source`);
        const own = [...a.shutters, ...(a.heritage ?? []), ...(a.signage ?? [])].some((p) => p.text === c.text);
        if (!own) fail(`${label}: council point not from this council's data`);
      }
      const heritageish = status !== 'neither';
      if (wants.includes('shutter') && heritageish && !/most common refusal/i.test(r.lead?.title ?? '')) fail(`${label}: shutter warning not leading`);
    }
  }
}

// Councils we hold nothing for — must never borrow another council's points.
for (const nation of NATIONS) {
  for (const name of ['Sandwell', 'Manchester', 'Lichfield', 'Wolverhampton', 'Cardiff', 'Glasgow City']) {
    for (const status of STATUSES) {
      for (const wants of wantSets) {
        const label = `unknown:${name}/${nation}/${status}/${wants.join('+')}`;
        const r = checkFrontage({ authority: null, councilName: name, nation, status, wants });
        checked++;
        assertCommon(r, label);
        if (r.known) fail(`${label}: marked as known`);
        if (r.councilPoints.length || r.lead?.cited.length || r.sources.length) fail(`${label}: cites a council document for a council we hold no data on`);
        if (!/hold no|do not hold/i.test(textOf(r))) fail(`${label}: does not say we hold no data`);
      }
    }
  }
}

if (failures.length) {
  console.error(`✗ frontage guardrails: ${failures.length} failure(s) in ${checked} combinations`);
  for (const f of failures.slice(0, 25)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ frontage guardrails: ${checked} combinations, none asserts consent is unnecessary, none borrows policy, every grant sourced`);
