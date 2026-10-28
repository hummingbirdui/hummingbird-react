"use client";

import {
  LayoutDashboard,
  PencilRuler,
  Sparkles,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";
import { Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const features = [
  {
    icon: Wind,
    title: "Effortless User Flow",
    description:
      "Guide users step by step with a structure that feels natural and predictable.",
    className: "bg-primary-lighter text-primary",
  },
  {
    icon: Sparkles,
    title: "Meaningful Feedback",
    description:
      "Every interaction responds clearly, helping users stay confident and in control.",
    className: "bg-warning-lighter text-warning",
  },
  {
    icon: PencilRuler,
    title: "Flexible Architecture",
    description:
      "Adapt your UI easily as new features and requirements evolve.",
    className: "bg-danger-lighter text-danger",
  },
  {
    icon: LayoutDashboard,
    title: "Consistent Layouts",
    description:
      "Maintain clarity and structure across every screen and component.",
    className: "bg-secondary-lighter text-secondary",
  },
  {
    icon: Zap,
    title: "Fast Interactions",
    description:
      "Reduce delays and keep workflows smooth across all touchpoints.",
    className: "bg-info-lighter text-info",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale",
    description: "Create a foundation that supports long-term product growth.",
    className: "bg-success-lighter text-success",
  },
];

export default function Feature1() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Text as="h2" size="4xl" className="sm:text-5xl mb-6">
          Build Experiences That Feel Effortless from Start to Finish
        </Text>
        <Text size="lg" className="text-muted">
          Create applications that feel smooth and natural while helping users
          stay focused and move forward with clarity at every moment
        </Text>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="p-6 rounded-2xl border-subtle hover:border-primary-light"
          >
            <div
              className={cn(
                "flex items-center justify-center size-12 rounded-lg mb-6",
                feature.className,
              )}
            >
              <feature.icon className="size-6" />
            </div>
            <Text as="h3" size="lg" fontWeight="semibold" className="mb-2">
              {feature.title}
            </Text>
            <Text size="base" className="text-muted mb-6">
              {feature.description}
            </Text>
            <a href="#" className="font-semibold no-underline">
              Learn more →
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
