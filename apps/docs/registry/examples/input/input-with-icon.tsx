"use client";

import { InputIcon, Input } from "@hummingbirdui/react";
import { Search, Check } from "lucide-react";

export default function InputWithIcon() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <InputIcon>
        <InputIcon.Start>
          <Search className="size-4" />
        </InputIcon.Start>
        <Input placeholder="Search" />
      </InputIcon>
      <InputIcon>
        <Input placeholder="Username" defaultValue="jane" />
        <InputIcon.End>
          <Check className="size-4" />
        </InputIcon.End>
      </InputIcon>
    </div>
  );
}
