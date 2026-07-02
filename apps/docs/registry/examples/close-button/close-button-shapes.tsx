"use client";

import { CloseButton } from "@hummingbirdui/react";

export default function CloseButtonShapes() {
  return (
    <div className="flex items-center gap-3">
      <CloseButton shape="default" />
      <CloseButton shape="circle" />
    </div>
  );
}
