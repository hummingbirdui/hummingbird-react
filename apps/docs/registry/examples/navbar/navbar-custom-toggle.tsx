"use client";

import { Navbar, Nav } from "@hummingbirdui/react";
import { AlignJustify } from "lucide-react";

export default function NavbarCustomToggle() {
  return (
    <Navbar className="bg-subtle">
      <Navbar.Brand href="#">Hummingbird</Navbar.Brand>
      <Navbar.Toggle className="btn btn-icon btn-sm">
        <AlignJustify className="size-5" />
      </Navbar.Toggle>
      <Navbar.Collapse>
        <Navbar.Nav asChild>
          <div className="gap-2">
            <Nav.Link href="#" active>
              Home
            </Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
          </div>
        </Navbar.Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
