"use client";

import { Text } from "@hummingbirdui/react";

export default function TextLineClamp() {
  return (
    <Text lineClamp={2} className="max-w-sm">
      Line clamping limits a block of text to the given number of lines and
      truncates the rest with an ellipsis. This paragraph is intentionally long
      so the overflow beyond the second line is hidden from view.
    </Text>
  );
}
