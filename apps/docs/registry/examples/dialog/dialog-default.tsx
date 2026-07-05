"use client";

import {
  Dialog,
  DialogTrigger,
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

export default function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal title</DialogTitle>
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Click the backdrop, press Escape, or use a close button to dismiss
            it.
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button color="secondary" variant="subtle" className="me-2">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
