"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@hummingbirdui/react";

export default function TableFooterExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Widget</TableCell>
          <TableCell>$12.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gadget</TableCell>
          <TableCell>$8.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$20.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
