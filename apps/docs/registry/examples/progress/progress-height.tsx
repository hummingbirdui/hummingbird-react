"use client";

import { Progress } from "@hummingbirdui/react";

export default function ProgressHeight() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Progress value={40} aria-label="Default height">
        <Progress.Bar />
      </Progress>
      <Progress value={40} className="h-2" aria-label="Taller">
        <Progress.Bar />
      </Progress>
      <Progress value={40} className="h-3" aria-label="Tallest">
        <Progress.Bar />
      </Progress>
    </div>
  );
}
