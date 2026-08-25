"use client";

import { Button, toast } from "@hummingbirdui/react";

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

export default function ToastPosition() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {positions.map((position) => (
        <Button
          key={position}
          variant="outline"
          onClick={() =>
            toast("Event has been created", { position })
          }
        >
          {position}
        </Button>
      ))}
    </div>
  );
}
