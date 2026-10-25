# create-hummingbird-react-app

Create a new React project with [Hummingbird React](https://react.hbui.dev), Tailwind CSS and dark mode already set up.

## Usage

```bash
npx create-hummingbird-react-app@latest
```

Or with another package manager:

```bash
pnpm create hummingbird-react-app
yarn create hummingbird-react-app
bun create hummingbird-react-app
```

Then follow the prompts.

## Templates

| Template       | Framework    |
| -------------- | ------------ |
| `nextjs`       | Next.js      |
| `vite`         | Vite         |
| `astro`        | Astro        |
| `react-router` | React Router |
| `gatsby`       | Gatsby       |

Pick one with `--template` to skip the prompt:

```bash
npx create-hummingbird-react-app@latest my-app --template vite
```

## Options

| Option                | Description                                   |
| --------------------- | --------------------------------------------- |
| `-t, --template <id>` | Template to use                               |
| `--pm <name>`         | Package manager: `npm`, `pnpm`, `yarn`, `bun` |
| `--no-install`        | Skip installing dependencies                  |
| `--no-git`            | Skip initializing a git repository            |
| `--overwrite`         | Empty the target directory if it isn't empty  |
| `-y, --yes`           | Skip prompts and use the defaults             |

## Documentation

See the [CLI docs](https://react.hbui.dev/docs/getting-started/cli).

## License

MIT
