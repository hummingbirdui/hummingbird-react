import { MAIN_THEMES, MAIN_THEME_STORAGE_KEY } from "./main-themes";

const themeValues = MAIN_THEMES.map((theme) => theme.value);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Applies the saved main theme (`data-theme` on `<html>`) before first paint,
 * mirroring what ThemeModeScript does for dark mode. Render inside `<head>`.
 * The landing page is excluded — it always uses the default theme
 * (MainThemeController handles the same rule for client-side navigation).
 */
export function MainThemeScript() {
  const script = `(function(){try{var p=location.pathname;if(p===${JSON.stringify(
    `${basePath}/`,
  )}||p===${JSON.stringify(
    basePath || "/",
  )})return;var t=localStorage.getItem(${JSON.stringify(
    MAIN_THEME_STORAGE_KEY,
  )});if(t&&${JSON.stringify(themeValues)}.includes(t)){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
