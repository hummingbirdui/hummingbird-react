import { MAIN_THEMES, MAIN_THEME_STORAGE_KEY } from "./main-themes";

const themeValues = MAIN_THEMES.map((theme) => theme.value);

/**
 * Applies the saved main theme (`data-theme` on `<html>`) before first paint,
 * mirroring what ThemeModeScript does for dark mode. Render inside `<head>`.
 */
export function MainThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
    MAIN_THEME_STORAGE_KEY,
  )});if(t&&${JSON.stringify(themeValues)}.includes(t)){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
