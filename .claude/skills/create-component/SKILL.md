---
name: create-component
description: Scaffold a new Hummingbird React component (CVA + Radix headless + cn) driven by the matching reference-css file. Use when asked to "create/add a component", "build the <X> component", or port a reference-css component (alert, badge, card, accordion, dropdown, tooltip, etc.) into packages/hummingbird-react.
---

# Create a Hummingbird React component

Build a new component in `packages/hummingbird-react/src/components/<name>/` that styles itself with Hummingbird's semantic CSS classes (NOT Tailwind utilities) and uses Radix UI headless primitives for behavior. The component's variants are **derived from the CSS**, not invented.

## Golden rules

- **The CSS is the source of truth.** Every variant/size/color a component supports must come from a real `@utility` class in `reference-css/components/<name>.css`. Never invent class names.
- **Hummingbird CSS is class-based, not Tailwind.** `cn` is `clsx`-only — do not add `tailwind-merge`. The variant is encoded in the class name (e.g. `btn-outline-primary`).
- **Radix for behavior, Hummingbird classes for looks.** Use headless primitives from the unified `radix-ui` package for interactive/compound components; apply the CSS class to each rendered part.
- **Never re-implement what Radix already gives you.** Radix owns open/selected/checked state (controlled *and* uncontrolled) and holds content mounted across exit animations via its own `Presence`. So: no controllable-open hooks, no context to share open/active state, no `useState`/`useEffect` mount/show machines. Reaching for those in an interactive component is your signal to stop — see **Step 2b**.
- **Tailwind utilities are for behavior/animation only — never looks.** Looks always come from Hummingbird classes; animation (which the semantic CSS can only do via a JS-toggled `.show`/`.fade`) instead uses Tailwind utilities keyed off Radix `data-[state]`, shadcn-style. The docs app resolves them via `@source ".../@hummingbirdui/react"` + `@import "tw-animate-css"` in `globals.css`. See **Step 2b**.
- Match the existing button conventions exactly (see `packages/hummingbird-react/src/components/button/button.tsx`).

## Step 1 — Read the CSS and extract the class map

```bash
grep -n '@utility' reference-css/components/<name>.css
```

Then read the file to understand groupings (the file has comments like `/* variant filled */`). Map what you find:

- The **base** utility (e.g. `btn`, `alert`, `card`) → CVA base class.
- **Modifier** utilities → group into variant dimensions by their naming convention:
  - Single-axis modifiers (`btn-sm`, `btn-lg`, `btn-square`) → a `size`/`shape` variant where each option maps to one class (the default option maps to `''`).
  - Two-axis modifiers that combine a style and a color (`btn-outline-primary`, `btn-subtle-danger`) → model as **two** variants (`variant`, `color`) plus `compoundVariants` that emit the combined class. This keeps the prop API clean and mirrors `button.tsx`.
- Note which options are the visual default → `defaultVariants`.
- Note any options that don't exist for every combination (e.g. button's `icon` variant has no `neutral`/`light`/`dark`) and only add the `compoundVariants` entries that real classes exist for.

## Step 2 — Decide the element & whether Radix is needed

- **Simple display/action element** (button, badge, alert, card, divider): render a plain element with `asChild` support via Radix `Slot`.
- **Interactive / compound** (accordion, dropdown, dialog, tooltip, popover, tabs): import the matching namespace from `radix-ui` (`import { Accordion } from 'radix-ui'` → `Accordion.Root`, `Accordion.Item`, …) and create one styled sub-component per part, each carrying its Hummingbird class. Spread props on every part (`ref` flows through `...props`).

> **React 19+ only.** Components are plain function components — no `React.forwardRef`. The `ref` is a normal prop and reaches the DOM element automatically via `{...props}`. The peer dep is `react >=19`; do not reintroduce `forwardRef`.

## Step 2b — For interactive components: lean on Radix, animate with `data-[state]`

