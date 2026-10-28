"use client";

import { Check, File, Globe, Leaf, Star } from "lucide-react";
import { Badge, Button, Card, Switch, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const plans = [
  {
    name: "Basic",
    description: "A great starting point for individuals and hobbyists.",
    price: "$0",
    featuresTitle: "Core features:",
    features: ["1 Project", "Basic analytics", "Community support"],
    cta: "Get Started Free",
    color: "info",
    checkClassName: "text-info",
    cardClassName: "from-info/5",
    icon: Leaf,
    iconClassName: "-top-4 right-0 text-info",
    popular: false,
  },
  {
    name: "Starter",
    description: "For small teams that need more power and coordination.",
    price: "$12",
    featuresTitle: "Everything in Basic, plus:",
    features: [
      "Up to 10 Projects",
      "Advanced analytics",
      "Priority email support",
    ],
    cta: "Subscribe Now",
    color: "info",
    checkClassName: "text-info",
    cardClassName: "from-info/10",
    icon: File,
    iconClassName: "top-4 right-0 text-info",
    popular: false,
  },
  {
    name: "Professional",
    description: "Designed for growing businesses with complex needs.",
    price: "$39",
    featuresTitle: "Everything in Starter, plus:",
    features: [
      "Unlimited Projects",
      "Remove branding",
      "Custom integrations & API",
      "24/7 Phone support",
    ],
    cta: "Start 14-day trial",
    color: "primary",
    checkClassName: "text-primary",
    cardClassName: "from-primary/10 border-primary",
    icon: Star,
    iconClassName: "top-4 right-6 text-primary",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Dedicated power and security for large-scale operations.",
    price: "$99",
    featuresTitle: "Everything in Pro, plus:",
    features: [
      "Dedicated account manager",
      "Custom SLAs & reporting",
      "Advanced security options (SSO)",
      "Unlimited data & export",
    ],
    cta: "Contact Sales",
    color: "info",
    checkClassName: "text-info",
    cardClassName: "from-info/5",
    icon: Globe,
    iconClassName: "top-4 right-4 text-info",
    popular: false,
  },
] as const;

export default function Pricing4() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="subtle" color="info" className="mb-4 px-4">
          Flexible Plans
        </Badge>
        <Text as="h3" className="mb-4 text-default">
          Plans tailored for every team size
        </Text>
        <Text size="lg" className="text-muted">
          Whether you&apos;re a soaring startup or an established enterprise, we
          have a plan perfectly suited to match your scale.
        </Text>
        <div className="form-check form-switch justify-center mt-8">
          <label className="form-check-label" htmlFor="pricingSwitch4">
            Monthly
          </label>
          <Switch id="pricingSwitch4" defaultChecked />
          <label className="form-check-label" htmlFor="pricingSwitch4">
            Annually
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch mt-12">
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <Card
              key={plan.name}
              className={cn(
                "bg-linear-to-b to-transparent rounded-4xl relative",
                plan.cardClassName,
              )}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-4xl">
                <Icon
                  fill="currentColor"
                  className={cn(
                    "absolute size-40 opacity-[0.04]",
                    plan.iconClassName,
                  )}
                />
              </div>
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2 z-20">
                  <Badge size="lg">Most Popular</Badge>
                </div>
              )}
              <Card.Body className="p-8 sm:p-10 flex flex-col h-full">
                <Text
                  as="h6"
                  className={plan.popular ? "text-primary mt-2" : undefined}
                >
                  {plan.name}
                </Text>
                <Text size="sm" className="text-muted mb-6">
                  {plan.description}
                </Text>
                <Text
                  as="h4"
                  className="text-default mb-8 flex items-baseline gap-1"
                >
                  {plan.price}
                  <span className="text-sm font-normal text-muted">
                    / month
                  </span>
                </Text>

                <Text
                  size="sm"
                  fontWeight="medium"
                  className="text-default mb-4"
                >
                  {plan.featuresTitle}
                </Text>
                <ul className="list-none ps-0 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 py-1.25"
                    >
                      <Check className={cn("size-4", plan.checkClassName)} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "filled" : "subtle"}
                  color={plan.color}
                  className="w-full mt-auto"
                >
                  {plan.cta}
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
