"use client";

import { FormField, FormControl, FormText } from "@hummingbirdui/react";

export default function FormControlValidation() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <FormField>
        <FormControl state="valid" defaultValue="jane@example.com" />
        <FormText variant="valid">Looks good.</FormText>
      </FormField>
      <FormField>
        <FormControl state="invalid" defaultValue="not-an-email" />
        <FormText variant="invalid">Enter a valid email address.</FormText>
      </FormField>
    </div>
  );
}
