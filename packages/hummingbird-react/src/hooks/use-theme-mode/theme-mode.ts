export type ThemeMode = 'light' | 'dark' | 'system';
export type ComputedThemeMode = Exclude<ThemeMode, 'system'>;

export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export const THEME_MODE_STORAGE_KEY = 'theme';
export const THEME_MODE_SYNC_EVENT = 'hummingbird-theme-mode-sync';

export const THEME_MODE_DEFAULT_ATTR = 'data-theme-default';

export function validateMode(mode: string | null | undefined): ThemeMode {
  return mode === 'light' || mode === 'dark' ? mode : DEFAULT_THEME_MODE;
}
