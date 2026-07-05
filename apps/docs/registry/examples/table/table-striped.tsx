"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

export default function TableStriped() {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane Cooper</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cody Fisher</TableCell>
          <TableCell>cody@example.com</TableCell>
          <TableCell>Member</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Esther Howard</TableCell>
          <TableCell>esther@example.com</TableCell>
          <TableCell>Member</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
