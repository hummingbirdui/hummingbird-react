"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarNav,
  NavLink,
} from "@hummingbirdui/react";

export default function NavbarCollapseExample() {
  return (
    <Navbar expand="lg" className="w-full rounded-lg border border-default px-4">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarNav asChild>
          <div className="gap-2">
            <NavLink href="#" active>
              Home
            </NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#" disabled>
              Disabled
            </NavLink>
          </div>
        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
  );
}
