"use client";

import { ScrollArea } from "@hummingbirdui/react";

export default function ScrollAreaAlways() {
  return (
    <ScrollArea
      type="always"
      className="mx-auto h-72 w-64 rounded-lg border border-subtle"
    >
      <ScrollArea.Viewport className="p-4 pe-6">
        <p className="text-sm">
          With <code>type=&quot;always&quot;</code> the scrollbar stays visible
          whenever the content overflows, instead of appearing on hover. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis
          sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
          Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
          lacinia arcu eget nulla. Curabitur sodales ligula in libero. Sed
          dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean
          quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis
          tristique sem. Proin ut ligula vel nunc egestas porttitor.
        </p>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
    </ScrollArea>
  );
}
