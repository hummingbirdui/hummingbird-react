"use client";

import { Text } from "@hummingbirdui/react";

export default function TextElements() {
  return (
    <div className="flex flex-col gap-2">
      <Text as="span">Span text</Text>
      <Text as="strong">Strong text</Text>
      <Text as="em">Emphasis text</Text>
      <Text as="small">Small text</Text>
      <Text as="label">Label text</Text>
      <Text as="code">Code text</Text>
      <Text as="mark">Mark text</Text>
      <Text as="del">Deleted text</Text>
      <Text as="ins">Inserted text</Text>
    </div>
  );
}
