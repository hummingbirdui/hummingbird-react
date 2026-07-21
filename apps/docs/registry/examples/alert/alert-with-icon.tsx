"use client";

import { Alert } from "@hummingbirdui/react";
import { CircleCheck } from "lucide-react";

export default function AlertWithIcon() {
  return (
    <Alert color="success">
      <Alert.Icon>
        <CircleCheck className="size-5" />
      </Alert.Icon>
      Your changes have been saved successfully.
    </Alert>
  );
}
