"use client";

import { Alert } from "@hummingbirdui/react";

export default function AlertVariants() {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="filled">A filled alert.</Alert>
      <Alert variant="subtle">A subtle alert.</Alert>
      <Alert variant="outline">An outline alert.</Alert>
    </div>
  );
}
