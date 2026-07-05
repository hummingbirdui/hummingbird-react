"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@hummingbirdui/react";

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="xs">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}
