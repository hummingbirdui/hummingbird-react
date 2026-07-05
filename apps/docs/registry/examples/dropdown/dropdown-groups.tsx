"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@hummingbirdui/react";

export default function DropdownGroups() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Workspace</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Documents</DropdownMenuLabel>
          <DropdownMenuItem>New file</DropdownMenuItem>
          <DropdownMenuItem>Import</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Team</DropdownMenuLabel>
          <DropdownMenuItem>Invite member</DropdownMenuItem>
          <DropdownMenuItem>Manage roles</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
