"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuSeparator,
} from "@hummingbirdui/react";

export default function DropdownItemText() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Details</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
        <DropdownMenuItemText>sohel@onesuite.io</DropdownMenuItemText>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Account settings</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
