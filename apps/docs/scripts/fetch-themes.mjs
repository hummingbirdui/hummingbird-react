// Fetches the docs-only preview themes from the hummingbird repo (via jsdelivr)
// into app/themes/, which is gitignored. Runs automatically before `dev`/`build`.
// Also bundles them into public/themes.css (gitignored) for the landing
// color-themes iframe, which loads its CSS standalone.
// Pin a tag or commit with HB_THEMES_REF (defaults to main).
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";

const REF = process.env.HB_THEMES_REF ?? "main";
const BASE = `https://cdn.jsdelivr.net/gh/hummingbirdui/hummingbird@${REF}/apps/docs/src/themes`;
const OUT_DIR = path.join(import.meta.dirname, "..", "app", "themes");
const PUBLIC_BUNDLE = path.join(
  import.meta.dirname,
  "..",
  "public",
  "themes.css",
);

const FILES = [
  "themes.css",
  "default.css",
  "luxury.css",
  "retro.css",
  "arctic.css",
  "nature.css",
  "ember.css",
  "dracula.css",
  "midnight.css",
];

const allPresent = async () =>
  (
    await Promise.all(
      FILES.map((f) =>
        access(path.join(OUT_DIR, f)).then(
          () => true,
          () => false,
        ),
      ),
    )
  ).every(Boolean);

// Tailwind's --alpha() only exists at compile time. app/themes/ goes through
// the app's Tailwind build, but the iframe bundle is served as-is, so inline
// it the same way @tailwindcss/cli compiles it (unresolved values would make
// e.g. border-subtle fall back to currentColor).
const resolveAlpha = (css) =>
  css.replace(
    /--alpha\((var\(--[\w-]+\))\s*\/\s*([\d.]+%)\)/g,
    "color-mix(in oklab, $1 $2, transparent)",
  );

// Single-file bundle for the iframe: themes.css only holds @imports, so
// inline the individual theme files instead.
const buildPublicBundle = async () => {
  const css = await Promise.all(
    FILES.filter((file) => file !== "themes.css").map((file) =>
      readFile(path.join(OUT_DIR, file), "utf8"),
    ),
  );
  const bundle = resolveAlpha(css.join("\n"));

  if (bundle.includes("--alpha(")) {
    console.warn(
      "public/themes.css still contains unresolved --alpha() calls; the iframe theme CSS may render wrong colors.",
    );
  }

  await writeFile(PUBLIC_BUNDLE, bundle);
};

try {
  const downloads = await Promise.all(
    FILES.map(async (file) => {
      const res = await fetch(`${BASE}/${file}`);
      if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
      return { file, css: await res.text() };
    }),
  );

  await mkdir(OUT_DIR, { recursive: true });
  await Promise.all(
    downloads.map(({ file, css }) =>
      writeFile(path.join(OUT_DIR, file), css),
    ),
  );
  console.log(`Fetched ${FILES.length} theme files (ref: ${REF}) into app/themes/`);
} catch (error) {
  if (await allPresent()) {
    console.warn(
      `Could not refresh themes (${error.message}); using existing files in app/themes/`,
    );
  } else {
    console.error(`Failed to fetch themes and no local copy exists: ${error.message}`);
    process.exit(1);
  }
}

await buildPublicBundle();
