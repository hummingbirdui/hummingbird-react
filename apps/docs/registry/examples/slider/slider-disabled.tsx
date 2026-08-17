"use client";

import { Slider } from "@hummingbirdui/react";

export default function SliderDisabled() {
  return (
    <Slider
      defaultValue={[50]}
      disabled
      aria-label="Disabled slider"
      className="mx-auto max-w-sm"
    />
  );
}
