"use client";

import { Table } from "@hummingbirdui/react";

export default function TableStickyHeader() {
  return (
    <div className="max-h-48 overflow-y-auto">
      <Table stickyHeader highlight>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array.from({ length: 12 }).map((_, i) => (
            <Table.Row key={i}>
              <Table.Cell>Person {i + 1}</Table.Cell>
              <Table.Cell>Member</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
