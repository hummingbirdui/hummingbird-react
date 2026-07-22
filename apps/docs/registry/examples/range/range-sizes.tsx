"use client";

import { Range } from "@hummingbirdui/react";

export default function RangeSizes() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Range size="sm" defaultValue={50} />
      <Range size="md" defaultValue={50} />
      <Range size="lg" defaultValue={50} />
    </div>
  );
}
