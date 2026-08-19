"use client";

import { Divider } from "@hummingbirdui/react";

export default function DividerVertical() {
  return (
    <div className="mx-auto flex h-32 items-center justify-center gap-8">
      <Divider orientation="vertical" className="h-10" />
      <Divider
        orientation="vertical"
        className="h-20 border-s-2 border-warning"
      />
      <Divider orientation="vertical" className="h-30 border-s-4 border-info" />
    </div>
  );
}
