"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonSizes() {
  return (
    <Skeleton.Group className="mx-auto flex max-w-sm flex-col gap-2">
      <Skeleton size="xs" className="col-12" />
      <Skeleton size="sm" className="col-12" />
      <Skeleton className="col-12" />
      <Skeleton size="lg" className="col-12" />
    </Skeleton.Group>
  );
}
