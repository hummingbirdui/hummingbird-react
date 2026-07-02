"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

export default function TableStickyHeader() {
  return (
    <div className="max-h-48 overflow-y-auto">
      <Table stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>Person {i + 1}</TableCell>
              <TableCell>Member</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
