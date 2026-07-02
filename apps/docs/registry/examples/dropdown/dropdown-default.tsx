"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@hummingbirdui/react";

export default function DropdownDefault() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
