"use client";

import { Nav } from "@hummingbirdui/react";

export default function NavActive() {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="#">Overview</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" active>
          Settings
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#">Billing</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
