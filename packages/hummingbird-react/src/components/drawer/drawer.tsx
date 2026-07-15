'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}
Drawer.displayName = 'Drawer';

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}
DrawerTrigger.displayName = 'DrawerTrigger';

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}
DrawerPortal.displayName = 'DrawerPortal';

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}
DrawerClose.displayName = 'DrawerClose';

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn('offcanvas-backdrop', className)}
      {...props}
    />
  );
}
DrawerOverlay.displayName = 'DrawerOverlay';

export interface DrawerContentProps extends React.ComponentProps<typeof DrawerPrimitive.Content> {
  overlay?: boolean;
}
function DrawerContent({ className, overlay = true, children, ...props }: DrawerContentProps) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      {overlay && <DrawerOverlay />}
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content offcanvas show',
          'data-[vaul-drawer-direction=left]:offcanvas-start',
          'data-[vaul-drawer-direction=right]:offcanvas-end',
          'data-[vaul-drawer-direction=top]:offcanvas-top data-[vaul-drawer-direction=top]:bottom-auto',
          'data-[vaul-drawer-direction=bottom]:offcanvas-bottom',
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-1.5 w-12 shrink-0 rounded-full bg-highlight group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}
DrawerContent.displayName = 'DrawerContent';

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={cn('offcanvas-header', className)} {...props} />;
}
DrawerHeader.displayName = 'DrawerHeader';

export interface DrawerTitleProps extends React.ComponentProps<'h6'> {
  /** Render as a child element instead of an `<h6>`. Uses Radix Slot. */
  asChild?: boolean;
}

function DrawerTitle({ className, asChild = false, ...props }: DrawerTitleProps) {
  const Comp = asChild ? Slot.Root : 'h6';

  return (
    <DrawerPrimitive.Title asChild>
      <Comp data-slot="drawer-title" className={cn('offcanvas-title', className)} {...props} />
    </DrawerPrimitive.Title>
  );
}
DrawerTitle.displayName = 'DrawerTitle';

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description data-slot="drawer-description" className={className} {...props} />
  );
}
DrawerDescription.displayName = 'DrawerDescription';

function DrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-body" className={cn('offcanvas-body', className)} {...props} />;
}
DrawerBody.displayName = 'DrawerBody';

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
};
