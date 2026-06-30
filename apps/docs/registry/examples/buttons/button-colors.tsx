"use client";

import { Button } from "@hummingbirdui/react";

export default function ButtonColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="light">Light</Button>
      <Button color="dark">Dark</Button>
    </div>
  );
}
