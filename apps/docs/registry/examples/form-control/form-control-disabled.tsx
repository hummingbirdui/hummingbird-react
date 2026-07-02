"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlDisabled() {
  return (
    <FormControl
      placeholder="Disabled"
      defaultValue="Read only value"
      disabled
      className="max-w-sm"
    />
  );
}
