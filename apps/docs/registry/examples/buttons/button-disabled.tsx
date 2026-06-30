"use client";

import { Button } from "@hummingbirdui/react";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button disabled>Primary</Button>
      <Button color="secondary" variant="subtle" disabled>
        Secondary
      </Button>
    </div>
  );
}
