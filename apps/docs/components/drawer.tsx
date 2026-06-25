"use client";

// Client boundary for the Drawer. The library ships its components without a
// bundled "use client" directive (it's framework-agnostic and tree-shakeable),
// and the Drawer is built on Vaul, which is client-only. Re-exporting the parts
// through this "use client" module gives them a client boundary when composed
// into server-rendered MDX.
export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
} from "@hummingbirdui/react";
