"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonShapes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      <Skeleton variant="rectangle" className="h-16 w-24" />
      <Skeleton variant="rounded" className="h-16 w-24" />
      <Skeleton variant="text" className="w-24" />
      <Skeleton variant="circle" />
    </div>
  );
}
