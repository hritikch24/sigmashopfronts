/**
 * Lets plain `node` import this repo's TypeScript in tests: Node strips the
 * types itself; this hook resolves the `@/` alias and extensionless imports.
 *   node --import ./tests/ts-paths.mjs tests/frontage.test.mjs
 */
import { register } from 'node:module';

register(
  `data:text/javascript,${encodeURIComponent(`
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
const ROOT = ${JSON.stringify(process.cwd())};
function tryFile(base) {
  for (const ext of ['', '.ts', '.tsx', '/index.ts']) if (existsSync(base + ext) && !base.endsWith('/') ) { if (ext || /\\.[mc]?[jt]sx?$/.test(base)) return base + ext; }
  return null;
}
export async function resolve(spec, ctx, next) {
  let base = null;
  if (spec.startsWith('@/')) base = join(ROOT, spec.slice(2));
  else if ((spec.startsWith('./') || spec.startsWith('../')) && ctx.parentURL?.startsWith('file:')) base = join(dirname(fileURLToPath(ctx.parentURL)), spec);
  if (base) { const f = tryFile(base); if (f) return next(pathToFileURL(f).href, ctx); }
  return next(spec, ctx);
}`)}`,
  import.meta.url,
);
