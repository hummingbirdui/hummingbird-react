"use client";

import { Divider } from "@hummingbirdui/react";

export default function DividerLabelColors() {
  return (
    <div className="mx-auto max-w-sm">
      <Divider align="start" className="after:border-primary after:border-t-2">
        START
      </Divider>
      <Divider className="before:border-success before:border-t-4 after:border-success after:border-t-4">
        CENTER
      </Divider>
      <Divider align="end" className="before:border-warning before:border-t-6">
        END
      </Divider>
    </div>
  );
}
