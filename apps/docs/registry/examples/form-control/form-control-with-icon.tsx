"use client";

import { InputIcon, FormControl } from "@hummingbirdui/react";
import { Search, Check } from "lucide-react";

export default function FormControlWithIcon() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <InputIcon>
        <InputIcon.Start>
          <Search className="size-4" />
        </InputIcon.Start>
        <FormControl placeholder="Search" />
      </InputIcon>
      <InputIcon>
        <FormControl placeholder="Username" defaultValue="jane" />
        <InputIcon.End>
          <Check className="size-4" />
        </InputIcon.End>
      </InputIcon>
    </div>
  );
}
