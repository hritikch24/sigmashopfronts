#!/usr/bin/env node
/**
 * PORTFOLIO-RULES §3: "The build must fail if indexing is on while
 * placeholders remain." Runs before next build.
 */
const on = process.env.SIGMA_INDEXING === 'on';
const { pendingFacts } = await import('../lib/business.ts');
const pending = Object.entries(pendingFacts);
if (on && pending.length) {
  console.error('✗ launch gate: SIGMA_INDEXING=on but these facts are still pending:');
  for (const [k, v] of pending) console.error(`  - ${k}: ${v}`);
  console.error('Resolve them in lib/business.ts (and remove the entries) before switching indexing on.');
  process.exit(1);
}
console.log(on ? '✓ launch gate: indexing on, no pending facts' : `• launch gate: site held at noindex (${pending.length} pending fact(s))`);
