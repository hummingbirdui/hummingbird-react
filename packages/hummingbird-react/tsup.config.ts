import { defineConfig } from 'tsup';

export default defineConfig((options) => [
  {
    entry: ['src/**/*.{ts,tsx}', '!src/**/*.test.*', '!src/test-setup.ts'],
    format: ['esm'],
    bundle: false,
    dts: false,
    clean: !options.watch,
  },
  {
    entry: ['src/styles.css'],
    format: ['esm'],
    clean: false,
  },
]);
