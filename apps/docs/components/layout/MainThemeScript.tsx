import {
  DEFAULT_THEME_PATHS,
  MAIN_THEMES,
  MAIN_THEME_STORAGE_KEY,
} from "./main-themes";

const themeValues = MAIN_THEMES.map((theme) => theme.value);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Applies the saved main theme (`data-theme` on `<html>`) before first paint,
 * mirroring what ThemeModeScript does for dark mode. Render inside `<head>`.
 * DEFAULT_THEME_PATHS (the landing page and the blocks pages, including the
 * block preview iframes) are excluded and always start on the default theme
 * (MainThemeController handles the same rule for client-side navigation).
 */
export function MainThemeScript() {
  const script = `(function(){try{var p=location.pathname;var b=${JSON.stringify(
    basePath,
  )};if(b&&p.indexOf(b)===0)p=p.slice(b.length)||"/";if(${JSON.stringify(
    DEFAULT_THEME_PATHS,
  )}.some(function(d){return d==="/"?p==="/":p.indexOf(d)===0}))return;var t=localStorage.getItem(${JSON.stringify(
    MAIN_THEME_STORAGE_KEY,
  )});if(t&&${JSON.stringify(themeValues)}.includes(t)){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
