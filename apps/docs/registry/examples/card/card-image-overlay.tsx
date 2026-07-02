"use client";

import {
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
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
          alt="A dog"
        />
        <CardBody>
          <CardTitle>Overlaid text</CardTitle>
          <CardText>Text sits directly on top of the image.</CardText>
        </CardBody>
      </CardImageOverlay>
    </Card>
  );
}
