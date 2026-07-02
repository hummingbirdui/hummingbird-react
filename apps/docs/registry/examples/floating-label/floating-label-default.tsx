"use client";

import { FloatingLabel, FormControl } from "@hummingbirdui/react";

export default function FloatingLabelDefault() {
  return (
    <FloatingLabel htmlFor="fl-email" label="Email address">
      <FormControl id="fl-email" type="email" />
    </FloatingLabel>
  );
}
