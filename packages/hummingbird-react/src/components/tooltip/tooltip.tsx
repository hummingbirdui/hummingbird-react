'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}
TooltipProvider.displayName = 'Tooltip.Provider';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function TooltipRoot({ ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}
TooltipRoot.displayName = 'Tooltip';

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}
TooltipTrigger.displayName = 'Tooltip.Trigger';

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'tooltip show origin-[var(--radix-tooltip-content-transform-origin)]',
          'duration-150 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
          'data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[state=instant-open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      >
        <div className="tooltip-inner">{children}</div>
        <TooltipPrimitive.Arrow
          data-slot="tooltip-arrow"
          width={12}
          height={6}
          className="fill-[var(--tooltip-bg)]"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
TooltipContent.displayName = 'Tooltip.Content';

const Tooltip = /* @__PURE__ */ Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

namespace Tooltip {
  export type Props = React.ComponentProps<typeof TooltipRoot>;
  export type RootProps = React.ComponentProps<typeof TooltipRoot>;
  export type ProviderProps = React.ComponentProps<typeof TooltipProvider>;
  export type TriggerProps = React.ComponentProps<typeof TooltipTrigger>;
  export type ContentProps = React.ComponentProps<typeof TooltipContent>;
}

export { Tooltip };
