import fs from "node:fs/promises";
import path from "node:path";
import { highlight } from "fumadocs-core/highlight";
import type { BlockEntry } from "@/registry/blocks";
import { BlockPreviewFrame } from "./BlockPreviewFrame";

const BLOCKS_DIR = path.join(process.cwd(), "registry", "blocks");

export function blockAnchor(title: string) {
  return title.replace(/\s+/g, "-").toLowerCase();
}

export async function BlockPreview({ block }: { block: BlockEntry }) {
  const code = (
    await fs.readFile(path.join(BLOCKS_DIR, block.file), "utf-8")
  ).trim();

  const highlighted = await highlight(code, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <BlockPreviewFrame
      id={blockAnchor(block.title)}
      title={block.title}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/blocks-preview/${block.name}/`}
      className={block.className}
      rawCode={code}
    >
      {highlighted}
    </BlockPreviewFrame>
  );
}
