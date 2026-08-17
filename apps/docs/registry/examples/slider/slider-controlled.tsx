"use client";

import * as React from "react";
import { Slider } from "@hummingbirdui/react";

export default function SliderControlled() {
  const [value, setValue] = React.useState([250]);

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium">Budget</span>
        <span className="text-muted">${value[0]}</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        max={500}
        step={10}
        aria-label="Budget"
      />
    </div>
  );
}
