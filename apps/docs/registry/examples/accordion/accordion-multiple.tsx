"use client";

import { Accordion } from "@hummingbirdui/react";

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="mx-auto max-w-2xl">
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger>What is Hummingbird UI?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Hummingbird UI is a class-based design system. Components ship their
          looks as semantic CSS classes and use Radix UI primitives for
          behavior.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Header>
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Yes. The Accordion is built on Radix UI&apos;s headless primitive, so
          keyboard navigation and ARIA wiring are handled for you.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Header>
          <Accordion.Trigger>Can multiple panels stay open?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Yes. With <code>type=&quot;multiple&quot;</code> every panel toggles
          independently, so any number of them can be open at the same time.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
