'use client';

import * as React from 'react';
import {
  DEFAULT_THEME_MODE,
  THEME_MODE_DEFAULT_ATTR,
  THEME_MODE_STORAGE_KEY,
  THEME_MODE_SYNC_EVENT,
  validateMode,
  type ComputedThemeMode,
  type ThemeMode,
} from './theme-mode';

function isClient() {
  return typeof window !== 'undefined';
}

function getInitialMode(): ThemeMode {
  if (!isClient()) return DEFAULT_THEME_MODE;
  return validateMode(localStorage.getItem(THEME_MODE_STORAGE_KEY));
}

function getSystemMode(): ComputedThemeMode {
  if (!isClient()) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Default stamped on `<html>` by `ThemeModeScript`; `system` when absent */
function getDefaultMode(): ThemeMode {
  if (!isClient()) return DEFAULT_THEME_MODE;
  return validateMode(document.documentElement.getAttribute(THEME_MODE_DEFAULT_ATTR));
}

function setModeInDOM(computedMode: ComputedThemeMode) {
  const html = document.documentElement;
  const dark = computedMode === 'dark';
  if (html.classList.contains('dark') === dark) return;

  // Suppress transitions for one frame so the whole page switches at once
  html.classList.add('disable-transition');
  html.classList.toggle('dark', dark);
  requestAnimationFrame(() => html.classList.remove('disable-transition'));
}

export function useThemeMode() {
  const [mode, setModeState] = React.useState<ThemeMode>(getInitialMode);
  const [systemMode, setSystemMode] = React.useState<ComputedThemeMode>(getSystemMode);
  const [defaultMode] = React.useState<ThemeMode>(getDefaultMode);

  const fallbackMode: ComputedThemeMode = defaultMode === 'system' ? systemMode : defaultMode;
  const computedMode: ComputedThemeMode = mode === 'system' ? fallbackMode : mode;

  React.useEffect(() => {
    setModeInDOM(computedMode);
  }, [computedMode]);

  // Sync with other browser tabs
  React.useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === THEME_MODE_STORAGE_KEY) {
        setModeState(validateMode(event.newValue));
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Sync with other instances of the hook on the same page
  React.useEffect(() => {
    function handleSync(event: Event) {
      setModeState(validateMode((event as CustomEvent<ThemeMode>).detail));
    }

    document.addEventListener(THEME_MODE_SYNC_EVENT, handleSync);
    return () => document.removeEventListener(THEME_MODE_SYNC_EVENT, handleSync);
  }, []);

  // Follow the OS preference while in `system` mode
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function handleChange() {
      setSystemMode(media.matches ? 'dark' : 'light');
    }

    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const setMode = React.useCallback((nextMode: ThemeMode) => {
    const next = validateMode(nextMode);
    setModeState(next);
    if (next === 'system') {
      localStorage.removeItem(THEME_MODE_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_MODE_STORAGE_KEY, next);
    }
    document.dispatchEvent(new CustomEvent<ThemeMode>(THEME_MODE_SYNC_EVENT, { detail: next }));
  }, []);

  /** Toggles between `light` and `dark` (resolving `system` first) */
  const toggleMode = React.useCallback(() => {
    setMode(computedMode === 'dark' ? 'light' : 'dark');
  }, [computedMode, setMode]);

  /** Clears the persisted preference and follows the OS preference again */
  const clearMode = React.useCallback(() => {
    setMode('system');
  }, [setMode]);

  return { mode, computedMode, setMode, toggleMode, clearMode };
}
