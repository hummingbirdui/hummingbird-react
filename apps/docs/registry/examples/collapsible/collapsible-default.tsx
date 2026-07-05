"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@hummingbirdui/react";
import { ChevronsUpDown } from "lucide-react";

export default function CollapsibleDefault() {
  return (
    <Collapsible className="mx-auto w-full max-w-md space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold">@hummingbird/react</span>
        <CollapsibleTrigger asChild>
          <Button variant="outline" color="secondary" size="sm" shape="square">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-default px-4 py-2 font-mono text-sm">
        Tailwind CSS
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-default px-4 py-2 font-mono text-sm">
          Radix Primitives
        </div>
        <div className="rounded-md border border-default px-4 py-2 font-mono text-sm">
          Hummingbird UI
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
