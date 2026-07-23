"use client";

import { Field, Input } from "@hummingbirdui/react";

export default function InputWithLabel() {
  return (
    <Field>
      <Field.Label htmlFor="email">Email address</Field.Label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <Field.Text>Notifications are sent to this address.</Field.Text>
    </Field>
  );
}
