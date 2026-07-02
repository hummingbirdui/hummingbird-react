"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlSizes() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <FormControl size="sm" placeholder="Small" />
      <FormControl size="md" placeholder="Medium" />
      <FormControl size="lg" placeholder="Large" />
    </div>
  );
}
