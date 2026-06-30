"use client";

// Client boundary for the Navbar. It now wraps a Radix Collapsible (for the
// responsive toggle) and uses React context to share its `expand` breakpoint,
// so it must run as a client module. Re-exporting through this "use client"
// file gives those hooks a client boundary when composed into server MDX.
export {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarText,
  NavbarCollapse,
  NavbarToggle,
  NavbarTogglerIcon,
} from "@hummingbirdui/react";
