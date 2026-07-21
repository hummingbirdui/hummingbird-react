"use client";

import { Button, Tooltip } from "@hummingbirdui/react";

export default function TooltipProviderExample() {
  return (
    <Tooltip.Provider delayDuration={200} skipDelayDuration={300}>
      <div className="flex flex-wrap justify-center gap-2">
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button variant="outline">Save</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Save changes</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button variant="outline">Copy</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Copy to clipboard</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button variant="outline">Delete</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Delete item</Tooltip.Content>
        </Tooltip>
      </div>
    </Tooltip.Provider>
  );
}
