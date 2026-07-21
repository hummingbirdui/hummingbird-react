"use client";

import { Collapsible, Button } from "@hummingbirdui/react";

export default function CollapsibleDisabled() {
  return (
    <Collapsible disabled className="mx-auto w-full max-w-md space-y-2">
      <Collapsible.Trigger asChild>
        <Button variant="outline" color="secondary" size="sm" disabled>
          Toggle
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="rounded-md border border-default px-4 py-3 text-sm">
          This panel cannot be opened.
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
