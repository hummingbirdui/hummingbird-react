"use client";

import { Dialog, Button, CloseButton } from "@hummingbirdui/react";

export default function DialogDefault() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Modal title</Dialog.Title>
          <Dialog.Close asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Header>
        <Dialog.Body>
          <Dialog.Description>
            Click the backdrop, press Escape, or use a close button to dismiss
            it.
          </Dialog.Description>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button color="secondary" variant="subtle" className="me-2">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Save changes</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
