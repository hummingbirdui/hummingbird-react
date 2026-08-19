"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonDefault() {
  return (
    <Skeleton.Group className="mx-auto max-w-sm space-y-2">
      <Skeleton className="w-full" />
      <Skeleton className="size-14 rounded-full" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-20" />
    </Skeleton.Group>
  );
}
