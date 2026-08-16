"use client";

import { Slider } from "@hummingbirdui/react";

export default function SliderDefault() {
  return (
    <Slider
      defaultValue={[50]}
      aria-label="Volume"
      className="mx-auto max-w-sm"
    />
  );
}
