---
name: create-component-test
description: Write a Vitest + Testing Library test file for a Hummingbird React component, following the button.test.tsx structure (rendering, interactions, every variant/color/size/shape, class merging, ref forwarding, asChild, displayName, a11y, and the variants() function). Use when asked to "add tests", "test the <X> component", or "create a test file".
---

# Create a component test file

Write `packages/hummingbird-react/src/components/<name>/<name>.test.tsx` mirroring the reference test at `packages/hummingbird-react/src/components/button/button.test.tsx`. Tests assert the **Hummingbird CSS classes** the component emits and its behavior — they are class- and a11y-driven.

## Setup facts (already configured — rely on them)

- Runner: **Vitest** with `globals: true`, `jsdom`, setup file `src/test-setup.ts` (imports `@testing-library/jest-dom/vitest`, so matchers like `toBeInTheDocument`/`toHaveClass` are typed and available).
- `tsconfig.json` includes test files, so `npm run check-types` type-checks them. **Import the component with the correct lowercase path** (`'./<name>'`, not `'./<Name>'`) — casing is enforced.

## Required imports

```tsx
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { <Name>, <name>Variants } from './<name>';
```

## Derive the cases from the component, not guesswork

Open `<name>.tsx` and read its `cva` config. The arrays you loop over in tests must match the `variants`/`compoundVariants` exactly:

- One `describe` per variant dimension (`Variants`, `Colors`, `Sizes`, `Shapes`, …) — include only the dimensions the component actually has.
- For each option, assert the **exact class** the CSS/`compoundVariants` produce (e.g. `btn-outline-${color}`), and skip default options that map to `''` (assert only the base class is present).
- Mirror real gaps: if a combo has no class (e.g. button's `icon` variant excludes `neutral`/`light`/`dark`), filter those out of the loop just like `button.test.tsx`.

## Structure to follow (adapt to the component)

Use these `describe` blocks, dropping any that don't apply:

1. **Rendering** — renders the right element, text content, and children.
2. **Interactions** — click via `userEvent.setup()`; `disabled` state; no click when disabled; preserved native attributes (e.g. `type`). Only for interactive components.
3. **Variants / Colors / Sizes / Shapes** — loop each option, `render`, assert exact class, then `unmount()` before the next render (avoids duplicate matches).
4. **Class Merging** — base class always present; custom `className` is appended and coexists with variant classes (consumer class wins ordering).
5. **Ref Forwarding** — `React.createRef<HTML…Element>()`, assert `ref.current instanceof HTML…Element` and that it exposes element properties.
6. **asChild Prop** — render `<<Name> asChild><a href="…">…</a></<Name>>`; assert it renders the child element (e.g. `link` role), the Hummingbird classes are applied to it, and the child's own attributes/classes are preserved.
7. **Display Name** — `expect(<Name>.displayName).toBe('<Name>')`.
8. **Accessibility** — keyboard activation (`{Enter}`/`{Space}`), `aria-label`, `aria-describedby`, correct role/tag. For Radix compound components, assert the relevant ARIA wiring (e.g. `aria-expanded`, `role`).
9. **`<name>Variants` function** — separate top-level `describe`: call `<name>Variants()` and `<name>Variants({ ... })` directly and assert the returned string `.toContain(...)` the expected classes for default and combined inputs.

## Conventions (match button.test.tsx)

- Query by role + accessible name: `screen.getByRole('button', { name: /…/i })`.
- When looping renders, **always `unmount()`** between iterations.
- Use `as const` arrays for option lists so they're typed against the component's props.
- Assert classes with `toHaveClass('btn', 'btn-primary')`; assert the variants function output with `expect(classes).toContain('…')`.
- Use `vi.fn()` for handlers; `await user.click(...)` / `await user.keyboard(...)`.

## Verify

```bash
cd packages/hummingbird-react
npx vitest run src/components/<name>/<name>.test.tsx
npx tsc --noEmit
```

Both must pass. Aim to cover every variant/color/size/shape option and the asChild + a11y paths, as `button.test.tsx` does.
