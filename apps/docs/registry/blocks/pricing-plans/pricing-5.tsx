"use client";

import { Fragment } from "react";
import { Check } from "lucide-react";
import { Badge, Button, Table, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

type Value = string | boolean;

const sections: {
  title: string;
  rows: {
    feature: string;
    values: [Value, Value, Value];
    highlight?: number;
  }[];
}[] = [
  {
    title: "Core Platform",
    rows: [
      { feature: "Active Projects", values: ["10", "100", "Unlimited"] },
      { feature: "Team Members", values: ["Up to 5", "Up to 50", "Unlimited"] },
      { feature: "File Storage", values: ["5GB", "100GB", "Custom Limits"] },
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      {
        feature: "Historical Data",
        values: ["30 days", "1 year", "Unlimited"],
      },
      { feature: "Custom Dashboards", values: [false, true, true] },
      { feature: "Scheduled Reports", values: [false, false, true] },
    ],
  },
  {
    title: "Support & Security",
    rows: [
      {
        feature: "Customer Support",
        values: [
          "Email only",
          "Priority Email & Chat",
          "24/7 Dedicated Support",
        ],
        highlight: 2,
      },
      { feature: "Single Sign-On (SSO)", values: [false, false, true] },
    ],
  },
];

function renderValue(value: Value) {
  if (value === true) {
    return <Check className="size-5 text-success mx-auto" />;
  }
  return value === false ? "—" : value;
}

export default function Pricing5() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="subtle" className="mb-4 px-2 py-1">
          Feature Match
        </Badge>
        <Text as="h3" className="mb-4 text-default">
          Compare all features
        </Text>
        <Text size="lg" className="text-muted">
          A detailed features comparison to help you choose the best plan for
          your team.
        </Text>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <Table.Header>
            <Table.Row className="bg-subtle">
              <Table.Head className="w-1/4 p-6 align-bottom border-0 z-10">
                <Text as="h4" className="text-default mb-2">
                  Plans
                </Text>
                <Text
                  size="sm"
                  fontWeight="normal"
                  className="text-muted mb-0 text-nowrap"
                >
                  See what&apos;s included at each tier.
                </Text>
              </Table.Head>
              <Table.Head className="w-1/4 p-6 text-center align-bottom border-0 min-w-50">
                <Text as="h6" size="sm" className="text-muted mb-2">
                  Starter
                </Text>
                <Text as="h5" fontWeight="bold" className="text-default mb-6">
                  $29
                  <span className="text-sm text-muted font-normal">/mo</span>
                </Text>
                <Button variant="subtle" size="sm" className="w-full">
                  Choose Starter
                </Button>
              </Table.Head>
              <Table.Head className="w-1/4 p-6 text-center align-bottom border-0 min-w-50">
                <div className="inline-flex mb-2 items-center gap-2">
                  <Text as="h6" size="sm" className="text-primary mb-0">
                    Professional
                  </Text>
                  <Badge>Popular</Badge>
                </div>
                <Text as="h5" fontWeight="bold" className="text-default mb-6">
                  $99
                  <span className="text-sm text-muted font-normal">/mo</span>
                </Text>
                <Button size="sm" className="w-full shadow-sm">
                  Upgrade to Pro
                </Button>
              </Table.Head>
              <Table.Head className="w-1/4 p-6 text-center align-bottom border-0 min-w-50">
                <Text as="h6" size="sm" className="text-muted mb-2">
                  Enterprise
                </Text>
                <Text
                  as="h5"
                  fontWeight="bold"
                  className="text-default mb-6 hover:text-primary transition-colors"
                >
                  Custom
                </Text>
                <Button variant="subtle" size="sm" className="w-full">
                  Contact Sales
                </Button>
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sections.map((section) => (
              <Fragment key={section.title}>
                <Table.Row>
                  <Table.Cell colSpan={4} className="font-bold text-default">
                    {section.title}
                  </Table.Cell>
                </Table.Row>
                {section.rows.map((row) => (
                  <Table.Row key={row.feature}>
                    <Table.Cell>{row.feature}</Table.Cell>
                    {row.values.map((value, index) => (
                      <Table.Cell
                        key={index}
                        className={cn(
                          "text-center",
                          index === row.highlight && "font-medium text-primary",
                        )}
                      >
                        {renderValue(value)}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
