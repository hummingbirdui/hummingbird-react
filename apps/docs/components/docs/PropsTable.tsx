"use client";

import type * as React from "react";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@hummingbirdui/react/popover";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react/table";

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
      <PopoverTrigger
        aria-label={label}
        className="inline-flex shrink-0 cursor-pointer items-center rounded-full align-middle text-muted hover:opacity-75"
      >
        <Info size={14} aria-hidden />
      </PopoverTrigger>
      <PopoverContent side="top" className="max-w-90">
        <PopoverBody className="text-sm">{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function PropsTable({ data }: { data: PropDef[] }) {
  return (
    <Table highlight>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-muted">Prop</TableHead>
          <TableHead className="bg-muted">Type</TableHead>
          <TableHead className="bg-muted">Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>
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
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              {row.default === undefined ? "—" : <code>{row.default}</code>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
