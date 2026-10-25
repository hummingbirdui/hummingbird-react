# Contributing to Hummingbird React

Thank you for your interest in contributing to Hummingbird React! This guide will help you get your development environment set up and walk you through our contribution workflow.

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Development workflow](#development-workflow)
- [Working on the component library](#working-on-the-component-library)
- [Working on the CLI](#working-on-the-cli)
- [Working on the documentation](#working-on-the-documentation)
- [Testing](#testing)
- [Linting and formatting](#linting-and-formatting)
- [Commit conventions](#commit-conventions)
- [Adding a changeset](#adding-a-changeset)
- [Submitting a pull request](#submitting-a-pull-request)
- [Releases (maintainers)](#releases-maintainers)
- [Command cheat-sheet](#command-cheat-sheet)
- [Reporting bugs and requesting features](#reporting-bugs-and-requesting-features)
- [License](#license)

## Code of conduct

Be respectful and constructive. We want Hummingbird React to be a welcoming project for contributors of all experience levels.

## Repository structure

This is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turborepo.dev/):

```
hummingbird-react/
├── apps/
│   └── docs/                  # Documentation site (Next.js + Fumadocs) — react.hbui.dev
└── packages/
    ├── hummingbird-react/     # The component library, published as @hummingbirdui/react
    │   └── src/
    │       ├── components/    # One folder per component (button, card, dialog, ...)
    │       ├── layout/        # Layout primitives
    │       ├── typography/    # Typography components
    │       ├── hooks/         # Shared hooks
    │       ├── utils/         # Shared utilities (cn, etc.)
    │       └── styles.css     # Library styles entry
    └── create-hummingbird-react-app/  # Project scaffolder CLI, published as create-hummingbird-react-app
        ├── src/               # CLI source (bundled to dist/index.js by tsup)
        ├── templates/         # One standalone project per framework
        └── tests/
```

## Prerequisites

- **Node.js** >= 20.9 — Node 22 recommended (pinned in `.nvmrc`, so `nvm use` / `fnm use` picks it up)
- **pnpm** 9 (the repo pins `pnpm@9.0.0` via the `packageManager` field — enable [Corepack](https://nodejs.org/api/corepack.html) with `corepack enable` to get the right version automatically)

## Getting started

1. **Fork the repository** to your own GitHub account.

2. **Clone your fork** locally:

   ```sh
   git clone https://github.com/your-username/hummingbird-react.git
   cd hummingbird-react
   ```

3. **Install dependencies**:

   ```sh
   pnpm install
   ```

4. **Start the development server**:

   ```sh
   pnpm dev
   ```

   This runs `dev` in all workspaces via Turborepo: the library rebuilds on change (`rollup --watch`) and the docs site starts at `http://localhost:3000` (or another port if 3000 is busy), so you can see your changes live. (Watch mode rebuilds the JS only — run `pnpm --filter @hummingbirdui/react build` once if you change `src/styles.css` or need fresh type declarations.)

5. **Create a branch** for your feature or bug fix:

   ```sh
   git checkout -b feature/short-description
   ```

## Development workflow

All commands below run from the repository root.

| Command            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `pnpm dev`         | Start the library in watch mode and the docs site    |
| `pnpm build`       | Build all packages and apps                          |
| `pnpm lint`        | Lint all workspaces                                  |
| `pnpm check-types` | Type-check all workspaces                            |
| `pnpm format`      | Format files with Prettier                           |

To run a command in a single workspace, use pnpm filters:

```sh
pnpm --filter @hummingbirdui/react test
pnpm --filter docs dev
```

## Working on the component library

The library lives in `packages/hummingbird-react/src/`. Components are built with [Radix UI](https://www.radix-ui.com/) primitives for behavior and accessibility, styled with [Tailwind CSS](https://tailwindcss.com/) using [class-variance-authority](https://cva.style/) (CVA) for variants, and merged with the `cn` utility.

When adding or modifying a component, follow the existing conventions:

- **One folder per component**: `src/components/<name>/` containing `<name>.tsx`, `<name>.test.tsx`, and `index.ts`. Use an existing component such as `button` as a reference.
- **Compound components**: only export the root. Sub-parts are attached to the root via `Object.assign` (e.g. `Card.Header`, `Card.Body`) with a type-only namespace, done in the `.tsx` file itself. Do not export flat part components or their prop types separately.
- **`asChild`**: only add the `asChild` prop where it is genuinely needed — interactive or navigational parts, and containers that need to render as a different element. Structural wrappers should render intrinsic elements directly.
- **Variants**: define variants, colors, and sizes with CVA and export a `variants()` helper when the component has them.
- **Registration**: export the new component from `src/components/index.ts` so it is included in the package entry point.

## Working on the CLI

`packages/create-hummingbird-react-app` is the `npx create-hummingbird-react-app` scaffolder. The CLI source is in `src/` and is bundled with its prompt libraries into a single `dist/index.js`, so the published package has no runtime dependencies. `templates/<id>/` holds one complete project per framework (`nextjs`, `vite`, `astro`, `react-router`, `gatsby`), copied verbatim apart from the renames below.

```sh
pnpm --filter create-hummingbird-react-app dev    # rebuild the CLI on change
node packages/create-hummingbird-react-app/dist/index.js ../scratch-app --template vite --no-git
```

Template rules (enforced by `tests/templates.test.ts`):

- **Templates are not workspaces.** Don't run `pnpm add` inside them; edit their `package.json` by hand. Dependabot raises their ranges weekly.
- **Dotfiles use a `_` prefix.** Store `.gitignore` as `_gitignore`; it is renamed on copy, because npm strips `.gitignore` from published packages.
- **Placeholders.** `package.json` `name` is replaced with the project name, and `{{projectName}}` in `README.md` is filled in.
- **Shared files stay identical.** `HbReactLogo.tsx`, `HeroIllustration.tsx` and the welcome page's `<main>` block must match across all five templates; only the `ENTRY_FILE` constant differs. Change them everywhere at once.
- **pnpm needs extra config for some templates.** pnpm 11+ fails installs when a dependency has an install script that isn't reviewed in `allowBuilds`. Gatsby's `pnpm-workspace.yaml` lists its reviewed scripts and sets `nodeLinker: hoisted`, which Gatsby needs. The smoke workflow installs pnpm templates with the latest pnpm to catch new cases.
- **No linters, web fonts or extra boilerplate.** Templates stay minimal so there is less to keep current.

Unit and integration tests run in CI with the rest of the repo. The **Template smoke test** workflow (`.github/workflows/templates-smoke.yml`) scaffolds, installs and builds every template on PRs that touch the package and weekly; run it manually with `library: workspace` to test templates against an unreleased library build.

## Working on the documentation

The docs site is a Next.js app using Fumadocs, located in `apps/docs/`. Component documentation lives in `apps/docs/content/docs/components/` as MDX files.

When documenting a component:

- Add a `<name>.mdx` page with live `ComponentPreview` examples covering every variant, color, size, and state.
- Include a full **API Reference** section with prop tables for each component part (see `accordion.mdx` as the template).
- Add the new page to `meta.json` so it appears in the sidebar navigation.

## Testing

Tests use [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/) and run in a jsdom environment.

```sh
# Run the suite once (what CI runs)
pnpm --filter @hummingbirdui/react test

# Watch mode while developing
pnpm --filter @hummingbirdui/react test:watch

# Run tests with the Vitest UI
pnpm --filter @hummingbirdui/react test:ui

# A single test file
pnpm --filter @hummingbirdui/react exec vitest run src/components/card/card.test.tsx
```

Every component should have a `<name>.test.tsx` file next to it covering rendering, interactions, all variants/colors/sizes, class merging, ref forwarding, `asChild` behavior, `displayName`, and basic accessibility. Use `button.test.tsx` as a reference for the expected structure.

## Linting and formatting

Before committing, make sure your changes pass:

```sh
pnpm lint
pnpm check-types
pnpm format
```

## Commit conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>
```

Common types:

- `feat:` — a new feature or component
- `fix:` — a bug fix
- `docs:` — documentation-only changes
- `refactor:` — code changes that neither fix a bug nor add a feature
- `test:` — adding or updating tests
- `chore:` — tooling, dependencies, or maintenance

Examples:

```
feat: add tooltip component
fix: correct focus ring on button in dark mode
docs: add API reference for dialog
```

## Adding a changeset

Releases are automated with [Changesets](https://github.com/changesets/changesets). Any PR that changes the behavior of a published package (a feature, a fix, a breaking change) must include a changeset:

```sh
pnpm changeset
```

Pick the package(s) you changed (`@hummingbirdui/react` and/or `create-hummingbird-react-app`; they are versioned independently), choose the bump type (patch / minor / major), and write a short, user-facing summary — it becomes the CHANGELOG entry. Commit the generated `.changeset/*.md` file **together with your code**.

**Start the summary with a type prefix** — it decides which section of the GitHub Release notes the change appears under:

| Prefix | Release-notes section | Example summary |
| --- | --- | --- |
| `new:` | New Components | `new: Combobox component with keyboard navigation` |
| `feat:` | Features | `feat: add size prop to Dialog` |
| `fix:` | Fixes | `fix: badge outline classes now match the core CSS` |
| anything else | Updates | `chore: bump radix-ui to 1.7` |

- Docs-only, CI-only, or purely internal changes don't need one — no changeset simply means no release is queued.
- Forgot it? No harm done: open a tiny follow-up PR containing just the changeset file (mention the original PR number in the summary so the changelog reads well).
- `pnpm changeset status` tells you whether the library changed without a changeset recorded.

## Submitting a pull request

1. Make sure all checks pass (this is exactly what CI runs):

   ```sh
   pnpm turbo run lint check-types test build
   ```

   And, if your PR changes the library, that it includes a [changeset](#adding-a-changeset).

2. Push your branch to your fork:

   ```sh
   git push origin feature/short-description
   ```

3. Open a pull request against the `main` branch of [hummingbirdui/hummingbird-react](https://github.com/hummingbirdui/hummingbird-react).

4. In the PR description, explain **what** you changed and **why**. Link any related issues (e.g. `Closes #123`). Screenshots or screen recordings are appreciated for visual changes.

5. A maintainer will review your PR. Please be responsive to feedback — small follow-up commits are fine; we can squash on merge.

## Releases (maintainers)

Publishing is fully automated — **never run `npm publish` from a machine** (auth is npm Trusted Publishing via OIDC; there are no tokens). There are two workflows:

### Stable releases — `.github/workflows/release.yml` (automatic)

1. Merged PRs with changesets feed an auto-maintained PR titled **"chore(release): version packages"** (version bump + CHANGELOG + lockfile). It accumulates until you're ready to ship.
2. **Merging that PR is the release.** The workflow verifies (lint, types, tests, build), publishes to npm `latest`, then creates a git tag and a GitHub Release with changelog notes for each package whose new version is live: `vX.Y.Z` for the library, `create-hummingbird-react-app@X.Y.Z` for the CLI. The tag/Release step (`.github/scripts/tag-release.sh`) is guarded per package and self-heals on the next push to `main` if a run half-fails.

### Prereleases — `.github/workflows/prerelease.yml` (manual, rare)

Run it from the Actions tab: pick the branch to publish from, choose the package, and enter an explicit prerelease version such as `1.1.0-beta.0`. The workflow validates it (prerelease format only, not already on npm), runs the full check suite, and publishes to the npm dist-tag named by the identifier (`1.1.0-beta.0` → `beta`, `1.2.0-insider.0` → `insider`). Nothing is committed and no git tag or GitHub Release is created — `latest` is untouched.

Notes:

- Changesets **pre mode is not used** (`pre enter` / `pre exit` — don't). Prereleases go through prerelease.yml only.
- Each workflow file is registered as its own trusted publisher for each package on npmjs.com (Package Settings → Trusted Publisher) — a renamed or new publishing workflow, or a new package, must be (re-)registered there.
- **Bootstrapping a new package** is the one exception to "never publish from a machine": a trusted publisher can only be registered for a package that already exists on npm. A maintainer publishes the first version once with `npm publish --access public` (2FA) from a clean checkout of the PR, registers `release.yml` and `prerelease.yml` as trusted publishers, sets publishing access to "Require two-factor authentication and disallow tokens", and only then merges. Merging first would make the release job try to publish the package without a trusted publisher and fail.
- Never add `publishConfig.tag` to package.json — dist-tags are passed explicitly at publish time.
- On Dependabot major bumps, check release notes first: tool families (vite/vitest/@vitejs, TypeScript/typescript-eslint, GitHub Actions) must move together.

## Command cheat-sheet

| Command | Purpose |
| --- | --- |
| `pnpm turbo run lint check-types test build` | Full CI matrix locally — run before every PR |
| `pnpm changeset` | Record a release note + bump for your change |
| `pnpm changeset status` | Any pending changesets? Library changed without one? |
| `pnpm dev` | Library watch mode + docs site dev server |
| `pnpm --filter @hummingbirdui/react test:watch` | Vitest watch mode |
| `pnpm --filter docs dev` | Docs dev server only |
| `pnpm --filter create-hummingbird-react-app test` | CLI unit + integration tests (builds first via turbo) |
| `node packages/create-hummingbird-react-app/dist/index.js <dir> -t <template>` | Try the CLI locally |
| `pnpm --filter docs deploy` | Deploy docs to GitHub Pages (maintainers, manual) |
| `npm view @hummingbirdui/react dist-tags` | Verify what shipped where |

## Reporting bugs and requesting features

- **Bugs**: open an issue using the [bug report template](https://github.com/hummingbirdui/hummingbird-react/issues/new?template=bug_report.md). Include a minimal reproduction, the component and version affected, and your environment.
- **Features**: open an issue using the [feature request template](https://github.com/hummingbirdui/hummingbird-react/issues/new?template=feature_request.md) describing the use case and proposed API.

Before opening a new issue, please search existing issues to avoid duplicates.

## License

By contributing to Hummingbird React, you agree that your contributions will be licensed under the [MIT License](LICENSE).
