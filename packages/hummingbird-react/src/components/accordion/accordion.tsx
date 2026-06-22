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
  ref: forwardedRef,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  // The Hummingbird CSS rotates the chevron via `&:not(.collapsed)`, but Radix
  // tracks open state through `data-state`. Bridge the two: add `collapsed`
  // whenever Radix reports the trigger is not open.
  const innerRef = React.useRef<HTMLButtonElement | null>(null);
  const [collapsed, setCollapsed] = React.useState(true);

  React.useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const sync = () => setCollapsed(node.getAttribute('data-state') !== 'open');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(node, { attributes: true, attributeFilter: ['data-state'] });
    return () => observer.disconnect();
  }, []);

  const ref = React.useCallback(
    (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef && typeof forwardedRef === 'object') {
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    },
    [forwardedRef]
  );

  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-button"
      className={cn('accordion-button', collapsed && 'collapsed', className)}
      {...props}
    />
  );
}
AccordionTrigger.displayName = 'AccordionTrigger';

function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-body"
      className={cn('accordion-body', className)}
      {...props}
    />
  );
}
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
