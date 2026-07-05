"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarNav,
  NavLink,
  FormControl,
  Button,
} from "@hummingbirdui/react";

export default function NavbarCollapseExample() {
  return (
    <Navbar expand="lg" className="bg-subtle">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <div className="flex items-center lg:order-1 gap-2">
        <Button variant="text" size="sm">
          Signin
        </Button>
        <Button size="sm" className="max-sm:hidden">
          Signup
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarNav asChild>
          <div className="gap-2 lg:items-center w-full">
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
