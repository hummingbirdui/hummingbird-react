'use client';

import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('accordion', className)}
      {...props}
    />
  );
}
Accordion.displayName = 'Accordion';

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('accordion-item', className)}
      {...props}
    />
  );
}
AccordionItem.displayName = 'AccordionItem';

function AccordionHeader({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Header>) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={cn('accordion-header', className)}
      {...props}
    />
  );
}
AccordionHeader.displayName = 'AccordionHeader';

function AccordionTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  // Hummingbird rotates the `::after` chevron via `&:not(.collapsed)::after`,
  // which is ALWAYS true here — we never add `.collapsed` (Radix tracks state
  // through `data-state`), so the base rule would pin the chevron rotated. Drive
  // the rotation off `data-state` instead so it actually toggles: flat when
  // closed, rotated (reusing the CSS's own `--accordion-btn-icon-transform`)
  // when open. Both rules win over the base (same specificity, emitted later in
  // the utilities layer); the `::after`'s existing transform transition animates
  // the flip.
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-button"
      className={cn(
        'accordion-button',
        'data-[state=closed]:[&::after]:[transform:none]',
        'data-[state=open]:[&::after]:[transform:var(--accordion-btn-icon-transform)]',
        className
      )}
      {...props}
    />
  );
}
AccordionTrigger.displayName = 'AccordionTrigger';

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  // Collapse animation with zero JS: tw-animate-css's `accordion-down`/`-up`
  // keyframes animate `height` 0 ⇄ `var(--radix-accordion-content-height)` (the
  // height Radix measures and exposes). Radix's `Presence` awaits the CSS
  // *animation*, so it plays the close before unmounting and removes the closed
  // panel from the DOM (and the a11y tree) on its own — no `forceMount`/`inert`
  // needed. `overflow-hidden` clips the body while the height animates.
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
      {...props}
    >
      <div data-slot="accordion-body" className={cn('accordion-body', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
