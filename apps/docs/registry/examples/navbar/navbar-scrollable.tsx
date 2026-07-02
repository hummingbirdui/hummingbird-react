"use client";

import { Navbar, NavbarBrand, NavbarNav, NavLink } from "@hummingbirdui/react";

export default function NavbarScrollable() {
  return (
    <Navbar expand="always" className="w-full rounded-lg border border-default px-4">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
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
    </Navbar>
  );
}
