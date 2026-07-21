"use client";

import { InputGroup, FormControl } from "@hummingbirdui/react";

export default function InputGroupMultiple() {
  return (
    <InputGroup>
      <InputGroup.Text>$</InputGroup.Text>
      <FormControl type="number" placeholder="0" />
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup>
  );
}
