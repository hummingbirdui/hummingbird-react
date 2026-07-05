"use client";

import {
  Button,
  CloseButton,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerBody,
  DrawerDescription,
} from "@hummingbirdui/react";

export default function DrawerWithoutOverlay() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open without overlay</Button>
      </DrawerTrigger>
      <DrawerContent overlay={false}>
        <DrawerHeader>
          <DrawerTitle>No backdrop</DrawerTitle>
          <DrawerClose asChild>
            <CloseButton />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody>
          <DrawerDescription>
            Setting <code>overlay=&#123;false&#125;</code> hides the backdrop so
            the page behind stays visible.
          </DrawerDescription>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
