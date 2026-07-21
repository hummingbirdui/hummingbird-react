"use client";

import { Button, Dropdown } from "@hummingbirdui/react";

export default function DropdownDisabled() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button>Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="min-w-48">
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item disabled>Archive</Dropdown.Item>
        <Dropdown.Item disabled>Delete</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
