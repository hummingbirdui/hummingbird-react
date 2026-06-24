"use client";

// Client boundary for the DropdownMenu. The library ships its components without
// a bundled "use client" directive (it's framework-agnostic and tree-shakeable),
// so re-exporting the interactive DropdownMenu parts through this "use client"
// module gives them a client boundary when composed into server-rendered MDX.
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItemText,
} from "@hummingbirdui/react";
