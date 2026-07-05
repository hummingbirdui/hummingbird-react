"use client";

import { ListGroup, ListGroupItem } from "@hummingbirdui/react";

export default function ListGroupDefault() {
  return (
    <ListGroup className="max-w-md">
      <ListGroupItem>An item</ListGroupItem>
      <ListGroupItem>A second item</ListGroupItem>
      <ListGroupItem>A third item</ListGroupItem>
    </ListGroup>
  );
}
