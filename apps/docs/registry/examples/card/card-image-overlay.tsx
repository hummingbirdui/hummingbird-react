"use client";

import {
  Button,
  Card,
  CardBody,
  CardImage,
  CardImageOverlay,
  CardText,
  CardTitle,
} from "@hummingbirdui/react";

export default function CardImageOverlayExample() {
  return (
    <Card className="max-w-sm">
      <CardImageOverlay>
        <CardImage
          position="full"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <CardBody>
          <CardTitle>Hummingbird</CardTitle>
          <CardText>
            Hummingbirds are birds native to the Americas and comprise the
            biological family Trochilidae.
          </CardText>
          <Button size="sm" className="rounded-full mt-auto">
            LEARN MORE
          </Button>
        </CardBody>
      </CardImageOverlay>
    </Card>
  );
}
