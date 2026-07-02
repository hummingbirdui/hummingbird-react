"use client";

import { Checkbox } from "@hummingbirdui/react";

export default function CheckboxInline() {
  return (
    <div>
      <Checkbox inline label="Email" defaultChecked />
      <Checkbox inline label="SMS" />
      <Checkbox inline label="Push" />
    </div>
  );
}
