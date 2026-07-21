"use client";

import { Button, CloseButton, Drawer } from "@hummingbirdui/react";

export default function DrawerScrollable() {
  return (
    <Drawer direction="right">
      <Drawer.Trigger asChild>
        <Button variant="outline">Open long drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Terms of service</Drawer.Title>
          <Drawer.Close asChild>
            <CloseButton />
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
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
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}
