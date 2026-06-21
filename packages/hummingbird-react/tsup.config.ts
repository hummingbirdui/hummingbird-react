import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles.css'],
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@hummingbirdui/hummingbird'],
});
