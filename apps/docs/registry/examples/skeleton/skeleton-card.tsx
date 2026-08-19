"use client";

import { Button, Card, Skeleton } from "@hummingbirdui/react";

export default function SkeletonCard() {
  return (
    <Card className="mx-auto max-w-xs">
      <Skeleton className="h-36 w-full rounded-t-(--card-border-radius)" />
      <Card.Body>
        <Skeleton.Group>
          <Card.Title>
            <Skeleton className="col-6" />
          </Card.Title>
          <Card.Text>
            <Skeleton className="col-7" /> <Skeleton className="col-4" />{" "}
            <Skeleton className="col-4" /> <Skeleton className="col-6" />
          </Card.Text>
          <Button
            disabled
            aria-hidden="true"
            className="placeholder col-6 text-primary"
          />
        </Skeleton.Group>
      </Card.Body>
    </Card>
  );
}
