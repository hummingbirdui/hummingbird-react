"use client";

import { Nav, NavItem, NavLink } from "@hummingbirdui/react";

export default function NavDisabled() {
  return (
    <Nav>
      <NavItem>
        <NavLink href="#" active>
          Active
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" disabled>
          Disabled
        </NavLink>
      </NavItem>
    </Nav>
  );
}