This is the workflow for anything that opens/closes/selects (dialog, dropdown, tooltip, popover, tabs, accordion, …). The aim is **as little JS as possible** — Hummingbird classes for looks, your own size/variant API via CVA, and Radix for everything behavioral.

1. **Root = thin pass-through.** Wrap the Radix root and spread props. Radix already implements controlled (`open`/`value`/`checked` + `onOpenChange`/`onValueChange`/…) *and* uncontrolled (`defaultOpen`/`defaultValue`/…). Re-export the Radix prop type; do not redefine an open-state contract.

   ```tsx
   function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
     return <DialogPrimitive.Root data-slot="dialog" {...props} />;
   }
   ```

2. **One styled sub-component per part**, each carrying its Hummingbird class (looks) — exactly as before.

3. **Keep your own sizing/variant API in CVA**, mapping to real Hummingbird classes (e.g. `size="sm"` → `modal-sm`). Do **not** surface Radix-flavored sizing; expose the library's own vocabulary.

4. **Animate with `tw-animate-css` keyframes keyed off `data-[state]` — not a `.show`/`.fade` JS toggle.** Radix sets `data-state="open|closed"` (and `data-side`, `data-state="active"`, etc.) on the parts and exposes measured sizes as CSS vars (`--radix-accordion-content-height`, `--radix-popper-transform-origin`, …). Key the animation off those with `tw-animate-css` utilities. Radix's `Presence` **awaits the CSS animation** before unmounting, so the exit plays and the node still unmounts cleanly — **zero JS, no `forceMount`, no `inert`**.

   - **Fade / zoom / slide** (`dialog.tsx`, `dropdown.tsx`):

     ```tsx
     <DialogPrimitive.Content
       data-slot="dialog-content"
       className={cn(
         'modal-content',                                   // looks (Hummingbird)
         'duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-4',
         'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-4',
         className,
       )}
       {...props}
     />
     ```

   - **Height collapse** (`accordion.tsx`): `tw-animate-css` ships `animate-accordion-down`/`animate-accordion-up`, which animate `height: 0 ⇄ var(--radix-accordion-content-height)`. Wrap the body in `overflow-hidden`:

     ```tsx
     <AccordionPrimitive.Content
       data-slot="accordion-content"
       className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
       {...props}
     >…</AccordionPrimitive.Content>
     ```

   > Plain CSS *transitions* are a last resort: Radix's `Presence` does **not** await transitions, so a transition-based exit requires `forceMount` (keeping the node mounted) plus an `inert`/hidden bridge. Reach for it only when no keyframe fits — keyframes (above) avoid all of that.

5. **Drive state-dependent *looks* off `data-[state]` in the class string, not React.** When the Hummingbird CSS expresses a state via a class you can't set (e.g. it rotates the accordion chevron via `&:not(.collapsed)::after`), replicate the rule with `data-[state]` utilities instead of mirroring Radix state into a `.collapsed` class.

   ⚠️ **Watch for "always-on" base rules.** Hummingbird's `:not(.collapsed)` rule is *always true* once you stop setting `.collapsed`, so it would pin the chevron rotated. Override **both** states explicitly so the base rule no longer matters — and target the pseudo with the `[&::after]` arbitrary variant (the named `after:` variant injects `content: var(--tw-content)`, which you don't want):

   ```tsx
   <AccordionPrimitive.Trigger
     data-slot="accordion-button"
     className={cn(
       'accordion-button',
       'data-[state=closed]:[&::after]:[transform:none]',                              // flat when closed
       'data-[state=open]:[&::after]:[transform:var(--accordion-btn-icon-transform)]', // reuse the CSS's own var
       className,
     )}
     {...props}
   />
   ```

   Both rules match the base rule's specificity and are emitted later in the `utilities` layer, so they win; the `::after`'s existing transform transition animates the flip. No `useState`/`useEffect`/`MutationObserver`.

