import Link from "next/link";
import { Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import type { BlockCategory } from "@/registry/blocks";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface BlockCardProps {
  data: BlockCategory;
}

const BlockCard = ({ data }: BlockCardProps) => {
  const available = data.blocks.length > 0;

  const content = (
    <>
      <div className="grow flex items-center justify-center bg-subtle p-4 aspect-4/3">
        <img
          src={`${basePath}${data.image.light}`}
          className="dark:hidden"
          alt={data.title}
        />
        <img
          src={`${basePath}${data.image.dark}`}
          className="hidden dark:flex"
          alt={data.title}
        />
      </div>
      <div className="px-4 py-3">
        <Text
          as="h6"
          size="base"
          fontWeight="semibold"
          className="card-title mb-0.5"
        >
          {data.title}
        </Text>
        <Text size="xs" className="mb-0 text-muted">
          {available ? `${data.blocks.length} blocks` : "Coming soon"}
        </Text>
      </div>
    </>
  );

  const className =
    "max-sm:max-w-70 mx-auto flex flex-col h-full w-full rounded-2xl bg-default overflow-hidden";

  if (!available) {
    return <Card className={cn(className, "opacity-70")}>{content}</Card>;
  }

  return (
    <Card action asChild className={cn(className, "hover:border-primary")}>
      <Link href={`/blocks/${data.slug}/`}>{content}</Link>
    </Card>
  );
};

export default BlockCard;
