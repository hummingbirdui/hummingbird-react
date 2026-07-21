"use client";

import { Navbar, FormControl, Button, Nav } from "@hummingbirdui/react";

export default function NavbarCollapseExample() {
  return (
    <Navbar expand="lg" className="bg-subtle">
      <Navbar.Brand href="#">Hummingbird</Navbar.Brand>
      <div className="flex items-center lg:order-1 gap-2">
        <Button variant="text" size="sm">
          Signin
        </Button>
        <Button size="sm" className="max-sm:hidden">
          Signup
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Nav asChild>
          <div className="gap-2 lg:items-center w-full">
            <Nav.Link href="#" active>
              Home
            </Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link href="#" disabled>
              Disabled
            </Nav.Link>
          </div>
        </Navbar.Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
