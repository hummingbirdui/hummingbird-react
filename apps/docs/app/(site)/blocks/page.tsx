import type { Metadata } from "next";
import { Zap } from "lucide-react";
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
              <Zap className="size-3" fill="currentColor" />
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
