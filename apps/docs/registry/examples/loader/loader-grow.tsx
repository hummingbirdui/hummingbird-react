import { Loader } from "@hummingbirdui/react";

const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "neutral",
] as const;

export default function LoaderGrow() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {colors.map((color) => (
        <Loader
          key={color}
          variant="grow"
          color={color}
          label={`Loading (${color})`}
        />
      ))}
    </div>
  );
}
