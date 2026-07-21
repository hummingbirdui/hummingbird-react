"use client";

import { Radio } from "@hummingbirdui/react";

export default function RadioInline() {
  return (
    <Radio.Group name="billing" defaultValue="monthly">
      <Radio inline value="monthly" label="Monthly" />
      <Radio inline value="yearly" label="Yearly" />
    </Radio.Group>
  );
}
