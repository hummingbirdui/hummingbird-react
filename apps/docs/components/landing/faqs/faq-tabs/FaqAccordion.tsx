import { Faq } from "@/data/landing/faqs";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  Button,
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
              <Button
                size="sm"
                shape="circle"
                color="light"
                className="accordion-chevron"
              >
                <ChevronDown className="size-4.5" />
              </Button>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
