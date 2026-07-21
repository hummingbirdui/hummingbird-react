"use client";

import { Tabs } from "@hummingbirdui/react";

export default function TabsColors() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <Tabs defaultValue="one">
        <Tabs.List variant="underline" color="success">
          <Tabs.Trigger value="one">Active</Tabs.Trigger>
          <Tabs.Trigger value="two">Pending</Tabs.Trigger>
          <Tabs.Trigger value="three">Archived</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one" className="py-4">
          Records that are currently active.
        </Tabs.Content>
        <Tabs.Content value="two" className="py-4">
          Records awaiting approval.
        </Tabs.Content>
        <Tabs.Content value="three" className="py-4">
          Records that have been archived.
        </Tabs.Content>
      </Tabs>

      <Tabs defaultValue="alpha">
        <Tabs.List variant="underline" color="danger">
          <Tabs.Trigger value="alpha">Errors</Tabs.Trigger>
          <Tabs.Trigger value="beta">Warnings</Tabs.Trigger>
          <Tabs.Trigger value="gamma">Info</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="alpha" className="py-4">
          Failures that need attention.
        </Tabs.Content>
        <Tabs.Content value="beta" className="py-4">
          Non-blocking warnings.
        </Tabs.Content>
        <Tabs.Content value="gamma" className="py-4">
          Informational messages.
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
