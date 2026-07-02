"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarNav,
  NavLink,
} from "@hummingbirdui/react";

export default function NavbarAlwaysCollapsed() {
  return (
    <Navbar className="w-full rounded-lg border border-default px-4">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse duration={500}>
        <NavbarNav asChild>
          <div className="gap-2">
            <NavLink href="#" active>
              Home
            </NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
          </div>
        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
  );
}
