"use client";

import { Select } from "@hummingbirdui/react";

export default function SelectVariants() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
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
