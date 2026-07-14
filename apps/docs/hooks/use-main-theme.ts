"use client";

import { useSyncExternalStore } from "react";
import {
  MAIN_THEME_STORAGE_KEY,
  type MainTheme,
} from "@/components/layout/main-themes";

type Listener = () => void;
const listeners = new Set<Listener>();
let observer: MutationObserver | null = null;

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (!observer) {
    observer = new MutationObserver(() => listeners.forEach((l) => l()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

export function useIsDarkMode() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

export function setMainTheme(theme: MainTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(MAIN_THEME_STORAGE_KEY, theme);
}

export function useMainTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") ?? "default",
    () => "default",
  );

  return [theme, setMainTheme] as const;
}
