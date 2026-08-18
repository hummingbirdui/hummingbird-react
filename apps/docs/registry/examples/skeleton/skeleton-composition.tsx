"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonComposition() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Skeleton variant="rounded" className="mb-4 h-40 w-full" />
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="w-1/2" />
          <Skeleton className="w-3/4" />
        </div>
      </div>
    </div>
  );
}
