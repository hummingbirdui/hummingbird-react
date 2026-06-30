import fs from "node:fs/promises";
import path from "node:path";
import { highlight } from "fumadocs-core/highlight";
import { cn } from "@hummingbirdui/react/utils";
import { registry } from "@/registry";
import { CodeBlock } from "./CodeBlock";

const EXAMPLES_DIR = path.join(process.cwd(), "registry", "examples");

export async function ComponentPreview({
  name,
  showPreview = true,
  showMarkup = true,
  filePath,
  lang = "tsx",
  className,
  id,
}: {
  name: string;
  showPreview?: boolean;
  showMarkup?: boolean;
  filePath?: string;
  lang?: string;
  className?: string;
  id?: string;
}) {
  const entry = registry[name];

  if (!entry) {
    return (
      <p className="mb-6 rounded-2xl border border-danger/40 bg-danger/5 p-4 text-sm text-danger">
        Example <code>{name}</code> was not found in the registry. Add it to{" "}
        <code>registry/index.ts</code>.
      </p>
    );
  }

  const Example = (
    await import(`../../registry/examples/${entry.file}`)
  ).default;
  const source = await fs.readFile(
    path.join(EXAMPLES_DIR, entry.file),
    "utf-8",
  );
  const code = source.replace(/^["']use client["'];?\s*\n+/, "").trim();

  const highlighted = await highlight(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <div
      className={cn("mb-6", showPreview && "rounded-2xl border border-subtle")}
      id={id}
    >
      {showPreview && (
        <div className={cn("rounded-2xl bg-default px-6 py-8", className)}>
          <Example />
        </div>
      )}

      {showMarkup && (
        <CodeBlock
          rawCode={code}
          lang={lang}
          filePath={filePath}
          showPreview={showPreview}
        >
          {highlighted}
        </CodeBlock>
      )}
    </div>
  );
}
