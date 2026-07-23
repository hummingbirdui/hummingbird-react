"use client";

import { Input } from "@hummingbirdui/react";

export default function InputSizes() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  );
}
