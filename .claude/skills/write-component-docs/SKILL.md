---
name: write-component-docs
description: Write the docs MDX page for a Hummingbird React component in apps/docs/content/docs/components/, with live ComponentPreview examples covering every variant/state, a Radix-redirect API Reference, and a Styling section. Use when asked to "write/add docs for <X>", "document the <X> component", or "create the <X> mdx page".
---

# Write Hummingbird React component docs

Author the MDX page at `apps/docs/content/docs/components/<name>.mdx` and the live
example files that back it. Mirror the structure of an existing page —
`button.mdx` (simple component) or `accordion.mdx` (compound / Radix component).

## Golden rules

- **Cover every example.** Each visual axis the component exposes (variant, color,
  size, shape, state) and every behavioral state (disabled, loading, multiple,
  controlled, …) gets its own `##` section and live `<ComponentPreview>`. Read the
  component source and its `reference-css/components/<name>.css` to enumerate what
  exists — do not stop at the obvious two or three.
- **Third person only.** Describe the component, never address the reader. Write
  "Setting `collapsible` allows the open panel to close" — not "You can set
  `collapsible`…". No "you", "your", "we", or imperative "use this to…" prose.
  (Frontmatter `description` is also third person.)
- **Verify Radix props before documenting them.** For a Radix-backed component,
  confirm the prop actually passes through the `@hummingbirdui/react` wrapper before
  pointing the reader at Radix's docs — see **Step 4**.
- **Live examples, never inline JSX.** Every demo is a registry example rendered
  through `<ComponentPreview name="…" />`, so the preview and its source code stay
  in sync. Do not hand-write component trees inside the MDX.
- **Keep prose short and straightforward.** One sentence per section stating what the
  prop/part does. Cut secondary clauses that restate the obvious ("Combined with
  `asChild`, the badge renders as an anchor" → delete). Under an API-reference
  sub-heading, put the `<PropsTable>` directly — no "Renders a `<span>`." filler line
  (follow Radix's API-reference style, or skip the line entirely). Prop descriptions
  are one plain phrase.

## Step 1 — Enumerate what to document

```bash
# what the component actually supports
sed -n '1,200p' packages/hummingbird-react/src/components/<name>/<name>.tsx
grep -n '@utility' reference-css/components/<name>.css
```

List every prop/variant/state. Each becomes a section. Typical sets:

- **Simple component** (button): Default, Variants, Colors, Sizes, Shapes,
  with-icon, Disabled, … — one section per CVA dimension plus notable states.
- **Compound / Radix component** (accordion): Default, plus each behavioral mode
  (`Multiple`, `Disabled`, controlled, …).

## Step 2 — Write one example file per section

Create `apps/docs/registry/examples/<component>/<example>.tsx`:

```tsx
"use client";

import { <Parts> } from "@hummingbirdui/react";

export default function <ExampleName>() {
  return ( /* the demo */ );
}
```

- `"use client"` directive is required (examples are interactive / composed into
  server-rendered MDX).
- Default export, named like the example.
- Import from `@hummingbirdui/react` (a single-component subpath like
  `@hummingbirdui/react/button` also works).
- Keep demos self-contained and minimal — they double as copy-paste source.
- Escape JSX entities in copy (`&apos;`, `&quot;`) and wrap inline code in `<code>`.

Register each in `apps/docs/registry/index.ts`:

```ts
"<component>-<example>": { file: "<component>/<example>.tsx" },
```

## Step 3 — Write the MDX page

```mdx
---
title: <Name>
description: <One third-person sentence describing the component.>
---

## Default

<One- or two-line third-person explanation.>

<ComponentPreview name="<component>-default" />

## <Each other axis / state>

<Explanation.>

<ComponentPreview name="<component>-<example>" />

## API Reference

<see Step 4>

## Styling

Hummingbird React <name> is styled entirely through Hummingbird's utility classes
and CSS variables.

- See the full list of available <name> classes in the [Class overview](https://hbui.dev/docs/components/<name>/#class-overview).
- Visit the [CSS Variables](https://hbui.dev/docs/components/<name>/#css-variables) documentation to explore all available variables.
```

No nav/meta edit is needed — `content/docs/components/` has no `meta.json`, so pages
are picked up automatically.

## Step 4 — API Reference (Radix-backed components)

The rule, derived from how these wrappers work:

1. **Verify every Radix prop passes through.** Read the wrapper. Each part must
   spread `{...props}` onto its Radix primitive for the Radix prop to work. Note any
   part that intercepts a prop (e.g. `AccordionContent` applies `className` to the
   inner `accordion-body`, not the Radix `Content` root) — that is the wrapper's own
   behavior, not Radix's.
2. **Redirect shared props to Radix — do not re-document them.** When the props are
   the same as Radix's, link out instead of rebuilding a table:

   ```mdx
   For detailed usage guidelines, see the [Radix UI](https://www.radix-ui.com/primitives/docs/components/<name>#api-reference) documentation.
   ```

3. **Only table genuinely new props.** When a part introduces a prop that is *not*
   from Radix, add a `<PropsTable>` for those props, component-wise. If a part adds
   nothing of its own, it gets no table — redirect and move on.
4. **Whenever a table exists, include a `className` row.** Any part that gets a
   `<PropsTable>` lists `className` as the last row (`type: "string"`, description
   "Additional classes merged with the generated classes."). A part with no new props
   gets no table, so `className` is not tabled there.

`<PropsTable>` shape (`prop`, `type`, optional `default`, `description`; description
may be JSX):

```mdx
<PropsTable
  data={[
    { prop: "<new-prop>", type: '"a" | "b"', default: '"a"', description: "…" },
  ]}
/>
```

For a non-Radix (CVA) component like Button, table the component's own props
directly (variant, color, size, shape, asChild, className) as in `button.mdx`.

## Checklist

- [ ] One `##` section + `<ComponentPreview>` for every variant/color/size/state the component supports
- [ ] Every preview has a registered example file under `registry/examples/<component>/` and a line in `registry/index.ts`
- [ ] All prose is third person — no "you"/"your"/"we"/imperative
- [ ] Example files: `"use client"`, default export, import from `@hummingbirdui/react`
- [ ] Radix-backed: confirmed each documented Radix prop spreads through the wrapper; shared props redirect to Radix
- [ ] `PropsTable` only for parts with genuinely new props; every table that exists ends with a `className` row
- [ ] Prose is short — one sentence per section, no boilerplate "Renders a `<div>`." lines under API sub-headings
- [ ] Frontmatter `title` + third-person `description`; Styling section with the two hbui.dev links
