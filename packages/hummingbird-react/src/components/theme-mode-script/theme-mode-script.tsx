import * as React from 'react';
import {
  DEFAULT_THEME_MODE,
  THEME_MODE_DEFAULT_ATTR,
  THEME_MODE_STORAGE_KEY,
  validateMode,
  type ThemeMode,
} from '../../hooks/use-theme-mode/theme-mode';

export interface ThemeModeScriptProps extends React.ComponentProps<'script'> {
  defaultMode?: ThemeMode;
}

function ThemeModeScript({ defaultMode = DEFAULT_THEME_MODE, ...props }: ThemeModeScriptProps) {
  const script = `(function(){try{var d=${JSON.stringify(
    validateMode(defaultMode)
  )};document.documentElement.setAttribute(${JSON.stringify(
    THEME_MODE_DEFAULT_ATTR
  )},d);var theme=localStorage.getItem(${JSON.stringify(
    THEME_MODE_STORAGE_KEY
  )})||d;document.documentElement.classList.toggle('dark',theme==='dark'||(theme!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches));}catch(e){}})();`;

  return (
    <script data-slot="theme-mode-script" {...props} dangerouslySetInnerHTML={{ __html: script }} />
  );
}

ThemeModeScript.displayName = 'ThemeModeScript';

export { ThemeModeScript };
