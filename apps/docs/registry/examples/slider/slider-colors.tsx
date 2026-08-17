"use client";

import { Slider } from "@hummingbirdui/react";

const colors = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger",
  "neutral",
] as const;

export default function SliderColors() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4">
      {colors.map((color) => (
        <Slider
          key={color}
          color={color}
          defaultValue={[50]}
          aria-label={`${color} slider`}
        />
      ))}
    </div>
  );
}
