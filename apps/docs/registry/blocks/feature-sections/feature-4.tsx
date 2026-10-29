"use client";

import { Blocks, Layers, Smartphone } from "lucide-react";
import { Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const features = [
  {
    icon: Layers,
    title: "Clear visual hierarchy",
    description:
      "Present information in a way that feels structured and easy to follow, reducing cognitive load.",
    className: "bg-primary-lighter text-primary",
  },
  {
    icon: Smartphone,
    title: "Responsive interaction design",
    description:
      "Ensure every interaction feels smooth across different devices, from mobile gestures to desktop hovers.",
    className: "bg-secondary-lighter text-secondary",
  },
  {
    icon: Blocks,
    title: "Flexible structure for growth",
    description:
      "A modular architecture that adapts as your product scales and your user base expands.",
    className: "bg-success-lighter text-success",
  },
];

export default function Feature4() {
  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <div className="max-w-3xl text-center mx-auto mb-16">
        <Text as="h2" size="4xl" className="sm:text-5xl mb-6">
          A better way to design &amp; build{" "}
          <span className="text-primary">digital experiences</span>
        </Text>
        <Text size="base" className="text-muted max-w-xl mx-auto">
          Create applications that feel intuitive and guide users through every
          step with clarity, purpose, and surgical precision.
        </Text>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 rounded-2xl p-6 sm:p-8 border-subtle group">
          <Text as="h3" size="2xl" className="text-default mb-4">
            Experience that feels natural
          </Text>
          <Text size="base" className="mb-6">
            Every detail is crafted to help users move forward without friction.
            We focus on the tiny interactions that make a product feel
            &quot;right.&quot;
          </Text>
          <div className="h-80 rounded-xl overflow-hidden">
            <img
              className="size-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
              src="https://images.unsplash.com/photo-1594823274242-19036bf455e9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Experience Design"
            />
          </div>
        </Card>
        <div className="flex-1 flex flex-col gap-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 sm:flex-row gap-4 rounded-2xl border-subtle grow"
            >
              <div
                className={cn(
                  "flex items-center justify-center size-10 rounded-lg shrink-0",
                  feature.className,
                )}
              >
                <feature.icon className="size-4.5" />
              </div>
              <div>
                <Text
                  as="h3"
                  size="lg"
                  fontWeight="semibold"
                  className="text-default mb-2"
                >
                  {feature.title}
                </Text>
                <Text size="base">{feature.description}</Text>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
