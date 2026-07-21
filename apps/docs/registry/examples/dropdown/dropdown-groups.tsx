"use client";

import { Button, Dropdown } from "@hummingbirdui/react";

export default function DropdownGroups() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button>Workspace</Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="min-w-56">
        <Dropdown.Group>
          <Dropdown.Label>Documents</Dropdown.Label>
          <Dropdown.Item>New file</Dropdown.Item>
          <Dropdown.Item>Import</Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group>
          <Dropdown.Label>Team</Dropdown.Label>
          <Dropdown.Item>Invite member</Dropdown.Item>
          <Dropdown.Item>Manage roles</Dropdown.Item>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown>
  );
}
