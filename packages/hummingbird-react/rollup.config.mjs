import { globSync } from 'node:fs';
import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import preserveDirectives from 'rollup-preserve-directives';

// Every source file is its own entry, so `preserveModules` mirrors src/ into
// dist/ file-for-file — same layout the exports map expects — while Rollup
// resolves each import and emits fully-specified ESM ("./accordion.js",
// "../../utils/cn.js") that native Node can load without a bundler.
const entries = globSync('src/**/*.{ts,tsx}').filter(
  (file) => !/\.test\.|test-setup/.test(file),
);

// react-dropzone depends on attr-accept@2, whose "module" build is CommonJS
// in disguise (`exports.default = …`), which crashes native-ESM consumers
// (e.g. Astro/Vite dev serving the package unbundled). Vendoring
// react-dropzone + its deps into a single valid-ESM file keeps the whole
// dist graph loadable everywhere; only react stays external. The package
// remains in `dependencies` for the type imports in file-uploader.d.ts.
const vendorReactDropzone = {
  name: 'vendor-react-dropzone',
  resolveId(source) {
    if (source === 'react-dropzone') {
      // Rollup computes relative external paths against the *source* module
      // locations, so pretend the vendored file sits under src/ — with
      // preserveModulesRoot: 'src' that maps to dist/vendor/… in the output.
      return { id: path.resolve('src/vendor/react-dropzone.js'), external: true };
    }
    return null;
  },
};

export default [
  {
    input: 'react-dropzone',
    output: { file: 'dist/vendor/react-dropzone.js', format: 'es', strict: false },
    external: (id) => id === 'react' || id === 'react-dom' || id.startsWith('react/'),
    plugins: [nodeResolve(), commonjs()],
  },
  {
    input: entries,
    output: {
      dir: 'dist',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
      // ES modules are always strict; leaving this on would prepend
      // 'use strict' above the 'use client' directives.
      strict: false,
    },
    // Everything that isn't a relative/absolute path is a dependency —
    // except react-dropzone, which the plugin above redirects to the
    // vendored file (as an absolute id, made relative per importer below).
    external: (id) =>
      id !== 'react-dropzone' && !id.startsWith('.') && !path.isAbsolute(id),
    makeAbsoluteExternalsRelative: true,
    plugins: [
      vendorReactDropzone,
      nodeResolve({ extensions: ['.ts', '.tsx'] }),
      // format: 'esm' stops esbuild injecting "use strict" (it does so for
      // strict-mode tsconfigs when no output format is given), which would
      // otherwise land above the "use client" directives.
      esbuild({ jsx: 'automatic', target: 'es2020', format: 'esm' }),
      // Keeps the "use client" directives at the top of client modules.
      preserveDirectives(),
    ],
    onwarn(warning, warn) {
      // preserveDirectives handles module-level directives; silence the
      // default "directives cause errors when bundled" noise.
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
      warn(warning);
    },
  },
];
