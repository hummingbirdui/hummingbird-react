"use client";

import { Button, CloseButton, toast } from "@hummingbirdui/react";

export default function SonnerCustom() {
  return (
    <div className="text-center">
      <Button
        variant="outline"
        onClick={() =>
          toast.custom((t) => (
            <div className="toast show">
              <div className="toast-header">
                <strong className="me-auto">Hummingbird</strong>
                <small>just now</small>
                <CloseButton onClick={() => toast.dismiss(t)} />
              </div>
              <div className="toast-body">
                A fully custom toast built with Hummingbird classes.
              </div>
            </div>
          ))
        }
      >
        Show Custom Toast
      </Button>
    </div>
  );
}
