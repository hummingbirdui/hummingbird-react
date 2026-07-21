"use client";

import { Card, Button } from "@hummingbirdui/react";

export default function CardGroupExample() {
  return (
    <Card.Group>
      <Card className="max-w-sm">
        <Card.Image
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <Card.Body>
          <Card.Title>Good boy</Card.Title>
          <Card.Text className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="text" size="sm">
            SHARE
          </Button>
          <Button variant="text" size="sm">
            LEARN MORE
          </Button>
        </Card.Footer>
      </Card>
      <Card className="max-w-sm">
        <Card.Image
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <Card.Body>
          <Card.Title>Good boy</Card.Title>
          <Card.Text className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="text" size="sm">
            SHARE
          </Button>
          <Button variant="text" size="sm">
            LEARN MORE
          </Button>
        </Card.Footer>
      </Card>
      <Card className="max-w-sm">
        <Card.Image
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <Card.Body>
          <Card.Title>Good boy</Card.Title>
          <Card.Text className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="text" size="sm">
            SHARE
          </Button>
          <Button variant="text" size="sm">
            LEARN MORE
          </Button>
        </Card.Footer>
      </Card>
    </Card.Group>
  );
}
