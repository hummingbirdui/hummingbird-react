"use client";

import { Dialog, Button, CloseButton } from "@hummingbirdui/react";

export default function DialogFullscreen() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Fullscreen dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content fullscreen>
        <Dialog.Header>
          <Dialog.Title>Fullscreen</Dialog.Title>
          <Dialog.Close asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Header>
        <Dialog.Body>
          <Dialog.Description>
            This dialog fills the entire viewport using <code>fullscreen</code>.
          </Dialog.Description>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
}
