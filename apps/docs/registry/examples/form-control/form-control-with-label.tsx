"use client";

import {
  FormField,
  FormLabel,
  FormControl,
  FormText,
} from "@hummingbirdui/react";

export default function FormControlWithLabel() {
  return (
    <FormField className="max-w-sm">
      <FormLabel htmlFor="email">Email address</FormLabel>
      <FormControl id="email" type="email" placeholder="you@example.com" />
      <FormText>Notifications are sent to this address.</FormText>
    </FormField>
  );
}
