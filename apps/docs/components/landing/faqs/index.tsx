import SectionHeader from "@/components/common/SectionHeader";
import FaqAccordion from "./FaqAccordion";
import { faqs } from "@/data/landing/faqs";

const Faqs = () => {
  return (
    <div className="px-6 py-20">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Hummingbird, our community component registry for Hummingbird."
      />

      <FaqAccordion faqs={faqs} />
    </div>
  );
};

export default Faqs;
