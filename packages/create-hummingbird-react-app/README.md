# create-hummingbird-react-app

Scaffold a React project that is ready to use [Hummingbird React](https://react.hbui.dev). It comes with Tailwind CSS v4, the Hummingbird styles and dark mode already wired up.

```bash
npx create-hummingbird-react-app@latest
```

```bash
pnpm create hummingbird-react-app
yarn create hummingbird-react-app
bun create hummingbird-react-app
```

The CLI asks for a project directory and a framework. It then copies the template, installs dependencies with the package manager you ran it with, and initializes a git repository.

## Templates

| Template       | Framework                                              | Edit this file first    |
| -------------- | ------------------------------------------------------ | ----------------------- |
| `nextjs`       | [Next.js](https://nextjs.org) App Router               | `app/page.tsx`          |
| `vite`         | [Vite](https://vite.dev) single-page app               | `src/App.tsx`           |
| `astro`        | [Astro](https://astro.build) with React islands        | `src/pages/index.astro` |
| `react-router` | [React Router](https://reactrouter.com) framework mode | `app/routes/home.tsx`   |
| `gatsby`       | [Gatsby](https://www.gatsbyjs.com)                     | `src/pages/index.tsx`   |

Every template is TypeScript. Each one follows the matching [framework guide](https://react.hbui.dev/docs/getting-started/framework-guides) and includes:

- a CSS entry that imports `tailwindcss` and `@hummingbirdui/react` and registers the class-based `dark` variant
- the saved theme applied before first paint, so there is no flash of the wrong theme
- a welcome page built with `Button` and `DarkThemeToggle`

## Options

```
create-hummingbird-react-app [directory] [options]

  -t, --template <id>      nextjs | vite | astro | react-router | gatsby
      --pm <name>          npm | pnpm | yarn | bun (default: the one running this command)
      --install            install dependencies (default: ask)
      --no-install         skip installing dependencies
      --git                initialize a git repository (default: ask)
      --no-git             skip git initialization
      --overwrite          empty the target directory if it is not empty
  -y, --yes                skip prompts and use defaults
  -h, --help               show help
  -v, --version            show the version
```

With `--yes`, the defaults are the `nextjs` template, the directory `my-hummingbird-app`, installing dependencies, and initializing git when the target is not already inside a repository. A non-empty target directory is an error unless you pass `--overwrite`.

For example:

```bash
npx create-hummingbird-react-app@latest my-app --template vite --yes
```

## Requirements

Node.js 20.19 or later. Some frameworks need more: Astro needs 22.23.4 or later, React Router needs 22.22 or later, and Gatsby supports Node.js below 26. The CLI warns when your version is outside the template's range.

## Documentation

- [CLI documentation](https://react.hbui.dev/docs/getting-started/cli)
- [Hummingbird React](https://react.hbui.dev/docs/getting-started/introduction)
- [Report an issue](https://github.com/hummingbirdui/hummingbird-react/issues)

## License

MIT
