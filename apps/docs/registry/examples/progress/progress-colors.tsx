"use client";

import { Progress } from "@hummingbirdui/react";

const bars = [
  { color: "primary", value: 20 },
  { color: "secondary", value: 30 },
  { color: "warning", value: 40 },
  { color: "danger", value: 50 },
  { color: "info", value: 60 },
  { color: "success", value: 70 },
] as const;

export default function ProgressColors() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      {bars.map(({ color, value }) => (
        <Progress key={color} value={value} aria-label={`${color} progress`}>
          <Progress.Bar color={color} />
        </Progress>
      ))}
    </div>
  );
}
