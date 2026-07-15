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
    <div className="px-6 py-20">
      <SectionHeader
        title="Color themes, perfected."
        subtitle="Hummingbird offers a range of thoughtfully crafted themes with balanced colors, smooth transitions, and a consistent UI"
      />

      <div className="mx-auto max-w-148 sm:max-w-172 lg:max-w-236">
        <ThemeSlider selectedTheme={theme} onThemeChange={setTheme} />

        <IframePreview
          theme={theme}
          onReady={initThemeComparison}
          className="h-120 sm:h-182.5 lg:h-134.5 w-full rounded-4xl"
        >
          <ThemeComparison />
        </IframePreview>
      </div>
    </div>
  );
};

export default ColorThemes;
