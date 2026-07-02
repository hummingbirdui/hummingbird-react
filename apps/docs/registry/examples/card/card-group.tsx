"use client";

import { Card, CardBody, CardGroup, CardText, CardTitle } from "@hummingbirdui/react";

export default function CardGroupExample() {
  return (
    <CardGroup>
      <Card>
        <CardBody>
          <CardTitle>First</CardTitle>
          <CardText>This is the first card.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Second</CardTitle>
          <CardText>This is the second card.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Third</CardTitle>
          <CardText>This is the third card.</CardText>
        </CardBody>
      </Card>
    </CardGroup>
  );
}
