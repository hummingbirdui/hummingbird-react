# {{projectName}}

[Next.js](https://nextjs.org/docs) starter with [Hummingbird React](https://react.hbui.dev), Tailwind CSS v4 and dark mode, created with [create-hummingbird-react-app](https://react.hbui.dev/docs/getting-started/cli).

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and edit `app/page.tsx`. The page updates as you save.

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the development server |
| `build` | Build for production |
| `start` | Serve the production build |

## What's included

- **Styles:** `app/globals.css` imports Tailwind CSS and Hummingbird React. No Tailwind config is needed, because the package registers its own `@source` paths.
- **Dark mode:** the `.dark` class on `<html>` switches the theme. The saved choice is applied before first paint by `ThemeModeScript` in the `<head>` of `app/layout.tsx`, and `DarkThemeToggle` switches it.
- **Components:** import anything from `@hummingbirdui/react`, for example `import { Button } from "@hummingbirdui/react"`.

## Learn more

- [Hummingbird React docs](https://react.hbui.dev/docs/getting-started/introduction)
- [Next.js guide for Hummingbird React](https://react.hbui.dev/docs/getting-started/framework-guides/nextjs)
- [Components](https://react.hbui.dev/docs/components/overview)
- [Theming](https://react.hbui.dev/docs/customize/theming) and [dark mode](https://react.hbui.dev/docs/customize/dark-mode)
- [Next.js documentation](https://nextjs.org/docs)
