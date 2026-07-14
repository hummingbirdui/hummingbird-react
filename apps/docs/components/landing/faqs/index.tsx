import SectionHeader from "@/components/common/SectionHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@hummingbirdui/react";

const tabs = [
  {
    label: "General",
    value: "general",
  },
  {
    label: "Features",
    value: "features",
  },
  {
    label: "Pricing",
    value: "pricing",
  },
  {
    label: "Support",
    value: "support",
  },
];

const AccordionDefault = () => {
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
};

const TabsUnderline = () => {
  return (
    <Tabs defaultValue="general" className="mx-auto">
      <div className="flex items-center justify-center mb-10">
        <TabsList variant="underline" className="bg-subtle p-1.5 rounded-xl">
          {tabs.map((item) => (
            <TabsTrigger
              key={item.label}
              value={item.value}
              className="border-b-0! text-muted rounded-lg font-bold active:bg-muted"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="general">
        <AccordionDefault />
      </TabsContent>
      <TabsContent value="features">
        <AccordionDefault />
      </TabsContent>
      <TabsContent value="pricing">
        <AccordionDefault />
      </TabsContent>
      <TabsContent value="support">
        <AccordionDefault />
      </TabsContent>
    </Tabs>
  );
};

const Faqs = () => {
  return (
    <div className="py-20">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Hummingbird, our community component registry for Hummingbird."
      />

      <TabsUnderline />
    </div>
  );
};

export default Faqs;
