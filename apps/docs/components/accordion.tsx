"use client";

// Client boundary for the Accordion. The library ships its components without
// a bundled "use client" directive (it's framework-agnostic and tree-shakeable),
// so re-exporting the interactive Accordion parts through this "use client"
// module gives them a client boundary when composed into server-rendered MDX.
export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@hummingbirdui/react";
