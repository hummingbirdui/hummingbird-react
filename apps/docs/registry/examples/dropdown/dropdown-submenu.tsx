"use client";

import { Button, Dropdown } from "@hummingbirdui/react";

export default function DropdownSubmenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button>File</Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="min-w-48">
        <Dropdown.Item>New file</Dropdown.Item>
        <Dropdown.Item>Open…</Dropdown.Item>
        <Dropdown.Sub>
          <Dropdown.SubTrigger>Share</Dropdown.SubTrigger>
          <Dropdown.SubContent>
            <Dropdown.Item>Email link</Dropdown.Item>
            <Dropdown.Item>Messages</Dropdown.Item>
            <Dropdown.Sub>
              <Dropdown.SubTrigger>More</Dropdown.SubTrigger>
              <Dropdown.SubContent>
                <Dropdown.Item>Copy embed code</Dropdown.Item>
                <Dropdown.Item>Export as PDF</Dropdown.Item>
              </Dropdown.SubContent>
            </Dropdown.Sub>
          </Dropdown.SubContent>
        </Dropdown.Sub>
        <Dropdown.Sub>
          <Dropdown.SubTrigger disabled>Recent files</Dropdown.SubTrigger>
          <Dropdown.SubContent>
            <Dropdown.Item>report.pdf</Dropdown.Item>
          </Dropdown.SubContent>
        </Dropdown.Sub>
        <Dropdown.Separator />
        <Dropdown.Item>Close window</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
