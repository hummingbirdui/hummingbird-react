"use client";

import { Nav, NavItem, NavLink } from "@hummingbirdui/react";

export default function NavActive() {
  return (
    <Nav>
      <NavItem>
        <NavLink href="#">Overview</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" active>
          Settings
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Billing</NavLink>
      </NavItem>
    </Nav>
  );
}
