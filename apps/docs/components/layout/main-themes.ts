export const MAIN_THEME_STORAGE_KEY = "main-theme";

export const MAIN_THEMES = [
  { value: "default", label: "Default" },
  { value: "luxury", label: "Luxury" },
  { value: "retro", label: "Retro" },
  { value: "arctic", label: "Arctic" },
  { value: "nature", label: "Nature" },
  { value: "ember", label: "Ember" },
  { value: "dracula", label: "Dracula" },
  { value: "midnight", label: "Midnight" },
] as const;

export type MainTheme = (typeof MAIN_THEMES)[number]["value"];

/**
 * Pages that always use the default theme and hide the theme picker: the
 * landing page, and the blocks pages, whose previews pick a theme each.
 */
export const DEFAULT_THEME_PATHS = ["/", "/blocks"];

export function usesDefaultMainTheme(pathname: string) {
  return DEFAULT_THEME_PATHS.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path),
  );
}
