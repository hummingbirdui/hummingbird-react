/**
 * Runtime JS is emitted by Rollup with fully-specified specifiers, but tsc
 * never rewrites import paths in the declaration files it emits — they keep
 * the extensionless source form ("../../utils/cn"), which breaks type
 * resolution for consumers on `moduleResolution: node16`. This rewrites every
 * relative specifier in dist *.d.ts files to its resolved ".js" form, which
 * TypeScript maps back to the matching .d.ts.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const SPECIFIER_RE = /((?:from|import)\s*\(?\s*)(["'])(\.\.?(?:\/[^"']*)?)\2/g;

function resolveSpecifier(spec, fileDir) {
  const target = path.resolve(fileDir, spec);
  if (existsSync(target) && statSync(target).isDirectory()) {
    if (existsSync(path.join(target, 'index.js'))) return `${spec}/index.js`;
  } else if (existsSync(`${target}.js`)) {
    return `${spec}.js`;
  }
  return null;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith('.d.ts')) yield full;
  }
}

let rewritten = 0;
const unresolved = [];

for await (const file of walk(dist)) {
  const fileDir = path.dirname(file);
  const source = await readFile(file, 'utf8');
  const output = source.replace(SPECIFIER_RE, (match, lead, quote, spec) => {
    if (/\.(js|json|css)$/.test(spec)) return match;
    const resolved = resolveSpecifier(spec, fileDir);
    if (!resolved) {
      unresolved.push(`${path.relative(dist, file)}: "${spec}"`);
      return match;
    }
    rewritten++;
    return `${lead}${quote}${resolved}${quote}`;
  });
  if (output !== source) await writeFile(file, output);
}

if (unresolved.length) {
  console.error('resolve-import-paths: could not resolve specifiers:');
  for (const entry of unresolved) console.error(`  ${entry}`);
  process.exit(1);
}
console.log(`resolve-import-paths: rewrote ${rewritten} specifiers in .d.ts files`);
