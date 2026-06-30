"use client";

// Client boundary for the Popover. The library ships its components without a
// bundled "use client" directive (it's framework-agnostic and tree-shakeable),
// and the Popover is built on Radix, which is client-only. Re-exporting the
// parts through this "use client" module gives them a client boundary when
// composed into server-rendered MDX.
export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@hummingbirdui/react";
