"use client";

import { Avatar } from "@hummingbirdui/react";

export default function AvatarDefault() {
  return (
    <Avatar>
      <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}
