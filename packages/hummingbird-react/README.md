# @hummingbirdui/react

React component library built with Hummingbird CSS and Radix UI primitives.

## Overview

`@hummingbirdui/react` provides accessible, fully styled React components that extend the Hummingbird ecosystem into React without adding a new CSS system or duplicating styling work.

**Core principle:** Hummingbird CSS owns the visuals. Radix UI owns the behavior. This package is the bridge.

## Installation

```bash
npm install @hummingbirdui/react
```

### Peer Dependencies

- `react` >= 18
- `react-dom` >= 18
- `@hummingbirdui/hummingbird` >= 1.0

## Setup

Add Hummingbird CSS imports to your global stylesheet:

```css
/* globals.css */
@import "tailwindcss";
@import "@hummingbirdui/hummingbird";
```

That's it! No per-component CSS imports or manual purge configuration needed.

## Usage

```tsx
import { Button } from '@hummingbirdui/react';

export function App() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

## Components

### Button

Fully accessible button component with multiple variants and sizes.

```tsx
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

#### Props

- `variant`: `'default' | 'primary' | 'outline' | 'ghost' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'`
- `size`: `'sm' | 'md' | 'lg'`
- `className`: Custom classes (merged with component classes)
- All standard HTML button attributes

## Architecture

### Technology Stack

| Concern | Tool |
|---------|------|
| Language | TypeScript 5 (strict) |
| Build | tsup (esbuild-based) |
| Components | React 18+ |
| Behavior | Radix UI |
| Styling | Hummingbird CSS |
| Variants | class-variance-authority |
| Class merging | clsx + tailwind-merge |
| Testing | Vitest + React Testing Library |

### Build Output

Built with **tsup** featuring:
- **Splitting**: Each component is a separate chunk
- **Tree-shaking**: Unused components don't ship to consumers
- **Formats**: ESM and CommonJS
- **Types**: Full TypeScript definitions with source maps

Result: A consumer importing only `<Button />` gets only button JS and CSS in their build.

### Component Pattern

Every component follows the same pattern:

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const componentVariants = cva('base-class', {
  variants: {
    variant: { /* ... */ },
    size: { /* ... */ },
  },
  defaultVariants: { /* ... */ },
});

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <element
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Component.displayName = 'Component';
export { Component, componentVariants };
```

## Non-Functional Requirements

- **Accessibility**: All interactive components meet WCAG 2.1 Level AA
- **Bundle size**: Full package < 40 KB gzipped; per-component < 2 KB
- **SSR**: All components render safely on the server
- **TypeScript**: Strict mode, no `any` in public APIs
- **React**: 18+ compatible, no deprecated APIs
- **Browsers**: Chrome/Edge/Firefox (last 2), Safari 16+

## Development

### Commands

```bash
# Build
pnpm build

# Watch mode
pnpm dev

# Test
pnpm test

# Type check
pnpm check-types

# Lint
pnpm lint

# Format
pnpm format
```

### Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── utils/
│   └── cn.ts
└── index.ts
```

### Testing

Tests are written with Vitest and React Testing Library:

```bash
pnpm test
pnpm test:ui  # Interactive UI
```

## Documentation

Full documentation and interactive examples are available at [hbui.dev](https://hbui.dev).

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT © Hummingbird

## Related

- [Hummingbird CSS](https://github.com/hummingbirdui/hummingbird)
- [Radix UI](https://www.radix-ui.com/)
- [class-variance-authority](https://cva.style/)
