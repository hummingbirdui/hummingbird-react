"use client";

import { Navbar, Nav } from "@hummingbirdui/react";

export default function NavbarExpand() {
  return (
    <Navbar expand="always" className="bg-subtle">
      <Navbar.Brand href="#">Hummingbird</Navbar.Brand>
      <Navbar.Nav asChild>
        <div className="gap-2">
          <Nav.Link href="#" active>
            Home
          </Nav.Link>
          <Nav.Link href="#">Pricing</Nav.Link>
        </div>
      </Navbar.Nav>
    </Navbar>
  );
}
