import { defineConfig } from 'tsup';

// JS is built by Rollup (rollup.config.mjs); tsup only bundles the CSS entry.
export default defineConfig({
  entry: ['src/styles.css'],
  format: ['esm'],
  clean: false,
});
