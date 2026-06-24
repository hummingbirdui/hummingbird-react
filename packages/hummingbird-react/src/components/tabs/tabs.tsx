'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
// Tab Nav and Tabs share the same `nav.css`, so the interactive Tabs reuses the
// static Nav's variant map (`nav`, `nav-tabs`/`nav-underline`, color classes).
import { navVariants } from '../nav/nav';

// Radix drives all tab behavior; it only marks the active trigger with
// `data-state="active"`. Hummingbird's CSS instead styles the active tab via the
// `.nav-link.active` class, so we mirror Radix's current value through this
// context and let each trigger add `.active` when its `value` matches. This is a
// pure styling bridge — no behavior is reimplemented.
const TabsActiveValueContext = React.createContext<string | undefined>(undefined);

function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const currentValue = value ?? uncontrolled;

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (value === undefined) setUncontrolled(next); // track only when uncontrolled
      onValueChange?.(next);
    },
    [value, onValueChange]
  );

  return (
    <TabsActiveValueContext.Provider value={currentValue}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={className}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsActiveValueContext.Provider>
  );
}
Tabs.displayName = 'Tabs';

export interface TabsListProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'color'>,
    VariantProps<typeof navVariants> {}

function TabsList({ className, variant = 'tabs', color, ...props }: TabsListProps) {
  // The tablist IS the nav bar, so it carries `nav` + the chosen line style.
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(navVariants({ variant, color }), className)}
      {...props}
    />
  );
}
TabsList.displayName = 'TabsList';

function TabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  // Add the `.active` class the Hummingbird CSS keys off, derived from the active
  // value in context (Radix still owns the actual selection/`data-state`).
  const activeValue = React.useContext(TabsActiveValueContext);
  const active = activeValue !== undefined && activeValue === value;

  return (
    <TabsPrimitive.Trigger
      value={value}
      data-slot="tabs-trigger"
      className={cn('nav-link', active && 'active', className)}
      {...props}
    />
  );
}
TabsTrigger.displayName = 'TabsTrigger';

// Radix manages panel visibility (mounts/hides Content itself), so the Bootstrap
// `tab-pane`/`tab-content` show/hide classes are intentionally omitted — applying
// them would fight Radix's own `hidden` handling.
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={className} {...props} />;
}
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
