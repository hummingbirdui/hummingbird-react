"use client";

import { Switch } from "@hummingbirdui/react";

export default function SwitchColors() {
  return (
    <div className="flex flex-col gap-2">
      <Switch color="primary" label="Primary" defaultChecked />
      <Switch color="secondary" label="Secondary" defaultChecked />
      <Switch color="success" label="Success" defaultChecked />
      <Switch color="info" label="Info" defaultChecked />
      <Switch color="warning" label="Warning" defaultChecked />
      <Switch color="danger" label="Danger" defaultChecked />
      <Switch color="neutral" label="Neutral" defaultChecked />
    </div>
  );
}
