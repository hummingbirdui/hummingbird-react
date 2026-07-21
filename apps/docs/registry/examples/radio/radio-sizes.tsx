"use client";

import { Radio } from "@hummingbirdui/react";

export default function RadioSizes() {
  return (
    <Radio.Group name="size" defaultValue="md" className="flex flex-col gap-2">
      <Radio value="sm" size="sm" label="Small" />
      <Radio value="md" size="md" label="Medium" />
      <Radio value="lg" size="lg" label="Large" />
    </Radio.Group>
  );
}
