"use client";

import { Check } from "lucide-react";
import { Badge, Button, Card, Switch, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const plans = [
  {
    name: "Single",
    description: "For teams that need to create project plans with confidence.",
    price: "$0",
    cta: "Start Free Trial",
    variant: "outline",
    cardClassName: "bg-default",
    dividerClassName: "border-subtle",
    featuresTitle: "Track team projects with free:",
    features: [
      { label: "Timeline" },
      { label: "Advanced Search" },
      { label: "Custom fields", badge: "New", badgeColor: "success" },
      { label: "Task dependencies" },
      { label: "Private teams & projects" },
    ],
    moreLink: "More about single",
  },
  {
    name: "Business",
    description:
      "For teams and companies that need to manage work across initiatives.",
    price: "$29",
    cta: "Get Business",
    variant: "filled",
    cardClassName: "bg-primary-lighter",
    dividerClassName: "border-primary-light",
    featuresTitle: "Everything in Premium, plus:",
    features: [
      { label: "Portfolios" },
      { label: "Lock custom fields" },
      { label: "Onboarding plan" },
      { label: "Resource Management" },
      { label: "Lock custom fields" },
    ],
    moreLink: "More about Business",
  },
  {
    name: "Extended",
    description: "For organizations that need additional security and support.",
    price: "$99",
    cta: "Purchase",
    variant: "outline",
    cardClassName: "bg-default",
    dividerClassName: "border-subtle",
    featuresTitle: "Everything in Business, plus:",
    features: [
      { label: "Portfolios" },
      { label: "Tags", badge: "Coming Soon", badgeColor: "primary" },
      { label: "Onboarding plan" },
      { label: "Resource Management" },
    ],
    moreLink: "More about Extended",
  },
] as const;

export default function Pricing2() {
  return (
    <Card className="border-0 bg-default p-6">
      <Card.Header className="border-subtle px-0 flex justify-between items-center">
        <Text as="h6" size="base" fontWeight="semibold">
          Billed Annually
        </Text>
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="pricingSwitch2">
            Monthly
          </label>
          <Switch id="pricingSwitch2" />
          <label className="form-check-label" htmlFor="pricingSwitch2">
            Yearly
          </label>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="grid lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "border-0 rounded-none max-w-130 w-full mx-auto",
                plan.cardClassName,
              )}
            >
              <Card.Body className="p-6">
                <div
                  className={cn(
                    "border-b text-center pb-6 mb-6",
                    plan.dividerClassName,
                  )}
                >
                  <Text as="h5" fontWeight="medium" className="text-default">
                    {plan.name}
                  </Text>
                  <Text>{plan.description}</Text>
                  <Text as="h4" className="my-6">
                    {plan.price}
                    <span className="text-sm font-normal">/ month</span>
                  </Text>
                  <Button variant={plan.variant}>{plan.cta}</Button>
                </div>
                <Text
                  as="h6"
                  size="base"
                  fontWeight="semibold"
                  className="text-default mb-3"
                >
                  {plan.featuresTitle}
                </Text>
                <ul className="list-none ps-0">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-base flex items-center py-1 gap-2"
                    >
                      <Check className="size-4.5 text-success" />
                      {feature.label}
                      {"badge" in feature && (
                        <Badge variant="subtle" color={feature.badgeColor}>
                          {feature.badge}
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
                <a className="text-base no-underline" href="#">
                  {plan.moreLink}
                </a>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className="text-center py-6 border-t border-subtle">
        <Text as="h6" fontWeight="semibold">
          Looking for personal or small team task management?
        </Text>
        <Text size="base">Try the basic version of Hummingbird</Text>
      </Card.Footer>
    </Card>
  );
}
