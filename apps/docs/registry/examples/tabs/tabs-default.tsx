"use client";

import { Tabs } from "@hummingbirdui/react";

export default function TabsDefault() {
  return (
    <Tabs defaultValue="account" className="mx-auto max-w-xl">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="team">Team</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="py-4">
        Manage your account details and profile information.
      </Tabs.Content>
      <Tabs.Content value="password" className="py-4">
        Change your password and review active sessions.
      </Tabs.Content>
      <Tabs.Content value="team" className="py-4">
        Invite teammates and manage their roles.
      </Tabs.Content>
    </Tabs>
  );
}
