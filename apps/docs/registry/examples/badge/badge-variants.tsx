"use client";

import { Badge } from "@hummingbirdui/react";

export default function BadgeVariants() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="filled">Filled</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
