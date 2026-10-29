"use client";

import { Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const leftFeatures = [
  {
    number: "01",
    title: "Visual Structure",
    description:
      "Intentional layouts that prioritize content and guide the eye naturally through the interface.",
  },
  {
    number: "02",
    title: "Fluid Motion",
    description:
      "Interactions designed with physics-based easing to feel responsive and high-end.",
  },
];

const rightFeatures = [
  {
    number: "03",
    title: "Flexible Systems",
    description:
      "Scalable components that adapt to your brand as it grows from startup to enterprise.",
  },
  {
    number: "04",
    title: "Deep Focus",
    description:
      "Minimalist aesthetics that remove cognitive load, keeping users focused on the task.",
  },
];

export default function Feature5() {
  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <Text as="h2" size="4xl" className="md:text-5xl mb-8">
          Everything you need to ship{" "}
          <span className="text-primary">world-class</span> products.
        </Text>
        <Text size="lg" className="md:text-xl text-muted max-w-xl mx-auto">
          A cohesive system designed to eliminate friction and elevate the
          standard of your digital interactions.
        </Text>
      </div>
      <div className="grid lg:grid-cols-12 items-center gap-16">
        <div className="lg:col-span-3 space-y-16 order-2 lg:order-1">
          {leftFeatures.map((feature) => (
            <FeatureItem key={feature.number} {...feature} />
          ))}
        </div>
        <Card className="lg:col-span-6 order-1 lg:order-2 p-3 max-w-xl mx-auto rounded-3xl border-subtle">
          <div className="aspect-4/3 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop"
              className="size-full object-cover scale-105 hover:scale-100 transition-transform ease-in-out duration-700"
              alt="feature"
            />
          </div>
        </Card>
        <div className="lg:col-span-3 space-y-16 order-3 lg:text-right">
          {rightFeatures.map((feature) => (
            <FeatureItem key={feature.number} {...feature} reverse />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  number,
  title,
  description,
  reverse = false,
}: {
  number: string;
  title: string;
  description: string;
  reverse?: boolean;
}) {
  return (
    <div className="group">
      <div
        className={cn(
          "flex items-center gap-4 mb-4",
          reverse && "lg:flex-row-reverse",
        )}
      >
        <span className="text-4xl font-black text-subtle/50 transition group-hover:text-primary/50">
          {number}
        </span>
        <div
          className={cn(
            "h-px flex-1 from-primary/50 to-transparent lg:hidden",
            reverse ? "bg-linear-to-l" : "bg-linear-to-r",
          )}
        />
      </div>
      <Text
        as="h4"
        size="xl"
        className="mb-2 group-hover:text-primary transition"
      >
        {title}
      </Text>
      <Text size="sm" className="sm:text-base text-muted">
        {description}
      </Text>
    </div>
  );
}
