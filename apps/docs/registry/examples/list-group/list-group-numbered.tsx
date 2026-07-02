"use client";

import { ListGroup, ListGroupItem } from "@hummingbirdui/react";

export default function ListGroupNumbered() {
  return (
    <ListGroup numbered className="max-w-md">
      <ListGroupItem>First item</ListGroupItem>
      <ListGroupItem>Second item</ListGroupItem>
      <ListGroupItem>Third item</ListGroupItem>
    </ListGroup>
  );
}
