"use client";

import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@hummingbirdui/react";

export default function TooltipDefault() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip on hover</TooltipContent>
    </Tooltip>
  );
}
