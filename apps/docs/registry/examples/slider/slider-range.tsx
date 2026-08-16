"use client";

import { Slider } from "@hummingbirdui/react";

export default function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 75]}
      minStepsBetweenThumbs={10}
      aria-label="Price range"
      className="mx-auto max-w-sm"
    />
  );
}
