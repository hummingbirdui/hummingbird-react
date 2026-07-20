import type * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react/table";

export type CssVariableDef = {
  cssVariable: React.ReactNode;
  description?: React.ReactNode;
};

export function CssVariablesTable({ data }: { data: CssVariableDef[] }) {
  return (
    <Table highlight>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-muted">CSS Variable</TableHead>
          <TableHead className="bg-muted">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>
              <code className="font-semibold">{row.cssVariable}</code>
            </TableCell>
            <TableCell>{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
