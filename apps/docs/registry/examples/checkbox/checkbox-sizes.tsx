"use client";

import { Checkbox } from "@hummingbirdui/react";

export default function CheckboxSizes() {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  );
}
