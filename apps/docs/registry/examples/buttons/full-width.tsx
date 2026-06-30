"use client";

import { Button } from "@hummingbirdui/react";

export default function ButtonFullWidth() {
  return (
    <div className="flex flex-col max-w-100 mx-auto gap-2">
      <Button className="rounded-full">Confirm</Button>
      <Button color="danger" variant="subtle" className="rounded-full">
        Cancel
      </Button>
    </div>
  );
}
