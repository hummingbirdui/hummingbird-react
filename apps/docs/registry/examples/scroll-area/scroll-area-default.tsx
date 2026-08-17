"use client";

import { ScrollArea } from "@hummingbirdui/react";

const tags = Array.from({ length: 30 }, (_, i) => `v1.2.0-beta.${30 - i}`);

export default function ScrollAreaDefault() {
  return (
    <ScrollArea className="mx-auto h-72 w-48 rounded-lg border border-subtle">
      <ScrollArea.Viewport className="p-4">
        <h6 className="mb-2 text-sm font-semibold">Tags</h6>
        {tags.map((tag) => (
          <div key={tag} className="border-b border-subtle py-2 text-sm">
            {tag}
          </div>
        ))}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
    </ScrollArea>
  );
}
