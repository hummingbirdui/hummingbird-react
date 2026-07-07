"use client";

import { useEffect, useState } from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";
import { Button } from "@hummingbirdui/react/button";

function applyDark(dark: boolean) {
  const html = document.documentElement;
  html.classList.add("disable-transition");
  html.classList.toggle("dark", dark);
  requestAnimationFrame(() => html.classList.remove("disable-transition"));
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!localStorage.theme) {
        applyDark(media.matches);
        setIsDark(media.matches);
      }
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = !isDark;
    applyDark(next);
    localStorage.theme = next ? "dark" : "light";
    setIsDark(next);
  }

  return (
    <Button
      variant="subtle"
      color="neutral"
      shape="circle"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={mounted ? isDark : undefined}
    >
      {mounted && isDark ? (
        <LightbulbOff className="size-4.5" />
      ) : (
        <Lightbulb className="size-4.5" />
      )}
    </Button>
  );
}
