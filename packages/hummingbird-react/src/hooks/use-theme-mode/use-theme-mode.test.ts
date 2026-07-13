import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThemeMode } from './use-theme-mode';
import { THEME_MODE_DEFAULT_ATTR, THEME_MODE_STORAGE_KEY } from './theme-mode';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  document.documentElement.removeAttribute(THEME_MODE_DEFAULT_ATTR);
});

describe('useThemeMode', () => {
  describe('Initial state', () => {
    it('defaults to system with no persisted preference', () => {
      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('system');
      expect(result.current.computedMode).toBe('light');
    });

    it('reads the persisted mode from localStorage', () => {
      localStorage.setItem(THEME_MODE_STORAGE_KEY, 'dark');
      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('dark');
      expect(result.current.computedMode).toBe('dark');
    });

    it('falls back to system for invalid persisted values', () => {
      localStorage.setItem(THEME_MODE_STORAGE_KEY, 'purple');
      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('system');
    });

    it('resolves an unsaved preference against the default stamped by ThemeModeScript', () => {
      document.documentElement.setAttribute(THEME_MODE_DEFAULT_ATTR, 'dark');
      const { result } = renderHook(() => useThemeMode());

      expect(result.current.mode).toBe('system');
      expect(result.current.computedMode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('prefers the persisted mode over the stamped default', () => {
      document.documentElement.setAttribute(THEME_MODE_DEFAULT_ATTR, 'dark');
      localStorage.setItem(THEME_MODE_STORAGE_KEY, 'light');
      const { result } = renderHook(() => useThemeMode());

      expect(result.current.computedMode).toBe('light');
    });
  });

  describe('setMode', () => {
    it('applies the dark class on <html> and persists the mode', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => result.current.setMode('dark'));

      expect(result.current.mode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe('dark');

      act(() => result.current.setMode('light'));

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe('light');
    });

    it('removes the persisted preference when set to system', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => result.current.setMode('dark'));
      act(() => result.current.setMode('system'));

      expect(result.current.mode).toBe('system');
      expect(localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBeNull();
    });
  });

  describe('toggleMode', () => {
    it('toggles between light and dark', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('resolves system against the OS preference before toggling', () => {
      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('system');

      // matchMedia is stubbed to light in test-setup, so system toggles to dark
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('dark');
    });
  });

  describe('clearMode', () => {
    it('removes the persisted preference and falls back to system', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => result.current.setMode('dark'));
      act(() => result.current.clearMode());

      expect(result.current.mode).toBe('system');
      expect(localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBeNull();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('Synchronization', () => {
    it('keeps multiple hook instances in sync on the same page', () => {
      const first = renderHook(() => useThemeMode());
      const second = renderHook(() => useThemeMode());

      act(() => first.result.current.setMode('dark'));

      expect(second.result.current.mode).toBe('dark');
      expect(second.result.current.computedMode).toBe('dark');
    });

    it('follows storage events from other tabs', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', { key: THEME_MODE_STORAGE_KEY, newValue: 'dark' })
        );
      });

      expect(result.current.mode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('falls back to system when another tab clears the preference', () => {
      localStorage.setItem(THEME_MODE_STORAGE_KEY, 'dark');
      const { result } = renderHook(() => useThemeMode());

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', { key: THEME_MODE_STORAGE_KEY, newValue: null })
        );
      });

      expect(result.current.mode).toBe('system');
    });

    it('ignores storage events for other keys', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => {
        window.dispatchEvent(new StorageEvent('storage', { key: 'other', newValue: 'dark' }));
      });

      expect(result.current.mode).toBe('system');
    });
  });
});
