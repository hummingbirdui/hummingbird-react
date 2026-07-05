"use client";

import {
  Card,
  CardBody,
  CardGroup,
  CardText,
  CardTitle,
  CardImage,
  CardFooter,
  Button,
} from "@hummingbirdui/react";

export default function CardGroupExample() {
  return (
    <CardGroup>
      <Card className="max-w-sm">
        <CardImage
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <CardBody>
          <CardTitle>Good boy</CardTitle>
          <CardText className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </CardText>
        </CardBody>
        <CardFooter>
          <Button variant="text" size="sm">
            SHARE
          </Button>
          <Button variant="text" size="sm">
            LEARN MORE
          </Button>
        </CardFooter>
      </Card>
      <Card className="max-w-sm">
        <CardImage
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <CardBody>
          <CardTitle>Good boy</CardTitle>
          <CardText className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </CardText>
        </CardBody>
        <CardFooter>
          <Button variant="text" size="sm">
            SHARE
          </Button>
          <Button variant="text" size="sm">
            LEARN MORE
          </Button>
        </CardFooter>
      </Card>
      <Card className="max-w-sm">
        <CardImage
          position="top"
          src="https://images.unsplash.com/uploads/14135798609283698b7f3/a1364128?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600"
          alt="A dog"
        />
        <CardBody>
          <CardTitle>Good boy</CardTitle>
          <CardText className="mb-0">
            Hummingbirds belong to the avian family Trochilidae, and their
            closest relatives are the equally fascinating swifts.
          </CardText>
        </CardBody>
        <CardFooter>
          <Button variant="text" size="sm">
            SHARE
          </Button>
          <Button variant="text" size="sm">
            LEARN MORE
          </Button>
        </CardFooter>
      </Card>
    </CardGroup>
  );
}
