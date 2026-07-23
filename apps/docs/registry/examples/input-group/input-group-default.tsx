"use client";

import { InputGroup, Input } from "@hummingbirdui/react";

export default function InputGroupDefault() {
  return (
    <InputGroup>
      <InputGroup.Text>@</InputGroup.Text>
      <Input placeholder="Username" />
    </InputGroup>
  );
}
