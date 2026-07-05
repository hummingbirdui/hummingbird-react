"use client";

import {
  Button,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@hummingbirdui/react";

export default function TooltipProviderExample() {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={300}>
      <div className="flex flex-wrap justify-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Save</Button>
          </TooltipTrigger>
          <TooltipContent>Save changes</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Copy</Button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Delete</Button>
          </TooltipTrigger>
          <TooltipContent>Delete item</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
