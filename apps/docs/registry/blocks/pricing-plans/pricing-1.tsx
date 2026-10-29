"use client";

import { Check, Crown, Gift, Minus, Send } from "lucide-react";
import { Button, Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const features = [
  "Unlimited leads",
  "Unlimited emails",
  "No HB's branding",
  "Email automation",
  "Custom fields",
  "Pro templates",
  "Export leads and reports",
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    icon: Send,
    iconClassName: "text-info-light",
    cardClassName: "bg-default",
    included: 3,
    cta: "Start free trial",
    variant: "subtle",
    featured: false,
  },
  {
    name: "Pricing Pro",
    price: "$19.99",
    icon: Crown,
    iconClassName: "text-warning-light",
    cardClassName: "bg-subtle",
    included: 5,
    cta: "Sign up",
    variant: "filled",
    featured: true,
  },
  {
    name: "Pricing Saver",
    price: "$25.99",
    icon: Gift,
    iconClassName: "text-primary-light",
    cardClassName: "bg-default",
    included: 7,
    cta: "Sign up",
    variant: "subtle",
    featured: false,
  },
] as const;

export default function Pricing1() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <Text as="h5" fontWeight="semibold">
        Pricing Options
      </Text>
      <Text className="text-muted">
        Get the power, control, and customization you need to manage your <br />{" "}
        team’s and organization’s projects.
      </Text>
      <a className="link-primary link-hover" href="#">
        Have questions? Chat with us
      </a>
      <div className="grid lg:grid-cols-3 mt-8 items-center">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isFree = plan.price === "Free";

          return (
            <Card
              key={plan.name}
              className={cn(
                "rounded-4xl border-0 max-w-100 sm:max-w-140 w-full mx-auto",
                plan.cardClassName,
              )}
            >
              <Card.Body className="text-center p-10">
                {plan.featured ? (
                  <div className="bg-warning-light/15 text-warning-dark font-medium h-8 border border-warning-light/20 flex items-center justify-center px-3 rounded-full mb-10 sm:mb-4 lg:mb-10 sm:w-max lg:w-auto sm:ms-24 lg:ms-auto">
                    Best value
                  </div>
                ) : (
                  <div className="h-8 mb-10 hidden lg:block" />
                )}
                <div className="sm:flex lg:block gap-8">
                  <Icon
                    strokeWidth={1}
                    className={cn(
                      "size-16 mx-auto sm:mx-0 lg:mx-auto mb-8 sm:mb-0 lg:mb-8",
                      plan.iconClassName,
                    )}
                  />
                  <div>
                    <div className="text-center sm:flex lg:block items-center gap-4 mb-12 sm:mb-4 lg:mb-12">
                      <Text as="h6" className="sm:mb-0 lg:mb-2">
                        {plan.name}
                      </Text>
                      {isFree ? (
                        <Text as="h4" className="text-default sm:mb-0 lg:mb-2">
                          {plan.price}
                        </Text>
                      ) : (
                        <Text
                          as="h4"
                          className="text-default mb-12 sm:mb-0 lg:mb-12 flex items-center gap-2 justify-center"
                        >
                          {plan.price}
                          <span className="text-xs font-normal">/ month</span>
                        </Text>
                      )}
                    </div>
                    <ul className="list-none ps-0 w-max sm:w-auto lg:w-max mx-auto sm:columns-2 lg:columns-1">
                      {features.map((feature, index) =>
                        index < plan.included ? (
                          <li
                            key={feature}
                            className="flex items-center gap-1 py-1.25"
                          >
                            <Check className="size-3.5 text-success" />
                            {feature}
                          </li>
                        ) : (
                          <li
                            key={feature}
                            className="flex items-center gap-1 py-1.25 text-subtle"
                          >
                            <Minus className="size-3.5" />
                            {feature}
                          </li>
                        ),
                      )}
                    </ul>
                    <Button variant={plan.variant} className="w-full mt-9">
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
