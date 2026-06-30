"use client";

import { Button } from "@hummingbirdui/react";
import { Mail, Trash2 } from "lucide-react";

export default function ButtonWithIcon() {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Button color="info">
        <Mail className="size-4" /> Send Invitation
      </Button>
      <Button color="danger">
        Remove
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
