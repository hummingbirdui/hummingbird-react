"use client";

import { Switch } from "@hummingbirdui/react";

export default function SwitchSizes() {
  return (
    <div className="flex flex-col gap-2">
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </div>
  );
}
