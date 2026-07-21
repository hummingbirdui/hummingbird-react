"use client";

import { Navbar, Nav } from "@hummingbirdui/react";

export default function NavbarScrollable() {
  return (
    <Navbar expand="lg" className="bg-subtle">
      <Navbar.Brand href="#">Hummingbird</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Nav scrollable asChild>
          <div className="max-h-24 gap-2">
            <Nav.Link href="#" active>
              Home
            </Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link href="#">Docs</Nav.Link>
            <Nav.Link href="#">Blog</Nav.Link>
            <Nav.Link href="#">Support</Nav.Link>
          </div>
        </Navbar.Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
