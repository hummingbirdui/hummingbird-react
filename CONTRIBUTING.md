# Contributing to Hummingbird React

Thank you for your interest in contributing to Hummingbird React! This guide will help you get your development environment set up and walk you through our contribution workflow.

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Development workflow](#development-workflow)
- [Working on the component library](#working-on-the-component-library)
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
    └── hummingbird-react/     # The component library, published as @hummingbirdui/react
        └── src/
            ├── components/    # One folder per component (button, card, dialog, ...)
            ├── layout/        # Layout primitives
            ├── typography/    # Typography components
            ├── hooks/         # Shared hooks
            ├── utils/         # Shared utilities (cn, etc.)
            └── styles.css     # Library styles entry
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

   This runs `dev` in all workspaces via Turborepo: the library rebuilds on change (`tsup --watch`) and the docs site starts at `http://localhost:3000` (or another port if 3000 is busy), so you can see your changes live.

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

Releases are automated with [Changesets](https://github.com/changesets/changesets). Any PR that changes the library's behavior (a feature, a fix, a breaking change) must include a changeset:

```sh
pnpm changeset
```

Pick `@hummingbirdui/react`, choose the bump type (patch / minor / major), and write a short, user-facing summary — it becomes the CHANGELOG entry. Commit the generated `.changeset/*.md` file **together with your code**.

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

Publishing is fully automated by `.github/workflows/release.yml` — **never run `npm publish` manually** (auth is npm Trusted Publishing; there are no tokens).

1. Merged PRs with changesets feed an auto-maintained PR titled **"chore(release): version packages"** (version bump + CHANGELOG + lockfile). It accumulates until you're ready to ship.
2. **Merging that PR is the release.** The workflow verifies (lint, types, tests, build), then publishes.

What gets published depends on the release phase, decided by `.changeset/pre.json`:

| Phase | Version | npm dist-tag | git tag / GitHub Release |
| --- | --- | --- | --- |
| Pre mode (`insider`, current) | `1.0.0-insider.N` | `insider` | none |
| Stable (after graduation) | `X.Y.Z` | `latest` | `vX.Y.Z` + Release with changelog notes |

- Graduate to stable: `pnpm changeset pre exit` in a PR — the workflow detects the change automatically; nothing else to edit.
- Switch prerelease line (e.g. to beta): `pnpm changeset pre exit && pnpm changeset pre enter beta`.
- Never add `publishConfig.tag` to package.json — pre mode already routes dist-tags.
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
| `pnpm --filter docs deploy` | Deploy docs to GitHub Pages (maintainers, manual) |
| `pnpm changeset pre exit` / `pre enter <tag>` | Move between release phases (maintainers) |
| `npm view @hummingbirdui/react dist-tags` | Verify what shipped where |

## Reporting bugs and requesting features

- **Bugs**: open an issue using the [bug report template](https://github.com/hummingbirdui/hummingbird-react/issues/new?template=bug_report.md). Include a minimal reproduction, the component and version affected, and your environment.
- **Features**: open an issue using the [feature request template](https://github.com/hummingbirdui/hummingbird-react/issues/new?template=feature_request.md) describing the use case and proposed API.

Before opening a new issue, please search existing issues to avoid duplicates.

## License

By contributing to Hummingbird React, you agree that your contributions will be licensed under the [MIT License](LICENSE).
