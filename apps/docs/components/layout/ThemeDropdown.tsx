"use client";

import { Palette } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import { ThemeSwatches } from "@/components/docs/ThemeSwatches";
import { useMainTheme } from "@/hooks/use-main-theme";
import { MAIN_THEMES } from "./main-themes";

export function ThemeDropdown() {
  const [theme, setTheme] = useMainTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="subtle"
          color="neutral"
          shape="circle"
          aria-label="Select color theme"
        >
          <Palette className="size-4.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-66">
        <DropdownMenuLabel className="text-default text-sm">
          Color Theme
        </DropdownMenuLabel>
        {MAIN_THEMES.map((t) => (
          <DropdownMenuItem
            key={t.value}
            data-theme={t.value}
            className={cn(
              "flex items-center justify-between",
              theme === t.value && "active",
            )}
            onSelect={(event) => {
              event.preventDefault();
              setTheme(t.value);
            }}
          >
            {t.label}
            <ThemeSwatches theme={t.value} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
