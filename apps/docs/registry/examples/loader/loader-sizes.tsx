import { Loader } from "@hummingbirdui/react";

export default function LoaderSizes() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Loader size="sm" />
      <Loader />
      <Loader className="size-12" />
    </div>
  );
}
