"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="overview" className="mx-auto max-w-xl">
      <TabsList variant="underline">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="py-4">
        A high-level summary of the project.
      </TabsContent>
      <TabsContent value="activity" className="py-4">
        Recent activity and events.
      </TabsContent>
      <TabsContent value="settings" className="py-4">
        Project configuration and preferences.
      </TabsContent>
    </Tabs>
  );
}
