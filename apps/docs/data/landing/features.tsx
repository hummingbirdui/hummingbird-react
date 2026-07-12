import type { ComponentType } from "react";

import BoltIcon from "@/components/icons/BoltIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import ExtensionIcon from "@/components/icons/ExtensionIcon";
import PaletteIcon from "@/components/icons/PaletteIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import TuneIcon from "@/components/icons/TuneIcon";

export interface Feature {
  icon: ComponentType<{ className?: string }>;
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: CodeIcon,
    color: "primary",
    title: "Semantic & Clean Markup",
    description:
      "Readable, purpose-driven class names for maintainable, clutter-free HTML.",
  },
  {
    icon: PaletteIcon,
    color: "secondary",
    title: "Easy Theming",
    description:
      "Customize colors and styles with minimal CSS variable changes.",
  },
  {
    icon: SettingsIcon,
    color: "error",
    title: "Fully Customizable",
    description:
      "Tweak any component using Tailwind utilities or global design tokens.",
  },
  {
    icon: BoltIcon,
    color: "warning",
    title: "Built for Optimization",
    description:
      "No unused CSS. Small file sizes. Production-ready out of the box.",
  },
  {
    icon: TuneIcon,
    color: "info",
    title: "Framework Compatible",
    description:
      "Enjoy seamless compatibility with all modern frameworks and zero hassle.",
  },
  {
    icon: ExtensionIcon,
    color: "success",
    title: "Structured for Scale",
    description:
      "All components follow a consistent design system for better maintainability.",
  },
];
