"use client";

import { ButtonGroup, Button } from "@hummingbirdui/react";

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup size="sm">
        <Button variant="outline">Left</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
      <ButtonGroup size="md">
        <Button variant="outline">Left</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button variant="outline">Left</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
    </div>
  );
}
