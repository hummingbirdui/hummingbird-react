"use client";

import { Navbar, NavbarBrand, NavbarText } from "@hummingbirdui/react";

export default function NavbarText_() {
  return (
    <Navbar expand="always" className="w-full rounded-lg border border-default px-4">
      <NavbarBrand href="#">Hummingbird</NavbarBrand>
      <NavbarText>
        Signed in as <strong>Mark</strong>
      </NavbarText>
    </Navbar>
  );
}
