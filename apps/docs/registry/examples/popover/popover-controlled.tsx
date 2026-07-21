"use client";

import * as React from "react";
import { Popover, Button } from "@hummingbirdui/react";

export default function PopoverControlled() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button>Toggle popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Header>Controlled</Popover.Header>
          <Popover.Body>
            The open state is driven by React through <code>open</code> and{" "}
            <code>onOpenChange</code>.
          </Popover.Body>
        </Popover.Content>
      </Popover>
      <span className="text-sm">State: {open ? "open" : "closed"}</span>
    </div>
  );
}
