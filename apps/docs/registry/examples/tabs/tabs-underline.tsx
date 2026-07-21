"use client";

import { Tabs } from "@hummingbirdui/react";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="overview" className="mx-auto max-w-xl">
      <Tabs.List variant="underline">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview" className="py-4">
        A high-level summary of the project.
      </Tabs.Content>
      <Tabs.Content value="activity" className="py-4">
        Recent activity and events.
      </Tabs.Content>
      <Tabs.Content value="settings" className="py-4">
        Project configuration and preferences.
      </Tabs.Content>
    </Tabs>
  );
}
