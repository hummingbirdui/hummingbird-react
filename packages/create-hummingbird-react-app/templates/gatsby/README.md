# {{projectName}}

[Gatsby](https://www.gatsbyjs.com/docs/) starter with [Hummingbird React](https://react.hbui.dev), Tailwind CSS v4 and dark mode, created with [create-hummingbird-react-app](https://react.hbui.dev/docs/getting-started/cli).

## Getting started

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) and edit `src/pages/index.tsx`. The page updates as you save.

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the development server (alias of `develop`) |
| `build` | Build for production |
| `serve` | Serve the production build |
| `typecheck` | Type-check the project |

## What's included

- **Styles:** `src/styles/global.css` imports Tailwind CSS and Hummingbird React. No Tailwind config is needed, because the package registers its own `@source` paths.
- **Dark mode:** the `.dark` class on `<html>` switches the theme. The saved choice is applied before first paint by `ThemeModeScript` added in `gatsby-ssr.tsx`, and `DarkThemeToggle` switches it.
- **Components:** import anything from `@hummingbirdui/react`, for example `import { Button } from "@hummingbirdui/react"`.

Gatsby 5 supports Node.js 18 up to, but not including, 26.

`pnpm-workspace.yaml` configures pnpm for Gatsby: a flat `node_modules`, which Gatsby needs, and the dependency install scripts pnpm is allowed to run. npm, Yarn and Bun ignore it.

## Learn more

- [Hummingbird React docs](https://react.hbui.dev/docs/getting-started/introduction)
- [Gatsby guide for Hummingbird React](https://react.hbui.dev/docs/getting-started/framework-guides/gatsby)
- [Components](https://react.hbui.dev/docs/components/overview)
- [Theming](https://react.hbui.dev/docs/customize/theming) and [dark mode](https://react.hbui.dev/docs/customize/dark-mode)
- [Gatsby documentation](https://www.gatsbyjs.com/docs/)
