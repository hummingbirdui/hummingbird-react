"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlDefault() {
  return (
    <FormControl
      type="email"
      placeholder="you@example.com"
      className="max-w-sm"
    />
  );
}
