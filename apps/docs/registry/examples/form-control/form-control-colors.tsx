"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlColors() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <FormControl color="primary" placeholder="Primary" />
      <FormControl color="secondary" placeholder="Secondary" />
      <FormControl color="info" placeholder="Info" />
      <FormControl color="success" placeholder="Success" />
      <FormControl color="warning" placeholder="Warning" />
    </div>
  );
}
