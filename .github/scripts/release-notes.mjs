// Prints the CHANGELOG.md section for the given version to stdout, for use as
// the GitHub Release body. Usage: node .github/scripts/release-notes.mjs 1.0.0
import { readFileSync } from "node:fs";

const version = process.argv[2];
if (!version) {
  console.error("usage: release-notes.mjs <version>");
  process.exit(1);
}

const changelog = readFileSync("packages/hummingbird-react/CHANGELOG.md", "utf8");
const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const section = changelog.match(
  new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\s*$(?![\\s\\S]))`, "m"),
);
process.stdout.write(section ? section[1].trim() + "\n" : `Release ${version}\n`);
