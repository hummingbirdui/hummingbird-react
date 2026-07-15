import SectionHeader from "@/components/common/SectionHeader";
import FaqTabs from "./faq-tabs";

const Faqs = () => {
  return (
    <div className="px-6 py-20">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Hummingbird, our community component registry for Hummingbird."
      />

      <FaqTabs />
    </div>
  );
};

export default Faqs;
