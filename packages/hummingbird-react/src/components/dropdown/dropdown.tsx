'use client';

import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>;

function DropdownRoot({ open, defaultOpen, onOpenChange, ...props }: DropdownMenuProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const resolvedOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    // radix-ui >= 1.6 (@radix-ui/react-menu 2.1.18) closes the menu on any
    // window blur — including focusing devtools or switching apps. Every
    // user-initiated dismissal (outside click, Escape, item select) happens
    // while the document has focus, so a close request arriving without focus
    // can only be that blur listener; ignore it.
    if (!nextOpen && !document.hasFocus()) return;
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <DropdownMenuPrimitive.Root
      data-slot="dropdown-menu"
      open={resolvedOpen}
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
}
DropdownRoot.displayName = 'Dropdown';

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}
DropdownMenuPortal.displayName = 'Dropdown.Portal';

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}
DropdownMenuTrigger.displayName = 'Dropdown.Trigger';

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'dropdown-menu show relative origin-[var(--radix-popper-transform-origin)]',
          'duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
DropdownMenuContent.displayName = 'Dropdown.Content';

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}
DropdownMenuGroup.displayName = 'Dropdown.Group';

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
DropdownMenuItem.displayName = 'Dropdown.Item';

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
DropdownMenuLabel.displayName = 'Dropdown.Label';

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
DropdownMenuSeparator.displayName = 'Dropdown.Separator';

function DropdownMenuItemText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-item-text"
      className={cn('dropdown-item-text', className)}
      {...props}
    />
  );
}
DropdownMenuItemText.displayName = 'Dropdown.ItemText';

const Dropdown = /* @__PURE__ */ Object.assign(DropdownRoot, {
  Root: DropdownRoot,
  Portal: DropdownMenuPortal,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  ItemText: DropdownMenuItemText,
});

namespace Dropdown {
  export type Props = React.ComponentProps<typeof DropdownRoot>;
  export type RootProps = React.ComponentProps<typeof DropdownRoot>;
  export type PortalProps = React.ComponentProps<typeof DropdownMenuPortal>;
  export type TriggerProps = React.ComponentProps<typeof DropdownMenuTrigger>;
  export type ContentProps = React.ComponentProps<typeof DropdownMenuContent>;
  export type GroupProps = React.ComponentProps<typeof DropdownMenuGroup>;
  export type ItemProps = React.ComponentProps<typeof DropdownMenuItem>;
  export type LabelProps = React.ComponentProps<typeof DropdownMenuLabel>;
  export type SeparatorProps = React.ComponentProps<typeof DropdownMenuSeparator>;
  export type ItemTextProps = React.ComponentProps<typeof DropdownMenuItemText>;
}

export { Dropdown };
