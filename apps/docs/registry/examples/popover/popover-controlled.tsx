"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
} from "@hummingbirdui/react";

export default function PopoverControlled() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>Toggle popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Controlled</PopoverHeader>
          <PopoverBody>
            The open state is driven by React through <code>open</code> and{" "}
            <code>onOpenChange</code>.
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <span className="text-sm">
        State: {open ? "open" : "closed"}
      </span>
    </div>
  );
}
