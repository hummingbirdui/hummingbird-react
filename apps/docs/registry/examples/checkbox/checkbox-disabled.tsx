"use client";

import { Checkbox } from "@hummingbirdui/react";

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  );
}
