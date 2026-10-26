import { readFileSync } from 'node:fs';
import { defineConfig } from 'tsup';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  version: string;
};

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  platform: 'node',
  target: 'node20',
  clean: true,
  splitting: false,
  sourcemap: false,
  // Bundle the prompt libraries so the published package has zero runtime
  // dependencies: `npx` downloads one small tarball and starts at once.
  noExternal: ['@clack/prompts', 'picocolors'],
  define: { __CLI_VERSION__: JSON.stringify(pkg.version) },
  banner: { js: '#!/usr/bin/env node' },
});
