"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

export default function TableSizes() {
  return (
    <div className="flex flex-col gap-6">
      <Table size="md">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Jane Cooper</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cody Fisher</TableCell>
            <TableCell>Member</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table size="sm">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Jane Cooper</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cody Fisher</TableCell>
            <TableCell>Member</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
