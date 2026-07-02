"use client";

import { InputGroup, InputGroupText, FormControl } from "@hummingbirdui/react";

export default function InputGroupMultiple() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupText>$</InputGroupText>
      <FormControl type="number" placeholder="0" />
      <InputGroupText>.00</InputGroupText>
    </InputGroup>
  );
}
