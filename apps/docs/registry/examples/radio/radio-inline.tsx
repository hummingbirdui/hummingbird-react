"use client";

import { Radio, RadioGroup } from "@hummingbirdui/react";

export default function RadioInline() {
  return (
    <RadioGroup name="billing" defaultValue="monthly">
      <Radio inline value="monthly" label="Monthly" />
      <Radio inline value="yearly" label="Yearly" />
    </RadioGroup>
  );
}
