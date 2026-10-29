"use client";

import { NavigationMenu } from "@hummingbirdui/react";

const features = [
  {
    title: "Analytics",
    description: "Track traffic, conversions and retention in real time.",
  },
  {
    title: "Automation",
    description: "Trigger workflows from events without writing code.",
  },
  {
    title: "Integrations",
    description: "Connect the tools your team already relies on.",
  },
  {
    title: "Security",
    description: "Single sign-on, audit logs and role-based access.",
  },
];

export default function NavigationMenuDescriptions() {
  return (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-96 grid-cols-2 gap-1">
              {features.map((feature) => (
                <li key={feature.title}>
                  <NavigationMenu.Link href="#">
                    <span className="font-medium">{feature.title}</span>
                    <span className="text-muted">{feature.description}</span>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}
