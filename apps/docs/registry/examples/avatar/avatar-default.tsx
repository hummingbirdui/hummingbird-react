"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@hummingbirdui/react";

export default function AvatarDefault() {
  return (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
