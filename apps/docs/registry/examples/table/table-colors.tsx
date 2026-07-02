"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

const colors = [
  "neutral",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export default function TableColors() {
  return (
    <div className="flex flex-col gap-6">
      {colors.map((color) => (
        <Table key={color} color={color}>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{color}</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
