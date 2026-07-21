'use client';

import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

function AccordionRoot({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('accordion', className)}
      {...props}
    />
  );
}
AccordionRoot.displayName = 'Accordion';

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
AccordionItem.displayName = 'Accordion.Item';

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
AccordionHeader.displayName = 'Accordion.Header';

function AccordionTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-button"
      className={cn(
        'accordion-button',
        'data-[state=closed]:[&::after]:[transform:none]',
        'data-[state=open]:[&::after]:[transform:var(--accordion-btn-icon-transform)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
      {...props}
    />
  );
}
AccordionTrigger.displayName = 'Accordion.Trigger';

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
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
AccordionContent.displayName = 'Accordion.Content';

const Accordion = /* @__PURE__ */ Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

namespace Accordion {
  export type Props = React.ComponentProps<typeof AccordionRoot>;
  export type RootProps = React.ComponentProps<typeof AccordionRoot>;
  export type ItemProps = React.ComponentProps<typeof AccordionItem>;
  export type HeaderProps = React.ComponentProps<typeof AccordionHeader>;
  export type TriggerProps = React.ComponentProps<typeof AccordionTrigger>;
  export type ContentProps = React.ComponentProps<typeof AccordionContent>;
}

export { Accordion };
