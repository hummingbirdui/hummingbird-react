"use client";

import { Divider } from "@hummingbirdui/react";

export default function DividerLabel() {
  return (
    <div className="mx-auto max-w-sm">
      <Divider align="start">START</Divider>
      <Divider>CENTER</Divider>
      <Divider align="end">END</Divider>
    </div>
  );
}
