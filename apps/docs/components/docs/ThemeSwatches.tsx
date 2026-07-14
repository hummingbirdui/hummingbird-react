"use client";

import { cn } from "@hummingbirdui/react/utils";
import { useIsDarkMode } from "@/hooks/use-main-theme";

export function ThemeSwatches({
  theme,
  swatchClassName,
  className,
}: {
  theme: string;
  swatchClassName?: string;
  className?: string;
}) {
  const isDark = useIsDarkMode();

  return (
    <div
      data-theme={theme}
      className={cn("flex gap-1", isDark && "dark", className)}
    >
      {["bg-primary", "bg-secondary", "bg-default"].map((color) => (
        <div
          key={color}
          className={cn(
            "rounded border border-default",
            swatchClassName ?? "size-3.5",
            color,
          )}
        />
      ))}
    </div>
  );
}
