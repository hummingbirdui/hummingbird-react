<div align="center">
   <a href="https://react.hbui.dev/">
      <img  width="350" src='https://raw.githubusercontent.com/hummingbirdui/hummingbird/87dc656e578d3e6fd0e4a45eabe1f5e02bdeafd1/apps/docs/public/images/logos/hummingbird-lg.svg' alt="Logo" class="w-10 h-10" />
   </a>

Modern, accessible, and customizable React components built with Radix UI and Tailwind CSS.

![downloads](https://img.shields.io/npm/dt/@hummingbirdui/react?style=flat-square)
![npm](https://img.shields.io/npm/v/@hummingbirdui/react?style=flat-square)
![license](https://img.shields.io/npm/l/@hummingbirdui/react?style=flat-square)

</div>

---

## Table of contents

- [Documentation](#documentation)
- [Getting Started](#getting-started)
- [Installation](#installation)
  - [Install Tailwind CSS](#1-install-tailwind-css)
  - [Install Hummingbird React](#2-install-hummingbird-react)
  - [Import CSS](#3-import-css)
  - [Use components](#4-use-components)
- [Per-component imports](#per-component-imports)
- [TypeScript Support](#typescript-support)
- [License](#license)
- [Contribution guidelines](#contribution-guidelines)
- [Meet the Team](#meet-the-team)
- [Contributors](#contributors)

## Documentation

Comprehensive documentation is available at [react.hbui.dev](https://react.hbui.dev/).

## Getting started

Hummingbird React brings the Hummingbird component system to React. Components are styled by [Hummingbird CSS](https://github.com/hummingbirdui/hummingbird) and powered by [Radix UI](https://www.radix-ui.com/) primitives for behavior and accessibility. You can:

- Use fully styled, accessible components out of the box
- Import individual components from their own subpaths to keep bundles small
- Customize any component with Tailwind utility classes via `className`

## Installation

### 1. Install Tailwind CSS

Ensure you have a project set up with Tailwind CSS. If you haven't set up Tailwind CSS yet, follow the <a href="https://tailwindcss.com/docs/installation" target="_blank" rel="noopener noreferrer">official installation guide</a>.

### 2. Install Hummingbird React

Install Hummingbird React via your preferred package manager. The `@hummingbirdui/hummingbird` package provides the styles and is required as a peer dependency.

```bash
# Using npm
npm install @hummingbirdui/react

# Using yarn
yarn add @hummingbirdui/react
```

### 3. Import CSS

Import Hummingbird styles in your main CSS file (e.g., `globals.css`), and register the package as a source so the Tailwind compiler scans it for class names.

```css
@import "tailwindcss";
@import "@hummingbirdui/hummingbird";
@source "../node_modules/@hummingbirdui/react";
```

The `@source` directive is required because Tailwind does not scan node_modules by default. Since Hummingbird generates component classes on demand, Tailwind must scan the `@hummingbirdui/react` package. Update the relative path so it points to node_modules from your CSS file.

No per-component CSS imports or manual purge configuration are needed.

### 4. Use components

Import any component and use it in your application.

```tsx
import { Button } from "@hummingbirdui/react";

export default function App() {
  return (
    <Button variant="filled" color="primary">
      Click me
    </Button>
  );
}
```

## Per-component imports

Every component is also available from its own subpath. This keeps the bundle small because only the imported components are included.

```tsx
import { Button } from "@hummingbirdui/react/button";
import { Alert, AlertIcon } from "@hummingbirdui/react/alert";
```

The `cn` utility for merging class names is available from the `utils` subpath.

```tsx
import { cn } from "@hummingbirdui/react/utils";
```

## TypeScript support

Hummingbird React is written in TypeScript and includes type definitions for all components. Component props are fully typed, so no additional `@types` packages are needed.

```tsx
import { Button, type ButtonProps } from "@hummingbirdui/react/button";
```

## License

This project is licensed under the MIT License.

## Contribution guidelines

To contribute code:

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
   This will start the documentation site locally, allowing you to see changes in real-time.

   ```sh
   pnpm dev
   ```

   The site will typically be available at `http://localhost:3000` (or another port if 3000 is busy).

5. **Create a new branch** for your feature or bug fix:

   ```sh
   git checkout -b feature-or-bugfix-name
   ```

6. **Make your changes**:
   - If modifying the library, work in `packages/hummingbird-react/src/`.
   - If updating documentation, work in `apps/docs/`.

7. **Build the project** (optional but recommended before committing):
   To ensure everything builds correctly:

   ```sh
   pnpm build
   ```

8. **Commit your changes**:

   ```sh
   git commit -m "Your descriptive commit message"
   ```

9. **Push your changes** to your fork:

   ```sh
   git push origin feature-or-bugfix-name
   ```

10. **Open a pull request** against the `main` branch.

## Meet the team

Meet the core team behind Hummingbird:

<table>
  <tr>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/877255?v=4" width="80" height="80"/><br/>
      <sub><b>Ashraful Prium</b></sub><br/>
      <code>prium</code><br/>
      Founder
    </td>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/12842959?v=4" width="80" height="80"/><br/>
      <sub><b>Muazzem Hussen Chowdhury</b></sub><br/>
      <code>ovi003</code><br/>
      Engineering Manager
    </td>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/86622751?v=4" width="80" height="80"/><br/>
      <sub><b>Khayrul Islam</b></sub><br/>
      <code>khayrul25</code><br/>
      Senior Frontend Developer
    </td>
  </tr>
</table>

## Contributors

Thanks goes to these amazing people:

<a href="https://github.com/hummingbirdui/hummingbird-react/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hummingbirdui/hummingbird-react" />
</a>
