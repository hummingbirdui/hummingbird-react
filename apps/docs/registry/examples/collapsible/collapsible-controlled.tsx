"use client";

import * as React from "react";
import { Collapsible, Button } from "@hummingbirdui/react";

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
        <Collapsible.Trigger asChild>
          <Button variant="outline" color="secondary" size="sm">
            {open ? "Close" : "Open"}
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <div className="rounded-md border border-default px-4 py-3 text-sm">
          The parent component owns the open state through <code>open</code> and{" "}
          <code>onOpenChange</code>.
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
