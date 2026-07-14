"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  CardSubtitle,
} from "@hummingbirdui/react";

export default function CardDefault() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardSubtitle className="mb-0">Subtitle</CardSubtitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </CardText>
      </CardBody>
      <CardFooter>
        <Button variant="text" size="sm">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
}
