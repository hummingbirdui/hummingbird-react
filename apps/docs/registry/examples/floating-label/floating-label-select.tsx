"use client";

import { FloatingLabel, Select } from "@hummingbirdui/react";

export default function FloatingLabelSelect() {
  return (
    <FloatingLabel htmlFor="fl-plan" label="Plan">
      <Select id="fl-plan" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="team">Team</option>
      </Select>
    </FloatingLabel>
  );
}
