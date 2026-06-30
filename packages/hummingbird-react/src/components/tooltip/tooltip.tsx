'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

/**
 * Tooltip provider. Thin pass-through over Radix `Tooltip.Provider` — it shares
 * the open/close delay across every tooltip beneath it. `Tooltip` wraps itself
 * in one of these, so it works standalone; mount a single provider higher up if
 * you want to share a delay across many tooltips.
 */
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
TooltipProvider.displayName = 'TooltipProvider';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

/**
 * Tooltip root. A thin pass-through over Radix `Tooltip.Root` — Radix owns all
 * open-state behavior (controlled via `open`/`onOpenChange`, uncontrolled via
 * `defaultOpen`) and keeps the content mounted across the exit animation via its
 * own `Presence`. The fade/scale transition lives entirely on the content as
 * `data-[state]` animation utilities, so no React state, context, or effects are
 * needed here. The root is wrapped in a `TooltipProvider` so it works on its own.
 */
function Tooltip({ ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}
Tooltip.displayName = 'Tooltip';

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}
TooltipTrigger.displayName = 'TooltipTrigger';

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  // `.tooltip` is the positioned wrapper (`opacity-0` by default); the `.show`
  // class flips it to its resting visible state. We keep `show` applied — Radix
  // only mounts the content while open — and drive the fade/scale entirely off
  // Radix's `data-[state=open|closed]` via tw-animate-css keyframes, which
  // Radix's `Presence` awaits before unmounting. `.tooltip-inner` is the dark
  // padded bubble that holds the label. The Bootstrap arrow utilities are
  // omitted: they only apply under the `[data-popper-placement]` attribute Radix
  // never sets (Radix uses `data-side`).
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
        {/* Radix's Arrow auto-positions/rotates per side (the Hummingbird
            `.tooltip-arrow` class can't be used — it positions via the
            `[data-popper-placement]` attribute Radix never sets). Its fill reuses
            the Hummingbird `--tooltip-bg` token, which cascades from `.tooltip`. */}
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
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
