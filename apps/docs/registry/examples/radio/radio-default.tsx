"use client";

import { RadioGroup, Radio } from "@hummingbirdui/react";

export default function RadioDefault() {
  return (
    <RadioGroup name="plan" defaultValue="pro" className="flex flex-col gap-2">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  );
}
