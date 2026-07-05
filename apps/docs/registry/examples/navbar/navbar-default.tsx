"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarNav,
  NavbarToggle,
  NavLink,
} from "@hummingbirdui/react";

export default function NavbarDefault() {
  return (
    <Navbar expand="sm" className="bg-subtle">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarNav className="ms-auto">
          <NavLink href="#" active>
            Home
          </NavLink>
          <NavLink href="#">Features</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#" disabled>
            Disabled
          </NavLink>
        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
  );
}
