"use client";

import { Avatar } from "@hummingbirdui/react";

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="xs">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar size="sm">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar size="md">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
