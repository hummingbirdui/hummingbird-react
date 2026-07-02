"use client";

import { Card, CardBody, CardImage, CardText, CardTitle } from "@hummingbirdui/react";

export default function CardImage_() {
  return (
    <Card className="max-w-sm">
      <CardImage
        position="top"
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
        alt="A dog"
      />
      <CardBody>
        <CardTitle>Good boy</CardTitle>
        <CardText>An image capped to the top of the card.</CardText>
      </CardBody>
    </Card>
  );
}
