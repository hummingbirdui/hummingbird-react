"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MAIN_THEMES, MAIN_THEME_STORAGE_KEY } from "./main-themes";

export function MainThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;

    if (pathname === "/") {
      html.removeAttribute("data-theme");
      return;
    }

    const saved = localStorage.getItem(MAIN_THEME_STORAGE_KEY);
    if (saved && MAIN_THEMES.some((t) => t.value === saved)) {
      html.setAttribute("data-theme", saved);
    }
  }, [pathname]);

  return null;
}
