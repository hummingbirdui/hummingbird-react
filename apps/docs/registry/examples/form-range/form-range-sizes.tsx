"use client";

import { FormRange } from "@hummingbirdui/react";

export default function FormRangeSizes() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <FormRange size="sm" defaultValue={50} />
      <FormRange size="md" defaultValue={50} />
      <FormRange size="lg" defaultValue={50} />
    </div>
  );
}
