"use client";

import { Nav } from "@hummingbirdui/react";

export default function NavColors() {
  return (
    <div className="flex flex-col gap-3">
      {(
        [
          "primary",
          "secondary",
          "info",
          "success",
          "warning",
          "danger",
          "neutral",
        ] as const
      ).map((color) => (
        <Nav key={color} color={color} className="rounded-lg p-1">
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
      ))}
    </div>
  );
}
