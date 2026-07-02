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

export default function DrawerDefault() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerClose asChild>
            <CloseButton />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody>
          <DrawerDescription>
            Drag it down, click the backdrop, press Escape, or use the close
            button to dismiss it.
          </DrawerDescription>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
