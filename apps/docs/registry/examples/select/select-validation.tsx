"use client";

import { FormField, Select, FormText } from "@hummingbirdui/react";

export default function SelectValidation() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
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
