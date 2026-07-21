"use client";

import { Nav } from "@hummingbirdui/react";

export default function NavUnderline() {
  return (
    <Nav variant="underline">
      <Nav.Item>
        <Nav.Link href="#" active>
          Active
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
