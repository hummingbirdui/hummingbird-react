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
} from "@hummingbirdui/react";

export default function DrawerScrollable() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button color="secondary">Open long drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terms of service</DrawerTitle>
          <DrawerClose asChild>
            <CloseButton />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
