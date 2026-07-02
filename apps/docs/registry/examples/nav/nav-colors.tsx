"use client";

import { Nav, NavItem, NavLink } from "@hummingbirdui/react";

export default function NavColors() {
  return (
    <div className="flex flex-col gap-3">
      {(
        [
          "primary",
          "secondary",
          "info",
          "success",
          "warning",
          "danger",
          "neutral",
        ] as const
      ).map((color) => (
        <Nav key={color} color={color} className="rounded-lg p-1">
          <NavItem>
            <NavLink href="#" active>
              Active
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
        </Nav>
      ))}
    </div>
  );
}
