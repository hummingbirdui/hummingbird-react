"use client";

import { ListGroup, ListGroupItem } from "@hummingbirdui/react";

export default function ListGroupPinned() {
  return (
    <ListGroup className="max-h-40 max-w-md overflow-y-auto">
      <ListGroupItem pinned>Pinned heading</ListGroupItem>
      <ListGroupItem>An item</ListGroupItem>
      <ListGroupItem>A second item</ListGroupItem>
      <ListGroupItem>A third item</ListGroupItem>
      <ListGroupItem>A fourth item</ListGroupItem>
      <ListGroupItem>A fifth item</ListGroupItem>
      <ListGroupItem>A sixth item</ListGroupItem>
    </ListGroup>
  );
}
