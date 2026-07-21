"use client";

import { Button, Card } from "@hummingbirdui/react";

export default function CardDefault() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <Card.Title>Card title</Card.Title>
        <Card.Subtitle className="mb-0">Subtitle</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text className="mb-0">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="text" size="sm">
          Learn more
        </Button>
      </Card.Footer>
    </Card>
  );
}
