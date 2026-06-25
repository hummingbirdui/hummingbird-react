'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '../../utils/cn';

// Hummingbird has no Radix drawer primitive, so the drawer is built on Vaul
// (the same library shadcn's Drawer uses). Vaul owns ALL behavior: open/close
// state (controlled via `open`/`onOpenChange`, uncontrolled via `defaultOpen`),
// the drag interaction, and the slide/fade animation — it injects its own
// keyframes keyed off `data-state` + `data-vaul-drawer-direction`, so no
// `tw-animate-css` utilities are needed here.
//
// The looks come from Hummingbird's `.offcanvas*` classes (reference-css/
// components/offcanvas.css). Two notes on the integration:
//   1. `.offcanvas` is `invisible` and off-screen until its `.show` class is
//      added; we apply `show` permanently so the resting state is on-screen and
//      visible (`.show` sets `visibility:visible` + `translate:none` at a higher
//      specificity than the directional translate). Vaul then slides it via the
//      `transform` property — a *different* property from offcanvas's `translate`
//      slide, so the two never fight.
//   2. The edge + size come from the directional `.offcanvas-{start,end,top,
//      bottom}` utilities, selected off the `data-vaul-drawer-direction` Vaul
//      sets on the content — no prop drilling or context.

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

/**
 * The dimmed backdrop (`.offcanvas-backdrop` supplies the look). Vaul fades it
 * via its injected `[data-vaul-overlay]` keyframes — no animation classes here.
 */
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

/**
 * The sliding panel. `.offcanvas` carries the look (bg/shadow/border/colors via
 * the `--offcanvas-*` tokens), `show` pins it to the on-screen resting state,
 * and the per-direction `.offcanvas-*` utility positions it at the matching
 * edge based on Vaul's `data-vaul-drawer-direction`. `className` targets the
 * panel; compose `DrawerPortal`/`DrawerOverlay`/`DrawerContent` by hand for full
 * control. Set the edge with `direction` on `Drawer` (Vaul's prop).
 */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content offcanvas show',
          'data-[vaul-drawer-direction=left]:offcanvas-start',
          'data-[vaul-drawer-direction=right]:offcanvas-end',
          // `.offcanvas` defaults to `bottom-0`; reset it for a top drawer so the
          // panel hugs the top edge at its configured height instead of spanning
          // full height.
          'data-[vaul-drawer-direction=top]:offcanvas-top data-[vaul-drawer-direction=top]:bottom-auto',
          'data-[vaul-drawer-direction=bottom]:offcanvas-bottom',
          className
        )}
        {...props}
      >
        {/* Drag affordance for the draggable bottom drawer (Vaul styles it via
            its injected `[data-vaul-handle]` rules). */}
        <DrawerPrimitive.Handle
          data-slot="drawer-handle"
          className="mt-4 hidden group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
        />
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

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('offcanvas-title', className)}
      {...props}
    />
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
