"use client";

import { Badge, BadgeActionButton } from "@hummingbirdui/react";
import { X } from "lucide-react";

export default function BadgeWithAction() {
  return (
    <Badge color="primary">
      Dismissible
      <BadgeActionButton aria-label="Remove">
        <X className="size-3" />
      </BadgeActionButton>
    </Badge>
  );
}
