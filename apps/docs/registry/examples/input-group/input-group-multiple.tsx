"use client";

import { InputGroup, Input } from "@hummingbirdui/react";

export default function InputGroupMultiple() {
  return (
    <InputGroup>
      <InputGroup.Text>$</InputGroup.Text>
      <Input type="number" placeholder="0" />
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup>
  );
}
