"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@hummingbirdui/react";

export default function DropdownPlacement() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Aligned menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="min-w-48">
        <DropdownMenuItem>Move up</DropdownMenuItem>
        <DropdownMenuItem>Move down</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
