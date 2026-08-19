"use client";

import { Divider } from "@hummingbirdui/react";

export default function DividerDefault() {
  return (
    <div className="mx-auto max-w-sm">
      <Divider />
      <Divider className="border-primary" />
      <Divider className="border-t-2 border-danger" />
      <Divider className="border-t-4 border-success" />
    </div>
  );
}
