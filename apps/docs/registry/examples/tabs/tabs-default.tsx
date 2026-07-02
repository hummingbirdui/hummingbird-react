"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";

export default function TabsDefault() {
  return (
    <Tabs defaultValue="account" className="mx-auto max-w-xl">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="py-4">
        Manage your account details and profile information.
      </TabsContent>
      <TabsContent value="password" className="py-4">
        Change your password and review active sessions.
      </TabsContent>
      <TabsContent value="team" className="py-4">
        Invite teammates and manage their roles.
      </TabsContent>
    </Tabs>
  );
}
