"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonSizing() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
}
