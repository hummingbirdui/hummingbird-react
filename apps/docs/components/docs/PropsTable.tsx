import type * as React from "react";
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
  default?: React.ReactNode;
  description?: React.ReactNode;
};

export function PropsTable({ data }: { data: PropDef[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="font-semibold">{row.prop}</TableCell>
            <TableCell>
              <code>{row.type}</code>
            </TableCell>
            <TableCell>
              {row.default === undefined ? "—" : <code>{row.default}</code>}
            </TableCell>
            <TableCell>{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
