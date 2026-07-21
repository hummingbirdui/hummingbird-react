"use client";

import { Tabs } from "@hummingbirdui/react";

export default function TabsPlain() {
  return (
    <Tabs defaultValue="home" className="mx-auto max-w-xl">
      <Tabs.List variant="default">
        <Tabs.Trigger value="home">Home</Tabs.Trigger>
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="home" className="py-4">
        Welcome back to your dashboard.
      </Tabs.Content>
      <Tabs.Content value="profile" className="py-4">
        View and edit your public profile.
      </Tabs.Content>
      <Tabs.Content value="contact" className="py-4">
        Reach out to the support team.
      </Tabs.Content>
    </Tabs>
  );
}
