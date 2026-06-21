import { defineConfig } from 'tsup';

export default defineConfig({
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
  clean: true,
  external: ['react', 'react-dom', '@hummingbirdui/hummingbird'],
});
