"use client";

import { Popover, Button, CloseButton } from "@hummingbirdui/react";

export default function PopoverWithClose() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button>Dismissable</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header className="flex items-center justify-between">
          Heads up
          <Popover.Close asChild>
            <CloseButton />
          </Popover.Close>
        </Popover.Header>
        <Popover.Body>
          Click the close button to dismiss this popover.
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
