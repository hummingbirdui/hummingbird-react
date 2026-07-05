"use client";

import { Badge } from "@hummingbirdui/react";

export default function BadgeSizes() {
  return (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}
