import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, Text } from "@hummingbirdui/react";
import { BlockPreview } from "@/components/blocks/BlockPreview";
import { blockCategories, getBlockCategory } from "@/registry/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return blockCategories
    .filter((category) => category.blocks.length > 0)
    .map((category) => ({ category: category.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = getBlockCategory(slug);
  return {
    title: category ? `${category.pageTitle} - Blocks` : "Blocks",
    description: category?.description,
  };
}

export default async function BlockCategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await props.params;
  const category = getBlockCategory(slug);
  if (!category || category.blocks.length === 0) notFound();

  return (
    <div className="px-6 max-w-332 mx-auto my-10">
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild className="link link-hover">
              <Link href="/">Home</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild className="link link-hover">
              <Link href="/blocks/">Blocks</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Breadcrumb.Page>{category.pageTitle}</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Text as="h3" className="mb-4 mt-8">
        {category.pageTitle}
      </Text>
      <Text size="lg">{category.description}</Text>
      {category.blocks.map((block) => (
        <BlockPreview key={block.name} block={block} />
      ))}
    </div>
  );
}
