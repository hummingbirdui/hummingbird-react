"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogClose,
  Button,
  CloseButton,
} from "@hummingbirdui/react";

export default function DialogCentered() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Centered dialog</Button>
      </DialogTrigger>
      <DialogContent centered>
        <DialogHeader>
          <DialogTitle>Centered</DialogTitle>
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog is centered vertically in the viewport.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
