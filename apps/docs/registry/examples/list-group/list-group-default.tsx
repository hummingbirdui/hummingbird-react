"use client";

import { ListGroup } from "@hummingbirdui/react";

export default function ListGroupDefault() {
  return (
    <ListGroup className="max-w-md">
      <ListGroup.Item>An item</ListGroup.Item>
      <ListGroup.Item>A second item</ListGroup.Item>
      <ListGroup.Item>A third item</ListGroup.Item>
    </ListGroup>
  );
}
