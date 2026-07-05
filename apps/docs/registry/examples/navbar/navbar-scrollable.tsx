"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarNav,
  NavbarToggle,
  NavLink,
} from "@hummingbirdui/react";

export default function NavbarScrollable() {
  return (
    <Navbar expand="lg" className="bg-subtle">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarNav scrollable asChild>
          <div className="max-h-24 gap-2">
            <NavLink href="#" active>
              Home
            </NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">Docs</NavLink>
            <NavLink href="#">Blog</NavLink>
            <NavLink href="#">Support</NavLink>
          </div>
        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
  );
}
