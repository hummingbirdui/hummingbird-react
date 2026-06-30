'use client';

import * as React from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

// Collapsible has no dedicated `reference-css/components/collapsible.css` file —
// it's a purely behavioral primitive (a single trigger that shows/hides one
// panel) with no variants/sizes/colors to derive. So there are no Hummingbird
// "looks" classes to apply; the parts carry `data-slot` hooks and pass through
// className/props, with the open/close height animation handled the same
// zero-JS way as the Accordion.

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}
Collapsible.displayName = 'Collapsible';

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  // Collapse animation with zero JS: tw-animate-css's `collapsible-down`/`-up`
  // keyframes animate `height` 0 ⇄ `var(--radix-collapsible-content-height)`
  // (the height Radix measures and exposes). Radix's `Presence` awaits the CSS
  // *animation*, so it plays the close before unmounting the panel — no
  // `forceMount`/`inert` needed. `overflow-hidden` clips the body mid-animation.
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        'overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
        className
      )}
      {...props}
    />
  );
}
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
