"use client";

import { ArrowUp } from "lucide-react";
import { Badge, Card, Progress, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const volumeBars = ["h-4", "h-6", "h-8", "h-10", "h-7", "h-4"];

export default function Stat4() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 border-subtle rounded-2xl">
        <div className="flex justify-between items-start mb-6">
          <Text
            size="xs"
            fontWeight="semibold"
            className="text-subtle uppercase mb-0"
          >
            Portfolio Value
          </Text>
          <div className="size-2 rounded-full bg-primary animate-pulse" />
        </div>
        <Text
          as="h3"
          size="4xl"
          fontWeight="semibold"
          className="text-default mb-10"
        >
          $248,500
        </Text>
        <div className="flex items-center gap-2 text-xs text-subtle">
          <Badge
            variant="subtle"
            color="success"
            size="md"
            className="border-0 self-start"
          >
            <ArrowUp className="size-3" strokeWidth={2.5} />
            12.5%
          </Badge>
          Since last month
        </div>
      </Card>

      <Card className="p-6 border-subtle rounded-2xl">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-subtle uppercase mb-6"
        >
          24h Trade Volume
        </Text>
        <Text as="h3" size="4xl" fontWeight="semibold" className="text-default">
          $12.4k
        </Text>
        <div className="flex items-end gap-1 h-8 mt-auto">
          {volumeBars.map((height, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 rounded-md",
                index === 3 ? "bg-primary" : "bg-muted",
                height,
              )}
            />
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-primary rounded-2xl border-0">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-white uppercase mb-6"
        >
          Est. APY Yield
        </Text>
        <Text as="h3" size="4xl" fontWeight="semibold" className="text-white">
          8.42%
        </Text>
        <Text size="sm" fontWeight="medium" className="text-white mt-auto mb-0">
          Auto-compounding
        </Text>
      </Card>

      <Card className="p-6 border-subtle rounded-2xl">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-subtle uppercase mb-6"
        >
          Network Status
        </Text>
        <div className="flex items-center justify-between mb-1">
          <span className="text-muted text-sm font-medium">Uptime</span>
          <span className="text-success text-sm font-medium">32%</span>
        </div>
        <Progress value={32} aria-label="Uptime" className="h-2 rounded-xs">
          <Progress.Bar color="success" />
        </Progress>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-muted text-sm font-medium">Latency</span>
          <span className="text-subtle text-sm font-medium">42ms</span>
        </div>
      </Card>
    </div>
  );
}
