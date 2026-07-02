"use client";

import { FloatingLabel, FormControl } from "@hummingbirdui/react";

export default function FloatingLabelDefault() {
  return (
    <FloatingLabel htmlFor="fl-email" label="Email address" className="max-w-sm">
      <FormControl id="fl-email" type="email" />
    </FloatingLabel>
  );
}
