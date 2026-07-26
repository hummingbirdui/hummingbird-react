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
    title: "Modular Components",
    description:
      "Reusable components designed to handle complex UI logic.",
  },
  {
    icon: PaletteIcon,
    color: "secondary",
    title: "Fully Customizable",
    description:
      "Tweak any component using Tailwind utilities or design tokens.",
  },
  {
    icon: SettingsIcon,
    color: "error",
    title: "Easy Theming",
    description:
      "Customize colors and styles with minimal CSS variable changes.",
  },
  {
    icon: BoltIcon,
    color: "warning",
    title: "Reliable Foundations",
    description:
      "Built on Radix primitives for accessible, predictable interactions.",
  },
  {
    icon: TuneIcon,
    color: "info",
    title: "Structured for Scale",
    description:
      "Consistent design patterns for better maintainability.",
  },
  {
    icon: ExtensionIcon,
    color: "success",
    title: "Built for Optimization",
    description:
      "Tree-shakable. Small bundles. Production-ready out of the box.",
  },
];
