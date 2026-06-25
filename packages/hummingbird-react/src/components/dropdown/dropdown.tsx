'use client';

import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>;

/**
 * Dropdown menu root. A thin pass-through over Radix `DropdownMenu.Root` —
 * Radix owns all open-state behavior (controlled via `open`/`onOpenChange`,
 * uncontrolled via `defaultOpen`) and keeps the menu mounted across the exit
 * animation via its own `Presence`. The fade/scale transition lives entirely on
 * the content as `data-[state]` animation utilities, so no React state,
 * context, or effects are needed here.
 */
function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}
DropdownMenu.displayName = 'DropdownMenu';

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}
DropdownMenuPortal.displayName = 'DropdownMenuPortal';

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  // `.dropdown-menu` is `hidden` by default and the `.show` *class* flips it to
  // `block`; we keep it applied so the menu stays visible (Radix only mounts the
  // content while open anyway). The fade/scale transition is driven entirely by
  // Radix's `data-[state=open|closed]` attribute via tw-animate-css keyframes,
  // which Radix's `Presence` awaits before unmounting — scaling from the
  // Radix-computed popper origin. Placement is handled by Radix's
  // `side`/`align`/`sideOffset` props; the Bootstrap direction utilities
  // (`dropup`, `dropend`, `dropdown-menu-end`, …) are omitted because they only
  // apply under the `[data-bs-popper]` attribute Radix never sets.
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'dropdown-menu show origin-[var(--radix-popper-transform-origin)]',
          'duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
DropdownMenuContent.displayName = 'DropdownMenuContent';

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

function DropdownMenuItem({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      disabled={disabled}
      className={cn(
        'dropdown-item cursor-pointer focus-visible:ring-0',
        disabled && 'disabled',
        className
      )}
      {...props}
    />
  );
}
DropdownMenuItem.displayName = 'DropdownMenuItem';

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn('dropdown-header', className)}
      {...props}
    />
  );
}
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('dropdown-divider', className)}
      {...props}
    />
  );
}
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

function DropdownMenuItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-item-text"
      className={cn('dropdown-item-text', className)}
      {...props}
    />
  );
}
DropdownMenuItemText.displayName = 'DropdownMenuItemText';

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItemText,
};
