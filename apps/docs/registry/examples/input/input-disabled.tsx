"use client";

import { Input } from "@hummingbirdui/react";

export default function InputDisabled() {
  return (
    <Input
      placeholder="Disabled"
      defaultValue="Read only value"
      disabled
    />
  );
}
