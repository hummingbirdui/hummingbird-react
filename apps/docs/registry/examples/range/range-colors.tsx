"use client";

import { Range } from "@hummingbirdui/react";

export default function RangeColors() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Range color="primary" defaultValue={50} />
      <Range color="secondary" defaultValue={50} />
      <Range color="info" defaultValue={50} />
      <Range color="success" defaultValue={50} />
      <Range color="warning" defaultValue={50} />
      <Range color="danger" defaultValue={50} />
      <Range color="neutral" defaultValue={50} />
    </div>
  );
}
