"use client";

import { Nav } from "@hummingbirdui/react";

export default function NavDisabled() {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="#" active>
          Active
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
