"use client";

import { Navbar } from "@hummingbirdui/react";

export default function NavbarText_() {
  return (
    <Navbar expand="always" className="bg-subtle">
      <Navbar.Brand href="#">Hummingbird</Navbar.Brand>
      <Navbar.Text>
        Signed in as <strong>Mark</strong>
      </Navbar.Text>
    </Navbar>
  );
}
