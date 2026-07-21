"use client";

import { Navbar, Nav } from "@hummingbirdui/react";

export default function NavbarDefault() {
  return (
    <Navbar expand="sm" className="bg-subtle">
      <Navbar.Brand href="#">Hummingbird</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Nav className="ms-auto">
          <Nav.Link href="#" active>
            Home
          </Nav.Link>
          <Nav.Link href="#">Features</Nav.Link>
          <Nav.Link href="#">Pricing</Nav.Link>
          <Nav.Link href="#" disabled>
            Disabled
          </Nav.Link>
        </Navbar.Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
