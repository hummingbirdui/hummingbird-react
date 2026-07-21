"use client";

import { Popover, Button } from "@hummingbirdui/react";

export default function PopoverPlacement() {
  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="outline">Top</Button>
        </Popover.Trigger>
        <Popover.Content side="top">
          <Popover.Body>Opens above the trigger.</Popover.Body>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger asChild>
          <Button variant="outline">Right</Button>
        </Popover.Trigger>
        <Popover.Content side="right">
          <Popover.Body>Opens to the right.</Popover.Body>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger asChild>
          <Button variant="outline">Bottom</Button>
        </Popover.Trigger>
        <Popover.Content side="bottom">
          <Popover.Body>Opens below the trigger.</Popover.Body>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger asChild>
          <Button variant="outline">Left</Button>
        </Popover.Trigger>
        <Popover.Content side="left">
          <Popover.Body>Opens to the left.</Popover.Body>
        </Popover.Content>
      </Popover>
    </div>
  );
}
