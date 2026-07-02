"use client";

import { FloatingLabel, Textarea } from "@hummingbirdui/react";

export default function FloatingLabelTextarea() {
  return (
    <FloatingLabel htmlFor="fl-bio" label="Bio" className="max-w-sm">
      <Textarea id="fl-bio" className="h-28" />
    </FloatingLabel>
  );
}
