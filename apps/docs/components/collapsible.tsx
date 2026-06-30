"use client";

// Client boundary for the Collapsible. The library ships its components without
// a bundled "use client" directive (it's framework-agnostic and tree-shakeable),
// so re-exporting the interactive Collapsible parts through this "use client"
// module gives them a client boundary when composed into server-rendered MDX.
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@hummingbirdui/react";
