"use client";

// Client boundary for the Dialog. The library ships its components without a
// bundled "use client" directive (it's framework-agnostic and tree-shakeable),
// so re-exporting the interactive Dialog parts through this "use client" module
// gives them a client boundary when composed into server-rendered MDX.
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@hummingbirdui/react";
