"use client";

import { ListGroup, ListGroupItem, ListText } from "@hummingbirdui/react";

export default function ListGroupCustomContent() {
  return (
    <ListGroup className="max-w-md">
      <ListGroupItem>
        <div className="flex w-full items-center justify-between">
          <ListText>List group item heading</ListText>
          <small className="text-muted">3 days ago</small>
        </div>
        <ListText variant="secondary">
          Some supporting, secondary copy for this list item.
        </ListText>
      </ListGroupItem>
      <ListGroupItem>
        <div className="flex w-full items-center justify-between">
          <ListText>Another heading</ListText>
          <small className="text-muted">1 week ago</small>
        </div>
        <ListText variant="secondary">More supporting text.</ListText>
      </ListGroupItem>
    </ListGroup>
  );
}
