"use client";

import { Check, Minus } from "lucide-react";
import { Badge, Button, Card, Switch, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for individuals and hobbyists starting their journey.",
    price: "$0",
    period: "/ forever",
    featuresTitle: "What's included:",
    features: [
      "Up to 1,000 leads",
      "Basic email support",
      "Standard integrations",
    ],
    excluded: ["Custom branding", "Advanced analytics"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description:
      "Everything you need to automate workflows and scale your team.",
    price: "$19",
    period: "/ month",
    featuresTitle: "Everything in Starter, plus:",
    features: [
      "Unlimited leads & contacts",
      "Remove branding",
      "Advanced email automation",
      "Custom fields, forms & tracking",
      "Priority 24/7 support",
    ],
    excluded: [],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Dedicated power and security for large-scale operations.",
    price: "$49",
    period: "/ month",
    featuresTitle: "Everything in Pro, plus:",
    features: [
      "Dedicated account manager",
      "Custom SLAs & reporting",
      "Advanced security options (SSO)",
      "Unlimited data & export",
      "Early access to new features",
    ],
    excluded: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing3() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="subtle" className="mb-4 px-4">
          Pricing that scales with you
        </Badge>
        <Text as="h3" className="mb-4 text-default">
          Simple, transparent pricing. No surprises.
        </Text>
        <Text size="lg" className="text-muted">
          Start for free, then upgrade when you need more power. All plans
          include standard support and core features.
        </Text>
        <div className="form-check form-switch justify-center mt-8">
          <label className="form-check-label" htmlFor="pricingSwitch3">
            Monthly
          </label>
          <Switch id="pricingSwitch3" defaultChecked />
          <label className="form-check-label" htmlFor="pricingSwitch3">
            Annually
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 mt-8 items-stretch gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "rounded-4xl max-w-103 w-full mx-auto",
              plan.popular
                ? "bg-subtle border border-primary relative"
                : "bg-default",
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                <Badge size="lg">Most Popular</Badge>
              </div>
            )}
            <Card.Body className="p-10 flex flex-col h-full">
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
                className="text-default mb-10 flex items-baseline gap-1"
              >
                {plan.price}
                <span className="text-sm font-normal text-muted">
                  {plan.period}
                </span>
              </Text>

              <Text size="sm" fontWeight="medium" className="text-default mb-4">
                {plan.featuresTitle}
              </Text>
              <ul className="list-none ps-0 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 py-1.25">
                    <Check className="size-4 text-primary" />
                    {feature}
                  </li>
                ))}
                {plan.excluded.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 py-1.25 text-subtle"
                  >
                    <Minus className="size-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "filled" : "subtle"}
                className="w-full mt-auto"
              >
                {plan.cta}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
