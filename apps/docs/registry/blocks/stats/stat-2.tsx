"use client";

import { ArrowRight, Check, Clock, Users } from "lucide-react";
import { Card, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const stats = [
  {
    label: "Active Users",
    value: "8,940",
    change: "+14.2%",
    caption: "growth this week",
    trend: "up",
    icon: Users,
    iconClassName: "bg-primary-lighter text-primary",
  },
  {
    label: "Conversion Rate",
    value: "3.87%",
    change: "+1.1%",
    caption: "since yesterday",
    trend: "up",
    icon: ArrowRight,
    iconClassName: "bg-secondary-lighter text-secondary",
  },
  {
    label: "Avg. Session Time",
    value: "5m 24s",
    change: "-0.8%",
    caption: "drop from last week",
    trend: "down",
    icon: Clock,
    iconClassName: "bg-warning-lighter text-warning",
  },
  {
    label: "New Signups",
    value: "1,276",
    change: "+9.6%",
    caption: "vs last campaign",
    trend: "up",
    icon: Check,
    iconClassName: "bg-success-lighter text-success",
  },
];

export default function Stat2() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="bg-default border-subtle p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted">{stat.label}</span>
              <div className={cn("p-2 rounded-lg", stat.iconClassName)}>
                <Icon className="size-5" />
              </div>
            </div>
            <Text
              size="3xl"
              fontWeight="semibold"
              className="text-default mb-3"
            >
              {stat.value}
            </Text>
            <div className="text-sm flex items-center">
              <span
                className={cn(
                  "font-medium",
                  stat.trend === "up" ? "text-success" : "text-danger",
                )}
              >
                {stat.change}
              </span>
              <span className="ms-2 text-muted">{stat.caption}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
