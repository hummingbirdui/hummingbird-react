import type * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react/table";

export type DataAttributeDef = {
  attribute: React.ReactNode;
  /**
   * Possible values. An array renders as a code chip (`"open" | "closed"`);
   * a plain node renders as text (e.g. "Present when disabled").
   */
  values: string[] | React.ReactNode;
};

export function DataAttributesTable({ data }: { data: DataAttributeDef[] }) {
  return (
    <Table highlight>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-muted">Data attribute</TableHead>
          <TableHead className="bg-muted">Values</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>
              <code className="font-semibold">{row.attribute}</code>
            </TableCell>
            <TableCell>
              {Array.isArray(row.values) ? (
                <code>{row.values.join(" | ")}</code>
              ) : (
                row.values
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
