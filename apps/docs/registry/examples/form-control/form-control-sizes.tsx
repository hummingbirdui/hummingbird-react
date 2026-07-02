"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlSizes() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <FormControl size="sm" placeholder="Small" />
      <FormControl size="md" placeholder="Medium" />
      <FormControl size="lg" placeholder="Large" />
    </div>
  );
}
