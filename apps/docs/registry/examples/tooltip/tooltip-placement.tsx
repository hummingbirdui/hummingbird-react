"use client";

import { Button, Tooltip } from "@hummingbirdui/react";

export default function TooltipPlacement() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Top</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="top">On top</Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Right</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">On the right</Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Bottom</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">On the bottom</Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Left</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="left">On the left</Tooltip.Content>
      </Tooltip>
    </div>
  );
}
