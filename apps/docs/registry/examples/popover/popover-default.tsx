"use client";

import { Popover, Button } from "@hummingbirdui/react";

export default function PopoverDefault() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button>Open popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>Popover title</Popover.Header>
        <Popover.Body>
          And here&apos;s some amazing content. It&apos;s very engaging. Right?
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
