import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBlocks, getBlock } from "@/registry/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return allBlocks.map((block) => ({ block: block.name }));
}

export async function generateMetadata(props: {
  params: Promise<{ block: string }>;
}): Promise<Metadata> {
  const { block: name } = await props.params;
  const entry = getBlock(name);
  return {
    title: entry?.block.title,
    robots: { index: false },
  };
}

export default async function BlockPreviewPage(props: {
  params: Promise<{ block: string }>;
}) {
  const { block: name } = await props.params;
  const entry = getBlock(name);
  if (!entry) notFound();

  const Block = (await import(`../../../../registry/blocks/${entry.block.file}`))
    .default as React.ComponentType;

  return <Block />;
}
