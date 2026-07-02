"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

export default function TableActive() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane Cooper</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow active>
          <TableCell>Cody Fisher</TableCell>
          <TableCell>Highlighted row</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Esther Howard</TableCell>
          <TableCell active>Highlighted cell</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
