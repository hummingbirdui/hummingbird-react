"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  CloseButton,
} from "@hummingbirdui/react";

export default function DialogScrollable() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" color="secondary">
          Scrollable dialog
        </Button>
      </DialogTrigger>
      <DialogContent scrollable centered>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>
        </DialogHeader>
        <DialogBody className="max-h-72">
          <p>Scroll to read all of the content below.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            Nulla quis sem at nibh elementum imperdiet.
          </p>
          <p>
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue
            semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Curabitur sodales ligula in libero.
          </p>
          <p>
            Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.
            Aenean quam. In scelerisque sem at dolor. Maecenas mattis.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
