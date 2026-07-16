import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";
import { faqTabs } from "@/data/landing/faqs";
import FaqAccordion from "./FaqAccordion";

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
        <TabsContent key={item.value} value={item.value}>
          <FaqAccordion faqs={item.faqs} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FaqTabs;
