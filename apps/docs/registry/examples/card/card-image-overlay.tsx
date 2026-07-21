"use client";

import { Button, Card } from "@hummingbirdui/react";

export default function CardImageOverlayExample() {
  return (
    <Card className="max-w-sm">
      <Card.ImageOverlay>
        <Card.Image
          position="full"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <Card.Body>
          <Card.Title>Hummingbird</Card.Title>
          <Card.Text>
            Hummingbirds are birds native to the Americas and comprise the
            biological family Trochilidae.
          </Card.Text>
          <Button size="sm" className="rounded-full mt-auto">
            LEARN MORE
          </Button>
        </Card.Body>
      </Card.ImageOverlay>
    </Card>
  );
}
