"use client";

import { ListGroup, ListGroupItem } from "@hummingbirdui/react";

export default function ListGroupAction() {
  return (
    <ListGroup asChild className="max-w-md">
      <div>
        <ListGroupItem action asChild>
          <a href="#list-group">First action</a>
        </ListGroupItem>
        <ListGroupItem action active asChild>
          <a href="#list-group">Active action</a>
        </ListGroupItem>
        <ListGroupItem action asChild>
          <a href="#list-group">Third action</a>
        </ListGroupItem>
      </div>
    </ListGroup>
  );
}
