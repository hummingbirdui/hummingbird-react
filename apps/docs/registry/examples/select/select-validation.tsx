"use client";

import { FormField, Select, FormText } from "@hummingbirdui/react";

export default function SelectValidation() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <FormField>
        <Select state="valid" defaultValue="pro">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </Select>
        <FormText variant="valid">Looks good.</FormText>
      </FormField>
      <FormField>
        <Select state="invalid" defaultValue="">
          <option value="" disabled>
            Choose a plan
          </option>
          <option value="pro">Pro</option>
        </Select>
        <FormText variant="invalid">Select a plan to continue.</FormText>
      </FormField>
    </div>
  );
}
