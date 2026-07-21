'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Slot } from 'radix-ui';
import { cn } from '../../utils/cn';

function DrawerRoot({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}
DrawerRoot.displayName = 'Drawer';

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}
DrawerTrigger.displayName = 'Drawer.Trigger';

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}
DrawerPortal.displayName = 'Drawer.Portal';

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}
DrawerClose.displayName = 'Drawer.Close';

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
DrawerOverlay.displayName = 'Drawer.Overlay';

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
DrawerContent.displayName = 'Drawer.Content';

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={cn('offcanvas-header', className)} {...props} />;
}
DrawerHeader.displayName = 'Drawer.Header';

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
DrawerTitle.displayName = 'Drawer.Title';

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description data-slot="drawer-description" className={className} {...props} />
  );
}
DrawerDescription.displayName = 'Drawer.Description';

function DrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-body" className={cn('offcanvas-body', className)} {...props} />;
}
DrawerBody.displayName = 'Drawer.Body';

const Drawer = /* @__PURE__ */ Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Close: DrawerClose,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
});

namespace Drawer {
  export type Props = React.ComponentProps<typeof DrawerRoot>;
  export type RootProps = React.ComponentProps<typeof DrawerRoot>;
  export type TriggerProps = React.ComponentProps<typeof DrawerTrigger>;
  export type PortalProps = React.ComponentProps<typeof DrawerPortal>;
  export type CloseProps = React.ComponentProps<typeof DrawerClose>;
  export type OverlayProps = React.ComponentProps<typeof DrawerOverlay>;
  export type ContentProps = React.ComponentProps<typeof DrawerContent>;
  export type HeaderProps = React.ComponentProps<typeof DrawerHeader>;
  export type TitleProps = React.ComponentProps<typeof DrawerTitle>;
  export type DescriptionProps = React.ComponentProps<typeof DrawerDescription>;
  export type BodyProps = React.ComponentProps<typeof DrawerBody>;
}

export { Drawer };
