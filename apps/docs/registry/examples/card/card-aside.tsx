"use client";

import { Card, CardBody, CardImage, CardText, CardTitle } from "@hummingbirdui/react";

export default function CardAside() {
  return (
    <Card aside className="max-w-lg">
      <CardImage
        position="left"
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300"
        alt="A dog"
        className="max-w-[40%]"
      />
      <CardBody>
        <CardTitle>Horizontal card</CardTitle>
        <CardText>Image on the start, content alongside it.</CardText>
      </CardBody>
    </Card>
  );
}
