import { Badge, Button, Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";
import type { Template } from "@/data/templates";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Show more screenshots as the card widens: 1 on mobile, 2 from sm, 4 from lg, 6 from xl.
const imageVisibility = (index: number) =>
  index > 3
    ? "hidden xl:block"
    : index > 1
      ? "hidden lg:block"
      : index > 0
        ? "hidden sm:block"
        : "";

export function TemplateCard({
  template,
  className,
}: {
  template: Template;
  className?: string;
}) {
  const {
    title,
    category,
    description,
    tags,
    previewLink,
    buyLink,
    previewImages,
  } = template;

  return (
    <Card className={cn("rounded-3xl", className)}>
      <Card.Body className="flex max-lg:flex-col gap-6 lg:gap-15 justify-between p-6 lg:p-8">
        <div className="lg:max-w-75 flex flex-col items-start justify-between max-lg:order-1">
          <div>
            <Text as="h5" className="mb-0">
              {title}
            </Text>
            <Text size="base">{category}</Text>
            <Text className="mb-4 text-default">{description}</Text>
            <div className="max-sm:hidden">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="subtle"
                  color="neutral"
                  className="me-3 mb-3"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-5 w-full">
            <Button asChild className="text-nowrap max-sm:flex-1">
              <a href={buyLink} target="_blank" rel="noreferrer">
                Get this template
              </a>
            </Button>
            <Button
              asChild
              variant="subtle"
              color="neutral"
              className="text-nowrap max-sm:flex-1"
            >
              <a href={previewLink} target="_blank" rel="noreferrer">
                Live preview
              </a>
            </Button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {previewImages.map((image, index) => (
            <img
              key={image}
              src={`${basePath}${image}`}
              alt={title}
              className={cn(
                "object-cover border border-subtle rounded-lg",
                imageVisibility(index),
              )}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
