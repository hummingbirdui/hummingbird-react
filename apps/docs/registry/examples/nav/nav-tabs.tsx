"use client";

import { Nav, NavItem, NavLink } from "@hummingbirdui/react";

export default function NavTabs() {
  return (
    <Nav variant="tabs">
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
  );
}
