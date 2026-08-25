"use client";

import { Button, toast } from "@hummingbirdui/react";

export default function ToastTypes() {
  const promise = () =>
    new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: "Event" }), 2000)
    );

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(promise, {
            loading: "Loading...",
            success: (data) => `${data.name} toast has been added`,
            error: "Error",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
