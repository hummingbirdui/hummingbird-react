"use client";

import { Button, Tooltip } from "@hummingbirdui/react";

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Tooltip delayDuration={0}>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Instant</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Opens immediately</Tooltip.Content>
      </Tooltip>

      <Tooltip delayDuration={700}>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Delayed</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Waits before opening</Tooltip.Content>
      </Tooltip>
    </div>
  );
}
