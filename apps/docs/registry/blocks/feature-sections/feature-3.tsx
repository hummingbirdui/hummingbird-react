"use client";

import { Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const features = [
  {
    title: "Seamless user experience",
    description:
      "Designed to guide users naturally through every step without friction or confusion",
    image:
      "https://images.unsplash.com/photo-1728044849280-10a1a75cff83?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "feature_1",
    titleClassName: "font-semibold",
    className: "lg:col-span-8 rounded-t-3xl lg:rounded-tr-xl",
    wide: true,
  },
  {
    title: "Fast performance",
    description:
      "Optimized for fast load times and smooth interactions across all devices",
    image:
      "https://images.unsplash.com/photo-1625296276703-3fbc924f07b5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "feature_2",
    titleClassName: "font-semibold",
    className: "md:col-span-6 lg:col-span-4 lg:rounded-tr-3xl",
  },
  {
    title: "Built for real world projects",
    description: "Adapt easily as your application grows and evolves over time",
    image:
      "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "feature_3",
    titleClassName: "text-xl",
    className: "md:col-span-6 lg:col-span-4 lg:rounded-bl-3xl",
  },
  {
    title: "Clean interface design",
    description:
      "Crafted with a focus on clarity and simplicity to create a distraction free and user friendly experience",
    image:
      "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "feature_4",
    titleClassName: "font-semibold",
    className: "lg:col-span-8 rounded-b-3xl lg:rounded-bl-xl",
    wide: true,
  },
];

export default function Feature3() {
  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-12">
        <Text as="h1" size="4xl" className="sm:text-5xl mb-6">
          Design Experiences That Feel Natural from the First Interaction
        </Text>
        <Text size="lg" className="text-muted">
          Create applications that guide users smoothly through every step and
          help them stay focused with clarity and confidence
        </Text>
      </div>
      <div className="grid gap-6 grid-cols-12">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className={cn(
              "col-span-12 p-6 bg-default rounded-xl border-subtle",
              feature.className,
            )}
          >
            <Text
              as="h6"
              className={cn("mb-2 text-default", feature.titleClassName)}
            >
              {feature.title}
            </Text>
            <Text className={cn("mb-6 text-muted", feature.wide && "max-w-md")}>
              {feature.description}
            </Text>
            <img
              className="h-80 w-full object-cover rounded-lg"
              src={feature.image}
              alt={feature.alt}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
