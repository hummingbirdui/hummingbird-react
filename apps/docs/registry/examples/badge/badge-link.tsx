"use client";

import { Badge } from "@hummingbirdui/react";

export default function BadgeLink() {
  return (
    <Badge link asChild>
      <a href="#">Link badge</a>
    </Badge>
  );
}
