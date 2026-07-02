"use client";

import { Select } from "@hummingbirdui/react";

export default function SelectSizes() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <Select size="sm" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
      <Select size="md" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
      <Select size="lg" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
    </div>
  );
}
