"use client";

import { Dialog, Button, CloseButton } from "@hummingbirdui/react";

export default function DialogScrollable() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Scrollable dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content scrollable centered>
        <Dialog.Header>
          <Dialog.Title>Terms of service</Dialog.Title>
          <Dialog.Close asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Header>
        <Dialog.Body className="max-h-72">
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
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>Got it</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
