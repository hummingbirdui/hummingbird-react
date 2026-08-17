"use client";

import { Progress } from "@hummingbirdui/react";

const bars = [
  { color: "primary", value: 20 },
  { color: "secondary", value: 30 },
  { color: "danger", value: 40 },
  { color: "warning", value: 60 },
  { color: "success", value: 80 },
] as const;

export default function ProgressStriped() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      {bars.map(({ color, value }) => (
        <Progress
          key={color}
          value={value}
          className="h-2"
          aria-label={`${color} striped progress`}
        >
          <Progress.Bar color={color} striped />
        </Progress>
      ))}
    </div>
  );
}
