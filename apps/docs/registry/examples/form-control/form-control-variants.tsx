"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlVariants() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <FormControl variant="outline" placeholder="Outline" />
      <FormControl variant="fill" placeholder="Fill" />
    </div>
  );
}
