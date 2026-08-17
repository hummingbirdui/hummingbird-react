"use client";

import { Button, toast } from "@hummingbirdui/react";

export default function SonnerDescription() {
  return (
    <div className="text-center">
      <Button
        variant="outline"
        onClick={() =>
          toast.message("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
}
