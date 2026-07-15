import fs from "node:fs/promises";
import path from "node:path";
import { highlight } from "fumadocs-core/highlight";
import { CodeBlock } from "./CodeBlock";

/**
 * Renders a CSS file from the installed `@hummingbirdui/hummingbird` package
 * as a highlighted code block, so reference listings (e.g. the default color
 * palette) always match the installed version instead of a pasted copy.
 */
export async function CssFileCode({
  file,
  filePath,
}: {
  /** Path inside `@hummingbirdui/hummingbird/src`, e.g. "palettes/default.css" */
  file: string;
  /** Label shown in the code block header; defaults to the package path */
  filePath?: string;
}) {
  // The package may live in the app's node_modules or be hoisted to the
  // monorepo root, depending on the package manager.
  const candidates = ["", "../.."].map((prefix) =>
    path.join(
      process.cwd(),
      prefix,
      "node_modules",
      "@hummingbirdui",
      "hummingbird",
      "src",
      file,
    ),
  );

  let source: string | null = null;
  for (const candidate of candidates) {
    source = await fs.readFile(candidate, "utf-8").catch(() => null);
    if (source !== null) break;
  }
  if (source === null) {
    throw new Error(`CssFileCode: could not find "${file}" in @hummingbirdui/hummingbird`);
  }
  const code = source.trim();

  const highlighted = await highlight(code, {
    lang: "css",
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <div className="mb-6">
      <CodeBlock
        rawCode={code}
        lang="css"
        filePath={filePath ?? `@hummingbirdui/hummingbird/src/${file}`}
        showPreview={false}
      >
        {highlighted}
      </CodeBlock>
    </div>
  );
}
