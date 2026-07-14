import SectionHeader from "@/components/common/SectionHeader";
import CodeSample from "./CodeSample";
import CodePreview from "./CodePreview";

const CodeExample = () => {
  return (
    <div className="pt-16 pb-20">
      <SectionHeader
        title="Every component you need is ready for production"
        subtitle="Ditch long utility class strings. Hummingbird gives you complete freedom of pixel-perfect tweaks - plus full Tailwind flexibility."
      />

      <div className="flex flex-col lg:flex-row lg:h-108 gap-6">
        <CodeSample />
        <CodePreview />
      </div>
    </div>
  );
};

export default CodeExample;
