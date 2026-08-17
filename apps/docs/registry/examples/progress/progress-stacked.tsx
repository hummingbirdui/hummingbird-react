"use client";

import { Progress } from "@hummingbirdui/react";

export default function ProgressStacked() {
  return (
    <Progress.Stacked className="mx-auto h-3 w-full max-w-sm gap-0.5">
      <Progress value={20} aria-label="Segment one">
        <Progress.Bar />
      </Progress>
      <Progress value={15} aria-label="Segment two">
        <Progress.Bar color="secondary" />
      </Progress>
      <Progress value={10} aria-label="Segment three">
        <Progress.Bar color="danger" />
      </Progress>
      <Progress value={25} aria-label="Segment four">
        <Progress.Bar color="info" />
      </Progress>
    </Progress.Stacked>
  );
}
