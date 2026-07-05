"use client";

import { Navbar, NavbarBrand, NavbarNav, NavLink } from "@hummingbirdui/react";

export default function NavbarExpand() {
  return (
    <Navbar expand="always" className="bg-subtle">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarNav asChild>
        <div className="gap-2">
          <NavLink href="#" active>
            Home
          </NavLink>
          <NavLink href="#">Pricing</NavLink>
        </div>
      </NavbarNav>
    </Navbar>
  );
}
