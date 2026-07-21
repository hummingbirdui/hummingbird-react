"use client";

import { Button, Tooltip } from "@hummingbirdui/react";

export default function TooltipDefault() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button variant="outline">Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Tooltip on hover</Tooltip.Content>
    </Tooltip>
  );
}
