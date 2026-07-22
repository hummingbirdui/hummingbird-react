"use client";

import { Text } from "@hummingbirdui/react";

export default function TextTruncate() {
  return (
    <Text truncate className="max-w-xs">
      This is a long line of text that gets cut off with an ellipsis once it
      runs out of horizontal space inside its container.
    </Text>
  );
}
