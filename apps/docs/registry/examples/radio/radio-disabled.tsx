"use client";

import { RadioGroup, Radio } from "@hummingbirdui/react";

export default function RadioDisabled() {
  return (
    <RadioGroup name="plan-disabled" defaultValue="free" className="flex flex-col gap-2">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro (unavailable)" disabled />
    </RadioGroup>
  );
}
