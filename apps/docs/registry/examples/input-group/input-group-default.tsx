"use client";

import { InputGroup, InputGroupText, FormControl } from "@hummingbirdui/react";

export default function InputGroupDefault() {
  return (
    <InputGroup>
      <InputGroupText>@</InputGroupText>
      <FormControl placeholder="Username" />
    </InputGroup>
  );
}
