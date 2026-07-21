"use client";

import { Button, CloseButton, Drawer } from "@hummingbirdui/react";

const directions = ["top", "right", "bottom", "left"] as const;

export default function DrawerDirection() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {directions.map((direction) => (
        <Drawer key={direction} direction={direction}>
          <Drawer.Trigger asChild>
            <Button variant="outline" className="capitalize">
              {direction}
            </Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title className="capitalize">
                {direction} drawer
              </Drawer.Title>
              <Drawer.Close asChild>
                <CloseButton />
              </Drawer.Close>
            </Drawer.Header>
            <Drawer.Body>
              <Drawer.Description>
                Slides in from the {direction} edge.
              </Drawer.Description>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      ))}
    </div>
  );
}
