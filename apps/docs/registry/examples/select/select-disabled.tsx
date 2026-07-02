"use client";

import { Select } from "@hummingbirdui/react";

export default function SelectDisabled() {
  return (
    <Select defaultValue="pro" disabled className="max-w-sm">
      <option value="free">Free</option>
      <option value="pro">Pro</option>
      <option value="team">Team</option>
    </Select>
  );
}
