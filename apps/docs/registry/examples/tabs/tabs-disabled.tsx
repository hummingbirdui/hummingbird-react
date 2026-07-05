"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="general" className="mx-auto max-w-xl">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="py-4">
        General workspace preferences.
      </TabsContent>
      <TabsContent value="billing" className="py-4">
        Billing details are unavailable on this plan.
      </TabsContent>
      <TabsContent value="advanced" className="py-4">
        Advanced configuration options.
      </TabsContent>
    </Tabs>
  );
}
