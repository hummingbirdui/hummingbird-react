"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
} from "@hummingbirdui/react";

export default function PopoverDefault() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Popover title</PopoverHeader>
        <PopoverBody>
          And here&apos;s some amazing content. It&apos;s very engaging. Right?
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
