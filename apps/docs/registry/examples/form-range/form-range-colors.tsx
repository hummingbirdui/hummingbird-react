"use client";

import { FormRange } from "@hummingbirdui/react";

export default function FormRangeColors() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <FormRange color="primary" defaultValue={50} />
      <FormRange color="secondary" defaultValue={50} />
      <FormRange color="info" defaultValue={50} />
      <FormRange color="success" defaultValue={50} />
      <FormRange color="warning" defaultValue={50} />
      <FormRange color="danger" defaultValue={50} />
      <FormRange color="neutral" defaultValue={50} />
    </div>
  );
}
