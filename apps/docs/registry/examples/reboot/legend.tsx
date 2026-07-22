"use client";

import { Input, Field } from "@hummingbirdui/react";

export default function RebootLegend() {
  return (
    <fieldset>
      <legend>Personal Information</legend>
      <Field.Label htmlFor="reboot-name">Name:</Field.Label>
      <Input size="sm" type="text" id="reboot-name" name="name" />
      <Field.Label htmlFor="reboot-email">Email:</Field.Label>
      <Input size="sm" type="email" id="reboot-email" name="email" />
    </fieldset>
  );
}
