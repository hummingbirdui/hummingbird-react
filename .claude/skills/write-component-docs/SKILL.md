---
name: write-component-docs
description: Write the docs MDX page for a Hummingbird React component in apps/docs/content/docs/components/, with live ComponentPreview examples covering every variant/state, a full inline API Reference (PropsTable/DataAttributesTable per part, mirroring the Radix API reference), and a Styling section. Use when asked to "write/add docs for <X>", "document the <X> component", or "create the <X> mdx page".
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

import { <Roots> } from "@hummingbirdui/react";

export default function <ExampleName>() {
  return ( /* the demo */ );
}
```

- `"use client"` directive is required (examples are interactive / composed into
  server-rendered MDX).
- Default export, named like the example.
- Import only compound roots from `@hummingbirdui/react` (a single-component subpath
  like `@hummingbirdui/react/button` also works); reference parts with dot notation
  (`Card.Header`, `Dropdown.Item`) — flat part names are not exported.
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

Mirror the **full Radix API reference inline, per part** — `accordion.mdx` and
`popover.mdx` are the templates. Do NOT link out to Radix in place of tables; the
only Radix link is the one-line intro:

```mdx
## API Reference

Built on the [Radix UI <Name>](https://www.radix-ui.com/primitives/docs/components/<name>) primitive. Each part forwards all props to its Radix counterpart.
```

Then one `### <Name>` / `### <Name>.<Part>` sub-heading per part, each with a
one-sentence description and its tables:

1. **Verify every Radix prop passes through before tabling it.** Read the wrapper.
   Each part must spread `{...props}` onto its Radix primitive for the Radix prop to
   work. Note any part that intercepts a prop (e.g. `Accordion.Content` applies
   `className` to the inner `accordion-body`, not the Radix `Content` root) — that
   is the wrapper's own behavior, not Radix's. Omit props the wrapper hardcodes.
2. **`<PropsTable>` = full prop set**: every Radix prop that passes through (copy
   the descriptions from Radix's API reference, `asChild` first), then the wrapper's
   own CVA/custom props, then `className` as the **last row** (`type: "string"`,
   description "Additional classes merged with the generated classes."). Use
   `typeSimple` ("enum", "function", "number", …) when `type` is a union or
   signature. Required props are marked with a trailing `*` (`prop: "type*"`).
3. **`<DataAttributesTable>` after the props** (separated by `<br />`) for every
   part on which Radix sets `data-*` attributes (`[data-state]`, `[data-side]`,
   `[data-value]`, …), with the `values` array listing the literal values or a
   short phrase (e.g. `"The current value"`).
4. **`<CssVariablesTable>`** when Radix exposes CSS variables on the part
   (`--radix-<name>-content-transform-origin`, measured width/height vars, …) — see
   `popover.mdx`/`accordion.mdx`.
5. **A part with no props still gets its sub-heading** and one-line description
   ("Renders a `div` with Hummingbird's `popover-header` class.") — a `className`
   passthrough alone is worth a one-row table (see `Progress.Stacked`).

`<PropsTable>` row shape (`prop`, `type`, optional `typeSimple`, optional
`default`, `description`; description may be JSX):

```mdx
<PropsTable
  data={[
    { prop: "<prop>", type: '"a" | "b"', typeSimple: "enum", default: '"a"', description: "…" },
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
- [ ] Radix-backed: full API tables inline per part (props + data attributes + CSS variables), each Radix prop confirmed to spread through the wrapper
- [ ] Every `PropsTable` lists the full prop set (`asChild` first when supported) and ends with a `className` row
- [ ] Prose is short — one sentence per section, no boilerplate "Renders a `<div>`." lines under API sub-headings
- [ ] Frontmatter `title` + third-person `description`; Styling section with the two hbui.dev links
