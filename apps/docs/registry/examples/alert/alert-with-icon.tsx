"use client";

import { Alert, AlertIcon } from "@hummingbirdui/react";
import { CircleCheck } from "lucide-react";

export default function AlertWithIcon() {
  return (
    <Alert color="success">
      <AlertIcon>
        <CircleCheck className="size-5" />
      </AlertIcon>
      Your changes have been saved successfully.
    </Alert>
  );
}
