"use client";

import { ListGroup } from "@hummingbirdui/react";

export default function ListGroupActiveDisabled() {
  return (
    <ListGroup className="max-w-md">
      <ListGroup.Item active>Active item</ListGroup.Item>
      <ListGroup.Item>Default item</ListGroup.Item>
      <ListGroup.Item disabled>Disabled item</ListGroup.Item>
    </ListGroup>
  );
}
