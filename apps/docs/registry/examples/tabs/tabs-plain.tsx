"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";

export default function TabsPlain() {
  return (
    <Tabs defaultValue="home" className="mx-auto max-w-xl">
      <TabsList variant="default">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="home" className="py-4">
        Welcome back to your dashboard.
      </TabsContent>
      <TabsContent value="profile" className="py-4">
        View and edit your public profile.
      </TabsContent>
      <TabsContent value="contact" className="py-4">
        Reach out to the support team.
      </TabsContent>
    </Tabs>
  );
}
