<div align="center">
   <a href="https://react.hbui.dev/">
      <img src="https://raw.githubusercontent.com/hummingbirdui/hummingbird-react/main/apps/docs/public/images/logos/hummingbird-react-wordmark.svg" alt="hummingbird React" height="40" />
   </a>

React components for Hummingbird, built with Tailwind CSS.

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
- [TypeScript Support](#typescript-support)
- [License](#license)
- [Contribution guidelines](#contribution-guidelines)
- [Meet the Team](#meet-the-team)
- [Contributors](#contributors)

## Documentation

Comprehensive documentation is available at [react.hbui.dev](https://react.hbui.dev/).

## Getting started

Hummingbird React is the official React component library for the [Hummingbird](https://hbui.dev/) design system. It provides a large set of accessible, fully styled React components such as buttons, forms, dialogs, and dropdowns, along with patterns suitable for dashboards, SaaS applications, and e-commerce systems.

## Installation

### 1. Install Tailwind CSS

Ensure the project is set up with Tailwind CSS. If Tailwind CSS hasn't been set up yet, follow the <a href="https://tailwindcss.com/docs/installation" target="_blank" rel="noopener noreferrer">official installation guide</a>.

### 2. Install Hummingbird React

Install Hummingbird React via a preferred package manager:

```bash
# Using pnpm
pnpm add @hummingbirdui/react

# Using npm
npm install @hummingbirdui/react

# Using yarn
yarn add @hummingbirdui/react
```

### 3. Import CSS

Import Hummingbird styles in your main CSS file (e.g., `globals.css`).

```css
@import "tailwindcss";
@import "@hummingbirdui/react";
```

### 4. Use components

Import any component and use it in your application.

```tsx
import { Button } from "@hummingbirdui/react";

export default function App() {
  return (
    <Button color="secondary">Click me</Button>
  );
}
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
  <tr>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/141500318?v=4" width="80" height="80"/><br/>
      <sub><b>Riazul Islam</b></sub><br/>
      <code>riazul01</code><br/>
      Software Engineer
    </td>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/61972765?v=4" width="80" height="80"/><br/>
      <sub><b>Md. Raihanul Haq</b></sub><br/>
      <code>Raihan-Niloy</code><br/>
      UI/UX Designer
    </td>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/236851058?v=4" width="80" height="80"/><br/>
      <sub><b>Pantha Sharma</b></sub><br/>
      <code>Pantha-25</code><br/>
      UI/UX Designer
    </td>
  </tr>
  <tr>
    <td align="center" width="200">
      <img src="https://avatars.githubusercontent.com/u/110757982?v=4" width="80" height="80"/><br/>
      <sub><b>Qurratul Aein Rafia</b></sub><br/>
      <code>RafiAein</code><br/>
      Editorial Strategist
    </td>
  </tr>
</table>

## Contributors

Thanks goes to these amazing people:

<a href="https://github.com/hummingbirdui/hummingbird-react/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hummingbirdui/hummingbird-react" />
</a>
