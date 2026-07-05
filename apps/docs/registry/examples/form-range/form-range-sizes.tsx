"use client";

import { FormRange } from "@hummingbirdui/react";

export default function FormRangeSizes() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <FormRange size="sm" defaultValue={50} />
      <FormRange size="md" defaultValue={50} />
      <FormRange size="lg" defaultValue={50} />
    </div>
  );
}
