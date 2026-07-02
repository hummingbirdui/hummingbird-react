"use client";

import { InputGroup, InputGroupText, FormControl } from "@hummingbirdui/react";

export default function InputGroupSizes() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <InputGroup size="sm">
        <InputGroupText>@</InputGroupText>
        <FormControl placeholder="Small" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroupText>@</InputGroupText>
        <FormControl placeholder="Medium" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroupText>@</InputGroupText>
        <FormControl placeholder="Large" />
      </InputGroup>
    </div>
  );
}
