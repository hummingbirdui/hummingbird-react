"use client";

import { FormControl, FormLabel } from "@hummingbirdui/react";

export default function RebootLegend() {
  return (
    <fieldset>
      <legend>Personal Information</legend>
      <FormLabel htmlFor="reboot-name">Name:</FormLabel>
      <FormControl size="sm" type="text" id="reboot-name" name="name" />
      <FormLabel htmlFor="reboot-email">Email:</FormLabel>
      <FormControl size="sm" type="email" id="reboot-email" name="email" />
    </fieldset>
  );
}
