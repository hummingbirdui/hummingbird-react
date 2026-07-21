"use client";

import type * as React from "react";
import { Info } from "lucide-react";
import { Popover } from "@hummingbirdui/react/popover";
import { Table } from "@hummingbirdui/react/table";

export type PropDef = {
  prop: React.ReactNode;
  type: React.ReactNode;
  /**
   * Short label shown in the Type column (e.g. "enum", "function"). When set,
   * the full `type` is revealed in an info popover instead of inline.
   */
  typeSimple?: React.ReactNode;
  default?: React.ReactNode;
  description?: React.ReactNode;
};

function InfoPopover({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <Popover.Trigger
        aria-label={label}
        className="inline-flex shrink-0 cursor-pointer items-center rounded-full align-middle text-muted hover:opacity-75"
      >
        <Info size={14} aria-hidden />
      </Popover.Trigger>
      <Popover.Content side="top" className="max-w-90">
        <Popover.Body className="text-sm">{children}</Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export function PropsTable({ data }: { data: PropDef[] }) {
  return (
    <Table highlight>
      <Table.Header>
        <Table.Row>
          <Table.Head className="bg-muted">Prop</Table.Head>
          <Table.Head className="bg-muted">Type</Table.Head>
          <Table.Head className="bg-muted">Default</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <span className="inline-flex items-center gap-2">
                <code className="font-semibold">{row.prop}</code>
                {row.description !== undefined && (
                  <InfoPopover
                    label={
                      typeof row.prop === "string"
                        ? `Description of the ${row.prop} prop`
                        : "Prop description"
                    }
                  >
                    {row.description}
                  </InfoPopover>
                )}
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="inline-flex items-center gap-2">
                <code>{row.typeSimple ?? row.type}</code>
                {row.typeSimple !== undefined && (
                  <InfoPopover
                    label={
                      typeof row.prop === "string"
                        ? `Full type of the ${row.prop} prop`
                        : "Full type"
                    }
                  >
                    <code>{row.type}</code>
                  </InfoPopover>
                )}
              </span>
            </Table.Cell>
            <Table.Cell>
              {row.default === undefined ? "—" : <code>{row.default}</code>}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
