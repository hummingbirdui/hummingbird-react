"use client";

import { MonitorCheck, TrendingUp, Zap } from "lucide-react";
import { Button, Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const features = [
  {
    icon: MonitorCheck,
    title: "Intuitive by design",
    description:
      "Reduce cognitive load and guide users naturally through every flow.",
    className: "bg-primary-lighter text-primary",
  },
  {
    icon: Zap,
    title: "Lightning-fast performance",
    description:
      "Built for speed to keep users engaged without friction or delay.",
    className: "bg-secondary-lighter text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Built to scale",
    description: "Grow your product without redesigning your foundation.",
    className: "bg-success-lighter text-success",
  },
];

export default function Feature2() {
  return (
    <section className="px-6 py-20 max-w-3xl lg:max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <Text as="h2" size="4xl" className="sm:text-5xl mb-3">
            Everything you need to build better products
          </Text>
          <Text size="lg" className="text-muted max-w-xl mb-10">
            A thoughtfully crafted system that helps you design faster, ship
            confidently, and scale without friction.
          </Text>
          <div className="space-y-3 mb-10">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-5">
                <div
                  className={cn(
                    "flex items-center justify-center size-12 rounded-xl shrink-0",
                    feature.className,
                  )}
                >
                  <feature.icon className="size-5" />
                </div>
                <div>
                  <Text as="h3" size="base" fontWeight="semibold">
                    {feature.title}
                  </Text>
                  <Text size="sm" className="text-muted">
                    {feature.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <a href="#">Get started</a>
            </Button>
            <Button asChild color={null}>
              <a href="#">Explore all features</a>
            </Button>
          </div>
        </div>
        <div className="relative aspect-4/3 max-w-xl">
          <img
            className="size-full object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1532102235608-dc8fc689c9ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <Card className="absolute bottom-3 left-3 lg:-bottom-6 lg:-left-6 p-4 w-48 border-primary-light rounded-xl">
            <Text size="sm" fontWeight="semibold" className="mb-2">
              +32% faster workflows
            </Text>
            <span className="text-xs text-muted">
              Measured after UI improvements
            </span>
          </Card>
        </div>
      </div>
    </section>
  );
}
