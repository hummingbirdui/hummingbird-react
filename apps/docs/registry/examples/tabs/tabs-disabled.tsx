"use client";

import { Tabs } from "@hummingbirdui/react";

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="general" className="mx-auto max-w-xl">
      <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="billing" disabled>
          Billing
        </Tabs.Trigger>
        <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="general" className="py-4">
        General workspace preferences.
      </Tabs.Content>
      <Tabs.Content value="billing" className="py-4">
        Billing details are unavailable on this plan.
      </Tabs.Content>
      <Tabs.Content value="advanced" className="py-4">
        Advanced configuration options.
      </Tabs.Content>
    </Tabs>
  );
}
