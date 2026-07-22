"use client";

import { InputGroup, Input } from "@hummingbirdui/react";

export default function InputGroupSizes() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <InputGroup size="sm">
        <InputGroup.Text>@</InputGroup.Text>
        <Input placeholder="Small" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroup.Text>@</InputGroup.Text>
        <Input placeholder="Medium" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Text>@</InputGroup.Text>
        <Input placeholder="Large" />
      </InputGroup>
    </div>
  );
}
