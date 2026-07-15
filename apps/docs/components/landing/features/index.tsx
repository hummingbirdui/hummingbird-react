import { features } from "@/data/landing/features";
import SectionHeader from "@/components/common/SectionHeader";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="px-6 pt-16 pb-20">
      <SectionHeader
        title="Every detail, considered."
        subtitle="We built the UI system we always wanted - one that prioritizes clean code, a minimal footprint, and a developer experience that's a joy, not a chore."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-76 sm:max-w-180 lg:max-w-238 mx-auto">
        {features.map((item) => (
          <FeatureCard key={item.title} feature={item} />
        ))}
      </div>
    </div>
  );
};

export default Features;
