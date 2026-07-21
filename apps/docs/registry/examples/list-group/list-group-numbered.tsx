"use client";

import { ListGroup } from "@hummingbirdui/react";

export default function ListGroupNumbered() {
  return (
    <ListGroup numbered className="max-w-md">
      <ListGroup.Item>First item</ListGroup.Item>
      <ListGroup.Item>Second item</ListGroup.Item>
      <ListGroup.Item>Third item</ListGroup.Item>
    </ListGroup>
  );
}
