"use client";

import { NavigationMenu } from "@hummingbirdui/react";

const components = ["Accordion", "Alert", "Button", "Card", "Dialog", "Tabs"];

export default function NavigationMenuDefault() {
  return (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="w-56">
              <li>
                <NavigationMenu.Link href="#">Introduction</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#">Installation</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#">Dark mode</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-80 grid-cols-2">
              {components.map((component) => (
                <li key={component}>
                  <NavigationMenu.Link href="#">
                    {component}
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Blocks</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}
