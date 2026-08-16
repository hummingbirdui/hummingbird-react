"use client";

import { Slider } from "@hummingbirdui/react";

export default function SliderVertical() {
  return (
    <div className="flex h-56 justify-center gap-10">
      <Slider
        orientation="vertical"
        defaultValue={[50]}
        aria-label="Volume"
      />
      <Slider
        orientation="vertical"
        defaultValue={[25, 75]}
        color="success"
        aria-label="Range"
      />
    </div>
  );
}
