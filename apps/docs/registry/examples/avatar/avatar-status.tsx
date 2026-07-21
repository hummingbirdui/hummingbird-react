"use client";

import { Avatar } from "@hummingbirdui/react";

export default function AvatarStatus() {
  return (
    <div className="flex items-center gap-4">
      <Avatar status="online">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar status="offline">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar status="away">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar status="busy">
        <Avatar.Image
          src="https://i.pravatar.cc/150?img=12"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
