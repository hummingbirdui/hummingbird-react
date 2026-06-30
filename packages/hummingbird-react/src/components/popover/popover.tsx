'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

/**
 * Popover root. A thin pass-through over Radix `Popover.Root` — Radix owns all
 * open-state behavior (controlled via `open`/`onOpenChange`, uncontrolled via
 * `defaultOpen`) and keeps the content mounted across the exit animation via its
 * own `Presence`. The fade/scale transition lives entirely on the content as
 * `data-[state]` animation utilities, so no React state, context, or effects are
 * needed here.
 */
function Popover({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
Popover.displayName = 'Popover';

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
PopoverTrigger.displayName = 'PopoverTrigger';

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
PopoverAnchor.displayName = 'PopoverAnchor';

function PopoverClose({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}
PopoverClose.displayName = 'PopoverClose';

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  // `.popover` is the floating panel (look). Placement is handled by Radix's
  // `side`/`align`/`sideOffset` props; the fade/scale transition is driven
  // entirely by Radix's `data-[state=open|closed]` via tw-animate-css keyframes,
  // which Radix's `Presence` awaits before unmounting — scaling from the
  // Radix-computed popper origin. The Bootstrap arrow utilities are omitted:
  // they only apply under the `[data-popper-placement]` attribute Radix never
  // sets (Radix uses `data-side`).
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'popover origin-[var(--radix-popover-content-transform-origin)]',
          'duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      >
        {children}
        {/* Radix's Arrow auto-positions/rotates per side (the Hummingbird
            `.popover-arrow` class can't be used — it positions via the
            `[data-popper-placement]` attribute Radix never sets). Its fill reuses
            the Hummingbird `--popover-bg` token, which cascades from `.popover`. */}
        <PopoverPrimitive.Arrow
          data-slot="popover-arrow"
          width={14}
          height={7}
          className="fill-[var(--popover-bg)]"
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
PopoverContent.displayName = 'PopoverContent';

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="popover-header" className={cn('popover-header', className)} {...props} />
  );
}
PopoverHeader.displayName = 'PopoverHeader';

function PopoverBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="popover-body" className={cn('popover-body', className)} {...props} />
  );
}
PopoverBody.displayName = 'PopoverBody';

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
};
