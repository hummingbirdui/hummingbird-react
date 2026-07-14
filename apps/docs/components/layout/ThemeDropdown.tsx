"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@hummingbirdui/react";
import { useThemeMode } from "@hummingbirdui/react/hooks";
import { cn } from "@hummingbirdui/react/utils";
import {
  MAIN_THEMES,
  MAIN_THEME_STORAGE_KEY,
  type MainTheme,
} from "./main-themes";

export function ThemeDropdown() {
  const { computedMode } = useThemeMode();
  const [theme, setTheme] = useState<MainTheme>("default");

  useEffect(() => {
    const saved = localStorage.getItem(MAIN_THEME_STORAGE_KEY);
    if (MAIN_THEMES.some((t) => t.value === saved)) {
      setTheme(saved as MainTheme);
    }
  }, []);

  function applyTheme(value: MainTheme) {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem(MAIN_THEME_STORAGE_KEY, value);
  }

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
            // Scopes the swatches below to this theme's palette
            data-theme={t.value}
            className={cn(
              "flex items-center justify-between",
              computedMode === "dark" && "dark",
              theme === t.value && "active",
            )}
            onSelect={(event) => {
              // Keep the menu open so themes can be previewed in place
              event.preventDefault();
              applyTheme(t.value);
            }}
          >
            {t.label}
            <div className="flex gap-1">
              <div className="size-3.5 rounded border border-default bg-primary" />
              <div className="size-3.5 rounded border border-default bg-secondary" />
              <div className="size-3.5 rounded border border-default bg-default" />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
