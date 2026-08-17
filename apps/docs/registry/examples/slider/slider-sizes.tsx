"use client";

import { Slider } from "@hummingbirdui/react";

export default function SliderSizes() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4">
      <Slider size="sm" defaultValue={[50]} aria-label="Small slider" />
      <Slider defaultValue={[50]} aria-label="Default slider" />
      <Slider size="lg" defaultValue={[50]} aria-label="Large slider" />
    </div>
  );
}
