"use client";

import { ListGroup } from "@hummingbirdui/react";

export default function ListGroupCustomContent() {
  return (
    <ListGroup className="max-w-md">
      <ListGroup.Item>
        <div className="flex w-full items-center justify-between">
          <ListGroup.Text>List group item heading</ListGroup.Text>
          <small className="text-muted">3 days ago</small>
        </div>
        <ListGroup.Text variant="secondary">
          Some supporting, secondary copy for this list item.
        </ListGroup.Text>
      </ListGroup.Item>
      <ListGroup.Item>
        <div className="flex w-full items-center justify-between">
          <ListGroup.Text>Another heading</ListGroup.Text>
          <small className="text-muted">1 week ago</small>
        </div>
        <ListGroup.Text variant="secondary">
          More supporting text.
        </ListGroup.Text>
      </ListGroup.Item>
    </ListGroup>
  );
}
