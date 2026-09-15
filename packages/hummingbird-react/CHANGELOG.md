# @hummingbirdui/react

## 1.0.0

### Major Changes

- [#57](https://github.com/hummingbirdui/hummingbird-react/pull/57) [`0461d3f`](https://github.com/hummingbirdui/hummingbird-react/commit/0461d3ff81bb2ff9fa1cad3aa6ba8a5e83e3997b) Thanks [@khayrul25](https://github.com/khayrul25)! - feat: first stable release of Hummingbird React 🎉

  The official React component library for the Hummingbird design system.

  - **42 accessible components** built on Radix UI primitives — dialogs, dropdowns, tooltips, forms, data display, navigation, and more — plus layout (`Container`, `Grid`) and typography primitives
  - **Hummingbird design system styling** on Tailwind CSS v4 — semantic CSS classes and design tokens, themeable with CSS variables, no config file required
  - **Dark mode built in** — class-based theming with `ThemeModeScript` (no flash of the wrong theme), `DarkThemeToggle`, and the `useThemeMode` hook
  - **TypeScript-first** — fully typed props on every component namespace, no extra `@types` packages
  - **Modern ESM** — tree-shakeable, React 19 and RSC-ready, with per-component subpath imports like `@hummingbirdui/react/button`
  - **Works everywhere** — step-by-step integration guides for Next.js, Vite, Astro, React Router, and Gatsby

  📚 Documentation: https://react.hbui.dev

## 1.0.0-beta.0

### Patch Changes

- chore: switch prerelease channel from insider to beta

## 1.0.0-insider.11

### Minor Changes

- [`68b79ae`](https://github.com/hummingbirdui/hummingbird-react/commit/68b79ae874f8b2fd0f054ec126fae8760d7013b2) Thanks [@khayrul25](https://github.com/khayrul25)! - Rename the sonner component module to toast. The `Toaster` and `toast` exports are unchanged, but the deep import path moves from `@hummingbirdui/react/sonner` to `@hummingbirdui/react/toast`.

- [`68b79ae`](https://github.com/hummingbirdui/hummingbird-react/commit/68b79ae874f8b2fd0f054ec126fae8760d7013b2) Thanks [@khayrul25](https://github.com/khayrul25)! - Ranamed sonner component to toast

### Patch Changes

- [`41ede38`](https://github.com/hummingbirdui/hummingbird-react/commit/41ede3855881aaf208c77819d9f6fb1e79fbc5d9) Thanks [@khayrul25](https://github.com/khayrul25)! - Align the test toolchain (Vitest 4, Vite 7) and fix stale component tests. No runtime changes — this release validates the new automated publishing pipeline.

## 1.0.0-insider.10

Last manually published release (2026-08-23), before release automation was introduced.

Versions up to this point were published by hand without a changelog; see the [commit history](https://github.com/hummingbirdui/hummingbird-react/commits/main) for details of what changed in each:

- 1.0.0-insider.9 — 2026-08-20
- 1.0.0-insider.8 — 2026-08-19
- 1.0.0-alpha.0 — 2026-08-11
- 0.0.0-insider.7 — 2026-08-11
- 0.0.0-insider.6 — 2026-07-23
- 0.0.0-insider.5 — 2026-07-21
- 0.0.0-insider.4 — 2026-07-15
- 0.0.0-insider.3 — 2026-07-15
- 0.0.0-insider.2 — 2026-07-09
- 0.0.0-inside.1 — 2026-07-07

From 1.0.0-insider.11 onward, entries in this file are generated automatically by [Changesets](https://github.com/changesets/changesets) from the changeset files contributors add in their PRs.
