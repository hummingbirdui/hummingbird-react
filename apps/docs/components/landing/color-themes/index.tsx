"use client";

import { useEffect, useState } from "react";
import { initThemeComparison } from "./initThemeComparison";
import SectionHeader from "@/components/common/SectionHeader";
import ThemeSlider from "./ThemeSlider";
import IframePreview from "./IframePreview";
import ThemeComparison from "./ThemeComparison";

const ColorThemes = () => {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("main-theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div className="py-20">
      <SectionHeader
        title="Color themes, perfected."
        subtitle="Hummingbird offers a range of thoughtfully crafted themes with balanced colors, smooth transitions, and a consistent UI"
      />

      <ThemeSlider selectedTheme={theme} onThemeChange={setTheme} />

      <IframePreview
        theme={theme}
        onReady={initThemeComparison}
        className="h-134.5 max-w-148 sm:max-w-172 lg:max-w-236 mx-auto rounded-4xl"
      >
        <ThemeComparison />
      </IframePreview>
    </div>
  );
};

export default ColorThemes;
