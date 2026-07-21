'use client';

import * as React from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

function CollapsibleRoot({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}
CollapsibleRoot.displayName = 'Collapsible';

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}
CollapsibleTrigger.displayName = 'Collapsible.Trigger';

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
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
CollapsibleContent.displayName = 'Collapsible.Content';

const Collapsible = /* @__PURE__ */ Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});

namespace Collapsible {
  export type Props = React.ComponentProps<typeof CollapsibleRoot>;
  export type RootProps = React.ComponentProps<typeof CollapsibleRoot>;
  export type TriggerProps = React.ComponentProps<typeof CollapsibleTrigger>;
  export type ContentProps = React.ComponentProps<typeof CollapsibleContent>;
}

export { Collapsible };
