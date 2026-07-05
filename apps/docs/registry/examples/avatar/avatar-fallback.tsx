"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@hummingbirdui/react";

export default function AvatarFallbackExample() {
  return (
    <Avatar>
      <AvatarImage src="" alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
