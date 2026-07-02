"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
} from "@hummingbirdui/react";

export default function CardHeaderFooter() {
  return (
    <Card className="max-w-sm">
      <CardHeader>Featured</CardHeader>
      <CardBody>
        <CardTitle>Special title treatment</CardTitle>
        <CardSubtitle>Supporting subtitle</CardSubtitle>
        <CardText>With supporting text below as a natural lead-in.</CardText>
      </CardBody>
      <CardFooter>
        <Button variant="text" size="sm">
          SHARE
        </Button>
      </CardFooter>
    </Card>
  );
}
