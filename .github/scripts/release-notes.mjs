// Builds the GitHub Release body for the given version from the CHANGELOGs.
// Usage: node .github/scripts/release-notes.mjs 1.0.0
//
// @hummingbirdui/react and create-hummingbird-react-app share one version
// (a Changesets "fixed" group) and one GitHub Release. The library's entries
// are regrouped into reader-facing sections based on the summary's prefix:
//   "new:"  -> New Components      "feat:" -> Features
//   "fix:"  -> Fixes               anything else -> Updates
// The CLI's own entries follow under a "create-hummingbird-react-app" section,
// which is left out when the CLI was only bumped to stay in step.
// The prefix convention is documented in CONTRIBUTING.md ("Adding a changeset").
import { existsSync, readFileSync } from "node:fs";

const LIBRARY_CHANGELOG = "packages/hummingbird-react/CHANGELOG.md";
const CLI_CHANGELOG = "packages/create-hummingbird-react-app/CHANGELOG.md";

const version = process.argv[2];
if (!version) {
  console.error("usage: release-notes.mjs <version>");
  process.exit(1);
}

/** Cleaned top-level bullets of the given version's CHANGELOG section. */
function entriesFor(changelogPath) {
  if (!existsSync(changelogPath)) return [];
  const changelog = readFileSync(changelogPath, "utf8");
  const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = changelog.match(
    new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\s*$(?![\\s\\S]))`, "m"),
  );
  if (!match) return [];

  // Collect top-level bullets (with their continuation lines), ignoring the
  // "### Minor Changes" style headings changesets emits.
  const items = [];
  let current = null;
  for (const line of match[1].split("\n")) {
    if (/^### /.test(line)) {
      if (current) items.push(current);
      current = null;
    } else if (/^- /.test(line)) {
      if (current) items.push(current);
      current = line.slice(2);
    } else if (current !== null) {
      current += "\n" + line;
    }
  }
  if (current) items.push(current);

  return items
    .map((raw) =>
      raw
        // changelog-github decoration: [#pr](url) [`hash`](url) Thanks [@user](url)! -
        .replace(/^\[#\d+\]\([^)]*\)\s*/i, "")
        .replace(/^\[`[0-9a-f]+`\]\([^)]*\)\s*/i, "")
        .replace(/^Thanks\s*\[[^\]]*\]\([^)]*\)!\s*-\s*/i, "")
        // default-formatter decoration: "hash: "
        .replace(/^[0-9a-f]{7,40}:\s*/i, "")
        .trim(),
    )
    .filter((text) => text && !/^Updated dependencies/i.test(text));
}

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const OTHER_PREFIX = /^(chore|update|refactor|docs|perf|style|deps|test)\b[:!]?\s*/i;

const SECTIONS = [
  { title: "Features", match: /^feat\b[:!]?\s*/i, items: [] },
  { title: "New Components", match: /^new\b[:!]?\s*/i, items: [] },
  { title: "Updates", match: null, items: [] }, // fallback bucket
  { title: "Fixes", match: /^fix\b[:!]?\s*/i, items: [] },
];
const fallback = SECTIONS[2];

for (let text of entriesFor(LIBRARY_CHANGELOG)) {
  const section = SECTIONS.find((s) => s.match && s.match.test(text)) ?? fallback;
  text = section.match ? text.replace(section.match, "") : text.replace(OTHER_PREFIX, "");
  section.items.push(capitalize(text));
}

const cliItems = entriesFor(CLI_CHANGELOG).map((text) =>
  capitalize(text.replace(/^(new|feat|fix)\b[:!]?\s*/i, "").replace(OTHER_PREFIX, "")),
);

const blocks = SECTIONS.filter((s) => s.items.length).map(
  (s) => `## ${s.title}\n\n${s.items.map((t) => `- ${t}`).join("\n\n")}`,
);
if (cliItems.length) {
  blocks.push(
    `## create-hummingbird-react-app\n\n${cliItems.map((t) => `- ${t}`).join("\n\n")}`,
  );
}

process.stdout.write((blocks.join("\n\n") || `Release ${version}`) + "\n");
