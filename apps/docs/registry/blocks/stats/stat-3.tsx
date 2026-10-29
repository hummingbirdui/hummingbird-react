"use client";

import {
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
import { Card } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const stats = [
  {
    label: "Total Revenue",
    value: "$30,452",
    change: "12%",
    trend: "up",
    caption: "Last period comparison",
    icon: CircleDollarSign,
    iconClassName: "text-primary",
    iconBgClassName: "bg-primary-lighter",
  },
  {
    label: "Active Users",
    value: "12,543",
    change: "5.4%",
    trend: "up",
    caption: "Last 7 days activity",
    icon: Users,
    iconClassName: "text-secondary",
    iconBgClassName: "bg-secondary-lighter",
  },
  {
    label: "Avg. Latency",
    value: "142ms",
    change: "2.1%",
    trend: "down",
    caption: "System performance",
    icon: Zap,
    iconClassName: "text-warning",
    iconBgClassName: "bg-warning-lighter",
  },
  {
    label: "Conversions",
    value: "3.8%",
    change: "12.5%",
    trend: "up",
    caption: "Current funnel data",
    icon: ShoppingBag,
    iconClassName: "text-success",
    iconBgClassName: "bg-success-lighter",
  },
];

export default function Stat3() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;

        return (
          <Card
            key={stat.label}
            className="border-subtle rounded-xl overflow-hidden"
          >
            <div className="p-6 bg-default">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "p-2 rounded-lg shrink-0",
                    stat.iconBgClassName,
                  )}
                >
                  <Icon className={cn("size-4", stat.iconClassName)} />
                </div>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
              <div className="flex items-baseline">
                <div className="text-2xl font-semibold text-default">
                  {stat.value}
                </div>
                <div
                  className={cn(
                    "ms-2 flex items-baseline text-sm font-semibold",
                    stat.trend === "up" ? "text-success" : "text-danger",
                  )}
                >
                  {stat.change}
                  <TrendIcon className="size-3" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-subtle flex justify-between">
              <span className="text-subtle font-medium">{stat.caption}</span>
              <a href="#" className="font-semibold no-underline">
                Details
              </a>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
