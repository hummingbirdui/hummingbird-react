"use client";

import { ButtonGroup, Button } from "@hummingbirdui/react";

export default function ButtonGroupToolbar() {
  return (
    <ButtonGroup.Toolbar className="flex gap-2">
      <ButtonGroup>
        <Button variant="outline">Bold</Button>
        <Button variant="outline">Italic</Button>
        <Button variant="outline">Underline</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Left</Button>
        <Button variant="outline">Center</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
    </ButtonGroup.Toolbar>
  );
}
