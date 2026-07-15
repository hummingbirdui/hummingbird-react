import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";
import FaqAccordion from "./FaqAccordion";

interface FaqTab {
  label: string;
  value: string;
}

const faqTabs: FaqTab[] = [
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

const FaqTabs = () => {
  return (
    <Tabs defaultValue="general" className="mx-auto">
      <div className="flex items-center justify-center mb-10">
        <TabsList variant="underline" className="bg-subtle p-1.5 rounded-xl">
          {faqTabs.map((item) => (
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

      {faqTabs.map((item) => (
        <TabsContent value={item.value}>
          <FaqAccordion />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FaqTabs;
