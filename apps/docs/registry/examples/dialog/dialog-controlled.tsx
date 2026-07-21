"use client";

import * as React from "react";
import { Dialog, Button, CloseButton } from "@hummingbirdui/react";

export default function DialogControlled() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open controlled dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Controlled dialog</Dialog.Title>
            <Dialog.Close asChild>
              <CloseButton />
            </Dialog.Close>
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>
              Open state is driven by <code>open</code> and{" "}
              <code>onOpenChange</code> on the <code>Dialog</code> root.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
