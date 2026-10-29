"use client";

import { NavigationMenu } from "@hummingbirdui/react";

const menus = [
  { title: "Solutions", links: ["Marketing", "Sales", "Support"] },
  { title: "Resources", links: ["Blog", "Guides", "Changelog"] },
];

export default function NavigationMenuNoViewport() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenu.List>
        {menus.map((menu) => (
          <NavigationMenu.Item key={menu.title}>
            <NavigationMenu.Trigger>{menu.title}</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <ul className="w-48">
                {menu.links.map((link) => (
                  <li key={link}>
                    <NavigationMenu.Link href="#">{link}</NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu>
  );
}
