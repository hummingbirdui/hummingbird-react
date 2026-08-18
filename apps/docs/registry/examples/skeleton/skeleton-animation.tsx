"use client";

import { Skeleton } from "@hummingbirdui/react";

export default function SkeletonAnimation() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Skeleton animation="pulse" />
      <Skeleton animation="shimmer" />
      <Skeleton animation="none" />
    </div>
  );
}
