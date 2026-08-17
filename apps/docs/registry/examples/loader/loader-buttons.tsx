import { Button, Loader } from "@hummingbirdui/react";

export default function LoaderButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button shape="square" disabled aria-label="Loading">
        <Loader size="sm" label="" aria-hidden="true" />
      </Button>
      <Button disabled>
        <Loader size="sm" label="" aria-hidden="true" />
        Loading...
      </Button>
      <Button shape="square" disabled aria-label="Loading">
        <Loader variant="grow" size="sm" label="" aria-hidden="true" />
      </Button>
      <Button disabled>
        <Loader variant="grow" size="sm" label="" aria-hidden="true" />
        Loading...
      </Button>
    </div>
  );
}
