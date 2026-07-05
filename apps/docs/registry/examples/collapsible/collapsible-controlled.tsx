"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@hummingbirdui/react";

export default function CollapsibleControlled() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="mx-auto w-full max-w-md space-y-2"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm">
          The panel is {open ? "open" : "closed"}.
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="outline" color="secondary" size="sm">
            {open ? "Close" : "Open"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="rounded-md border border-default px-4 py-3 text-sm">
          The parent component owns the open state through <code>open</code> and{" "}
          <code>onOpenChange</code>.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
