#!/usr/bin/env node
/**
 * Cross-site contamination check.
 *
 * Catches the specific failure mode that has bitten this project: a file
 * copied from a sibling site, bringing its branding with it. That is how
 * Sigma's metrics dashboard ended up titled "Grewal Metrics" with a broken
 * Grewal icon path.
 *
 *   node tests/contamination.test.mjs        # or: npm run test:contamination
 *
 * Exit code 0 = clean, 1 = leaks found.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SITE, SIBLINGS, FALSE_POSITIVES, ALLOWED_SIBLING_MENTIONS } from './site-config.mjs';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'lib', 'data', 'scripts'];
const SCAN_EXT = /\.(tsx?|mjs|js|jsx)$/;
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '_old_site', 'dist', 'build']);

function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, acc);
    else if (SCAN_EXT.test(name)) acc.push(full);
  }
  return acc;
}

/** Mask substrings that legitimately contain a marker, so they cannot match. */
function mask(line) {
  let out = line.toLowerCase();
  for (const fp of FALSE_POSITIVES) {
    out = out.split(fp).join('#'.repeat(fp.length));
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
const findings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const allowedMentions = ALLOWED_SIBLING_MENTIONS.includes(rel);
  const lines = readFileSync(file, 'utf8').split('\n');

  lines.forEach((raw, i) => {
    const masked = mask(raw);
    for (const sib of SIBLINGS) {
      for (const marker of sib.markers) {
        const m = marker.toLowerCase();
        if (!masked.includes(m)) continue;

        // A bare brand word inside a comment in an allow-listed file is a
        // deliberate cross-reference, not a leak. Anything with a domain,
        // phone number or asset path never is.
        const isBareName = m === sib.key || m === sib.key + 'shopfronts';
        const looksLikeComment = /^\s*(\/\/|\*|\/\*)/.test(raw);
        if (allowedMentions && isBareName && looksLikeComment) continue;

        findings.push({
          file: rel,
          line: i + 1,
          sibling: sib.shortName,
          marker,
          text: raw.trim().slice(0, 120),
        });
      }
    }
  });
}

// ── Report ────────────────────────────────────────────────────────────────
const label = `${SITE.shortName} (${SITE.domain})`;
if (findings.length === 0) {
  console.log(`✓ contamination: ${label} — no sibling branding found in ${files.length} files`);
  process.exit(0);
}

console.error(`✗ contamination: ${label} — ${findings.length} leak(s) found\n`);
const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}
for (const [file, rows] of byFile) {
  console.error(`  ${file}`);
  for (const r of rows) {
    console.error(`    :${r.line}  [${r.sibling}: "${r.marker}"]  ${r.text}`);
  }
  console.error('');
}
console.error(`This site must not reference ${SIBLINGS.map((s) => s.shortName).join(' or ')}.`);
console.error('If a file was copied from a sibling, swap its branding before committing.');
process.exit(1);
