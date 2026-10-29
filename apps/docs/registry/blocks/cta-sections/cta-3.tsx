"use client";

import { ArrowRight, Plus, Users, Zap } from "lucide-react";
import { Badge, Button, Card, Text } from "@hummingbirdui/react";

export default function Cta3() {
  return (
    <section className="px-6 py-24 mx-auto max-w-xl lg:max-w-6xl">
      <div className="text-center mb-16">
        <Text as="h2" size="4xl" className="md:text-5xl tracking-tighter mb-4">
          How do you want to <span className="text-primary">get started?</span>
        </Text>
        <Text
          size="lg"
          fontWeight="medium"
          className="text-muted max-w-2xl mx-auto"
        >
          Choose the path that fits your workflow—we’ve got you covered with
          tools for every stage of your project.
        </Text>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* card 01 */}
        <Card className="group p-8 bg-default border-subtle rounded-3xl">
          <div className="size-12 mb-6 flex items-center justify-center rounded-2xl bg-muted text-muted group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Plus className="size-6" />
          </div>
          <Text as="h3" size="xl" className="text-default mb-3">
            Start from scratch
          </Text>
          <Text size="sm" fontWeight="medium" className="text-muted mb-6">
            Build everything your way with full flexibility and our core API
            suite.
          </Text>
          <Button
            asChild
            variant="text"
            color="neutral"
            className="px-0 self-start bg-transparent text-sm font-bold uppercase tracking-wide group/link"
          >
            <a href="#">
              Get started
              <ArrowRight className="ms-2 size-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          </Button>
        </Card>

        {/* card 02 */}
        <Card className="group p-8 bg-primary border-transparent rounded-3xl">
          <div className="flex items-start justify-between mb-6">
            <div className="size-12 flex items-center justify-center rounded-2xl bg-white/10 text-white">
              <Zap className="size-6" />
            </div>
            <Badge
              variant="subtle"
              className="uppercase text-white/80 border-white/60"
            >
              Recommended
            </Badge>
          </div>
          <Text as="h3" size="xl" className="text-white mb-3">
            Use templates
          </Text>
          <Text size="sm" className="text-white/80 mb-6">
            Jumpstart your project with over 200+ ready-made, high-performance
            designs.
          </Text>
          <Button
            asChild
            color={null}
            className="text-white px-0 self-start bg-transparent text-sm font-bold uppercase tracking-wide group/link"
          >
            <a href="#">
              Browse templates
              <ArrowRight className="ms-2 size-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          </Button>
        </Card>

        {/* card 03 */}
        <Card className="group p-8 bg-default border-subtle rounded-3xl">
          <div className="size-12 mb-6 flex items-center justify-center rounded-2xl bg-muted text-muted group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Users className="size-6" />
          </div>
          <Text as="h3" size="xl" className="text-default mb-3">
            Hire experts
          </Text>
          <Text size="sm" fontWeight="medium" className="text-muted mb-6">
            Collaborate with top-tier professionals to build your custom
            solution today.
          </Text>
          <Button
            asChild
            variant="text"
            color="neutral"
            className="px-0 self-start bg-transparent text-sm font-bold uppercase tracking-wide group/link"
          >
            <a href="#">
              Find experts
              <ArrowRight className="ms-2 size-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          </Button>
        </Card>
      </div>
    </section>
  );
}
