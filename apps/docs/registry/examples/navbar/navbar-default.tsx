"use client";

import { Navbar, NavbarBrand, NavbarNav, NavLink } from "@hummingbirdui/react";

export default function NavbarDefault() {
  return (
    <Navbar expand="sm" className="w-full rounded-lg border border-default px-4">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
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
    </Navbar>
  );
}
