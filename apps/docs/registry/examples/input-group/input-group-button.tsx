"use client";

import { InputGroup, Input, Button } from "@hummingbirdui/react";

export default function InputGroupButton() {
  return (
    <InputGroup>
      <Input placeholder="Search" />
      <Button>Search</Button>
    </InputGroup>
  );
}
