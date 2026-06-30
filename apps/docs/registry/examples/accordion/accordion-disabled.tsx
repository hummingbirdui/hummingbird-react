"use client";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@hummingbirdui/react";

export default function AccordionDisabled() {
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
      <AccordionItem value="item-2" disabled>
        <AccordionHeader>
          <AccordionTrigger>This item is disabled</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          You won&apos;t be able to open this panel.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
