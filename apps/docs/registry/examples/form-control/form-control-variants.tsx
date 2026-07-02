"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlVariants() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <FormControl variant="outline" placeholder="Outline" />
      <FormControl variant="fill" placeholder="Fill" />
    </div>
  );
}
