"use client";

import {
  Card,
  CardBody,
  CardImage,
  CardText,
  CardTitle,
} from "@hummingbirdui/react";

export default function CardImage_() {
  return (
    <Card asChild action className="max-w-sm">
      <a href="#">
        <CardImage
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <CardBody>
          <CardTitle>Hummingbird</CardTitle>
          <CardText className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </CardText>
        </CardBody>
      </a>
    </Card>
  );
}
