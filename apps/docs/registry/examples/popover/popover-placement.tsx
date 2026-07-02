"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
} from "@hummingbirdui/react";

export default function PopoverPlacement() {
  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <PopoverBody>Opens above the trigger.</PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <PopoverBody>Opens to the right.</PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <PopoverBody>Opens below the trigger.</PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <PopoverBody>Opens to the left.</PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
