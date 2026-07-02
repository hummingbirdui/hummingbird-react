"use client";

import { Switch } from "@hummingbirdui/react";

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-2">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  );
}
