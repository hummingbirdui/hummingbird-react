// Runs before first paint to set the `.dark` class with no flash of the wrong
// theme. Mirrors Hummingbird: an explicit `localStorage.theme` wins, otherwise
// fall back to the OS `prefers-color-scheme`.
const script = `(function(){try{var t=localStorage.theme;var dark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
