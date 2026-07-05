"use client";

import { CloseButton } from "@hummingbirdui/react";

export default function CloseButtonDisabled() {
  return (
    <div className="flex items-center gap-3">
      <CloseButton disabled />
    </div>
  );
}
