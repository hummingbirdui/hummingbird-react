"use client";

import { Badge, Card, Text } from "@hummingbirdui/react";

const stats = [
  {
    label: "Total Users",
    value: "71,897",
    from: "from 64k",
    change: "+12%",
    color: "success",
  },
  {
    label: "Avg. Session Time",
    value: "4m 32s",
    change: "+2.1%",
    color: "success",
  },
  { label: "Bounce Rate", value: "24.57%", change: "-4.3%", color: "danger" },
  { label: "Total Revenue", value: "$42.1k", change: "+18%", color: "success" },
] as const;

export default function Stat1() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-6 border border-subtle overflow-hidden rounded-xl"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <Text
              size="sm"
              fontWeight="medium"
              truncate
              className="text-subtle mb-0"
            >
              {stat.label}
            </Text>
            <Badge variant="subtle" color={stat.color}>
              {stat.change}
            </Badge>
          </div>
          {"from" in stat ? (
            <span className="flex items-baseline text-2xl font-semibold text-default">
              {stat.value}
              <span className="ms-2 text-sm font-medium text-subtle">
                {stat.from}
              </span>
            </span>
          ) : (
            <span className="text-2xl font-semibold text-default">
              {stat.value}
            </span>
          )}
        </Card>
      ))}
    </div>
  );
}
