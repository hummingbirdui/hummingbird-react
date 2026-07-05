"use client";

import { Radio } from "@hummingbirdui/react";

export default function RadioColors() {
  return (
    <div className="flex flex-col gap-2">
      <Radio name="c-primary" color="primary" label="Primary" defaultChecked />
      <Radio name="c-secondary" color="secondary" label="Secondary" defaultChecked />
      <Radio name="c-success" color="success" label="Success" defaultChecked />
      <Radio name="c-info" color="info" label="Info" defaultChecked />
      <Radio name="c-warning" color="warning" label="Warning" defaultChecked />
      <Radio name="c-danger" color="danger" label="Danger" defaultChecked />
      <Radio name="c-neutral" color="neutral" label="Neutral" defaultChecked />
    </div>
  );
}
