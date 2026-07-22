"use client";

import { Field, Select } from "@hummingbirdui/react";

export default function SelectValidation() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Field>
        <Select state="valid" defaultValue="pro">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </Select>
        <Field.Text variant="valid">Looks good.</Field.Text>
      </Field>
      <Field>
        <Select state="invalid" defaultValue="">
          <option value="" disabled>
            Choose a plan
          </option>
          <option value="pro">Pro</option>
        </Select>
        <Field.Text variant="invalid">Select a plan to continue.</Field.Text>
      </Field>
    </div>
  );
}
