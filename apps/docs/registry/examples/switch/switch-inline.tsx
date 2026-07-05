"use client";

import { Switch } from "@hummingbirdui/react";

export default function SwitchInline() {
  return (
    <div>
      <Switch inline label="Wi-Fi" defaultChecked />
      <Switch inline label="Bluetooth" />
    </div>
  );
}
