"use client";

import { Avatar } from "@hummingbirdui/react";

export default function AvatarGroupExample() {
  return (
    <Avatar.Group>
      <Avatar>
        <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User one" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="https://i.pravatar.cc/150?img=32" alt="User two" />
        <Avatar.Fallback>AS</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="https://i.pravatar.cc/150?img=45" alt="User three" />
        <Avatar.Fallback>MK</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>+3</Avatar.Fallback>
      </Avatar>
    </Avatar.Group>
  );
}
