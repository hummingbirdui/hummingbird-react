"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@hummingbirdui/react";

export default function CollapsibleDisabled() {
  return (
    <Collapsible disabled className="mx-auto w-full max-w-md space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" color="secondary" size="sm" disabled>
          Toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3 text-sm">
          This panel cannot be opened.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
