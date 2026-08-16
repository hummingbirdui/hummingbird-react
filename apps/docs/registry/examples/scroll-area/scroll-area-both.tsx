"use client";

import { ScrollArea, Table } from "@hummingbirdui/react";

const rows = Array.from({ length: 20 }, (_, i) => i + 1);

export default function ScrollAreaBoth() {
  return (
    <ScrollArea className="mx-auto h-72 w-96 max-w-full rounded-lg border border-subtle">
      <ScrollArea.Viewport>
        <Table className="w-[40rem]">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td>{row}</td>
                <td>Person {row}</td>
                <td>person{row}@example.com</td>
                <td>Member</td>
                <td>Active</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
      <ScrollArea.Scrollbar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea>
  );
}
