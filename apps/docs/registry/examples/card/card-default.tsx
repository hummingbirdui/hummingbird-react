"use client";

import { Card, CardBody, CardText, CardTitle } from "@hummingbirdui/react";

export default function CardDefault() {
  return (
    <Card className="max-w-sm">
      <CardBody>
        <CardTitle>Card title</CardTitle>
        <CardText>
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </CardText>
      </CardBody>
    </Card>
  );
}
