# {{projectName}}

[Vite](https://vite.dev/guide/) starter with [Hummingbird React](https://react.hbui.dev), Tailwind CSS v4 and dark mode, created with [create-hummingbird-react-app](https://react.hbui.dev/docs/getting-started/cli).

## Getting started

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and edit `src/App.tsx`. The page updates as you save.

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the development server |
| `build` | Type-check and build for production |
| `preview` | Preview the production build |

## What's included

- **Styles:** `src/index.css` imports Tailwind CSS and Hummingbird React. No Tailwind config is needed, because the package registers its own `@source` paths.
- **Dark mode:** the `.dark` class on `<html>` switches the theme. The saved choice is applied before first paint by an inline script in `index.html`, and `DarkThemeToggle` switches it.
- **Components:** import anything from `@hummingbirdui/react`, for example `import { Button } from "@hummingbirdui/react"`.

## Learn more

- [Hummingbird React docs](https://react.hbui.dev/docs/getting-started/introduction)
- [Vite guide for Hummingbird React](https://react.hbui.dev/docs/getting-started/framework-guides/vite)
- [Components](https://react.hbui.dev/docs/components/overview)
- [Theming](https://react.hbui.dev/docs/customize/theming) and [dark mode](https://react.hbui.dev/docs/customize/dark-mode)
- [Vite documentation](https://vite.dev/guide/)
