"use client";

import { NavigationMenu } from "@hummingbirdui/react";

export default function NavigationMenuActive() {
  return (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#" active>
            Overview
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Settings</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="w-48">
              <li>
                <NavigationMenu.Link href="#">Profile</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#" active>
                  Billing
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#">
                  Notifications
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Reports</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}
