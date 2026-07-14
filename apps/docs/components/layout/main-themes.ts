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
