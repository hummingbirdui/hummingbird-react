"use client";

import { Button, Card } from "@hummingbirdui/react";

export default function CardAside() {
  return (
    <Card aside className="max-w-lg max-sm:flex-col">
      <Card.Image
        src="https://images.unsplash.com/photo-1682540953146-e1e29f8b8bcd?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=300"
        alt="A dog"
        className="sm:w-2/5 sm:rounded-e-none sm:rounded-l-lg"
      />
      <Card.Body>
        <Card.Title>Horizontal card</Card.Title>
        <Card.Text>Image on the start, content alongside it.</Card.Text>
        <Button variant="subtle" size="sm">
          SHARE
        </Button>
      </Card.Body>
    </Card>
  );
}
