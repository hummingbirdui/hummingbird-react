"use client";

import { Button, CloseButton, Drawer } from "@hummingbirdui/react";

export default function DrawerWithoutOverlay() {
  return (
    <Drawer direction="right">
      <Drawer.Trigger asChild>
        <Button variant="outline">Open without overlay</Button>
      </Drawer.Trigger>
      <Drawer.Content overlay={false}>
        <Drawer.Header>
          <Drawer.Title>No backdrop</Drawer.Title>
          <Drawer.Close asChild>
            <CloseButton />
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <Drawer.Description>
            Setting <code>overlay=&#123;false&#125;</code> hides the backdrop so
            the page behind stays visible.
          </Drawer.Description>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}
