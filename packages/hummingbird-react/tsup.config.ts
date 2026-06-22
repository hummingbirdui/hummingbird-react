import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: [
    // Root barrel — `@hummingbirdui/react`
    'src/index.ts',
    // Components barrel — `@hummingbirdui/react/components`
    'src/components/index.ts',
    // Per-component entries — `@hummingbirdui/react/<component>`
    'src/components/*/index.ts',
    // Utils barrel — `@hummingbirdui/react/utils`
    'src/utils/index.ts',
    // Stylesheet
    'src/styles.css',
  ],
  format: ['esm'],
  dts: true,
  // Tree-shaking: drop unused exports in the consumer's bundle.
  treeshake: true,
  // No code-splitting: each entry is self-contained (no chunk-*.js files).
  splitting: false,
  sourcemap: true,
  // Wipe `dist` only for a one-shot production build. In `--watch` (dev),
  // cleaning on every rebuild empties `dist` mid-build, so the docs app's
  // `next dev` momentarily fails to resolve `@hummingbirdui/react/<x>` and
  // Turbopack hard-crashes. Overwriting in place keeps each file resolvable.
  clean: !options.watch,
  external: ['react', 'react-dom', '@hummingbirdui/hummingbird'],
}));
