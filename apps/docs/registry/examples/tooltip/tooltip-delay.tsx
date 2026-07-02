"use client";

import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@hummingbirdui/react";

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Instant</Button>
        </TooltipTrigger>
        <TooltipContent>Opens immediately</TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button variant="outline">Delayed</Button>
        </TooltipTrigger>
        <TooltipContent>Waits before opening</TooltipContent>
      </Tooltip>
    </div>
  );
}
