"use client";

import { InputGroup, FormControl, Button } from "@hummingbirdui/react";

export default function InputGroupButton() {
  return (
    <InputGroup className="max-w-sm">
      <FormControl placeholder="Search" />
      <Button>Search</Button>
    </InputGroup>
  );
}
