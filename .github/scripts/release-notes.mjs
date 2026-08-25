// Builds the GitHub Release body for the given version from CHANGELOG.md.
// Usage: node .github/scripts/release-notes.mjs 1.0.0
//
// Changesets groups CHANGELOG entries by bump type (Minor/Patch); this script
// regroups them into reader-facing sections based on the summary's prefix:
//   "new:"  -> New Components      "feat:" -> Features
//   "fix:"  -> Fixes               anything else -> Updates
// The prefix convention is documented in CONTRIBUTING.md ("Adding a changeset").
import { readFileSync } from "node:fs";

const version = process.argv[2];
if (!version) {
  console.error("usage: release-notes.mjs <version>");
  process.exit(1);
}

const changelog = readFileSync("packages/hummingbird-react/CHANGELOG.md", "utf8");
const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const match = changelog.match(
  new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\s*$(?![\\s\\S]))`, "m"),
);

if (!match) {
  process.stdout.write(`Release ${version}\n`);
  process.exit(0);
}

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

const SECTIONS = [
  { title: "Features", match: /^feat\b[:!]?\s*/i, items: [] },
  { title: "New Components", match: /^new\b[:!]?\s*/i, items: [] },
  { title: "Updates", match: null, items: [] }, // fallback bucket
  { title: "Fixes", match: /^fix\b[:!]?\s*/i, items: [] },
];
const fallback = SECTIONS[2];

for (const raw of items) {
  let text = raw
    // changelog-github decoration: [`hash`](url) Thanks [@user](url)! -
    .replace(/^\[`[0-9a-f]+`\]\([^)]*\)\s*/i, "")
    .replace(/^Thanks\s*\[[^\]]*\]\([^)]*\)!\s*-\s*/i, "")
    // default-formatter decoration: "hash: "
    .replace(/^[0-9a-f]{7,40}:\s*/i, "")
    .trim();
  if (!text) continue;

  const section =
    SECTIONS.find((s) => s.match && s.match.test(text)) ?? fallback;
  if (section.match) text = text.replace(section.match, "");
  else text = text.replace(/^(chore|update|refactor|docs|perf|style|deps|test)\b[:!]?\s*/i, "");
  text = text.charAt(0).toUpperCase() + text.slice(1);
  section.items.push(text);
}

const body = SECTIONS.filter((s) => s.items.length)
  .map((s) => `## ${s.title}\n\n${s.items.map((t) => `- ${t}`).join("\n\n")}`)
  .join("\n\n");

process.stdout.write((body || `Release ${version}`) + "\n");
