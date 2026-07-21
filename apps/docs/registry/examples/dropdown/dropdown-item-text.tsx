"use client";

import { Button, Dropdown } from "@hummingbirdui/react";

export default function DropdownItemText() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button>Details</Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="min-w-56">
        <Dropdown.Label>Signed in as</Dropdown.Label>
        <Dropdown.ItemText>sohel@onesuite.io</Dropdown.ItemText>
        <Dropdown.Separator />
        <Dropdown.Item>Account settings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
