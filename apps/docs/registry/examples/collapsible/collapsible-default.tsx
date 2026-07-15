"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@hummingbirdui/react";

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible className="mx-auto w-full max-w-md space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" color="primary">
          Show details
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border border-default px-4 py-3 text-sm">
          Collapsible is built on Radix UI&apos;s headless primitive, so
          keyboard interaction and ARIA wiring are handled automatically.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
