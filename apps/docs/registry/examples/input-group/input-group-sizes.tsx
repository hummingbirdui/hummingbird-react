"use client";

import { InputGroup, FormControl } from "@hummingbirdui/react";

export default function InputGroupSizes() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <InputGroup size="sm">
        <InputGroup.Text>@</InputGroup.Text>
        <FormControl placeholder="Small" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroup.Text>@</InputGroup.Text>
        <FormControl placeholder="Medium" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Text>@</InputGroup.Text>
        <FormControl placeholder="Large" />
      </InputGroup>
    </div>
  );
}
