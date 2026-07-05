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

const directions = ["top", "right", "bottom", "left"] as const;

export default function DrawerDirection() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {directions.map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">
                {direction} drawer
              </DrawerTitle>
              <DrawerClose asChild>
                <CloseButton />
              </DrawerClose>
            </DrawerHeader>
            <DrawerBody>
              <DrawerDescription>
                Slides in from the {direction} edge.
              </DrawerDescription>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
