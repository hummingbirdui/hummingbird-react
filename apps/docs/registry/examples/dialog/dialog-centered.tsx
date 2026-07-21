"use client";

import { Dialog, Button, CloseButton } from "@hummingbirdui/react";

export default function DialogCentered() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Centered dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content centered>
        <Dialog.Header>
          <Dialog.Title>Centered</Dialog.Title>
          <Dialog.Close asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Header>
        <Dialog.Body>
          <Dialog.Description>
            This dialog is centered vertically in the viewport.
          </Dialog.Description>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
}
