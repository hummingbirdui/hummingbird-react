# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets); it holds pending release notes.

## Adding a changeset to your PR

```bash
pnpm changeset
```

Pick `@hummingbirdui/react`, choose the bump type (patch/minor/major), and write a short user-facing summary. Commit the generated markdown file with your changes. When your PR merges, CI accumulates these into a "Version Packages" PR; merging that PR publishes to npm and updates `CHANGELOG.md`.

Chore-only PRs that shouldn't trigger a release simply don't add a changeset.

> The repo is currently in **pre mode** (`pre.json`), so versions publish as `1.0.0-insider.N` to the npm `insider` dist-tag. Exit with `pnpm changeset pre exit` when graduating to stable.
