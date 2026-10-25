# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Hummingbird React (`@hummingbirdui/react`) — the official React component library for the Hummingbird design system. A pnpm + Turborepo monorepo with three workspaces:

- `packages/hummingbird-react` — the published component library (React 19 peer dep, ESM only).
- `packages/create-hummingbird-react-app` — the published `npx create-hummingbird-react-app` scaffolder CLI (see "CLI" below).
- `apps/docs` — Next.js (static export) docs site at react.hbui.dev, built on fumadocs-mdx.

## Commands

Package manager is pnpm 9. Root scripts fan out through Turbo:

```bash
pnpm build          # turbo run build (library + docs)
pnpm lint           # turbo run lint
pnpm check-types    # turbo run check-types
pnpm format         # prettier --write "**/*.{ts,tsx,md}"
```

Library (`packages/hummingbird-react`):

```bash
pnpm --filter @hummingbirdui/react test                 # vitest watch mode
pnpm --filter @hummingbirdui/react exec vitest run src/components/card/card.test.tsx   # single test file
pnpm --filter @hummingbirdui/react lint
pnpm --filter @hummingbirdui/react build
```

CLI (`packages/create-hummingbird-react-app`):

```bash
pnpm --filter create-hummingbird-react-app test         # vitest run (turbo builds dist/ first; bin.test.ts runs it)
pnpm --filter create-hummingbird-react-app build        # tsup -> dist/index.js
node packages/create-hummingbird-react-app/dist/index.js /tmp/x --template vite --no-install --no-git --yes
```

Docs app:

```bash
pnpm --filter docs dev      # predev fetches preview themes (see below), then next dev
pnpm --filter docs build    # static export to apps/docs/out
```

`apps/docs/scripts/fetch-themes.mjs` runs automatically before dev/build and downloads theme CSS from the core hummingbird repo (via jsdelivr) into gitignored `apps/docs/app/themes/` and `public/themes.css`. Pin with `HB_THEMES_REF`.

## Releases

Publishing is automated with Changesets + GitHub Actions (`.github/workflows/release.yml`). PRs that change a published package must include a changeset (`pnpm changeset`); the library and the CLI are a Changesets **fixed group** (`.changeset/config.json`), so they always share one version and a changeset for either bumps both. Merging to `main` maintains a "chore(release): version packages" PR, and merging *that* publishes both at the same **stable** version to npm `latest` and creates one `vX.Y.Z` git tag + GitHub Release for both via `.github/scripts/tag-release.sh` (not changesets' own tags) — guarded on matching versions and npm/tag/release state, and self-healing on the next push. **Prereleases are manual**: run the Prerelease workflow (`.github/workflows/prerelease.yml`) from the Actions tab with an explicit version like `1.1.0-beta.0` — it publishes both packages at that exact version from the chosen ref to the dist-tag named by the identifier (`beta`, `insider`), with no commit, git tag, or GitHub Release. npm Trusted Publishing (OIDC) is bound per workflow filename, so prerelease.yml is registered as its own trusted publisher for each package on npmjs.com. Changesets pre mode is no longer used. npm auth is Trusted Publishing (OIDC) — no token secret. Never `npm publish` manually from a machine — the only exception is the one-time bootstrap publish of a brand-new package, since a trusted publisher can't be registered before the package exists (see CONTRIBUTING.md).

## CLI

`create-hummingbird-react-app` is TypeScript bundled by tsup into one zero-dependency `dist/index.js` (`@clack/prompts` and `picocolors` are devDeps inlined via `noExternal`; args via `node:util` `parseArgs`). `templates/{nextjs,vite,astro,react-router,gatsby}/` are static, standalone TypeScript projects copied as-is, except `_gitignore` → `.gitignore` and the `package.json` name / README `{{projectName}}` rewrite (`src/copy.ts`). They are not workspaces and are excluded from the package's tsc/eslint and from root prettier. `HbReactLogo.tsx`, `HeroIllustration.tsx` and the welcome `<main>` block are byte-identical across templates (only `ENTRY_FILE` differs), enforced by `tests/templates.test.ts`. Templates track each framework's current scaffolder output; `.github/workflows/templates-smoke.yml` installs and builds each one from npm. The template registry (entry file, dev script, Node range) is `src/templates.ts`.

## Skills

Three project skills in `.claude/skills/` encode the component workflows in detail — always use them instead of improvising:

- `create-component` — scaffold a new component
- `create-component-test` — write its Vitest test file (button.test.tsx is the structural template)
- `write-component-docs` — write its MDX docs page

## Library architecture

The core design decision: **Radix UI provides behavior, Hummingbird semantic CSS classes provide looks.**

- Components use headless primitives from the unified `radix-ui` package and apply Hummingbird's class-based CSS (e.g. `btn-outline-primary`) via CVA variants. The variants a component supports are *derived from* the `@utility` classes in the core CSS — never invented. The core CSS lives in the gitignored `/reference-css` checkout (also shipped in `node_modules/@hummingbirdui/hummingbird/src/components/`).
- `cn` (in `src/utils/cn.ts`) is clsx-only — **no tailwind-merge**, because styling is class-based, not utility-based.
- Tailwind utilities are allowed only for behavior/animation (keyed off Radix `data-[state]`, using `tw-animate-css`), never for looks.
- Never re-implement what Radix owns: open/selected/checked state (controlled and uncontrolled) and presence-during-exit-animation come from Radix, not `useState`/context/effects.
- Compound components export only the root; parts are attached with `Object.assign` (`Card.Header`) plus a type-only namespace, defined in the component's `.tsx` file (not `index.ts`, for RSC reasons). `DropdownMenu` is renamed `Dropdown`. No flat part/prop exports, no `Root` alias.
- `asChild` is reserved for interactive/navigational parts and semantic-element swaps; plain structural wrappers render intrinsic elements directly.
- Components needing CSS beyond the core classes get `src/styles/<component>.css` (`@utility` + `@layer base`, `--<component>-*` vars, Hummingbird tokens only — no shadcn tokens), imported from `src/styles.css`.

Source layout: `src/{components,layout,typography,hooks,utils}/`, each with an `index.ts` barrel. The exports map supports both the root import and per-module deep imports (`@hummingbirdui/react/button`).

Build (`pnpm --filter @hummingbirdui/react build`) is a four-step pipeline: Rollup emits JS with `preserveModules` (dist mirrors src file-for-file, matching the exports map), tsup bundles only the CSS entry, `tsc -p tsconfig.build.json` emits declarations, and `scripts/resolve-import-paths.mjs` fixes import specifiers. `react-dropzone` is vendored into `dist/vendor/` because its dependency chain breaks native-ESM consumers — see the comment in `rollup.config.mjs` before touching it.

## Docs architecture

- MDX content in `apps/docs/content/docs/{getting-started,components,forms,layout,customize}/`.
- Live examples are standalone files in `apps/docs/registry/examples/<component>/`, registered by name in `apps/docs/registry/index.ts`, and rendered in MDX via `ComponentPreview`.
- Component pages include the full API reference inline per part (`PropsTable`/`DataAttributesTable`, mirroring the Radix API reference) rather than linking out — `components/accordion.mdx` is the template.
- Form docs (react-hook-form + Zod) wire fields manually with raw `Controller` + `Field`/state props — there is deliberately no `Form` wrapper abstraction.
- The docs site consumes the library source via `workspace:^`, and `globals.css` uses `@source` pointing at the package so Tailwind sees its animation utilities.
