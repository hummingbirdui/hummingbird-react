"use client";

import { Field, Input } from "@hummingbirdui/react";

export default function InputValidation() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Field>
        <Input state="valid" defaultValue="jane@example.com" />
        <Field.Text variant="valid">Looks good.</Field.Text>
      </Field>
      <Field>
        <Input state="invalid" defaultValue="not-an-email" />
        <Field.Text variant="invalid">Enter a valid email address.</Field.Text>
      </Field>
    </div>
  );
}
