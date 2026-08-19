"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonColors() {
  return (
    <Skeleton.Group className="mx-auto flex max-w-sm flex-col gap-2">
      <Skeleton className="col-12" />
      <Skeleton className="col-12 text-primary" />
      <Skeleton className="col-12 text-success" />
      <Skeleton className="col-12 text-danger" />
      <Skeleton className="col-12 text-warning" />
      <Skeleton className="col-12 text-info" />
    </Skeleton.Group>
  );
}
