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
        <span className="font-semibold">
          @hummingbird starred 3 repositories
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="outline" color="secondary" size="sm" shape="square">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @hummingbird/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
