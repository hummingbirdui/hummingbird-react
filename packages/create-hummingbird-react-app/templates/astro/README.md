# {{projectName}}

[Astro](https://docs.astro.build) starter with [Hummingbird React](https://react.hbui.dev), Tailwind CSS v4 and dark mode, created with [create-hummingbird-react-app](https://react.hbui.dev/docs/getting-started/cli).

## Getting started

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) and edit `src/pages/index.astro`. The page updates as you save.

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the development server |
| `build` | Build for production |
| `preview` | Preview the production build |

## What's included

- **Styles:** `src/styles/global.css` imports Tailwind CSS and Hummingbird React. No Tailwind config is needed, because the package registers its own `@source` paths.
- **Dark mode:** the `.dark` class on `<html>` switches the theme. The saved choice is applied before first paint by an inline script in `src/layouts/Layout.astro`, and `DarkThemeToggle` switches it.
- **Components:** import anything from `@hummingbirdui/react`, for example `import { Button } from "@hummingbirdui/react"`.

Interactive React components need a client directive such as `client:load` to hydrate. The welcome page in `src/components/Welcome.tsx` is rendered as a single island.

## Learn more

- [Hummingbird React docs](https://react.hbui.dev/docs/getting-started/introduction)
- [Astro guide for Hummingbird React](https://react.hbui.dev/docs/getting-started/framework-guides/astro)
- [Components](https://react.hbui.dev/docs/components/overview)
- [Theming](https://react.hbui.dev/docs/customize/theming) and [dark mode](https://react.hbui.dev/docs/customize/dark-mode)
- [Astro documentation](https://docs.astro.build)
