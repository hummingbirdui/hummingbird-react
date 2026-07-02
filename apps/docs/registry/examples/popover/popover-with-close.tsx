"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverClose,
  Button,
  CloseButton,
} from "@hummingbirdui/react";

export default function PopoverWithClose() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color="secondary">Dismissable</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader className="flex items-center justify-between">
          Heads up
          <PopoverClose asChild>
            <CloseButton />
          </PopoverClose>
        </PopoverHeader>
        <PopoverBody>Click the close button to dismiss this popover.</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
