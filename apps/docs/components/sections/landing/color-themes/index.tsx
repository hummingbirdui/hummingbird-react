"use client";

import SectionHeader from "@/components/sections/common/SectionHeader";
import ThemeComparison from "./ThemeComparison";
import ThemeSlider from "./ThemeSlider";

const ColorThemes = () => {
  return (
    <div className="py-20">
      <SectionHeader
        title="Color themes, perfected."
        subtitle="Hummingbird offers a range of thoughtfully crafted themes with balanced colors, smooth transitions, and a consistent UI"
      />

      <ThemeSlider />

      <ThemeComparison>
        <h1>Hello!</h1>
      </ThemeComparison>
    </div>
  );
};

export default ColorThemes;
