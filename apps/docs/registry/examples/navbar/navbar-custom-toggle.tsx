"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarNav,
  NavLink,
} from "@hummingbirdui/react";
import { AlignJustify } from "lucide-react";

export default function NavbarCustomToggle() {
  return (
    <Navbar className="bg-subtle">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarToggle className="btn btn-icon btn-sm">
        <AlignJustify className="size-5" />
      </NavbarToggle>
      <NavbarCollapse>
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
