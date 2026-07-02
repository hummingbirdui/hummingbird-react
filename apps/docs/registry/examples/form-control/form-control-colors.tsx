"use client";

import { FormControl } from "@hummingbirdui/react";

export default function FormControlColors() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <FormControl color="primary" placeholder="Primary" />
      <FormControl color="secondary" placeholder="Secondary" />
      <FormControl color="info" placeholder="Info" />
      <FormControl color="success" placeholder="Success" />
      <FormControl color="warning" placeholder="Warning" />
    </div>
  );
}
