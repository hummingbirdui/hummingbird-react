"use client";

import { Zap } from "lucide-react";
import { Badge, Button, Card, Divider, Text } from "@hummingbirdui/react";

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "50M+", label: "Requests" },
];

export default function Cta4() {
  return (
    <div className="px-6 py-20">
      <Card className="max-w-6xl mx-auto p-8 md:p-14 border-subtle lg:flex-row items-start justify-between gap-12 rounded-2xl">
        <div className="flex-1">
          <Badge variant="subtle" color="neutral" className="gap-2 mb-8">
            <Zap className="size-4" />
            <span className="uppercase">v1.0 is live</span>
          </Badge>

          <Text
            as="h2"
            size="4xl"
            fontWeight="black"
            className="md:text-5xl tracking-tight text-default mb-6"
          >
            Build faster. <span className="text-subtle">Deploy sooner.</span>
            <br />
            Scale{" "}
            <span className="underline decoration-neutral/15 dark:decoration-white/15 grayscale decoration-4 underline-offset-4">
              everywhere.
            </span>
          </Text>

          <Text size="lg" className="text-muted max-w-lg leading-relaxed">
            The modern standard for cloud orchestration. Manage your entire
            stack from a single, unified command center.
          </Text>
        </div>

        <Card className="border-subtle rounded-xl w-full max-w-md p-4 sm:p-8">
          <Button
            color="neutral"
            size="lg"
            className="dark:bg-white dark:text-black w-full py-3 mb-4"
          >
            Get Started — It&apos;s Free
          </Button>
          <Button
            variant="subtle"
            color="neutral"
            size="lg"
            className="w-full py-3"
          >
            Talk to Sales
          </Button>

          <Divider className="border-subtle my-8" />

          <div className="flex justify-between items-center text-center">
            {stats.map((stat, index) => (
              <div key={stat.label} className="contents">
                {index > 0 && (
                  <Divider orientation="vertical" className="h-8 self-center" />
                )}
                <div>
                  <Text size="2xl" fontWeight="bold" className="text-default">
                    {stat.value}
                  </Text>
                  <Text
                    size="xs"
                    fontWeight="medium"
                    className="uppercase text-muted"
                  >
                    {stat.label}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}
