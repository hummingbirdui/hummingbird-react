"use client";

import { Select } from "@hummingbirdui/react";

export default function SelectColors() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <Select color="secondary" defaultValue="pro">
        <option value="free">Secondary</option>
        <option value="pro">Pro</option>
      </Select>
      <Select color="info" defaultValue="pro">
        <option value="free">Info</option>
        <option value="pro">Pro</option>
      </Select>
      <Select color="success" defaultValue="pro">
        <option value="free">Success</option>
        <option value="pro">Pro</option>
      </Select>
      <Select color="warning" defaultValue="pro">
        <option value="free">Warning</option>
        <option value="pro">Pro</option>
      </Select>
    </div>
  );
}
