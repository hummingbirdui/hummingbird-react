"use client";

import { Tabs } from "@hummingbirdui/react";
import { faqTabs } from "@/data/landing/faqs";
import FaqAccordion from "./FaqAccordion";

const FaqTabs = () => {
  return (
    <Tabs defaultValue="general" className="mx-auto">
      <div className="flex items-center justify-center mb-10">
        <Tabs.List variant="underline" className="bg-subtle p-1.5 rounded-xl">
          {faqTabs.map((item) => (
            <Tabs.Trigger
              key={item.label}
              value={item.value}
              className="border-b-0! text-muted rounded-lg font-bold active:bg-muted"
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {faqTabs.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          <FaqAccordion faqs={item.faqs} />
        </Tabs.Content>
      ))}
    </Tabs>
  );
};

export default FaqTabs;
