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

const sizes = ["sm", "md", "lg", "xl"] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{size.toUpperCase()} dialog</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size.toUpperCase()} dialog</DialogTitle>
              <DialogClose asChild>
                <CloseButton />
              </DialogClose>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>
                A dialog using <code>size=&quot;{size}&quot;</code>.
              </DialogDescription>
            </DialogBody>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
