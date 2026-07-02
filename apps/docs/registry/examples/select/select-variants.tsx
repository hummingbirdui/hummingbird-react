"use client";

import { Select } from "@hummingbirdui/react";

export default function SelectVariants() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Select variant="outline" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
      <Select variant="fill" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
    </div>
  );
}
