"use client";

import { Avatar } from "@hummingbirdui/react";

export default function AvatarFallbackExample() {
  return (
    <Avatar>
      <Avatar.Image src="" alt="Jane Doe" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}
