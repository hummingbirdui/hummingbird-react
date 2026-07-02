"use client";

import { ListGroup, ListGroupItem } from "@hummingbirdui/react";

export default function ListGroupActiveDisabled() {
  return (
    <ListGroup className="max-w-md">
      <ListGroupItem active>Active item</ListGroupItem>
      <ListGroupItem>Default item</ListGroupItem>
      <ListGroupItem disabled>Disabled item</ListGroupItem>
    </ListGroup>
  );
}
