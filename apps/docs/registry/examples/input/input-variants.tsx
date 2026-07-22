"use client";

import { Input } from "@hummingbirdui/react";

export default function InputVariants() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Input variant="outline" placeholder="Outline" />
      <Input variant="fill" placeholder="Fill" />
    </div>
  );
}
