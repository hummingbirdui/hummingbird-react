"use client";

import { Accordion } from "@hummingbirdui/react";

export default function AccordionDisabled() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="mx-auto max-w-2xl"
    >
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
      <Accordion.Item value="item-2" disabled>
        <Accordion.Header>
          <Accordion.Trigger>This item is disabled</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          You won&apos;t be able to open this panel.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
