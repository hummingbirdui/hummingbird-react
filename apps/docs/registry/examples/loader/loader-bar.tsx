import { Loader } from "@hummingbirdui/react";

const colors = [
  "primary",
  "secondary",
  "warning",
  "danger",
  "info",
  "success",
] as const;

export default function LoaderBar() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      {colors.map((color) => (
        <Loader
          key={color}
          variant="bar"
          color={color}
          label={`Loading (${color})`}
        />
      ))}
    </div>
  );
}
