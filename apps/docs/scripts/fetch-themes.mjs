// Fetches the docs-only preview themes from the hummingbird repo (via jsdelivr)
// into app/themes/, which is gitignored. Runs automatically before `dev`/`build`.
// Pin a tag or commit with HB_THEMES_REF (defaults to main).
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const REF = process.env.HB_THEMES_REF ?? "main";
const BASE = `https://cdn.jsdelivr.net/gh/hummingbirdui/hummingbird@${REF}/apps/docs/src/themes`;
const OUT_DIR = path.join(import.meta.dirname, "..", "app", "themes");

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
