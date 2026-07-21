"use client";

import { Dialog, Button, CloseButton } from "@hummingbirdui/react";

const sizes = ["sm", "md", "lg", "xl"] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sizes.map((size) => (
        <Dialog key={size}>
          <Dialog.Trigger asChild>
            <Button variant="outline">{size.toUpperCase()} dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content size={size}>
            <Dialog.Header>
              <Dialog.Title>{size.toUpperCase()} dialog</Dialog.Title>
              <Dialog.Close asChild>
                <CloseButton />
              </Dialog.Close>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>
                A dialog using <code>size=&quot;{size}&quot;</code>.
              </Dialog.Description>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog>
      ))}
    </div>
  );
}
