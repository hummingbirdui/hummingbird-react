"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@hummingbirdui/react";

export default function AvatarGroupExample() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User one" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User two" />
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=45" alt="User three" />
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
