"use client";

import { Badge } from "@hummingbirdui/react";
import { X } from "lucide-react";

export default function BadgeWithAction() {
  return (
    <Badge color="primary">
      Dismissible
      <Badge.ActionButton aria-label="Remove">
        <X className="size-3" />
      </Badge.ActionButton>
    </Badge>
  );
}
