"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@hummingbirdui/react";

export default function AvatarStatus() {
  return (
    <div className="flex items-center gap-4">
      <Avatar status="online">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar status="offline">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar status="away">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar status="busy">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}
