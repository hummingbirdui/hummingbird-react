"use client";

import { Badge, Button, Card, Text } from "@hummingbirdui/react";

export default function Cta1() {
  return (
    <section className="px-6 py-24">
      <Card className="max-w-4xl mx-auto p-6 md:p-16 items-center text-center border-subtle rounded-3xl">
        <Badge variant="subtle" color="neutral" className="gap-2 mb-10">
          <span className="size-1.75 rounded-full bg-success animate-pulse" />
          <span className="uppercase text-muted">Next Gen Interface</span>
        </Badge>

        <Text
          as="h2"
          size="4xl"
          fontWeight="extrabold"
          className="md:text-6xl tracking-tight text-default mb-6"
        >
          Your workflow,
          <br />
          <span className="dark:text-transparent bg-clip-text bg-linear-to-b from-neutral to-neutral/40 dark:from-white dark:to-white/40">
            fully autonomous.
          </span>
        </Text>

        <Text
          size="base"
          className="md:text-lg text-muted leading-relaxed max-w-xl mb-10"
        >
          The first orchestration engine that learns from your deployments. Ship
          globally in seconds — not minutes.
        </Text>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 w-full">
          <Button
            color="neutral"
            className="sm:btn-lg dark:bg-white dark:text-black w-full sm:w-auto"
          >
            Start Building
          </Button>
          <Button
            variant="subtle"
            color="neutral"
            className="sm:btn-lg px-6 w-full sm:w-auto"
          >
            View Docs
          </Button>
        </div>

        <Text size="sm" className="text-muted">
          No credit card required · Setup in under 2 minutes
        </Text>
      </Card>
    </section>
  );
}
