"use client";

import { InputGroup, FormControl } from "@hummingbirdui/react";

export default function InputGroupDefault() {
  return (
    <InputGroup>
      <InputGroup.Text>@</InputGroup.Text>
      <FormControl placeholder="Username" />
    </InputGroup>
  );
}
