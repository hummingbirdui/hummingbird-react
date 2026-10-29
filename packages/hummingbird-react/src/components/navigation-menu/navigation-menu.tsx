'use client';

import * as React from 'react';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import { cn } from '../../utils/cn';

export interface NavigationMenuProps extends React.ComponentProps<
  typeof NavigationMenuPrimitive.Root
> {
  /** Render panels inside one shared, resizing viewport. When `false`, each panel draws its own surface below its item. */
  viewport?: boolean;
}

function NavigationMenuRoot({
  className,
  children,
  viewport = true,
  ...props
}: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn('navigation-menu group/navigation-menu', className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}
NavigationMenuRoot.displayName = 'NavigationMenu';

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn('navigation-menu-list', className)}
      {...props}
    />
  );
}
NavigationMenuList.displayName = 'NavigationMenu.List';

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('navigation-menu-item', className)}
      {...props}
    />
  );
}
NavigationMenuItem.displayName = 'NavigationMenu.Item';

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn('nav-link navigation-menu-trigger group', className)}
      {...props}
    >
      {children}
      <svg
        className="navigation-menu-trigger-icon transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </NavigationMenuPrimitive.Trigger>
  );
}
NavigationMenuTrigger.displayName = 'NavigationMenu.Trigger';

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'navigation-menu-content',
        // Slide between panels in the shared viewport.
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
        'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
        // Fade/zoom each panel when there is no shared viewport.
        'group-data-[viewport=false]/navigation-menu:duration-150',
        'group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95',
        'group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95',
        className
      )}
      {...props}
    />
  );
}
NavigationMenuContent.displayName = 'NavigationMenu.Content';

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn('navigation-menu-link', className)}
      {...props}
    />
  );
}
NavigationMenuLink.displayName = 'NavigationMenu.Link';

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'navigation-menu-indicator',
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
        className
      )}
      {...props}
    />
  );
}
NavigationMenuIndicator.displayName = 'NavigationMenu.Indicator';

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="navigation-menu-viewport-wrapper">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'navigation-menu-viewport origin-top transition-[width,height] duration-300',
          'data-[state=open]:animate-in data-[state=open]:zoom-in-90 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      />
    </div>
  );
}
NavigationMenuViewport.displayName = 'NavigationMenu.Viewport';

const NavigationMenu = /* @__PURE__ */ Object.assign(NavigationMenuRoot, {
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  Viewport: NavigationMenuViewport,
});

namespace NavigationMenu {
  export type Props = React.ComponentProps<typeof NavigationMenuRoot>;
  export type ListProps = React.ComponentProps<typeof NavigationMenuList>;
  export type ItemProps = React.ComponentProps<typeof NavigationMenuItem>;
  export type TriggerProps = React.ComponentProps<typeof NavigationMenuTrigger>;
  export type ContentProps = React.ComponentProps<typeof NavigationMenuContent>;
  export type LinkProps = React.ComponentProps<typeof NavigationMenuLink>;
  export type IndicatorProps = React.ComponentProps<typeof NavigationMenuIndicator>;
  export type ViewportProps = React.ComponentProps<typeof NavigationMenuViewport>;
}

export { NavigationMenu };
