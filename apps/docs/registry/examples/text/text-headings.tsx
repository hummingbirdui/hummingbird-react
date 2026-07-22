"use client";

import { Text } from "@hummingbirdui/react";

export default function TextHeadings() {
  return (
    <div className="flex flex-col gap-2">
      <Text as="h1">Heading 1</Text>
      <Text as="h2">Heading 2</Text>
      <Text as="h3">Heading 3</Text>
      <Text as="h4">Heading 4</Text>
      <Text as="h5">Heading 5</Text>
      <Text as="h6">Heading 6</Text>
    </div>
  );
}
