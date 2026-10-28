"use client";

import { Star } from "lucide-react";
import { Avatar, Card, Progress, Text } from "@hummingbirdui/react";

const volumeSegments = [
  "bg-success/20",
  "bg-success/40",
  "bg-success/60",
  "bg-success",
];

const avatars = [
  "/images/avatar/avatar_1.webp",
  "/images/avatar/avatar_2.webp",
  "/images/avatar/avatar_3.webp",
  "/images/avatar/avatar_4.webp",
];

export default function Stat5() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 rounded-2xl border-subtle">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-subtle uppercase mb-4"
        >
          Gross Volume
        </Text>
        <div className="flex items-end gap-2 mb-12">
          <span className="text-3xl font-semibold text-default tabular-nums">
            $42.8K
          </span>
          <span className="mb-1 text-sm font-semibold text-success">12%↑</span>
        </div>
        <div className="flex gap-1">
          {volumeSegments.map((segment) => (
            <div
              key={segment}
              className={`flex-1 h-2 rounded-full ${segment}`}
            />
          ))}
        </div>
      </Card>

      <Card className="p-6 rounded-2xl border-subtle">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-subtle uppercase mb-4"
        >
          New Customers
        </Text>
        <div className="flex items-end gap-2 mb-6">
          <span className="text-3xl font-semibold text-default tabular-nums">
            1,248
          </span>
          <span className="mb-1 text-sm font-semibold text-primary">+18</span>
        </div>
        <Avatar.Group className="ms-2">
          {avatars.map((src) => (
            <Avatar key={src} size="xs" className="shrink-0">
              <Avatar.Image src={src} alt="Avatar" />
            </Avatar>
          ))}
          <Avatar size="xs" className="shrink-0">
            <Avatar.Fallback className="bg-primary text-base">
              <span className="text-xs">+14</span>
            </Avatar.Fallback>
          </Avatar>
          <span className="text-xs self-center ms-2 font-medium text-subtle truncate">
            Joined Today
          </span>
        </Avatar.Group>
      </Card>

      <Card className="p-6 rounded-2xl border-subtle">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-subtle uppercase mb-4"
        >
          Server Load
        </Text>
        <span className="text-3xl font-semibold text-default tabular-nums">
          24<span className="text-sm text-subtle">%</span>
        </span>
        <Progress
          value={24}
          aria-label="Server load"
          className="mt-auto h-1.5 mb-1.5"
        />
        <span className="text-xs font-medium text-subtle">Optimal Range</span>
      </Card>

      <Card className="p-6 rounded-2xl border-subtle">
        <Text
          size="xs"
          fontWeight="semibold"
          className="text-subtle uppercase flex items-center gap-2 mb-4"
        >
          <span className="relative flex size-1.75 mb-0.5">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
            <span className="inline-flex rounded-full size-1.75 bg-primary" />
          </span>
          User CAST
        </Text>
        <span className="text-3xl font-semibold text-default tabular-nums">
          4.9<span className="text-sm text-subtle">/ 5.0</span>
        </span>
        <div className="flex gap-0.5 mt-auto">
          <Star className="size-4 text-warning" fill="currentColor" />
          <span className="text-xs font-medium text-subtle ms-1">
            Top 1% Percentile
          </span>
        </div>
      </Card>
    </div>
  );
}
