"use client";

import { Text } from "@hummingbirdui/react";

export default function TextWeights() {
  return (
    <div className="flex flex-col gap-2">
      <Text fontWeight="thin">Font weight thin</Text>
      <Text fontWeight="extralight">Font weight extralight</Text>
      <Text fontWeight="light">Font weight light</Text>
      <Text fontWeight="normal">Font weight normal</Text>
      <Text fontWeight="medium">Font weight medium</Text>
      <Text fontWeight="semibold">Font weight semibold</Text>
      <Text fontWeight="bold">Font weight bold</Text>
      <Text fontWeight="extrabold">Font weight extrabold</Text>
      <Text fontWeight="black">Font weight black</Text>
    </div>
  );
}
