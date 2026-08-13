"use client";

import { Progress } from "@hummingbirdui/react";

export default function ProgressAnimated() {
  return (
    <Progress value={60} className="mx-auto h-3 w-full max-w-sm" aria-label="Uploading">
      <Progress.Bar striped animated />
    </Progress>
  );
}
