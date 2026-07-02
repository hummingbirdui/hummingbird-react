"use client";

import { FloatingLabel, Select } from "@hummingbirdui/react";

export default function FloatingLabelSelect() {
  return (
    <FloatingLabel htmlFor="fl-plan" label="Plan" className="max-w-sm">
      <Select id="fl-plan" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
    </FloatingLabel>
  );
}
