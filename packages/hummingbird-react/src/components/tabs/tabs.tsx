'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

import { navVariants } from '../nav/nav';

const TabsActiveValueContext = React.createContext<string | undefined>(undefined);

function TabsRoot({
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
TabsRoot.displayName = 'Tabs';

export interface TabsListProps
  extends
    Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'color'>,
    VariantProps<typeof navVariants> {}

function TabsList({ className, variant = 'tabs', color, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(navVariants({ variant, color }), className)}
      {...props}
    />
  );
}
TabsList.displayName = 'Tabs.List';

function TabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
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
TabsTrigger.displayName = 'Tabs.Trigger';

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={className} {...props} />;
}
TabsContent.displayName = 'Tabs.Content';

const Tabs = /* @__PURE__ */ Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

namespace Tabs {
  export type Props = React.ComponentProps<typeof TabsRoot>;
  export type RootProps = React.ComponentProps<typeof TabsRoot>;
  export type ListProps = React.ComponentProps<typeof TabsList>;
  export type TriggerProps = React.ComponentProps<typeof TabsTrigger>;
  export type ContentProps = React.ComponentProps<typeof TabsContent>;
}

export { Tabs };
