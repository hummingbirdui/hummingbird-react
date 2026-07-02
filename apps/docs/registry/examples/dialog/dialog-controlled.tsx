"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  CloseButton,
} from "@hummingbirdui/react";

export default function DialogControlled() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open controlled dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogClose asChild>
              <CloseButton />
            </DialogClose>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>
              Open state is driven by <code>open</code> and{" "}
              <code>onOpenChange</code> on the <code>Dialog</code> root.
            </DialogDescription>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
