import { source } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findNeighbour } from "fumadocs-core/page-tree";
import { useMDXComponents } from "@/mdx-components";
import { cn } from "@hummingbirdui/react/utils";
import { DocsToc } from "@/components/docs/DocsToc";
import { DocsPagination } from "@/components/docs/DocsPagination";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;
  const toc = page.data.toc ?? [];
  const { previous, next } = findNeighbour(source.pageTree, page.url);

  return (
    <div
      className={cn(
        "py-10 lg:ps-10",
        toc.length > 0 && "xl:grid xl:grid-cols-[1fr_16.75rem]",
      )}
    >
      <article className="docs-content min-w-0">
        <h1 className="mb-4 text-4xl">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-xl mb-10 font-light">{page.data.description}</p>
        )}
        <MDX components={useMDXComponents({})} />
        <DocsPagination prev={previous} next={next} />
      </article>
      {toc.length > 0 && <DocsToc toc={toc} />}
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
