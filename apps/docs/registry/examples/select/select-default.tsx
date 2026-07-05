"use client";

import { Select } from "@hummingbirdui/react";

export default function SelectDefault() {
  return (
    <Select defaultValue="">
      <option value="" disabled>
        Choose a plan
      </option>
      <option value="free">Free</option>
      <option value="pro">Pro</option>
      <option value="team">Team</option>
    </Select>
  );
}
