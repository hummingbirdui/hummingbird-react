"use client";

import { Input } from "@hummingbirdui/react";

export default function InputColors() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Input color="primary" placeholder="Primary" />
      <Input color="secondary" placeholder="Secondary" />
      <Input color="info" placeholder="Info" />
      <Input color="success" placeholder="Success" />
      <Input color="warning" placeholder="Warning" />
    </div>
  );
}
