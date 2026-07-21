import { Faq } from "@/data/landing/faqs";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@hummingbirdui/react";
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
        <AccordionItem key={item.question} value={item.question}>
          <AccordionHeader>
            <AccordionTrigger className="after:hidden">
              {item.question}
              <div
                className={`btn btn-sm btn-circle text-muted accordion-chevron`}
              >
                <ChevronDown className="size-4.5" />
              </div>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
