"use client";

import { Collapsible, Button } from "@hummingbirdui/react";

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible className="mx-auto w-full max-w-md space-y-2">
      <Collapsible.Trigger asChild>
        <Button variant="outline" color="primary">
          Show details
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="rounded-md border border-default px-4 py-3 text-sm">
          Collapsible is built on Radix UI&apos;s headless primitive, so
          keyboard interaction and ARIA wiring are handled automatically.
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