**Anti-patterns to delete on sight:** `useControllableOpen`-style hooks; a context just to share `open`/`show`; a `mounted` + `requestAnimationFrame`/`setTimeout` machine to play a transition; a `MutationObserver`/`useState` that mirrors `data-state` back into a class. All of these are replaced by (1), (4), and (5).

## Step 3 — Write `<name>.tsx`

Follow this template (simple, `asChild`-capable component); interactive/compound components follow **Step 2b** instead. Adapt the variant object to what Step 1 produced.

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

const <name>Variants = cva('<base-class>', {
  variants: {
    // one key per dimension found in the CSS; default option => ''
    variant: { /* ... */ },
    color: { /* ... */ },
    size: { /* ... */ },
  },
  compoundVariants: [
    // only for combined classes that actually exist in the CSS
    // { variant: 'outline', color: 'primary', class: '<base>-outline-primary' },
  ],
  defaultVariants: {
    // the visual defaults
  },
});

export interface <Name>Props
  extends Omit<React.ComponentProps<'<element>'>, 'color'>,
    VariantProps<typeof <name>Variants> {
  /** Render as a child element (e.g. a link). Uses Radix Slot. */
  asChild?: boolean;
}

function <Name>({ className, variant, color, size, asChild = false, ...props }: <Name>Props) {
  const Comp = asChild ? Slot.Root : '<element>';

  return (
    <Comp
      className={cn(<name>Variants({ variant, color, size }), className)}
      {...props}
    />
  );
}

<Name>.displayName = '<Name>';

export { <Name>, <name>Variants };
```

Key conventions (do not deviate):

- **`React.ComponentProps<'<element>'>`** for the props (it includes `ref`). For a compound Radix part use `React.ComponentProps<typeof <Primitive>.<Part>>`.
- **`Omit<…, 'color'>`** on the props interface whenever the CVA has a `color` variant — the native HTML `color` attribute conflicts with it.
- **Plain function component, no `forwardRef`.** `ref` flows to the element through `{...props}` (React 19+). Only destructure `ref` explicitly when you must merge it with an internal ref.
- **`cn(<name>Variants({...}), className)`** — variants first, consumer `className` last so it wins.
- **`displayName`** set explicitly (required; there's a test for it).
- Export both the component and the `<name>Variants` function (named exports, no default).
- For compound Radix components, repeat this pattern per part and export all parts.

## Step 4 — Wire up the barrels

1. Create `src/components/<name>/index.ts`:
   ```ts
   export * from './<name>';
   ```
2. Add ONE line to `src/components/index.ts`:
   ```ts
   export * from './<name>';
   ```
   (The root `src/index.ts` and `package.json` exports auto-pick it up via the `./*` wildcard and the `src/components/*/index.ts` build glob — never edit those.)

## Step 5 — Verify

```bash
cd packages/hummingbird-react
npx tsc --noEmit          # must be clean
npm run build             # produces dist/components/<name>/index.js
```

Then write tests with the `create-component-test` skill.

## Checklist

- [ ] Every class used exists in `reference-css/components/<name>.css`
- [ ] Two-axis classes modeled via `compoundVariants`, only for combos that exist
- [ ] `defaultVariants` set to the visual defaults
- [ ] `Omit<…, 'color'>` when a `color` variant exists
- [ ] Plain function component (no `forwardRef`), `React.ComponentProps<…>`, `cn(variants, className)`, explicit `displayName`
- [ ] Radix primitives used for interactive/compound behavior
- [ ] **Interactive:** no re-implemented Radix state — no controllable-open hook, no context for open/active state, no `useState`/`useEffect`/`useCallback` mount/show machine (root is a thin pass-through)
- [ ] **Interactive:** animation via `data-[state]` keyframes (`tw-animate-css`) — not a JS-toggled `.show`/`.fade` class (transition + `forceMount` only as a last resort)
- [ ] `<name>/index.ts` created + one line added to `components/index.ts`
- [ ] `tsc --noEmit` clean and `npm run build` succeeds
