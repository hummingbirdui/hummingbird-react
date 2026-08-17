"use client";

import { Progress } from "@hummingbirdui/react";

export default function ProgressLabels() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Progress value={25} className="h-3" aria-label="A quarter done">
        <Progress.Bar>25%</Progress.Bar>
      </Progress>
      <Progress value={50} className="h-3" aria-label="Half done">
        <Progress.Bar color="danger">50%</Progress.Bar>
      </Progress>
      <Progress value={75} className="h-3" aria-label="Three quarters done">
        <Progress.Bar color="success">75%</Progress.Bar>
      </Progress>
    </div>
  );
}
