"use client";

import { Checkbox } from "@hummingbirdui/react";

export default function CheckboxColors() {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox color="primary" label="Primary" defaultChecked />
      <Checkbox color="secondary" label="Secondary" defaultChecked />
      <Checkbox color="success" label="Success" defaultChecked />
      <Checkbox color="info" label="Info" defaultChecked />
      <Checkbox color="warning" label="Warning" defaultChecked />
      <Checkbox color="danger" label="Danger" defaultChecked />
      <Checkbox color="neutral" label="Neutral" defaultChecked />
    </div>
  );
}
