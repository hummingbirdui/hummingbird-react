"use client";

import {
  InputIcon,
  InputIconStart,
  InputIconEnd,
  FormControl,
} from "@hummingbirdui/react";
import { Search, Check } from "lucide-react";

export default function FormControlWithIcon() {
  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <InputIcon>
        <InputIconStart>
          <Search className="size-4" />
        </InputIconStart>
        <FormControl placeholder="Search" />
      </InputIcon>
      <InputIcon>
        <FormControl placeholder="Username" defaultValue="jane" />
        <InputIconEnd>
          <Check className="size-4" />
        </InputIconEnd>
      </InputIcon>
    </div>
  );
}
