"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";

export default function TabsColors() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <Tabs defaultValue="one">
        <TabsList variant="underline" color="success">
          <TabsTrigger value="one">Active</TabsTrigger>
          <TabsTrigger value="two">Pending</TabsTrigger>
          <TabsTrigger value="three">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="one" className="py-4">
          Records that are currently active.
        </TabsContent>
        <TabsContent value="two" className="py-4">
          Records awaiting approval.
        </TabsContent>
        <TabsContent value="three" className="py-4">
          Records that have been archived.
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="alpha">
        <TabsList variant="underline" color="danger">
          <TabsTrigger value="alpha">Errors</TabsTrigger>
          <TabsTrigger value="beta">Warnings</TabsTrigger>
          <TabsTrigger value="gamma">Info</TabsTrigger>
        </TabsList>
        <TabsContent value="alpha" className="py-4">
          Failures that need attention.
        </TabsContent>
        <TabsContent value="beta" className="py-4">
          Non-blocking warnings.
        </TabsContent>
        <TabsContent value="gamma" className="py-4">
          Informational messages.
        </TabsContent>
      </Tabs>
    </div>
  );
}
