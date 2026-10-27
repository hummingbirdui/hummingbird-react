import type { Metadata } from "next";
import { Badge, Container, Text } from "@hummingbirdui/react";
import BlockCard from "@/components/landing/blocks/BlockCard";
import { blockCategories } from "@/registry/blocks";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Ready-to-use UI blocks built with Hummingbird React components: hero sections, features, pricing, footers and more.",
};

export default function BlocksPage() {
  return (
    <Container className="px-6 max-w-7xl mx-auto my-10">
      <div className="text-center mb-10">
        <span className="inline-flex text-muted font-medium text-sm mb-6 rounded-full bg-linear-to-r from-secondary to-primary p-px">
          <span className="flex items-center p-1 bg-default pr-2 rounded-full">
            <Badge color="primary" className="me-1">
              New
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m11 14.5l-5.925-.75q-.625-.075-.813-.675t.263-1.025l10.225-9.8q.125-.125.3-.187T15.525 2q.5 0 .763.425t.012.875L13 9.5l5.925.75q.625.075.813.675t-.263 1.025L9.25 21.75q-.125.125-.3.188T8.475 22q-.5 0-.763-.425T7.7 20.7z"
                  strokeWidth="0.5"
                  stroke="currentColor"
                />
              </svg>
            </Badge>
            Ready-to-use UI blocks
          </span>
        </span>
        <Text as="h1" size="4xl" className="md:text-6xl -tracking-[6.5%]">
          Beautiful UI blocks, built for <br className="hidden sm:block" />{" "}
          real-world projects.
        </Text>
        <Text className="md:text-lg">
          An open-source system sensibly designed for rapid development-without{" "}
          <br className="hidden md:block" /> sacrificing the flexibility of
          utility-first CSS.
        </Text>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {blockCategories.map((category) => (
          <BlockCard key={category.slug} data={category} />
        ))}
      </div>
    </Container>
  );
}
