"use client";

import { Faq } from "@/data/landing/faqs";
import { Accordion } from "@hummingbirdui/react";
import { ChevronDown } from "lucide-react";

interface FaqAccordionProps {
  faqs: Faq[];
}

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={faqs[0].question}
      className="mx-auto max-w-3xl"
    >
      {faqs.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
          <Accordion.Header>
            <Accordion.Trigger className="after:hidden">
              {item.question}
              <div
                className={`btn btn-sm btn-circle text-muted accordion-chevron`}
              >
                <ChevronDown className="size-4.5" />
              </div>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>{item.answer}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
