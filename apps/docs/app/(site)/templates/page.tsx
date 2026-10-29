import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { Badge, Container, Text } from "@hummingbirdui/react";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Production-ready React dashboard and web app templates built with Tailwind CSS and Hummingbird.",
};

export default function TemplatesPage() {
  return (
    <Container className="px-6 md:px-10 max-w-5xl xl:max-w-7xl mx-auto my-10">
      <div className="text-center mb-14">
        <span className="inline-flex text-muted font-medium text-sm mb-6 rounded-full bg-linear-to-r from-secondary to-primary p-px">
          <span className="flex items-center p-1 bg-default pr-2 rounded-full">
            <Badge color="primary" className="me-1">
              New
              <Zap className="size-3" fill="currentColor" />
            </Badge>
            Production-ready UI templates
          </span>
        </span>
        <Text as="h1" size="4xl" className="md:text-6xl -tracking-[6.5%]">
          Complete Tailwind CSS templates <br className="hidden sm:block" /> for
          modern web projects.
        </Text>
        <Text className="md:text-lg">
          Beautiful starting points for modern web projects, built with all{" "}
          <br /> Hummingbird components and clean, optimized code.
        </Text>
      </div>
      {templates.map((template, index) => (
        <TemplateCard
          key={template.title}
          template={template}
          className={index % 2 === 0 ? "mb-6" : undefined}
        />
      ))}
    </Container>
  );
}
