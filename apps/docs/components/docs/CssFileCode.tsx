import fs from "node:fs/promises";
import path from "node:path";
import { highlight } from "fumadocs-core/highlight";
import { CodeBlock } from "./CodeBlock";

export async function CssFileCode({
  file,
  filePath,
}: {
  file: string;
  filePath?: string;
}) {
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
    throw new Error(
      `CssFileCode: could not find "${file}" in @hummingbirdui/hummingbird`,
    );
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
        codeBlockClass="pt-12!"
        lang="css"
        filePath={filePath ?? `@hummingbirdui/hummingbird/src/${file}`}
        showPreview={false}
      >
        {highlighted}
      </CodeBlock>
    </div>
  );
}
