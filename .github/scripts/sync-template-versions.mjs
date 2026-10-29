// Points every create-hummingbird-react-app template at the current
// @hummingbirdui/react version.
// Usage: node .github/scripts/sync-template-versions.mjs [--check]
//
// The library and the CLI share one version (a Changesets "fixed" group), but
// Changesets only bumps package.json files — the templates' dependency on the
// library would otherwise stay at whatever version was current when they were
// written. `pnpm version-packages` runs this after `changeset version` so the
// "chore(release): version packages" PR carries the template update too, and
// prerelease.yml runs it so a beta CLI scaffolds with the beta library.
// With --check it only reports templates that are out of date (exit 1).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIBRARY_MANIFEST = "packages/hummingbird-react/package.json";
const TEMPLATES_DIR = "packages/create-hummingbird-react-app/templates";
const DEPENDENCY = "@hummingbirdui/react";

const check = process.argv.includes("--check");
const { version } = JSON.parse(readFileSync(LIBRARY_MANIFEST, "utf8"));
const range = `^${version}`;

// Edit the one line in place so the template's formatting is untouched.
const pattern = new RegExp(`("${DEPENDENCY}":\\s*")([^"]*)(")`);

let outdated = 0;
for (const template of readdirSync(TEMPLATES_DIR, { withFileTypes: true })) {
  if (!template.isDirectory()) continue;
  const manifest = join(TEMPLATES_DIR, template.name, "package.json");
  const source = readFileSync(manifest, "utf8");
  const match = source.match(pattern);
  if (!match) {
    console.error(`${manifest}: no "${DEPENDENCY}" dependency found`);
    process.exit(1);
  }
  if (match[2] === range) continue;
  outdated++;
  if (check) {
    console.error(
      `${manifest}: ${DEPENDENCY} is ${match[2]}, expected ${range}`,
    );
  } else {
    writeFileSync(manifest, source.replace(pattern, `$1${range}$3`));
    console.log(`${manifest}: ${DEPENDENCY} ${match[2]} -> ${range}`);
  }
}

if (check && outdated) process.exit(1);
if (!outdated)
  console.log(`Templates already depend on ${DEPENDENCY}@${range}`);
