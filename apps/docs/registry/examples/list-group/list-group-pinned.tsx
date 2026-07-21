"use client";

import { ListGroup } from "@hummingbirdui/react";

export default function ListGroupPinned() {
  return (
    <ListGroup className="max-h-40 max-w-md overflow-y-auto py-0">
      <ListGroup.Item pinned>Pinned heading</ListGroup.Item>
      <ListGroup.Item>An item</ListGroup.Item>
      <ListGroup.Item>A second item</ListGroup.Item>
      <ListGroup.Item>A third item</ListGroup.Item>
      <ListGroup.Item>A fourth item</ListGroup.Item>
      <ListGroup.Item>A fifth item</ListGroup.Item>
      <ListGroup.Item>A sixth item</ListGroup.Item>
    </ListGroup>
  );
}
