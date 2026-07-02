"use client";

import { Card, CardBody, CardText, CardTitle } from "@hummingbirdui/react";

export default function CardAction() {
  return (
    <Card action asChild className="max-w-sm">
      <a href="#card">
        <CardBody>
          <CardTitle>Clickable card</CardTitle>
          <CardText>The entire card is a link with a hover surface.</CardText>
        </CardBody>
      </a>
    </Card>
  );
}
