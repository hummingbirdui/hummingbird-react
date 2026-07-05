"use client";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@hummingbirdui/react";

export default function AccordionDefault() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="mx-auto max-w-2xl"
    >
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>What is Hummingbird UI?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Hummingbird UI is a class-based design system. Components ship their
          looks as semantic CSS classes and use Radix UI primitives for
          behavior.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Yes. The Accordion is built on Radix UI&apos;s headless primitive, so
          keyboard navigation and ARIA wiring are handled for you.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Can multiple panels stay open?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Use <code>type=&quot;multiple&quot;</code> to let several items expand
          at once, or <code>type=&quot;single&quot;</code> with{" "}
          <code>collapsible</code> to allow closing the open item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
