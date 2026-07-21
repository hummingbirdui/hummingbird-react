"use client";

import { Button, Dropdown } from "@hummingbirdui/react";

export default function DropdownPlacement() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button>Aligned menu</Button>
      </Dropdown.Trigger>
      <Dropdown.Content side="top" align="end" className="min-w-48">
        <Dropdown.Item>Move up</Dropdown.Item>
        <Dropdown.Item>Move down</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Duplicate</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
