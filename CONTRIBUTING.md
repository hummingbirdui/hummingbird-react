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
- [Submitting a pull request](#submitting-a-pull-request)
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

- **Node.js** >= 18
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
# Run tests in watch mode
pnpm --filter @hummingbirdui/react test

# Run tests with the Vitest UI
pnpm --filter @hummingbirdui/react test:ui
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

## Submitting a pull request

1. Make sure the project builds and all checks pass:

   ```sh
   pnpm build
   pnpm lint
   pnpm check-types
   pnpm --filter @hummingbirdui/react test
   ```

2. Push your branch to your fork:

   ```sh
   git push origin feature/short-description
   ```

3. Open a pull request against the `main` branch of [hummingbirdui/hummingbird-react](https://github.com/hummingbirdui/hummingbird-react).

4. In the PR description, explain **what** you changed and **why**. Link any related issues (e.g. `Closes #123`). Screenshots or screen recordings are appreciated for visual changes.

5. A maintainer will review your PR. Please be responsive to feedback — small follow-up commits are fine; we can squash on merge.

## Reporting bugs and requesting features

- **Bugs**: open an issue using the [bug report template](https://github.com/hummingbirdui/hummingbird-react/issues/new?template=bug_report.md). Include a minimal reproduction, the component and version affected, and your environment.
- **Features**: open an issue using the [feature request template](https://github.com/hummingbirdui/hummingbird-react/issues/new?template=feature_request.md) describing the use case and proposed API.

Before opening a new issue, please search existing issues to avoid duplicates.

## License

By contributing to Hummingbird React, you agree that your contributions will be licensed under the [MIT License](LICENSE).
