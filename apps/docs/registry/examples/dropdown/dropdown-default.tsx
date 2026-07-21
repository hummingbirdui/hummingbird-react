"use client";

import { Button, Dropdown } from "@hummingbirdui/react";

export default function DropdownDefault() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button>Open menu</Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="min-w-48">
        <Dropdown.Label>My account</Dropdown.Label>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Billing</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
