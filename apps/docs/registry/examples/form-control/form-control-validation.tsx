"use client";

import { FormField, FormControl, FormText } from "@hummingbirdui/react";

export default function FormControlValidation() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
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
