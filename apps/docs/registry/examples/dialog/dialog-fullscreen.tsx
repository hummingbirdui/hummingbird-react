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

export default function DialogFullscreen() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Fullscreen dialog</Button>
      </DialogTrigger>
      <DialogContent fullscreen>
        <DialogHeader>
          <DialogTitle>Fullscreen</DialogTitle>
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog fills the entire viewport using{" "}
            <code>fullscreen</code>.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
