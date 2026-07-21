"use client";

import { Button, CloseButton, Drawer } from "@hummingbirdui/react";

export default function DrawerDefault() {
  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.Close asChild>
            <CloseButton />
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <Drawer.Description>
            Drag it down, click the backdrop, press Escape, or use the close
            button to dismiss it.
          </Drawer.Description>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}
