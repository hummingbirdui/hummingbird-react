"use client";

import { Badge } from "@hummingbirdui/react";

export default function BadgeColors() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge color="neutral">Neutral</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
    </div>
  );
}
