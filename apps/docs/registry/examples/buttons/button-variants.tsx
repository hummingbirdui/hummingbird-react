"use client";

import { Button } from "@hummingbirdui/react";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      <Button variant="filled">Filled</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
