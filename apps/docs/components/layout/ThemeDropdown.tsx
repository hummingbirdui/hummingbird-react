"use client";

import { Palette } from "lucide-react";
import { Button, Dropdown } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import { ThemeSwatches } from "@/components/docs/ThemeSwatches";
import { useMainTheme } from "@/hooks/use-main-theme";
import { MAIN_THEMES } from "./main-themes";

export function ThemeDropdown() {
  const [theme, setTheme] = useMainTheme();

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button
          variant="subtle"
          color="neutral"
          shape="circle"
          aria-label="Select color theme"
        >
          <Palette className="size-4.5" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content align="start" className="min-w-66">
        <Dropdown.Label className="text-default text-sm">
          Color Theme
        </Dropdown.Label>
        {MAIN_THEMES.map((t) => (
          <Dropdown.Item
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
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
