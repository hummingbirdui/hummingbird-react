"use client";

import { FloatingLabel, Input } from "@hummingbirdui/react";

export default function FloatingLabelDefault() {
  return (
    <FloatingLabel htmlFor="fl-email" label="Email address">
      <Input id="fl-email" type="email" />
    </FloatingLabel>
  );
}
