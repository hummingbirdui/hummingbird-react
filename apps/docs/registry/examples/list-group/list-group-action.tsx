"use client";

import { ListGroup } from "@hummingbirdui/react";

export default function ListGroupAction() {
  return (
    <ListGroup asChild className="max-w-md">
      <div>
        <ListGroup.Item action asChild>
          <a href="#list-group">First action</a>
        </ListGroup.Item>
        <ListGroup.Item action active asChild>
          <a href="#list-group">Active action</a>
        </ListGroup.Item>
        <ListGroup.Item action asChild>
          <a href="#list-group">Third action</a>
        </ListGroup.Item>
      </div>
    </ListGroup>
  );
}
