"use client";

import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

export default function TableCaptionExample() {
  return (
    <Table>
      <TableCaption>A list of recent team members.</TableCaption>
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
  );
}
